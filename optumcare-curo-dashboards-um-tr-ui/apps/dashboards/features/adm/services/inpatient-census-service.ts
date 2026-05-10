import { graphqlRequest } from "@/lib/api/graphql-client";
import { cmGraphqlRequest } from "@/lib/api/cm-graphql-client";
import { getHscRefLookup } from "@/lib/shared/hsc-ref-service";
import { PREHASHED_ORG_BY_ID } from "@/lib/constants/orgs";

export type HscRecord = {
  hsc_id: string;
  creat_dttm: string;
  creat_user_id: string;
  indv_id: string;
  pha_id_strat_referral_pathway?: string;
  pha_id_strat_hce_level?: string;
  pha_id_strat_behavioral_health_category?: string;
  hsc_facl_actul_admis_dttm?: string;
  hsc_facl_nxt_rvw_dt?: string;
  hsc_facl_dschrg_dt_fr_ip_census?: string;
  hsc_facl_srvc_dtl_ref_id?: number;
  hsc_facl_approved_bed_day_cnt?: number;
  hsc_facl_denied_bed_day_cnt?: number;
  hsc_prov_admitting_prov_name?: string;
  hsc_prov_facility_name?: string;
  hsr_asgn_clinician_name?: string;
  hsc_diag_admitting_diag_desc?: string;
  hsc_decn_readmis_risk_scor_id?: number;
  pha_readmit_risk_readmit_risk?: string | number;
  mbr_cov_dtl?: unknown;
  auth_typ_ref_id?: number;
  auth_strt_dt?: string;
  auth_end_dt?: string;
  org_id: string;
  auth_cat_type_id: number;
  creat_camunda_version_id: string;
  creat_curo_version_id: string;
  review_due_dttm?: string;
  est_strt_dttm?: string;
  hsc_sts_typ_id: number;
  rev_prr_rsn_txt?: string;
  rev_prr_ref_id?: number;
  chanl_typ_ref_id?: number;
  edi_change_ind?: number;
  updt_ver_nbr?: number;
  tat_hsc_int_id?: number;
  prevent_auto_decision?: boolean;
};

export type HscPage = {
  records: HscRecord[];
  totalCount: number;
  refLookup: Map<number, string>;
};

type Icd10Response = {
  icd10: Array<{
    diag_cd: string;
    full_desc?: string;
  }>;
};

export type DateRangeKey = "ytd" | "last3Years" | "lastYear" | "last3Months" | "lastMonth" | "lastWeek" | "today";
export type StatusFilter =
  | "Active Admissions"
  | "Discharged Pending Closure"
  | "Discharged Closed"
  | "Anticipated Admission"
  | "Other";

const STATUS_ID_MAP: Record<StatusFilter, number[]> = {
  "Active Admissions": [1004238],
  "Discharged Pending Closure": [1004239],
  "Discharged Closed": [1006597],
  "Anticipated Admission": [1002259, 1005617],
  "Other": [1000894, 1002526, 1004361, 1005694],
};

type Icd10DescriptionCacheEntry = {
  description: string;
  expiresAt: number;
};

const ICD10_DESCRIPTION_CACHE_TTL_MS = 60 * 60 * 1000;
const icd10DescriptionCache = new Map<string, Icd10DescriptionCacheEntry>();

// Maps UI SortKey values to their direct column names on the `hsc` table.
// Fields that live on related tables (hsc_facl, etc.) or are computed/JSON-derived
// are intentionally omitted — those remain client-side sorted.
const HSC_DIRECT_SORT_FIELDS: Record<string, string> = {
  authId: "hsc_id",
  received: "creat_dttm",
};

function buildOrderByClause(sortKey: string, sortDir: "asc" | "desc"): string {
  const field = HSC_DIRECT_SORT_FIELDS[sortKey];
  if (field) {
    return `{ ${field}: ${sortDir} }`;
  }
  // For computed/JSON/related-table columns, fall back to default; client-side sort handles the rest.
  return `{ creat_dttm: desc }`;
}

function reverseMapRef(refLookup: Map<number, string>, labels: string[]): number[] {
  const ids: number[] = [];
  for (const [id, label] of refLookup) {
    if (labels.includes(label)) ids.push(id);
  }
  return ids;
}

function intersectSets<T>(sets: Set<T>[]): Set<T> {
  if (sets.length === 0) return new Set();
  const [first, ...rest] = sets;
  const result = new Set(first);
  for (const s of rest) {
    for (const item of result) {
      if (!s.has(item)) result.delete(item);
    }
  }
  return result;
}

export async function fetchHscRecords(
  dateRange: DateRangeKey,
  page: number,
  pageSize: number,
  statusFilter: StatusFilter,
  sortKey: string = "received",
  sortDir: "asc" | "desc" = "desc",
  columnFilters: Record<string, string[]> = {},
): Promise<HscPage> {
  const { startDate, endDate } = getDateRange(dateRange);
  const offset = (page - 1) * pageSize;
  const refLookup = await getHscRefLookup();
  const statusIds = getStatusIdsForFilter(refLookup, statusFilter);
  const orderBy = buildOrderByClause(sortKey, sortDir);

  // ─── Type definitions ──────────────────────────────────────────────────────
  type GraphQLResponse = {
    hsc: HscRecord[];
    hsc_aggregate: { aggregate: { count: number } };
  };

  type HscFaclResponse = {
    hsc_facl: Array<{
      hsc_id: number | string;
      actul_admis_dttm?: string;
      nxt_rvw_dt?: string;
      dschrg_dt_fr_ip_census?: string;
      srvc_dtl_ref_id?: number;
      approved_bed_day_cnt?: number;
      denied_bed_day_cnt?: number;
    }>;
  };

  type HscDiagResponse = {
    hsc_diag: Array<{
      hsc_id: number | string;
      diag_cd?: string;
    }>;
  };

  type HscDecnResponse = {
    hsc_decn: Array<{
      hsc_id: number | string;
      readmis_risk_scor_id?: number;
    }>;
  };

  type PhaReadmitRiskResponse = {
    pha_readmit_risk: Array<{
      auth_id: string;
      readmit_risk?: string | number;
    }>;
  };

  type HsrAsgnResponse = {
    hsr_asgn: Array<{
      hsc_id: number | string;
      asgn_to_user_nm?: string;
    }>;
  };

  type PhaIdStratResponse = {
    pha_id_strat: Array<{
      indv_id: number | string;
      referral_pathway?: string;
      hce_level?: string;
      behavioral_health_category?: string;
    }>;
  };

  // ─── Dynamic WHERE building ────────────────────────────────────────────────
  // Always wrap conditions in _and[] so multiple top-level clauses compose safely.
  const andConditions: string[] = [
    `{ creat_dttm: { _gte: $startDate, _lte: $endDate } }`,
    `{ hsc_sts_typ_id: { _in: $statusIds } }`,
  ];

  const queryVarDecls: string[] = [
    "$limit: Int!",
    "$offset: Int!",
    "$startDate: timestamptz!",
    "$endDate: timestamptz!",
    "$statusIds: [Int!]!",
  ];

  const variables: Record<string, unknown> = {
    limit: pageSize,
    offset,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    statusIds,
  };

  // org — direct column on hsc
  const orgFilter = columnFilters.org ?? [];
  if (orgFilter.length > 0) {
    const orgIds = Object.entries(PREHASHED_ORG_BY_ID)
      .filter(([, name]) => orgFilter.includes(name))
      .map(([id]) => id);
    if (orgIds.length === 0) return { records: [], totalCount: 0, refLookup };
    andConditions.push("{ org_id: { _in: $orgIds } }");
    queryVarDecls.push("$orgIds: [String!]!");
    variables.orgIds = orgIds;
  }

  // admitType — auth_typ_ref_id on hsc (reverse-mapped from ref labels)
  const admitTypeFilter = columnFilters.admitType ?? [];
  if (admitTypeFilter.length > 0) {
    const admitTypeIds = reverseMapRef(refLookup, admitTypeFilter);
    if (admitTypeIds.length === 0) return { records: [], totalCount: 0, refLookup };
    andConditions.push("{ auth_typ_ref_id: { _in: $admitTypeIds } }");
    queryVarDecls.push("$admitTypeIds: [Int!]!");
    variables.admitTypeIds = admitTypeIds;
  }

  // healthPlan / memberState / ipa — inline JSONB _contains with _or for multiselect
  const healthPlanFilter = columnFilters.healthPlan ?? [];
  if (healthPlanFilter.length > 0) {
    const orParts = healthPlanFilter.map(
      (v) => `{ mbr_cov_dtl: { _contains: ${JSON.stringify({ memberEligibilities: [{ healthPlanName: v }] })} } }`,
    );
    andConditions.push(`{ _or: [${orParts.join(", ")}] }`);
  }

  const memberStateFilter = columnFilters.memberState ?? [];
  if (memberStateFilter.length > 0) {
    const orParts = memberStateFilter.map(
      (v) => `{ mbr_cov_dtl: { _contains: ${JSON.stringify({ memberAddresses: [{ stateValue: v }] })} } }`,
    );
    andConditions.push(`{ _or: [${orParts.join(", ")}] }`);
  }

  const ipaFilter = columnFilters.ipa ?? [];
  if (ipaFilter.length > 0) {
    const orParts = ipaFilter.map(
      (v) => `{ mbr_cov_dtl: { _contains: ${JSON.stringify({ memberEligibilities: [{ eligibilityPod: { podName: v } }] })} } }`,
    );
    andConditions.push(`{ _or: [${orParts.join(", ")}] }`);
  }

  // ─── Parallel pre-queries for related-table filters ────────────────────────
  // Each returns Set<number> of matching hsc_ids, or null if the filter is inactive.
  // An empty Set means the filter matched nothing → we short-circuit to 0 results.

  const clinicianFilter = columnFilters.clinician ?? [];
  const clinicianPreQuery: Promise<Set<number> | null> =
    clinicianFilter.length > 0
      ? graphqlRequest<{ hsr_asgn: Array<{ hsc_id: number | string }> }>(
          `query PreFilterClinician($clinicians: [String!]!) {
            hsr_asgn(where: {
              asgn_to_user_nm: { _in: $clinicians }
              asgn_typ_ref_id: { _eq: 1002281 }
            }) { hsc_id }
          }`,
          { clinicians: clinicianFilter },
        ).then((d) => new Set((d.hsr_asgn || []).map((r) => Number(r.hsc_id))))
      : Promise.resolve(null);

  const facilityFilter = columnFilters.facility ?? [];
  const facilityPreQuery: Promise<Set<number> | null> =
    facilityFilter.length > 0
      ? graphqlRequest<{ hsc_prov: Array<{ hsc_id: number | string }> }>(
          `query PreFilterFacility {
            hsc_prov(where: {
              prov_role_ref_id: { _eq: 1000908 }
              _or: [${facilityFilter.map((v) => `{ prov_loc_affil_dtl: { _contains: ${JSON.stringify({ name: v })} } }`).join(", ")}]
            }) { hsc_id }
          }`,
          {},
        ).then((d) => new Set((d.hsc_prov || []).map((r) => Number(r.hsc_id))))
      : Promise.resolve(null);

  const hceRiskFilter = columnFilters.hceReadmissionRisk ?? [];
  const hceRiskPreQuery: Promise<Set<number> | null> = (() => {
    if (hceRiskFilter.length === 0) return Promise.resolve(null);
    const riskIds = hceRiskFilter.map((v) => parseInt(v, 10)).filter((v) => !Number.isNaN(v));
    if (riskIds.length === 0) return Promise.resolve(new Set<number>());
    return graphqlRequest<{ hsc_decn: Array<{ hsc_id: number | string }> }>(
      `query PreFilterHceRisk($riskIds: [Int!]!) {
        hsc_decn(where: { readmis_risk_scor_id: { _in: $riskIds } }) { hsc_id }
      }`,
      { riskIds },
    ).then((d) => new Set((d.hsc_decn || []).map((r) => Number(r.hsc_id))));
  })();

  const serviceDetailFilter = columnFilters.serviceDetail ?? [];
  const serviceDetailPreQuery: Promise<Set<number> | null> = (() => {
    if (serviceDetailFilter.length === 0) return Promise.resolve(null);
    const sdIds = reverseMapRef(refLookup, serviceDetailFilter);
    if (sdIds.length === 0) return Promise.resolve(new Set<number>());
    return graphqlRequest<{ hsc_facl: Array<{ hsc_id: number | string }> }>(
      `query PreFilterServiceDetail($sdIds: [Int!]!) {
        hsc_facl(where: { srvc_dtl_ref_id: { _in: $sdIds } }) { hsc_id }
      }`,
      { sdIds },
    ).then((d) => new Set((d.hsc_facl || []).map((r) => Number(r.hsc_id))));
  })();

  // hceLevel + bh both come from CM pha_id_strat — combined into one CM pre-query
  const hceLevelFilter = columnFilters.hceLevel ?? [];
  const bhFilter = columnFilters.bh ?? [];
  const cmPreQuery: Promise<Set<number> | null> = (() => {
    if (hceLevelFilter.length === 0 && bhFilter.length === 0) return Promise.resolve(null);
    const cmWhereConditions: string[] = [];
    const cmVarDecls: string[] = [];
    const cmVars: Record<string, unknown> = {};
    if (hceLevelFilter.length > 0) {
      cmWhereConditions.push("hce_level: { _in: $hceLevels }");
      cmVarDecls.push("$hceLevels: [String!]!");
      cmVars.hceLevels = hceLevelFilter;
    }
    if (bhFilter.length > 0) {
      cmWhereConditions.push("behavioral_health_category: { _in: $bhCategories }");
      cmVarDecls.push("$bhCategories: [String!]!");
      cmVars.bhCategories = bhFilter;
    }
    return cmGraphqlRequest<{ pha_id_strat: Array<{ indv_id: number | string }> }>(
      `query PreFilterCM(${cmVarDecls.join(", ")}) {
        pha_id_strat(where: { ${cmWhereConditions.join(" ")} }) { indv_id }
      }`,
      cmVars,
    )
      .then((d) => new Set((d.pha_id_strat || []).map((r) => Number(r.indv_id))))
      .catch((err) => {
        console.warn(
          "CM pre-filter query failed, CM filters will be skipped:",
          err instanceof Error ? err.message : err,
        );
        return null;
      });
  })();

  // Run all pre-queries in parallel
  const [clinicianSet, facilitySet, hceRiskSet, serviceDetailSet, cmIndvSet] = await Promise.all([
    clinicianPreQuery,
    facilityPreQuery,
    hceRiskPreQuery,
    serviceDetailPreQuery,
    cmPreQuery,
  ]);

  // Intersect all hsc_id constraint sets; null means filter was not active
  const hscIdConstraints = [clinicianSet, facilitySet, hceRiskSet, serviceDetailSet].filter(
    (s): s is Set<number> => s !== null,
  );
  if (hscIdConstraints.length > 0) {
    const intersection = intersectSets(hscIdConstraints);
    if (intersection.size === 0) return { records: [], totalCount: 0, refLookup };
    andConditions.push("{ hsc_id: { _in: $filteredHscIds } }");
    queryVarDecls.push("$filteredHscIds: [bigint!]!");
    variables.filteredHscIds = Array.from(intersection);
  }

  // CM indv_id constraint
  if (cmIndvSet !== null) {
    if (cmIndvSet.size === 0) return { records: [], totalCount: 0, refLookup };
    andConditions.push("{ indv_id: { _in: $filteredIndvIds } }");
    queryVarDecls.push("$filteredIndvIds: [bigint!]!");
    variables.filteredIndvIds = Array.from(cmIndvSet);
  }

  const whereClause = `_and: [\n        ${andConditions.join(",\n        ")}\n      ]`;

  const query = `
    query GetHscRecords(${queryVarDecls.join(", ")}) {
      hsc(
        limit: $limit
        offset: $offset
        where: { ${whereClause} }
        order_by: ${orderBy}
      ) {
        hsc_id
        creat_dttm
        creat_user_id
        indv_id
        mbr_cov_dtl
        auth_typ_ref_id
        auth_strt_dt
        auth_end_dt
        org_id
        auth_cat_type_id
        creat_camunda_version_id
        creat_curo_version_id
        review_due_dttm
        est_strt_dttm
        hsc_sts_typ_id
        rev_prr_rsn_txt
        rev_prr_ref_id
        chanl_typ_ref_id
        edi_change_ind
        updt_ver_nbr
        tat_hsc_int_id
        prevent_auto_decision
      }
      hsc_aggregate(
        where: { ${whereClause} }
      ) {
        aggregate {
          count
        }
      }
    }
  `;

  const data = await graphqlRequest<GraphQLResponse>(query, variables);
  const hscIds = (data.hsc || []).map((record) => Number(record.hsc_id)).filter((value) => !Number.isNaN(value));
  const indvIds = Array.from(
    new Set(
      (data.hsc || [])
        .map((record) => Number(record.indv_id))
        .filter((value) => !Number.isNaN(value)),
    ),
  );

  let faclLookup = new Map<string, { actul_admis_dttm?: string; nxt_rvw_dt?: string; dschrg_dt_fr_ip_census?: string; srvc_dtl_ref_id?: number; approved_bed_day_cnt?: number; denied_bed_day_cnt?: number }>();
  let provLookup = new Map<string, { admitting?: string; facility?: string }>();
  let clinicianLookup = new Map<string, string>();
  let diagLookup = new Map<string, string>();
  let decnLookup = new Map<string, { readmis_risk_scor_id?: number }>();
  let readmitRiskLookup = new Map<string, string | number>();
  let phaIdStratLookup = new Map<string, {
    referral_pathway?: string;
    hce_level?: string;
    behavioral_health_category?: string;
  }>();
  
  if (hscIds.length > 0) {
    const faclData = await graphqlRequest<HscFaclResponse>(
      `
        query GetHscFaclForLos($hscIds: [bigint!]!) {
          hsc_facl(where: { hsc_id: { _in: $hscIds } }) {
            hsc_id
            actul_admis_dttm
            nxt_rvw_dt
            dschrg_dt_fr_ip_census
            srvc_dtl_ref_id
            approved_bed_day_cnt
            denied_bed_day_cnt
          }
        }
      `,
      { hscIds },
    );

    faclLookup = new Map(
      (faclData.hsc_facl || []).map((row) => [
        String(row.hsc_id),
        {
          actul_admis_dttm: row.actul_admis_dttm,
          nxt_rvw_dt: row.nxt_rvw_dt,
          dschrg_dt_fr_ip_census: row.dschrg_dt_fr_ip_census,
          srvc_dtl_ref_id: row.srvc_dtl_ref_id,
          approved_bed_day_cnt: row.approved_bed_day_cnt,
          denied_bed_day_cnt: row.denied_bed_day_cnt,
        },
      ]),
    );

    // Fetch provider data from hsc_prov
    type HscProvResponse = {
      hsc_prov: Array<{
        hsc_id: number | string;
        prov_role_ref_id: number;
        prov_loc_affil_dtl?: unknown;
      }>;
    };

    const provData = await graphqlRequest<HscProvResponse>(
      `
        query GetHscProviderData($hscIds: [bigint!]!) {
          hsc_prov(where: { hsc_id: { _in: $hscIds } }) {
            hsc_id
            prov_role_ref_id
            prov_loc_affil_dtl
          }
        }
      `,
      { hscIds },
    );

    // Process provider data by role
    const allProvs = provData.hsc_prov || [];
    for (const prov of allProvs) {
      const hscId = String(prov.hsc_id);
      const provName = (prov.prov_loc_affil_dtl as any)?.name || "";
      
      if (!provLookup.has(hscId)) {
        provLookup.set(hscId, {});
      }
      
      const provMap = provLookup.get(hscId)!;
      
      switch (prov.prov_role_ref_id) {
        case 1002775: // Admitting Provider
          provMap.admitting = provName;
          break;
        case 1000908: // Facility
          provMap.facility = provName;
          break;
      }
    }

    // Fetch admitting diagnosis from hsc_diag (primary + admitting type) then resolve to icd10.full_desc
    const diagData = await graphqlRequest<HscDiagResponse>(
      `
        query GetAdmittingDiagnosisCodes($hscIds: [bigint!]!) {
          hsc_diag(
            where: {
              hsc_id: { _in: $hscIds }
              pri_ind: { _eq: 1 }
              diag_typ_ref_id: { _eq: 1004535 }
            }
          ) {
            hsc_id
            diag_cd
          }
        }
      `,
      { hscIds },
    );

    const hscToDiagCode = new Map<string, string>();
    for (const row of diagData.hsc_diag || []) {
      const hscId = String(row.hsc_id);
      const diagCode = row.diag_cd ? String(row.diag_cd) : "";
      if (!diagCode) continue;

      // Keep first primary admitting diagnosis per auth id.
      if (!hscToDiagCode.has(hscId)) {
        hscToDiagCode.set(hscId, diagCode);
      }
    }

    const diagCodes = Array.from(new Set(Array.from(hscToDiagCode.values())));
    if (diagCodes.length > 0) {
      const codeToDesc = await getIcd10DescriptionsWithCache(diagCodes);

      for (const [hscId, diagCode] of hscToDiagCode.entries()) {
        const fullDesc = codeToDesc.get(diagCode);
        if (fullDesc) {
          diagLookup.set(hscId, fullDesc);
        }
      }
    }

    const decnData = await graphqlRequest<HscDecnResponse>(
      `
        query GetHscDecnRiskScores($hscIds: [bigint!]!) {
          hsc_decn(where: { hsc_id: { _in: $hscIds } }) {
            hsc_id
            readmis_risk_scor_id
          }
        }
      `,
      { hscIds },
    );

    decnLookup = new Map(
      (decnData.hsc_decn || []).map((row) => [
        String(row.hsc_id),
        {
          readmis_risk_scor_id: row.readmis_risk_scor_id,
        },
      ]),
    );

    const readmitRiskData = await graphqlRequest<PhaReadmitRiskResponse>(
      `
        query GetReadmitRiskScores($authIds: [String!]!) {
          pha_readmit_risk(where: { auth_id: { _in: $authIds } }) {
            auth_id
            readmit_risk
          }
        }
      `,
      { authIds: hscIds.map((id) => String(id)) },
    );

    readmitRiskLookup = new Map(
      (readmitRiskData.pha_readmit_risk || []).map((row) => [String(row.auth_id), row.readmit_risk ?? ""]),
    );

    const clinicianData = await graphqlRequest<HsrAsgnResponse>(
      `
        query GetClinicians($hscIds: [bigint!]!) {
          hsr_asgn(
            where: {
              hsc_id: { _in: $hscIds }
              asgn_typ_ref_id: { _eq: 1002281 }
            }
          ) {
            hsc_id
            asgn_to_user_nm
          }
        }
      `,
      { hscIds },
    );

    clinicianLookup = new Map(
      (clinicianData.hsr_asgn || [])
        .filter((row) => row.asgn_to_user_nm)
        .map((row) => [String(row.hsc_id), String(row.asgn_to_user_nm)]),
    );
  }

  if (indvIds.length > 0) {
    try {
      const phaIdStratData = await cmGraphqlRequest<PhaIdStratResponse>(
        `
          query GetPhaIdStrat($indvIds: [Int!]!) {
            pha_id_strat(where: { indv_id: { _in: $indvIds } }) {
              indv_id
              referral_pathway
              hce_level
              behavioral_health_category
            }
          }
        `,
        { indvIds },
      );

      for (const row of phaIdStratData.pha_id_strat || []) {
        const indvId = String(row.indv_id);
        if (phaIdStratLookup.has(indvId)) {
          continue;
        }

        phaIdStratLookup.set(indvId, {
          referral_pathway: row.referral_pathway,
          hce_level: row.hce_level,
          behavioral_health_category: row.behavioral_health_category,
        });
      }
    } catch (error) {
      console.warn("CM database query failed (pha_id_strat), continuing without CM data:", error instanceof Error ? error.message : error);
    }
  }

  const records = (data.hsc || []).map((record) => ({
    ...record,
    pha_id_strat_referral_pathway: phaIdStratLookup.get(String(record.indv_id))?.referral_pathway,
    pha_id_strat_hce_level: phaIdStratLookup.get(String(record.indv_id))?.hce_level,
    pha_id_strat_behavioral_health_category: phaIdStratLookup.get(String(record.indv_id))?.behavioral_health_category,
    hsc_facl_actul_admis_dttm: faclLookup.get(String(record.hsc_id))?.actul_admis_dttm,
    hsc_facl_nxt_rvw_dt: faclLookup.get(String(record.hsc_id))?.nxt_rvw_dt,
    hsc_facl_dschrg_dt_fr_ip_census: faclLookup.get(String(record.hsc_id))?.dschrg_dt_fr_ip_census,
    hsc_facl_srvc_dtl_ref_id: faclLookup.get(String(record.hsc_id))?.srvc_dtl_ref_id,
    hsc_facl_approved_bed_day_cnt: faclLookup.get(String(record.hsc_id))?.approved_bed_day_cnt,
    hsc_facl_denied_bed_day_cnt: faclLookup.get(String(record.hsc_id))?.denied_bed_day_cnt,
    hsc_prov_admitting_prov_name: provLookup.get(String(record.hsc_id))?.admitting,
    hsc_prov_facility_name: provLookup.get(String(record.hsc_id))?.facility,
    hsr_asgn_clinician_name: clinicianLookup.get(String(record.hsc_id)),
    hsc_diag_admitting_diag_desc: diagLookup.get(String(record.hsc_id)),
    hsc_decn_readmis_risk_scor_id: decnLookup.get(String(record.hsc_id))?.readmis_risk_scor_id,
    pha_readmit_risk_readmit_risk: readmitRiskLookup.get(String(record.hsc_id)),
  }));

  return {
    records,
    totalCount: data.hsc_aggregate?.aggregate?.count ?? 0,
    refLookup,
  };
}

function getStatusIdsForFilter(
  _refLookup: Map<number, string>,
  statusFilter: StatusFilter,
): number[] {
  return STATUS_ID_MAP[statusFilter] ?? [];
}

async function getIcd10DescriptionsWithCache(diagCodes: string[]): Promise<Map<string, string>> {
  const now = Date.now();
  const uniqueCodes = Array.from(new Set(diagCodes));
  const result = new Map<string, string>();
  const missingCodes: string[] = [];

  for (const code of uniqueCodes) {
    const cachedEntry = icd10DescriptionCache.get(code);
    if (cachedEntry && cachedEntry.expiresAt > now) {
      result.set(code, cachedEntry.description);
      continue;
    }

    if (cachedEntry) {
      icd10DescriptionCache.delete(code);
    }
    missingCodes.push(code);
  }

  if (missingCodes.length === 0) {
    return result;
  }

  const icd10Data = await graphqlRequest<Icd10Response>(
    `
      query GetIcd10Descriptions($diagCodes: [String!]!) {
        icd10(where: { diag_cd: { _in: $diagCodes } }) {
          diag_cd
          full_desc
        }
      }
    `,
    { diagCodes: missingCodes },
  );

  for (const row of icd10Data.icd10 || []) {
    const code = String(row.diag_cd);
    const description = row.full_desc ? String(row.full_desc) : "";
    if (!description) {
      continue;
    }

    result.set(code, description);
    icd10DescriptionCache.set(code, {
      description,
      expiresAt: now + ICD10_DESCRIPTION_CACHE_TTL_MS,
    });
  }

  return result;
}

function getDateRange(dateRange: DateRangeKey): { startDate: Date; endDate: Date } {
  const today = new Date();

  switch (dateRange) {
    case "today":
      return {
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      };
    case "lastWeek": {
      const start = new Date(today);
      start.setDate(start.getDate() - 7);
      return { startDate: start, endDate: today };
    }
    case "lastMonth": {
      const start = new Date(today);
      start.setMonth(start.getMonth() - 1);
      return { startDate: start, endDate: today };
    }
    case "lastYear": {
      const start = new Date(today);
      start.setFullYear(start.getFullYear() - 1);
      return { startDate: start, endDate: today };
    }
    case "last3Years": {
      const start = new Date(today);
      start.setFullYear(start.getFullYear() - 3);
      return { startDate: start, endDate: today };
    }
    case "last3Months": {
      const start = new Date(today);
      start.setMonth(start.getMonth() - 3);
      return { startDate: start, endDate: today };
    }
    case "ytd":
      return {
        startDate: new Date(today.getFullYear(), 0, 1),
        endDate: today,
      };
    default:
      return { startDate: today, endDate: today };
  }
}
