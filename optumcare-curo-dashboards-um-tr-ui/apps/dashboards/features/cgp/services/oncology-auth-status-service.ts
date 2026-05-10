"use server";

import { PREHASHED_ORG_BY_ID } from "@/lib/constants/orgs";
import { formatDate } from "@/lib/formats";
import { hscGraphqlRequest } from "@/lib/api/hsc-graphql-client";
import { getHscRefLookup, resolveRef } from "@/lib/shared/hsc-ref-service";

export type OncologyDateRangeKey = "last-7-days" | "last-30-days" | "last-90-days" | "year-to-date";

export type OncologyChartDataPoint = {
  label: string;
  count: number;
};

export type OncologyTrendByMonthStatus = {
  months: string[];
  series: Array<{
    label: string;
    values: number[];
  }>;
};

export type OncologyDetailedInformationRow = {
  authId: string;
  status: string;
  statusReason: string;
  memberName: string;
  createDate: string;
  decisionedDate: string;
  org: string;
  superCommunity: string;
};

export type OncologyAuthStatusResponse = {
  trendByMonth: OncologyChartDataPoint[];
  trendByMonthStatus: OncologyTrendByMonthStatus;
  totalAuthsByStatus: OncologyChartDataPoint[];
  detailedInformationRows: OncologyDetailedInformationRow[];
};

type HscRow = {
  hsc_id: string | number;
  recv_dttm: string | null;
  creat_dttm: string;
  hsc_sts_typ_id: number | null;
  hsc_sts_rsn_typ_id: number | null;
  org_id: string | number;
  indv_id: string | number;
  creat_user_id: string;
  mbr_cov_dtl?: unknown;
};

type HscDecnRow = {
  hsc_id: string | number;
  decn_rndr_dttm: string | null;
};

const EXCLUDED_STATUS_IDS = [1002526, 1002259];
const EXCLUDED_CREATOR_IDS = [
  "curo_automation_tester",
  "curo_engineer",
  "f15f0ca7-3297-4157-9a39-a4eb3821419a",
  "e1423ce6-3228-481f-bcaa-366e4a426501",
  "954193a3-b9be-45fb-a9e2-bce8b744b8c6",
  "0ff5b7af-e2a2-4b97-a23f-22dcffd64fda",
  "7e61682b-0772-4688-8fc8-b5d18c7e1cc2",
  "563415cc-ee18-4f27-8d1d-c9231ec4b9ee",
  "1a6715e8-e010-43c0-91aa-9adc22161b7a",
  "f24b149a-431b-4c67-85a5-64e0c5d8a2f5",
  "dc8318be-14b9-4502-8572-973e521d61ab",
  "d2a4640d-8e28-4d60-9219-55372f0f9075",
  "05b6bb8f-da33-486b-9849-6bcadc8f8b05",
  "000e0a8d-8c14-473e-8568-11c8d5afcb1c",
  "f24b149a-431b-4c67-85a5-64e0c5d8a2f6",
  "923f439f-21d9-4c1a-85dd-26a378c975fc",
  "75cf6f56-9b91-44eb-b80a-7ede3cb5273b",
];

function getDateBounds(dateRange: OncologyDateRangeKey): { startDate: Date; endDate: Date } {
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const startDate = new Date(endDate);
  if (dateRange === "last-7-days") {
    startDate.setDate(endDate.getDate() - 7);
  } else if (dateRange === "last-30-days") {
    startDate.setDate(endDate.getDate() - 30);
  } else if (dateRange === "last-90-days") {
    startDate.setDate(endDate.getDate() - 90);
  } else {
    startDate.setMonth(0, 1);
    startDate.setHours(0, 0, 0, 0);
  }

  return { startDate, endDate };
}

function getMonthLabel(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

function getMonthKey(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function getMemberName(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "-";
  }

  const source = payload as { firstName?: unknown; lastName?: unknown };
  const firstName = typeof source.firstName === "string" ? source.firstName.trim() : "";
  const lastName = typeof source.lastName === "string" ? source.lastName.trim() : "";

  if (!firstName && !lastName) {
    return "-";
  }
  if (!lastName) {
    return firstName;
  }
  if (!firstName) {
    return lastName;
  }
  return `${lastName}, ${firstName}`;
}

function getSuperCommunity(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "-";
  }

  const record = payload as {
    memberEligibilities?: Array<{
      eligibilityPod?: {
        superCommunity?: unknown;
      };
    }>;
  };

  const value = record.memberEligibilities?.[0]?.eligibilityPod?.superCommunity;
  return typeof value === "string" && value.trim().length > 0 ? value : "-";
}

function getOrgName(orgId: string): string {
  return PREHASHED_ORG_BY_ID[orgId] ?? orgId;
}

function parseNumeric(value: string | number): number {
  if (typeof value === "number") {
    return value;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeLabel(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function deriveAuthStatus(status: string, statusReason: string): string {
  const normalizedReason = normalizeLabel(statusReason);
  if (normalizedReason === "autoapproved") {
    return "Auto Approved";
  }

  return status;
}

const EXCLUDED_CHART_STATUS_NORMALIZED = new Set([
  "tracking",
  "draftnotsubmitted",
]);

export async function getOncologyAuthStatusData(
  dateRange: OncologyDateRangeKey,
): Promise<OncologyAuthStatusResponse> {
  const { startDate, endDate } = getDateBounds(dateRange);

  const query = `
    query GetOncologyAuthStatusRows(
      $startDate: timestamptz!
      $endDate: timestamptz!
      $excludedStatusIds: [Int!]!
      $excludedCreatorIds: [String!]!
      $limit: Int!
    ) {
      hsc(
        where: {
          _and: [
            { recv_dttm: { _gte: $startDate, _lte: $endDate } }
            { indv_id: { _gt: 0 } }
            { hsc_sts_typ_id: { _nin: $excludedStatusIds } }
            { creat_user_id: { _nin: $excludedCreatorIds } }
          ]
        }
        order_by: [{ recv_dttm: desc }]
        limit: $limit
      ) {
        hsc_id
        recv_dttm
        creat_dttm
        hsc_sts_typ_id
        hsc_sts_rsn_typ_id
        org_id
        indv_id
        creat_user_id
        mbr_cov_dtl
      }
    }
  `;

  const hscResponse = await hscGraphqlRequest<{ hsc: HscRow[] }>(query, {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    excludedStatusIds: EXCLUDED_STATUS_IDS,
    excludedCreatorIds: EXCLUDED_CREATOR_IDS,
    limit: 5000,
  });

  const rows = hscResponse.hsc ?? [];
  const refLookup = await getHscRefLookup();

  const hscIds = rows.map((row) => parseNumeric(row.hsc_id)).filter((value) => value > 0);
  const decisionLookup = new Map<string, string>();

  if (hscIds.length > 0) {
    const decisionResponse = await hscGraphqlRequest<{ hsc_decn: HscDecnRow[] }>(
      `
        query GetOncologyDecisionDates($hscIds: [bigint!]!) {
          hsc_decn(where: { hsc_id: { _in: $hscIds } }, order_by: [{ decn_rndr_dttm: desc }]) {
            hsc_id
            decn_rndr_dttm
          }
        }
      `,
      { hscIds },
    );

    for (const item of decisionResponse.hsc_decn || []) {
      const key = String(item.hsc_id);
      if (decisionLookup.has(key)) {
        continue;
      }
      if (item.decn_rndr_dttm) {
        decisionLookup.set(key, formatDate(item.decn_rndr_dttm));
      }
    }
  }

  const trendMap = new Map<string, number>();
  const statusMap = new Map<string, number>();
  const monthKeyToLabel = new Map<string, string>();
  const monthStatusMap = new Map<string, Map<string, number>>();
  const normalizedRows: Array<{
    row: HscRow;
    authStatus: string;
    statusReason: string;
  }> = [];

  for (const row of rows) {
    const resolvedStatus = resolveRef(refLookup, row.hsc_sts_typ_id) || "-";
    const resolvedStatusReason = resolveRef(refLookup, row.hsc_sts_rsn_typ_id) || "-";
    const authStatus = deriveAuthStatus(resolvedStatus, resolvedStatusReason);

    normalizedRows.push({ row, authStatus, statusReason: resolvedStatusReason });

    if (EXCLUDED_CHART_STATUS_NORMALIZED.has(normalizeLabel(authStatus))) {
      continue;
    }

    statusMap.set(authStatus, (statusMap.get(authStatus) ?? 0) + 1);

    if (!row.recv_dttm) {
      continue;
    }

    const month = getMonthLabel(row.recv_dttm);
    trendMap.set(month, (trendMap.get(month) ?? 0) + 1);

    const monthKey = getMonthKey(row.recv_dttm);
    monthKeyToLabel.set(monthKey, month);

    if (!monthStatusMap.has(monthKey)) {
      monthStatusMap.set(monthKey, new Map<string, number>());
    }

    const statusCounts = monthStatusMap.get(monthKey);
    if (statusCounts) {
      statusCounts.set(authStatus, (statusCounts.get(authStatus) ?? 0) + 1);
    }
  }

  const detailedInformationRows = normalizedRows.map(({ row, authStatus, statusReason }) => {
    const authId = String(row.hsc_id);
    return {
      authId,
      status: authStatus,
      statusReason,
      memberName: getMemberName(row.mbr_cov_dtl),
      createDate: formatDate(row.creat_dttm),
      decisionedDate: decisionLookup.get(authId) ?? "-",
      org: getOrgName(String(row.org_id)),
      superCommunity: getSuperCommunity(row.mbr_cov_dtl),
    };
  });

  const trendByMonth = Array.from(trendMap.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((left, right) => {
      const leftDate = new Date(`01 ${left.label}`);
      const rightDate = new Date(`01 ${right.label}`);
      return leftDate.getTime() - rightDate.getTime();
    });

  const totalAuthsByStatus = Array.from(statusMap.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);

  const orderedMonthKeys = Array.from(monthStatusMap.keys()).sort((a, b) => a.localeCompare(b));
  const orderedMonths = orderedMonthKeys.map((monthKey) => monthKeyToLabel.get(monthKey) ?? monthKey);
  const orderedStatuses = totalAuthsByStatus.map((item) => item.label);

  const trendByMonthStatus: OncologyTrendByMonthStatus = {
    months: orderedMonths,
    series: orderedStatuses.map((statusLabel) => ({
      label: statusLabel,
      values: orderedMonthKeys.map((monthKey) => monthStatusMap.get(monthKey)?.get(statusLabel) ?? 0),
    })),
  };

  return {
    trendByMonth,
    trendByMonthStatus,
    totalAuthsByStatus,
    detailedInformationRows,
  };
}
