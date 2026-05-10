"use server";

import { hscGraphqlRequest } from "./hsc-graphql-client";
import { tatCacheGet } from "./tat-cache-client";
import { PREHASHED_ORG_BY_ID } from "../constants/orgs";
import { TAT_PRIORITY_REF_IDS_BY_LABEL } from "../constants/priorities";

export type ChartDataPoint = {
  label: string;
  count: number;
};

export type ChartDataSource = "graphql" | "cache";

export type AllChartsData = {
  status: ChartDataPoint[];
  priority: ChartDataPoint[];
  requestType: ChartDataPoint[];
  org: ChartDataPoint[];
  createdDate: ChartDataPoint[];
};

const INCLUDED_STATUS_IDS = [1000895, 1000935, 1005006];

function getDateVariables(fromDate: string, toDate: string) {
  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);
  endDate.setHours(23, 59, 59, 999);

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
}

function toCountPoints(map: Map<string, number>): ChartDataPoint[] {
  return Array.from(map.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

// Mirrors the service-layer chip auth type ID list (Injectable/Part B)
const PART_B_INJECTABLE_AUTH_TYPE_IDS = [
  1002486, 1002499, 1004085, 1002476, 1002478, 1002795, 1000873,
  19289, 1004210, 26501, 26551, 21882, 19461, 1008032,
];

async function fetchStatusChartDataByAggregate(
  fromDate: string,
  toDate: string,
  filters: StatusChartFilters = {},
): Promise<ChartDataPoint[]> {
  const { startDate, endDate } = getDateVariables(fromDate, toDate);

  const varDecls: string[] = [
    "$startDate: timestamptz!",
    "$endDate: timestamptz!",
    "$approvedId: Int!",
    "$deniedId: Int!",
    "$partialId: Int!",
  ];
  const variables: Record<string, unknown> = {
    startDate,
    endDate,
    approvedId: 1000895,
    deniedId: 1000935,
    partialId: 1005006,
  };

  // Chip filter — mirrors the pattern in um-tat-compliance-service.ts
  let chipCondition = "";
  if (filters.selectedChip === "Injectable/Part - B") {
    varDecls.push("$chipAuthTypeIds: [Int!]!");
    variables.chipAuthTypeIds = PART_B_INJECTABLE_AUTH_TYPE_IDS;
    chipCondition = "{ auth_typ_ref_id: { _in: $chipAuthTypeIds } }";
  } else if (filters.selectedChip === "Non - Part B") {
    varDecls.push("$chipAuthTypeIds: [Int!]!");
    variables.chipAuthTypeIds = PART_B_INJECTABLE_AUTH_TYPE_IDS;
    chipCondition = "{ auth_typ_ref_id: { _nin: $chipAuthTypeIds } }";
  }

  function statusWhere(statusVar: string): string {
    const conditions = [
      `{ recv_dttm: { _gte: $startDate, _lte: $endDate } }`,
      `{ indv_id: { _gt: 0 } }`,
      `{ hsc_sts_typ_id: { _eq: ${statusVar} } }`,
      ...(chipCondition ? [chipCondition] : []),
    ];
    return `{ _and: [${conditions.join(", ")}] }`;
  }

  const query = `
    query GetStatusCounts(${varDecls.join(", ")}) {
      approved: hsc_aggregate(where: ${statusWhere("$approvedId")}) { aggregate { count } }
      denied: hsc_aggregate(where: ${statusWhere("$deniedId")}) { aggregate { count } }
      partiallyFavorable: hsc_aggregate(where: ${statusWhere("$partialId")}) { aggregate { count } }
    }
  `;

  type AggregateNode = { aggregate: { count: number } | null };
  type GraphQLResponse = {
    approved: AggregateNode;
    denied: AggregateNode;
    partiallyFavorable: AggregateNode;
  };

  const data = await hscGraphqlRequest<GraphQLResponse>(query, variables);

  const points: ChartDataPoint[] = [
    { label: "Approved", count: data.approved?.aggregate?.count ?? 0 },
    { label: "Denied", count: data.denied?.aggregate?.count ?? 0 },
    { label: "Partially Favorable", count: data.partiallyFavorable?.aggregate?.count ?? 0 },
  ];

  return points.filter((point) => point.count > 0);
}

async function fetchPriorityChartData(
  fromDate: string,
  toDate: string,
): Promise<ChartDataPoint[]> {
  const { startDate, endDate } = getDateVariables(fromDate, toDate);

  const query = `
    query GetPriorityRecords(
      $startDate: timestamptz!
      $endDate: timestamptz!
      $includedStatusIds: [Int!]!
    ) {
      hsc(
        where: {
          _and: [
            { creat_dttm: { _gte: $startDate, _lte: $endDate } }
            { hsc_sts_typ_id: { _in: $includedStatusIds } }
            { indv_id: { _gt: 0 } }
          ]
        }
      ) {
        auth_typ_ref_id
      }
    }
  `;

  const variables = {
    startDate,
    endDate,
    includedStatusIds: INCLUDED_STATUS_IDS,
  };

  type GraphQLResponse = {
    hsc: Array<{
      auth_typ_ref_id: number | null;
    }>;
  };

  const data = await hscGraphqlRequest<GraphQLResponse>(query, variables);

  const countMap = new Map<string, number>();
  for (const item of data.hsc || []) {
    const key = item.auth_typ_ref_id?.toString() ?? "Unknown";
    countMap.set(key, (countMap.get(key) ?? 0) + 1);
  }

  return toCountPoints(countMap);
}

async function fetchRequestTypeChartData(
  fromDate: string,
  toDate: string,
): Promise<ChartDataPoint[]> {
  const { startDate, endDate } = getDateVariables(fromDate, toDate);

  const query = `
    query GetRequestTypeRecords(
      $startDate: timestamptz!
      $endDate: timestamptz!
      $includedStatusIds: [Int!]!
    ) {
      hsc(
        where: {
          _and: [
            { creat_dttm: { _gte: $startDate, _lte: $endDate } }
            { hsc_sts_typ_id: { _in: $includedStatusIds } }
            { indv_id: { _gt: 0 } }
          ]
        }
      ) {
        auth_cat_type_id
      }
    }
  `;

  const variables = {
    startDate,
    endDate,
    includedStatusIds: INCLUDED_STATUS_IDS,
  };

  type GraphQLResponse = {
    hsc: Array<{
      auth_cat_type_id: number | null;
    }>;
  };

  const data = await hscGraphqlRequest<GraphQLResponse>(query, variables);

  const countMap = new Map<string, number>();
  for (const item of data.hsc || []) {
    const key = item.auth_cat_type_id?.toString() ?? "Unknown";
    countMap.set(key, (countMap.get(key) ?? 0) + 1);
  }

  return toCountPoints(countMap);
}

async function fetchOrgChartData(
  fromDate: string,
  toDate: string,
): Promise<ChartDataPoint[]> {
  const { startDate, endDate } = getDateVariables(fromDate, toDate);

  const query = `
    query GetOrgRecords(
      $startDate: timestamptz!
      $endDate: timestamptz!
      $includedStatusIds: [Int!]!
    ) {
      hsc(
        where: {
          _and: [
            { creat_dttm: { _gte: $startDate, _lte: $endDate } }
            { hsc_sts_typ_id: { _in: $includedStatusIds } }
            { indv_id: { _gt: 0 } }
          ]
        }
      ) {
        org_id
      }
    }
  `;

  const variables = {
    startDate,
    endDate,
    includedStatusIds: INCLUDED_STATUS_IDS,
  };

  type GraphQLResponse = {
    hsc: Array<{
      org_id: string | null;
    }>;
  };

  const data = await hscGraphqlRequest<GraphQLResponse>(query, variables);

  const countMap = new Map<string, number>();
  for (const item of data.hsc || []) {
    const key = item.org_id?.toString() ?? "Unknown";
    countMap.set(key, (countMap.get(key) ?? 0) + 1);
  }

  return toCountPoints(countMap);
}

async function fetchCreatedDateChartData(
  fromDate: string,
  toDate: string,
): Promise<ChartDataPoint[]> {
  const { startDate, endDate } = getDateVariables(fromDate, toDate);

  const query = `
    query GetDateRecords(
      $startDate: timestamptz!
      $endDate: timestamptz!
      $includedStatusIds: [Int!]!
    ) {
      hsc(
        where: {
          _and: [
            { creat_dttm: { _gte: $startDate, _lte: $endDate } }
            { hsc_sts_typ_id: { _in: $includedStatusIds } }
            { indv_id: { _gt: 0 } }
          ]
        }
      ) {
        creat_dttm
      }
    }
  `;

  const variables = {
    startDate,
    endDate,
    includedStatusIds: INCLUDED_STATUS_IDS,
  };

  type GraphQLResponse = {
    hsc: Array<{
      creat_dttm: string | null;
    }>;
  };

  const data = await hscGraphqlRequest<GraphQLResponse>(query, variables);

  const countMap = new Map<string, number>();
  for (const item of data.hsc || []) {
    const dateKey = item.creat_dttm
      ? (new Date(item.creat_dttm).toISOString().split("T")[0] ?? "Unknown")
      : "Unknown";
    countMap.set(dateKey, (countMap.get(dateKey) ?? 0) + 1);
  }

  return Array.from(countMap.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.label.localeCompare(a.label));
}

export async function fetchAllChartsData(
  fromDate: string,
  toDate: string,
): Promise<AllChartsData> {
  const [status, priority, requestType, org, createdDate] = await Promise.all([
    fetchStatusChartDataByAggregate(fromDate, toDate),
    fetchPriorityChartData(fromDate, toDate),
    fetchRequestTypeChartData(fromDate, toDate),
    fetchOrgChartData(fromDate, toDate),
    fetchCreatedDateChartData(fromDate, toDate),
  ]);

  return {
    status,
    priority,
    requestType,
    org,
    createdDate,
  };
}

/**
 * Fetch aggregated data for charts by a specific dimension.
 * Each chart query loads independently but respects the same date range and status filters.
 */

export type StatusChartFilters = {
  selectedChip?: string;
  priority?: string[];
  requestType?: string;
  lineOfBusiness?: string;
  healthPlan?: string;
  superCommunity?: string;
  ipa?: string;
  orgs?: string[];
};

export async function fetchChartDataByStatus(
  fromDate: string,
  toDate: string,
  dataSource: ChartDataSource = "graphql",
  filters: StatusChartFilters = {},
): Promise<ChartDataPoint[]> {
  if (dataSource === "cache") {
    const params: Record<string, string> = {
      from_date: fromDate,
      to_date: toDate,
    };
    if (filters.selectedChip) params.selected_chip = filters.selectedChip;
    if (filters.priority?.length && filters.priority[0] !== "All Priorities") {
      params.priority = filters.priority.filter((p) => p !== "All Priorities").join(",");
    }
    if (filters.requestType && filters.requestType !== "All Request Types") params.request_type = filters.requestType;
    if (filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business") params.line_of_business = filters.lineOfBusiness;
    if (filters.healthPlan && filters.healthPlan !== "All Health Plans") params.health_plan = filters.healthPlan;
    if (filters.superCommunity && filters.superCommunity !== "All Super Communities") params.super_community = filters.superCommunity;
    if (filters.ipa && filters.ipa !== "All IPAs") params.ipa = filters.ipa;
    if (filters.orgs?.length) params.orgs = filters.orgs.join(",");

    return tatCacheGet<ChartDataPoint[]>("/v1/prior-auth/status-chart", params);
  }
  return fetchStatusChartDataByAggregate(fromDate, toDate, filters);
}

export async function fetchChartDataByPriority(
  fromDate: string,
  toDate: string,
): Promise<ChartDataPoint[]> {
  return fetchPriorityChartData(fromDate, toDate);
}

export async function fetchChartDataByRequestType(
  fromDate: string,
  toDate: string,
): Promise<ChartDataPoint[]> {
  return fetchRequestTypeChartData(fromDate, toDate);
}

export async function fetchChartDataByOrg(
  fromDate: string,
  toDate: string,
): Promise<ChartDataPoint[]> {
  return fetchOrgChartData(fromDate, toDate);
}

export async function fetchChartDataByCreatedDate(
  fromDate: string,
  toDate: string,
): Promise<ChartDataPoint[]> {
  return fetchCreatedDateChartData(fromDate, toDate);
}

// Status IDs excluded from TAT compliance charts (matches um-tat-compliance-service.ts)
const TAT_EXCLUDED_STATUS_IDS = [1002259, 1002526, 1005617, 1005694];

// Request type label → auth_typ_ref_id (mirrors um-tat-compliance-service.ts)
const TAT_REQUEST_TYPE_REF_ID_MAP: Record<string, number> = {
  "Referral": 1000879,
  "Order Utility Referral": 1006953,
  "Prior Auth": 1002487,
  "Radiology Cardiology": 1002488,
  "Home Health": 1000871,
  "Durable Medical Equipment": 1000868,
  "Outpatient Surgery": 1000876,
  "Part B": 1002486,
  "Outpatient Dx/Tx": 1004083,
  "Outpatient Therapy": 1005113,
  "Injectable": 1000873,
  "Skilled Nursing Facility": 1000880,
  "Palliative": 1000878,
  "Ambulance": 1000865,
  "Behavioral Health": 1004080,
  "Precertification": 1004084,
  "Genetics": 1002484,
  "Dialysis": 1000867,
  "Acute Inpatient Rehab": 1006204,
  "Hospice": 1000872,
  "Long Term Care(Custodial)": 1004081,
  "LTAC": 1006202,
  "Urgent Care": 1000881,
  "Acute Rehab/Subacute": 1004079,
  "Outpatient Rehab": 1000877,
  "Inpatient": 1000874,
  "Orthotics/Prosthetics": 1004082,
  "LTAC AIR SNF": 1002485,
  "Emergency Room": 1000869,
  "Site of Service": 1002490,
  "Appeal": 1002527,
};

type TatHscRow = { hsc_id: string; tat_due_dttm: string | null };
type TatDecnRow = {
  hsc_id: string;
  decn_rndr_dttm: string | null;
  tat_nod_prov_dttm: string | null;
  wrt_decn_prov_cmnct_dttm: string | null;
};

/**
 * Shared two-step GraphQL fetch for TAT compliance charts.
 * Step 1: fetch hsc rows matching the given priority labels and filters.
 * Step 2: batch-fetch hsc_decn rows for those IDs, then count Timely/Late.
 */
async function fetchTatComplianceFromGraphQL(
  fromDate: string,
  toDate: string,
  filters: StatusChartFilters,
  priorityLabels: string[],
  isTimely: (hsc: TatHscRow, decn: TatDecnRow | undefined) => boolean | null,
): Promise<ChartDataPoint[]> {
  const { startDate, endDate } = getDateVariables(fromDate, toDate);
  const priorityIds = priorityLabels.flatMap((label) => TAT_PRIORITY_REF_IDS_BY_LABEL[label] ?? []);
  if (priorityIds.length === 0) return [];

  const varDecls: string[] = [
    "$startDate: timestamptz!",
    "$endDate: timestamptz!",
    "$excludedStatusIds: [Int!]!",
    "$priorityIds: [Int!]!",
  ];
  const variables: Record<string, unknown> = {
    startDate,
    endDate,
    excludedStatusIds: TAT_EXCLUDED_STATUS_IDS,
    priorityIds,
  };

  const conditions: string[] = [
    "{ recv_dttm: { _gte: $startDate, _lte: $endDate } }",
    "{ hsc_sts_typ_id: { _nin: $excludedStatusIds } }",
    "{ indv_id: { _gt: 0 } }",
    "{ rev_prr_ref_id: { _in: $priorityIds } }",
  ];

  // Chip filter
  if (filters.selectedChip === "Injectable/Part - B") {
    varDecls.push("$chipAuthTypeIds: [Int!]!");
    variables.chipAuthTypeIds = PART_B_INJECTABLE_AUTH_TYPE_IDS;
    conditions.push("{ auth_typ_ref_id: { _in: $chipAuthTypeIds } }");
  } else if (filters.selectedChip === "Non - Part B") {
    varDecls.push("$chipAuthTypeIds: [Int!]!");
    variables.chipAuthTypeIds = PART_B_INJECTABLE_AUTH_TYPE_IDS;
    conditions.push("{ auth_typ_ref_id: { _nin: $chipAuthTypeIds } }");
  }

  // Request type
  if (filters.requestType && filters.requestType !== "All Request Types") {
    const rtId = TAT_REQUEST_TYPE_REF_ID_MAP[filters.requestType];
    if (rtId) {
      varDecls.push("$requestTypeId: Int!");
      variables.requestTypeId = rtId;
      conditions.push("{ auth_typ_ref_id: { _eq: $requestTypeId } }");
    }
  }

  // JSONB filters
  if (filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business") {
    varDecls.push("$lobContains: jsonb!");
    variables.lobContains = { memberEligibilities: [{ lineOfBusiness: filters.lineOfBusiness }] };
    conditions.push("{ mbr_cov_dtl: { _contains: $lobContains } }");
  }
  if (filters.healthPlan && filters.healthPlan !== "All Health Plans") {
    varDecls.push("$healthPlanContains: jsonb!");
    variables.healthPlanContains = { memberEligibilities: [{ healthPlanName: filters.healthPlan }] };
    conditions.push("{ mbr_cov_dtl: { _contains: $healthPlanContains } }");
  }
  if (filters.superCommunity && filters.superCommunity !== "All Super Communities") {
    varDecls.push("$superCommunityContains: jsonb!");
    variables.superCommunityContains = { memberEligibilities: [{ eligibilityPod: { superCommunity: filters.superCommunity } }] };
    conditions.push("{ mbr_cov_dtl: { _contains: $superCommunityContains } }");
  }
  if (filters.ipa && filters.ipa !== "All IPAs") {
    varDecls.push("$ipaContains: jsonb!");
    variables.ipaContains = { memberEligibilities: [{ eligibilityPod: { podName: filters.ipa } }] };
    conditions.push("{ mbr_cov_dtl: { _contains: $ipaContains } }");
  }

  // Org filter
  if (filters.orgs?.length) {
    const orgIds = Object.entries(PREHASHED_ORG_BY_ID)
      .filter(([, name]) => filters.orgs!.includes(name))
      .map(([id]) => id);
    if (orgIds.length > 0) {
      varDecls.push("$orgIds: [String!]!");
      variables.orgIds = orgIds;
      conditions.push("{ org_id: { _in: $orgIds } }");
    }
  }

  const whereClause = `_and: [${conditions.join(", ")}]`;

  // Step 1: fetch hsc rows
  const hscData = await hscGraphqlRequest<{ hsc: TatHscRow[] }>(
    `query GetTatChartHsc(${varDecls.join(", ")}) {
      hsc(where: { ${whereClause} }) {
        hsc_id
        tat_due_dttm
      }
    }`,
    variables,
  );
  const hscRows = hscData.hsc || [];
  if (hscRows.length === 0) return [];

  // Step 2: batch-fetch hsc_decn
  const hscIds = hscRows.map((r) => r.hsc_id);
  const decnData = await hscGraphqlRequest<{ hsc_decn: TatDecnRow[] }>(
    `query GetTatChartDecn($hscIds: [bigint!]!) {
      hsc_decn(where: { hsc_id: { _in: $hscIds } }) {
        hsc_id
        decn_rndr_dttm
        tat_nod_prov_dttm
        wrt_decn_prov_cmnct_dttm
      }
    }`,
    { hscIds },
  );
  const decnLookup = new Map<string, TatDecnRow>(
    (decnData.hsc_decn || []).map((r) => [String(r.hsc_id), r]),
  );

  // Step 3: count Timely / Late
  let timely = 0;
  let late = 0;
  for (const hsc of hscRows) {
    const decn = decnLookup.get(String(hsc.hsc_id));
    const result = isTimely(hsc, decn);
    if (result === true) timely++;
    else if (result === false) late++;
  }

  const points: ChartDataPoint[] = [];
  if (timely > 0) points.push({ label: "Timely", count: timely });
  if (late > 0) points.push({ label: "Late", count: late });
  return points;
}

export async function fetchRoutineTatChartData(
  fromDate: string,
  toDate: string,
  dataSource: ChartDataSource = "graphql",
  filters: StatusChartFilters = {},
): Promise<ChartDataPoint[]> {
  if (dataSource === "cache") {
    const params: Record<string, string> = { from_date: fromDate, to_date: toDate };
    if (filters.selectedChip) params.selected_chip = filters.selectedChip;
    if (filters.requestType && filters.requestType !== "All Request Types") params.request_type = filters.requestType;
    if (filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business") params.line_of_business = filters.lineOfBusiness;
    if (filters.healthPlan && filters.healthPlan !== "All Health Plans") params.health_plan = filters.healthPlan;
    if (filters.superCommunity && filters.superCommunity !== "All Super Communities") params.super_community = filters.superCommunity;
    if (filters.ipa && filters.ipa !== "All IPAs") params.ipa = filters.ipa;
    if (filters.orgs?.length) params.orgs = filters.orgs.join(",");
    return tatCacheGet<ChartDataPoint[]>("/v1/prior-auth/routine-tat-chart", params);
  }
  // GraphQL: Routine priority; timely when decn_rndr_dttm <= tat_due_dttm
  return fetchTatComplianceFromGraphQL(fromDate, toDate, filters, ["Routine"], (hsc, decn) => {
    if (!decn?.decn_rndr_dttm || !hsc.tat_due_dttm) return null;
    return new Date(decn.decn_rndr_dttm) <= new Date(hsc.tat_due_dttm);
  });
}

export async function fetchExpeditedUrgentMemberTatChartData(
  fromDate: string,
  toDate: string,
  dataSource: ChartDataSource = "graphql",
  filters: StatusChartFilters = {},
): Promise<ChartDataPoint[]> {
  if (dataSource === "cache") {
    const params: Record<string, string> = { from_date: fromDate, to_date: toDate };
    if (filters.selectedChip) params.selected_chip = filters.selectedChip;
    if (filters.requestType && filters.requestType !== "All Request Types") params.request_type = filters.requestType;
    if (filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business") params.line_of_business = filters.lineOfBusiness;
    if (filters.healthPlan && filters.healthPlan !== "All Health Plans") params.health_plan = filters.healthPlan;
    if (filters.superCommunity && filters.superCommunity !== "All Super Communities") params.super_community = filters.superCommunity;
    if (filters.ipa && filters.ipa !== "All IPAs") params.ipa = filters.ipa;
    if (filters.orgs?.length) params.orgs = filters.orgs.join(",");
    return tatCacheGet<ChartDataPoint[]>("/v1/prior-auth/expedited-urgent-member-tat-chart", params);
  }
  // GraphQL: Urgent + Expedited priority; timely when decn_rndr_dttm <= tat_due_dttm
  return fetchTatComplianceFromGraphQL(fromDate, toDate, filters, ["Urgent", "Expedited"], (hsc, decn) => {
    if (!decn?.decn_rndr_dttm || !hsc.tat_due_dttm) return null;
    return new Date(decn.decn_rndr_dttm) <= new Date(hsc.tat_due_dttm);
  });
}

export async function fetchRoutineProviderTatChartData(
  fromDate: string,
  toDate: string,
  dataSource: ChartDataSource = "graphql",
  filters: StatusChartFilters = {},
): Promise<ChartDataPoint[]> {
  if (dataSource === "cache") {
    const params: Record<string, string> = { from_date: fromDate, to_date: toDate };
    if (filters.selectedChip) params.selected_chip = filters.selectedChip;
    if (filters.requestType && filters.requestType !== "All Request Types") params.request_type = filters.requestType;
    if (filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business") params.line_of_business = filters.lineOfBusiness;
    if (filters.healthPlan && filters.healthPlan !== "All Health Plans") params.health_plan = filters.healthPlan;
    if (filters.superCommunity && filters.superCommunity !== "All Super Communities") params.super_community = filters.superCommunity;
    if (filters.ipa && filters.ipa !== "All IPAs") params.ipa = filters.ipa;
    if (filters.orgs?.length) params.orgs = filters.orgs.join(",");
    return tatCacheGet<ChartDataPoint[]>("/v1/prior-auth/routine-provider-tat-chart", params);
  }
  // GraphQL: Routine priority; timely when wrt_decn_prov_cmnct_dttm <= tat_nod_prov_dttm
  return fetchTatComplianceFromGraphQL(fromDate, toDate, filters, ["Routine"], (_, decn) => {
    if (!decn?.wrt_decn_prov_cmnct_dttm || !decn?.tat_nod_prov_dttm) return null;
    return new Date(decn.wrt_decn_prov_cmnct_dttm) <= new Date(decn.tat_nod_prov_dttm);
  });
}

export async function fetchExpeditedUrgentProviderTatChartData(
  fromDate: string,
  toDate: string,
  dataSource: ChartDataSource = "graphql",
  filters: StatusChartFilters = {},
): Promise<ChartDataPoint[]> {
  if (dataSource === "cache") {
    const params: Record<string, string> = { from_date: fromDate, to_date: toDate };
    if (filters.selectedChip) params.selected_chip = filters.selectedChip;
    if (filters.requestType && filters.requestType !== "All Request Types") params.request_type = filters.requestType;
    if (filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business") params.line_of_business = filters.lineOfBusiness;
    if (filters.healthPlan && filters.healthPlan !== "All Health Plans") params.health_plan = filters.healthPlan;
    if (filters.superCommunity && filters.superCommunity !== "All Super Communities") params.super_community = filters.superCommunity;
    if (filters.ipa && filters.ipa !== "All IPAs") params.ipa = filters.ipa;
    if (filters.orgs?.length) params.orgs = filters.orgs.join(",");
    return tatCacheGet<ChartDataPoint[]>("/v1/prior-auth/expedited-urgent-provider-tat-chart", params);
  }
  // GraphQL: Urgent + Expedited priority; timely when wrt_decn_prov_cmnct_dttm <= tat_nod_prov_dttm
  return fetchTatComplianceFromGraphQL(fromDate, toDate, filters, ["Urgent", "Expedited"], (_, decn) => {
    if (!decn?.wrt_decn_prov_cmnct_dttm || !decn?.tat_nod_prov_dttm) return null;
    return new Date(decn.wrt_decn_prov_cmnct_dttm) <= new Date(decn.tat_nod_prov_dttm);
  });
}
