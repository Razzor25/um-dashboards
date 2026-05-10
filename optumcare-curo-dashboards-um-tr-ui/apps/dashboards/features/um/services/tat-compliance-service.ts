import { hscGraphqlRequest } from "@/lib/api/hsc-graphql-client";
import { PREHASHED_ORG_BY_ID } from "@/lib/constants/orgs";
import {
  TAT_PRIORITY_OPTIONS,
  TAT_PRIORITY_REF_ID_BY_LABEL,
  TAT_PRIORITY_REF_IDS,
  TAT_PRIORITY_REF_IDS_BY_LABEL,
} from "@/lib/constants/priorities";
import { getHscRefLookup } from "@/lib/shared/hsc-ref-service";
import { tatCacheGet, type TatCacheMetadata } from "@/lib/api/tat-cache-client";

export type { TatCacheMetadata } from "@/lib/api/tat-cache-client";

export type TatRecord = {
  hsc_id: string;
  recv_dttm: string | null;
  auth_typ_ref_id: number | null;
  auth_typ_label: string | null;
  auth_cat_type_id: number | null;
  org_id: string;
  hsc_sts_typ_id: number | null;
  hsc_sts_typ_label: string | null;
  rev_prr_ref_id: number | null;
  rev_prr_ref_label: string | null;
  rev_term_typ_ref_id: number | null;
  rev_term_typ_ref_label: string | null;
  curr_tat_nod_mbr_dttm: string | null;
  wrt_decn_prov_cmnct_dttm: string | null;
  wrt_decn_mbr_cmnct_dttm: string | null;
  tat_nod_prov_dttm: string | null;
  decn_mbr_cmnct_dttm: string | null;
  decn_rndr_dttm: string | null;
  indv_id: string;
  creat_dttm: string;
  review_due_dttm: string | null;
  tat_due_dttm: string | null;
  member_name: string | null;
  facility_name: string | null;
  clinician_name: string | null;
  ipa: string | null;
  super_community: string | null;
  lob: string | null;
  health_plan: string | null;
};

export type TatPage = {
  records: TatRecord[];
  totalCount: number;
  cache?: TatCacheMetadata;
};

export type TatPriorityCounts = {
  all: number;
  byLabel: Record<string, number>;
  cache?: TatCacheMetadata;
};

export type TatFilterOptions = {
  priority: string[];
  priorityRefIds: Record<string, number>;
  requestType: string[];
  lineOfBusiness: string[];
  healthPlan: string[];
  ipa: string[];
  superCommunity: string[];
  orgs: string[];
  cache?: TatCacheMetadata;
};

export type TatDataSource = "graphql" | "cache";

export type TatFilters = {
  fromDate: string;
  toDate: string;
  selectedChip?: "Non - Part B" | "Injectable/Part - B";
  priority?: string | string[];
  requestType?: string;
  lineOfBusiness?: string;
  healthPlan?: string;
  superCommunity?: string;
  ipa?: string;
  orgs?: string[];
};

export type TatSortColumn =
  | "received"
  | "hscId"
  | "tatDeadline"
  | "authorizationType"
  | "status"
  | "indvId"
  | "reviewDue"
  | "org"
  | "lineOfBusiness"
  | "healthPlan"
  | "superCommunity"
  | "ipa"
  | "priority"
  | "authDecision"
  | "decisioned";

// Maps priority label to TAT rev_prr_ref_id values.
const PRIORITY_LABEL_MAP = TAT_PRIORITY_REF_IDS_BY_LABEL;

// Maps request type label to auth_typ_ref_id
const REQUEST_TYPE_REF_ID_MAP: Record<string, number> = {
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

const EXCLUDED_STATUS_IDS = [1002259, 1002526, 1005617, 1005694];

const REQUEST_TYPE_OPTION_ORDER: string[] = [
  "Referral",
  "Order Utility Referral",
  "Prior Auth",
  "Radiology Cardiology",
  "Home Health",
  "Durable Medical Equipment",
  "Outpatient Surgery",
  "Part B",
  "Outpatient Dx/Tx",
  "Outpatient Therapy",
  "Injectable",
  "Skilled Nursing Facility",
  "Palliative",
  "Ambulance",
  "Behavioral Health",
  "Precertification",
  "Genetics",
  "Dialysis",
  "Acute Inpatient Rehab",
  "Hospice",
  "Long Term Care(Custodial)",
  "LTAC",
  "Urgent Care",
  "Acute Rehab/Subacute",
  "Outpatient Rehab",
  "Inpatient",
  "Orthotics/Prosthetics",
  "LTAC AIR SNF",
  "Emergency Room",
  "Site of Service",
  "Appeal",
];
const LINE_OF_BUSINESS_OPTION_ORDER = ["Commercial", "Medicaid", "Medicare"] as const;
const IPA_OPTION_ORDER = [
  "Bay Area IPA",
  "Desert Plains IPA",
  "Lone Star IPA",
  "Mesa IPA",
  "North Texas IPA",
  "Prairie IPA",
  "Rocky Mountain IPA",
  "Sonoran IPA",
] as const;

const ORDER_BY_BY_SORT_COLUMN: Record<TatSortColumn, string> = {
  received: "recv_dttm",
  hscId: "hsc_id",
  tatDeadline: "tat_due_dttm",
  authorizationType: "auth_typ_ref_id",
  status: "hsc_sts_typ_id",
  indvId: "indv_id",
  reviewDue: "review_due_dttm",
  org: "org_id",
  lineOfBusiness: "lob",
  healthPlan: "health_plan",
  superCommunity: "super_community",
  ipa: "ipa",
  priority: "rev_prr_ref_id",
  authDecision: "hsc_sts_typ_id",
  // Decisioned is sourced from hsc_decn in the UI. Until a joinable relation is available,
  // use creat_dttm as a stable DB-level fallback ordering key.
  decisioned: "creat_dttm",
};

// Explicit list for Injectable/Part B request category chips.
const PART_B_INJECTABLE_AUTH_TYPE_IDS = [
  1002486,
  1002499,
  1004085,
  1002476,
  1002478,
  1002795,
  1000873,
  19289,
  1004210,
  26501,
  26551,
  21882,
  19461,
  1008032,
];

// 1002486 → Part B
// 1002499 → Part B - Rx (Dose, Route, Freq, Cycles)
// 1004085 → Injectable PartB
// 1002476 → Part B Oncology
// 1002478 → Part B Oncology
// 1002795 → Medicare Part B
// 1000873 → Injectable
// 19289 → MEDICARE PART B
// 1004210 → Expedited Part B Pend Form
// 26501 → Long Acting Injectable Administration
// 26551 → Naltrexone Injectable MAT
// 21882 → Long Acting Injectables
// 19461 → Injectable Medication Carve Out
// 1008032 → CuBRS Business Rules Part B Table Name for CDO



function buildDateRange(fromDate: string, toDate: string): { startDate: Date; endDate: Date } {
  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);
  // Include the full end day
  endDate.setHours(23, 59, 59, 999);
  return { startDate, endDate };
}

function extractMemberFullName(mbrCovDtl: unknown): string | null {
  if (!mbrCovDtl) return null;

  const readName = (value: unknown): string | null => {
    if (!value || typeof value !== "object") return null;
    const fullName = (value as { fullName?: unknown }).fullName;
    if (typeof fullName !== "string") return null;
    const trimmed = fullName.trim();
    return trimmed.length > 0 ? trimmed : null;
  };

  if (typeof mbrCovDtl === "string") {
    try {
      return readName(JSON.parse(mbrCovDtl));
    } catch {
      return null;
    }
  }

  return readName(mbrCovDtl);
}

function extractMbrCovDtlField(mbrCovDtl: unknown, path: string[]): string | null {
  if (!mbrCovDtl) return null;

  const extract = (obj: unknown): string | null => {
    if (!obj || typeof obj !== "object") return null;
    const data = obj as Record<string, unknown>;
    const eligibilities = data.memberEligibilities;
    if (!Array.isArray(eligibilities) || eligibilities.length === 0) return null;
    let value: unknown = eligibilities[0];
    for (const key of path) {
      if (!value || typeof value !== "object") return null;
      value = (value as Record<string, unknown>)[key];
    }
    return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
  };

  if (typeof mbrCovDtl === "string") {
    try {
      return extract(JSON.parse(mbrCovDtl));
    } catch {
      return null;
    }
  }

  return extract(mbrCovDtl);
}

export async function fetchTatRecords(
  filters: TatFilters,
  page: number,
  pageSize: number,
  sortBy: TatSortColumn = "received",
  sortDir: "asc" | "desc" = "desc",
  includeTotalCount: boolean = true,
): Promise<TatPage> {
  const { startDate, endDate } = buildDateRange(filters.fromDate, filters.toDate);
  const offset = (page - 1) * pageSize;
  const refLookup = await getHscRefLookup();

  const andConditions: string[] = [
    `{ recv_dttm: { _gte: $startDate, _lte: $endDate } }`,
    `{ hsc_sts_typ_id: { _nin: $excludedStatusIds } }`,
    `{ indv_id: { _gt: 0 } }`,
  ];

  const queryVarDecls: string[] = [
    "$limit: Int!",
    "$offset: Int!",
    "$startDate: timestamptz!",
    "$endDate: timestamptz!",
    "$excludedStatusIds: [Int!]!",
  ];

  const variables: Record<string, unknown> = {
    limit: pageSize,
    offset,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    excludedStatusIds: EXCLUDED_STATUS_IDS,
  };

  // org filter (multi-select)
  if (filters.orgs && filters.orgs.length > 0) {
    const orgIds = Object.entries(PREHASHED_ORG_BY_ID)
      .filter(([, name]) => filters.orgs!.includes(name))
      .map(([id]) => id);
    if (orgIds.length > 0) {
      andConditions.push("{ org_id: { _in: $orgIds } }");
      queryVarDecls.push("$orgIds: [String!]!");
      variables.orgIds = orgIds;
    }
  }

  // priority → rev_prr_ref_id
  {
    const labels = Array.isArray(filters.priority) ? filters.priority : (filters.priority ? [filters.priority] : []);
    const activeLabels = labels.filter(l => l && l !== "All Priorities");
    if (activeLabels.length > 0) {
      const priorityIds = activeLabels.flatMap(label => PRIORITY_LABEL_MAP[label] ?? []);
      if (priorityIds.length === 0) return { records: [], totalCount: 0 };
      andConditions.push("{ rev_prr_ref_id: { _in: $priorityIds } }");
      queryVarDecls.push("$priorityIds: [Int!]!");
      variables.priorityIds = priorityIds;
    }
  }

  // requestType → auth_typ_ref_id
  if (filters.requestType && filters.requestType !== "All Request Types") {
    const requestTypeId = REQUEST_TYPE_REF_ID_MAP[filters.requestType];
    if (!requestTypeId) return { records: [], totalCount: 0 };
    andConditions.push("{ auth_typ_ref_id: { _in: $requestTypeIds } }");
    queryVarDecls.push("$requestTypeIds: [Int!]!");
    variables.requestTypeIds = [requestTypeId];
  }

  // request-category chips → auth_typ_ref_id inclusion/exclusion
  if (filters.selectedChip === "Injectable/Part - B") {
    andConditions.push("{ auth_typ_ref_id: { _in: $chipAuthTypeIds } }");
    queryVarDecls.push("$chipAuthTypeIds: [Int!]!");
    variables.chipAuthTypeIds = PART_B_INJECTABLE_AUTH_TYPE_IDS;
  } else if (filters.selectedChip === "Non - Part B") {
    andConditions.push("{ auth_typ_ref_id: { _nin: $chipAuthTypeIds } }");
    queryVarDecls.push("$chipAuthTypeIds: [Int!]!");
    variables.chipAuthTypeIds = PART_B_INJECTABLE_AUTH_TYPE_IDS;
  }

  // lineOfBusiness — from mbr_cov_dtl JSONB
  if (filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business") {
    andConditions.push("{ mbr_cov_dtl: { _contains: $lobContains } }");
    queryVarDecls.push("$lobContains: jsonb!");
    variables.lobContains = { memberEligibilities: [{ lineOfBusiness: filters.lineOfBusiness }] };
  }

  // ipa — from mbr_cov_dtl JSONB
  if (filters.ipa && filters.ipa !== "All IPAs") {
    andConditions.push("{ mbr_cov_dtl: { _contains: $ipaContains } }");
    queryVarDecls.push("$ipaContains: jsonb!");
    variables.ipaContains = { memberEligibilities: [{ eligibilityPod: { podName: filters.ipa } }] };
  }

  // superCommunity — from mbr_cov_dtl JSONB
  if (filters.superCommunity && filters.superCommunity !== "All Super Communities") {
    andConditions.push("{ mbr_cov_dtl: { _contains: $superCommunityContains } }");
    queryVarDecls.push("$superCommunityContains: jsonb!");
    variables.superCommunityContains = { memberEligibilities: [{ eligibilityPod: { superCommunity: filters.superCommunity } }] };
  }

  const whereClause = `_and: [\n        ${andConditions.join(",\n        ")}\n      ]`;

  type GraphQLResponse = {
    hsc: Array<{
      hsc_id: string;
      recv_dttm: string;
      auth_typ_ref_id: number | null;
      auth_cat_type_id: number | null;
      org_id: string;
      hsc_sts_typ_id: number | null;
      rev_prr_ref_id: number | null;
      rev_term_typ_ref_id: number | null;
      indv_id: string;
      creat_dttm: string;
      review_due_dttm: string | null;
      tat_due_dttm: string | null;
      mbr_cov_dtl: unknown;
    }>;
    hsc_aggregate?: { aggregate: { count: number } };
  };

  const query = `
    query GetTatRecords(${queryVarDecls.join(", ")}) {
      hsc(
        limit: $limit
        offset: $offset
        where: { ${whereClause} }
        order_by: { ${ORDER_BY_BY_SORT_COLUMN[sortBy]}: ${sortDir} }
      ) {
        hsc_id
        recv_dttm
        auth_typ_ref_id
        auth_cat_type_id
        org_id
        hsc_sts_typ_id
        rev_prr_ref_id
        rev_term_typ_ref_id
        indv_id
        creat_dttm
        review_due_dttm
        tat_due_dttm
        mbr_cov_dtl
      }
      ${includeTotalCount ? `hsc_aggregate(where: { ${whereClause} }) { aggregate { count } }` : ""}
    }
  `;

  const data = await hscGraphqlRequest<GraphQLResponse>(query, variables);
  const hscRows = data.hsc || [];
  const totalCount = includeTotalCount ? data.hsc_aggregate?.aggregate?.count ?? 0 : -1;

  // Fetch hsc_decn data for the returned records in batches to avoid payload size limits
  const hscIds = hscRows.map((row) => row.hsc_id);
  let decnLookup = new Map<string, { curr_tat_nod_mbr_dttm: string | null; wrt_decn_prov_cmnct_dttm: string | null; wrt_decn_mbr_cmnct_dttm: string | null; tat_nod_prov_dttm: string | null; decn_mbr_cmnct_dttm: string | null; decn_rndr_dttm: string | null }>();
  
  if (hscIds.length > 0) {
    // Batch hscIds to avoid GraphQL payload size limits (batch size: 5000)
    const BATCH_SIZE = 5000;
    const batches: typeof hscIds[] = [];
    for (let i = 0; i < hscIds.length; i += BATCH_SIZE) {
      batches.push(hscIds.slice(i, i + BATCH_SIZE));
    }

    // Fetch all batches concurrently
    const decnResults = await Promise.all(
      batches.map((batch) =>
        hscGraphqlRequest<{ hsc_decn: Array<{ hsc_id: string; curr_tat_nod_mbr_dttm: string | null; wrt_decn_prov_cmnct_dttm: string | null; wrt_decn_mbr_cmnct_dttm: string | null; tat_nod_prov_dttm: string | null; decn_mbr_cmnct_dttm: string | null; decn_rndr_dttm: string | null }> }>(
          `
            query GetHscDecn($hscIds: [bigint!]!) {
              hsc_decn(where: { hsc_id: { _in: $hscIds } }) {
                hsc_id
                curr_tat_nod_mbr_dttm
                wrt_decn_prov_cmnct_dttm
                wrt_decn_mbr_cmnct_dttm
                tat_nod_prov_dttm
                decn_mbr_cmnct_dttm
                decn_rndr_dttm
              }
            }
          `,
          { hscIds: batch },
        ),
      ),
    );

    // Merge all results into decnLookup
    for (const decnData of decnResults) {
      for (const row of decnData.hsc_decn || []) {
        decnLookup.set(String(row.hsc_id), {
          curr_tat_nod_mbr_dttm: row.curr_tat_nod_mbr_dttm,
          wrt_decn_prov_cmnct_dttm: row.wrt_decn_prov_cmnct_dttm,
          wrt_decn_mbr_cmnct_dttm: row.wrt_decn_mbr_cmnct_dttm,
          tat_nod_prov_dttm: row.tat_nod_prov_dttm,
          decn_mbr_cmnct_dttm: row.decn_mbr_cmnct_dttm,
          decn_rndr_dttm: row.decn_rndr_dttm,
        });
      }
    }
  }

  const records: TatRecord[] = hscRows.map((row) => {
    const decn = decnLookup.get(String(row.hsc_id));
    return {
      hsc_id: String(row.hsc_id),
      recv_dttm: row.recv_dttm,
      auth_typ_ref_id: row.auth_typ_ref_id,
      auth_typ_label: row.auth_typ_ref_id ? refLookup.get(row.auth_typ_ref_id) ?? null : null,
      auth_cat_type_id: row.auth_cat_type_id,
      org_id: row.org_id,
      hsc_sts_typ_id: row.hsc_sts_typ_id,
      hsc_sts_typ_label: row.hsc_sts_typ_id ? refLookup.get(row.hsc_sts_typ_id) ?? null : null,
      rev_prr_ref_id: row.rev_prr_ref_id,
      rev_prr_ref_label: row.rev_prr_ref_id ? refLookup.get(row.rev_prr_ref_id) ?? null : null,
      rev_term_typ_ref_id: row.rev_term_typ_ref_id,
      rev_term_typ_ref_label: row.rev_term_typ_ref_id ? refLookup.get(row.rev_term_typ_ref_id) ?? null : null,
      curr_tat_nod_mbr_dttm: decn?.curr_tat_nod_mbr_dttm ?? null,
      wrt_decn_prov_cmnct_dttm: decn?.wrt_decn_prov_cmnct_dttm ?? null,
      wrt_decn_mbr_cmnct_dttm: decn?.wrt_decn_mbr_cmnct_dttm ?? null,
      tat_nod_prov_dttm: decn?.tat_nod_prov_dttm ?? null,
      decn_mbr_cmnct_dttm: decn?.decn_mbr_cmnct_dttm ?? null,
      decn_rndr_dttm: decn?.decn_rndr_dttm ?? null,
      indv_id: String(row.indv_id),
      creat_dttm: row.creat_dttm,
      review_due_dttm: row.review_due_dttm ?? null,
      tat_due_dttm: row.tat_due_dttm ?? null,
      member_name: extractMemberFullName(row.mbr_cov_dtl),
      facility_name: null,
      clinician_name: null,
      ipa: extractMbrCovDtlField(row.mbr_cov_dtl, ["eligibilityPod", "podName"]),
      super_community: extractMbrCovDtlField(row.mbr_cov_dtl, ["eligibilityPod", "superCommunity"]),
      lob: extractMbrCovDtlField(row.mbr_cov_dtl, ["lobValue"]),
      health_plan: extractMbrCovDtlField(row.mbr_cov_dtl, ["healthPlanName"]),
    };
  });

  return { records, totalCount };
}

export async function fetchTatPriorityCounts(filters: TatFilters): Promise<TatPriorityCounts> {
  const { startDate, endDate } = buildDateRange(filters.fromDate, filters.toDate);
  const routineIds = PRIORITY_LABEL_MAP.Routine;

  const andConditions: string[] = [
    `{ recv_dttm: { _gte: $startDate, _lte: $endDate } }`,
    `{ hsc_sts_typ_id: { _nin: $excludedStatusIds } }`,
    `{ indv_id: { _gt: 0 } }`,
  ];

  const queryVarDecls: string[] = [
    "$startDate: timestamptz!",
    "$endDate: timestamptz!",
    "$excludedStatusIds: [Int!]!",
    "$urgentIds: [Int!]!",
    "$routineIds: [Int!]!",
    "$expeditedIds: [Int!]!",
  ];

  const variables: Record<string, unknown> = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    excludedStatusIds: EXCLUDED_STATUS_IDS,
    urgentIds: PRIORITY_LABEL_MAP.Urgent,
    routineIds,
    expeditedIds: PRIORITY_LABEL_MAP.Expedited,
  };

  // org filter (multi-select)
  if (filters.orgs && filters.orgs.length > 0) {
    const orgIds = Object.entries(PREHASHED_ORG_BY_ID)
      .filter(([, name]) => filters.orgs!.includes(name))
      .map(([id]) => id);
    if (orgIds.length > 0) {
      andConditions.push("{ org_id: { _in: $orgIds } }");
      queryVarDecls.push("$orgIds: [String!]!");
      variables.orgIds = orgIds;
    }
  }

  // requestType → auth_typ_ref_id
  if (filters.requestType && filters.requestType !== "All Request Types") {
    const requestTypeId = REQUEST_TYPE_REF_ID_MAP[filters.requestType];
    if (!requestTypeId) return { all: 0, byLabel: { Urgent: 0, Routine: 0, Expedited: 0 } };
    andConditions.push("{ auth_typ_ref_id: { _in: $requestTypeIds } }");
    queryVarDecls.push("$requestTypeIds: [Int!]!");
    variables.requestTypeIds = [requestTypeId];
  }

  // request-category chips → auth_typ_ref_id inclusion/exclusion
  if (filters.selectedChip === "Injectable/Part - B") {
    andConditions.push("{ auth_typ_ref_id: { _in: $chipAuthTypeIds } }");
    queryVarDecls.push("$chipAuthTypeIds: [Int!]!");
    variables.chipAuthTypeIds = PART_B_INJECTABLE_AUTH_TYPE_IDS;
  } else if (filters.selectedChip === "Non - Part B") {
    andConditions.push("{ auth_typ_ref_id: { _nin: $chipAuthTypeIds } }");
    queryVarDecls.push("$chipAuthTypeIds: [Int!]!");
    variables.chipAuthTypeIds = PART_B_INJECTABLE_AUTH_TYPE_IDS;
  }

  // lineOfBusiness — from mbr_cov_dtl JSONB
  if (filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business") {
    andConditions.push("{ mbr_cov_dtl: { _contains: $lobContains } }");
    queryVarDecls.push("$lobContains: jsonb!");
    variables.lobContains = { memberEligibilities: [{ lineOfBusiness: filters.lineOfBusiness }] };
  }

  // ipa — from mbr_cov_dtl JSONB
  if (filters.ipa && filters.ipa !== "All IPAs") {
    andConditions.push("{ mbr_cov_dtl: { _contains: $ipaContains } }");
    queryVarDecls.push("$ipaContains: jsonb!");
    variables.ipaContains = { memberEligibilities: [{ eligibilityPod: { podName: filters.ipa } }] };
  }

  const baseWhereClause = `_and: [\n        ${andConditions.join(",\n        ")}\n      ]`;

  type GraphQLAggResponse = {
    all: { aggregate: { count: number } };
    urgent: { aggregate: { count: number } };
    routine: { aggregate: { count: number } };
    expedited: { aggregate: { count: number } };
  };

  const query = `
    query GetTatPriorityCounts(${queryVarDecls.join(", ")}) {
      all: hsc_aggregate(where: { ${baseWhereClause} }) {
        aggregate { count }
      }
      urgent: hsc_aggregate(where: { _and: [{ ${baseWhereClause} }, { rev_prr_ref_id: { _in: $urgentIds } }] }) {
        aggregate { count }
      }
      routine: hsc_aggregate(where: { _and: [{ ${baseWhereClause} }, { rev_prr_ref_id: { _in: $routineIds } }] }) {
        aggregate { count }
      }
      expedited: hsc_aggregate(where: { _and: [{ ${baseWhereClause} }, { rev_prr_ref_id: { _in: $expeditedIds } }] }) {
        aggregate { count }
      }
    }
  `;

  const data = await hscGraphqlRequest<GraphQLAggResponse>(query, variables);

  return {
    all: data.all?.aggregate?.count ?? 0,
    byLabel: {
      Urgent: data.urgent?.aggregate?.count ?? 0,
      Routine: data.routine?.aggregate?.count ?? 0,
      Expedited: data.expedited?.aggregate?.count ?? 0,
    },
  };
}

function buildTatWhereParts(
  filters: TatFilters,
  omit: {
    priority?: boolean;
    requestType?: boolean;
    lineOfBusiness?: boolean;
    healthPlan?: boolean;
    ipa?: boolean;
    orgs?: boolean;
  } = {},
  priorityIdsOverride?: number[],
): { whereClause: string; queryVarDecls: string[]; variables: Record<string, unknown> } {
  const { startDate, endDate } = buildDateRange(filters.fromDate, filters.toDate);

  const andConditions: string[] = [
    `{ recv_dttm: { _gte: $startDate, _lte: $endDate } }`,
    `{ hsc_sts_typ_id: { _nin: $excludedStatusIds } }`,
    `{ indv_id: { _gt: 0 } }`,
  ];

  const queryVarDecls: string[] = [
    "$startDate: timestamptz!",
    "$endDate: timestamptz!",
    "$excludedStatusIds: [Int!]!",
  ];

  const variables: Record<string, unknown> = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    excludedStatusIds: EXCLUDED_STATUS_IDS,
  };

  if (!omit.orgs && filters.orgs && filters.orgs.length > 0) {
    const orgIds = Object.entries(PREHASHED_ORG_BY_ID)
      .filter(([, name]) => filters.orgs!.includes(name))
      .map(([id]) => id);
    if (orgIds.length > 0) {
      andConditions.push("{ org_id: { _in: $orgIds } }");
      queryVarDecls.push("$orgIds: [String!]!");
      variables.orgIds = orgIds;
    }
  }

  if (!omit.priority) {
    const activeLabels = Array.isArray(filters.priority)
      ? filters.priority.filter(l => l && l !== "All Priorities")
      : (filters.priority && filters.priority !== "All Priorities" ? [filters.priority] : []);
    if (activeLabels.length > 0) {
      const priorityIds = priorityIdsOverride ?? activeLabels.flatMap(l => PRIORITY_LABEL_MAP[l] ?? []);
      if (priorityIds.length > 0) {
        andConditions.push("{ rev_prr_ref_id: { _in: $priorityIds } }");
        queryVarDecls.push("$priorityIds: [Int!]!");
        variables.priorityIds = priorityIds;
      }
    }
  }

  if (!omit.requestType && filters.requestType && filters.requestType !== "All Request Types") {
    const requestTypeId = REQUEST_TYPE_REF_ID_MAP[filters.requestType];
    if (requestTypeId) {
      andConditions.push("{ auth_typ_ref_id: { _in: $requestTypeIds } }");
      queryVarDecls.push("$requestTypeIds: [Int!]!");
      variables.requestTypeIds = [requestTypeId];
    }
  }

  if (filters.selectedChip === "Injectable/Part - B") {
    andConditions.push("{ auth_typ_ref_id: { _in: $chipAuthTypeIds } }");
    queryVarDecls.push("$chipAuthTypeIds: [Int!]!");
    variables.chipAuthTypeIds = PART_B_INJECTABLE_AUTH_TYPE_IDS;
  } else if (filters.selectedChip === "Non - Part B") {
    andConditions.push("{ auth_typ_ref_id: { _nin: $chipAuthTypeIds } }");
    queryVarDecls.push("$chipAuthTypeIds: [Int!]!");
    variables.chipAuthTypeIds = PART_B_INJECTABLE_AUTH_TYPE_IDS;
  }

  if (!omit.lineOfBusiness && filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business") {
    andConditions.push("{ mbr_cov_dtl: { _contains: $lobContains } }");
    queryVarDecls.push("$lobContains: jsonb!");
    variables.lobContains = { memberEligibilities: [{ lineOfBusiness: filters.lineOfBusiness }] };
  }

  if (!omit.healthPlan && filters.healthPlan && filters.healthPlan !== "All Health Plans") {
    andConditions.push("{ mbr_cov_dtl: { _contains: $healthPlanContains } }");
    queryVarDecls.push("$healthPlanContains: jsonb!");
    variables.healthPlanContains = { memberEligibilities: [{ healthPlanName: filters.healthPlan }] };
  }

  if (!omit.ipa && filters.ipa && filters.ipa !== "All IPAs") {
    andConditions.push("{ mbr_cov_dtl: { _contains: $ipaContains } }");
    queryVarDecls.push("$ipaContains: jsonb!");
    variables.ipaContains = { memberEligibilities: [{ eligibilityPod: { podName: filters.ipa } }] };
  }

  const whereClause = `_and: [\n        ${andConditions.join(",\n        ")}\n      ]`;
  return { whereClause, queryVarDecls, variables };
}

export async function fetchTatFilterOptions(filters: TatFilters): Promise<TatFilterOptions> {
  const refLookup = await getHscRefLookup();
  const priority = [...TAT_PRIORITY_OPTIONS];
  const priorityRefIds = { ...TAT_PRIORITY_REF_ID_BY_LABEL };

  const selectedPriorityIds = (() => {
    const labels = Array.isArray(filters.priority) ? filters.priority : (filters.priority ? [filters.priority] : []);
    const active = labels.filter(l => l && l !== "All Priorities");
    if (active.length === 0) return undefined;
    const ids = active.flatMap(l => PRIORITY_LABEL_MAP[l] ?? []);
    return ids.length > 0 ? ids : undefined;
  })();

  const orgCtx = buildTatWhereParts(filters, { orgs: true }, selectedPriorityIds);

  const orgData = await hscGraphqlRequest<{ hsc: Array<{ org_id: string }> }>(
      `
        query GetTatOrgOptions(${orgCtx.queryVarDecls.join(", ")}) {
          hsc(distinct_on: [org_id], where: { ${orgCtx.whereClause} }, order_by: [{ org_id: asc }]) {
            org_id
          }
        }
      `,
      orgCtx.variables,
    );

  const orgNames = Array.from(new Set(
    (orgData.hsc || [])
      .map((row) => PREHASHED_ORG_BY_ID[row.org_id] ?? row.org_id)
      .filter((name) => typeof name === "string" && name.trim().length > 0),
  )).sort((left, right) => left.localeCompare(right));

  if (filters.orgs && filters.orgs.length > 0) {
    for (const selectedOrg of filters.orgs) {
      if (!orgNames.includes(selectedOrg)) {
        orgNames.unshift(selectedOrg);
      }
    }
  }

  // Fetch LOB, health_plan, ipa, super_community from GraphQL when ≤7 days
  let lineOfBusinessOptions: string[] = [...LINE_OF_BUSINESS_OPTION_ORDER];
  let healthPlanOptions: string[] = [];
  let ipaOptions: string[] = [...IPA_OPTION_ORDER];
  let superCommunityOptions: string[] = [];

  const isLiveDataRange = isDateRangeSevenDaysOrLess(filters.fromDate, filters.toDate);
  if (isLiveDataRange) {
    const filterDimensions = await fetchFilterDimensionsFromGraphQL(filters, selectedPriorityIds, refLookup);
    lineOfBusinessOptions = filterDimensions.lineOfBusiness;
    healthPlanOptions = filterDimensions.healthPlan;
    ipaOptions = filterDimensions.ipa;
    superCommunityOptions = filterDimensions.superCommunity;
  }

  return {
    priority,
    priorityRefIds,
    requestType: ["All Request Types", ...REQUEST_TYPE_OPTION_ORDER],
    lineOfBusiness: ["All Lines of Business", ...lineOfBusinessOptions],
    healthPlan: ["All Health Plans", ...healthPlanOptions],
    ipa: ["All IPAs", ...ipaOptions],
    superCommunity: ["All Super Communities", ...superCommunityOptions],
    orgs: ["All Orgs", ...orgNames],
  };
}

function isDateRangeSevenDaysOrLess(fromDate: string, toDate: string): boolean {
  try {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffMs = to.getTime() - from.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  } catch {
    return false;
  }
}

async function fetchFilterDimensionsFromGraphQL(
  filters: TatFilters,
  selectedPriorityIds: number[] | undefined,
  refLookup: Map<number, string>,
): Promise<{
  lineOfBusiness: string[];
  healthPlan: string[];
  ipa: string[];
  superCommunity: string[];
}> {
  try {
    // Build where conditions with all filters EXCEPT the dimensions we're fetching.
    // This matches the cache API pattern: when computing LOB options, exclude LOB filter, etc.
    const filtersExcludingDimensions: TatFilters = {
      ...filters,
      lineOfBusiness: undefined,
      healthPlan: undefined,
      ipa: undefined,
      superCommunity: undefined,
    };

    const ctx = buildTatWhereParts(filtersExcludingDimensions, {}, selectedPriorityIds);

    const data = await hscGraphqlRequest<{
      hsc: Array<{ mbr_cov_dtl: string | { [key: string]: unknown } | null }>;
    }>(
      `
        query GetFilterDimensions(${ctx.queryVarDecls.join(", ")}) {
          hsc(limit: 50000, where: { ${ctx.whereClause} }) {
            mbr_cov_dtl
          }
        }
      `,
      ctx.variables,
    );

    const lob = new Set<string>();
    const hp = new Set<string>();
    const ipaSet = new Set<string>();
    const sc = new Set<string>();

    for (const row of data.hsc || []) {
      if (!row.mbr_cov_dtl) continue;
      let cov: unknown = row.mbr_cov_dtl;
      if (typeof cov === "string") {
        try {
          cov = JSON.parse(cov);
        } catch {
          continue;
        }
      }
      if (typeof cov !== "object" || cov === null) continue;

      const covObj = cov as Record<string, unknown>;
      if (typeof covObj.line_of_business === "string" && covObj.line_of_business.trim()) {
        lob.add(covObj.line_of_business.trim());
      }
      if (typeof covObj.health_plan === "string" && covObj.health_plan.trim()) {
        hp.add(covObj.health_plan.trim());
      }
      if (typeof covObj.ipa === "string" && covObj.ipa.trim()) {
        ipaSet.add(covObj.ipa.trim());
      }
      if (typeof covObj.super_community === "string" && covObj.super_community.trim()) {
        sc.add(covObj.super_community.trim());
      }
    }

    return {
      lineOfBusiness: Array.from(lob).sort(),
      healthPlan: Array.from(hp).sort(),
      ipa: Array.from(ipaSet).sort(),
      superCommunity: Array.from(sc).sort(),
    };
  } catch (error) {
    console.warn("Failed to fetch filter dimensions from GraphQL, using defaults:", error);
    return {
      lineOfBusiness: [...LINE_OF_BUSINESS_OPTION_ORDER],
      healthPlan: [],
      ipa: [...IPA_OPTION_ORDER],
      superCommunity: [],
    };
  }
}

function normalizeCacheTatFilterOptions(data: {
  priority: string[];
  priority_ref_ids: Record<string, number>;
  request_type: string[];
  line_of_business: string[];
  health_plan: string[];
  ipa: string[];
  super_community: string[];
  orgs: string[];
  cache: TatCacheMetadata;
}): TatFilterOptions {
  return {
    priority: Array.isArray(data.priority) ? data.priority : ["All Priorities"],
    priorityRefIds: data.priority_ref_ids,
    requestType: Array.isArray(data.request_type) ? data.request_type : ["All Request Types"],
    lineOfBusiness: Array.isArray(data.line_of_business) ? data.line_of_business : ["All Lines of Business"],
    healthPlan: Array.isArray(data.health_plan) ? data.health_plan : ["All Health Plans"],
    ipa: Array.isArray(data.ipa) ? data.ipa : ["All IPAs"],
    superCommunity: Array.isArray(data.super_community) ? data.super_community : ["All Super Communities"],
    orgs: Array.isArray(data.orgs) ? data.orgs : ["All Orgs"],
    cache: data.cache,
  };
}

function buildCacheQueryParams(
  filters: TatFilters,
): Record<string, string | number | boolean | undefined> {
  const priority = Array.isArray(filters.priority)
    ? filters.priority.filter((value) => value !== "All Priorities")
    : filters.priority && filters.priority !== "All Priorities"
      ? [filters.priority]
      : [];

  const orgs = filters.orgs && filters.orgs.length > 0
    ? filters.orgs.filter((value) => value !== "All Orgs")
    : [];

  return {
    from_date: filters.fromDate,
    to_date: filters.toDate,
    selected_chip: filters.selectedChip,
    priority: priority.length > 0 ? priority.join(",") : undefined,
    request_type: filters.requestType && filters.requestType !== "All Request Types" ? filters.requestType : undefined,
    line_of_business:
      filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business"
        ? filters.lineOfBusiness
        : undefined,
    health_plan:
      filters.healthPlan && filters.healthPlan !== "All Health Plans"
        ? filters.healthPlan
        : undefined,
    super_community:
      filters.superCommunity && filters.superCommunity !== "All Super Communities"
        ? filters.superCommunity
        : undefined,
    ipa: filters.ipa && filters.ipa !== "All IPAs" ? filters.ipa : undefined,
    orgs: orgs.length > 0 ? orgs.join(",") : undefined,
  };
}

export async function fetchTatRecordsViaCache(
  filters: TatFilters,
  page: number,
  pageSize: number,
  sortBy: TatSortColumn = "received",
  sortDir: "asc" | "desc" = "desc",
  includeTotalCount: boolean = true,
): Promise<TatPage> {
  const data = await tatCacheGet<{
    records: TatRecord[];
    total_count: number;
    cache: TatCacheMetadata;
  }>("/v1/prior-auth/records", {
    ...buildCacheQueryParams(filters),
    page,
    page_size: pageSize,
    sort_by: sortBy,
    sort_dir: sortDir,
    include_total_count: includeTotalCount,
  });

  return {
    records: data.records,
    totalCount: data.total_count,
    cache: data.cache,
  };
}

export async function fetchTatPriorityCountsViaCache(filters: TatFilters): Promise<TatPriorityCounts> {
  const data = await tatCacheGet<{
    all: number;
    by_label: Record<string, number>;
    cache: TatCacheMetadata;
  }>("/v1/prior-auth/priority-counts", buildCacheQueryParams(filters));

  return {
    all: data.all,
    byLabel: data.by_label,
    cache: data.cache,
  };
}

export async function fetchTatFilterOptionsViaCache(filters: TatFilters): Promise<TatFilterOptions> {
  const data = await tatCacheGet<{
    priority: string[];
    priority_ref_ids: Record<string, number>;
    request_type: string[];
    line_of_business: string[];
    health_plan: string[];
    ipa: string[];
    super_community: string[];
    orgs: string[];
    cache: TatCacheMetadata;
  }>("/v1/prior-auth/filter-options", buildCacheQueryParams(filters));

  return normalizeCacheTatFilterOptions(data);
}

export async function fetchTatCacheMetadata(): Promise<TatCacheMetadata> {
  return tatCacheGet<TatCacheMetadata>("/v1/metadata");
}
