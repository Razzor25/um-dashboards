module.exports = [
"[project]/apps/dashboards/lib/api/server-call-logger.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildGraphqlPayloadLog",
    ()=>buildGraphqlPayloadLog,
    "createServerCallId",
    ()=>createServerCallId,
    "logServerCall",
    ()=>logServerCall
]);
const SERVER_CALL_LOGGING_ENABLED = process.env.SERVER_CALL_LOGGING_ENABLED !== "false";
const LOG_MODE = process.env.SERVER_CALL_LOG_MODE === "debug" ? "debug" : "tracking";
const MAX_QUERY_LOG_LENGTH = 2000;
const SLOW_CALL_THRESHOLD_MS = 5000;
const ANSI_YELLOW = "\x1b[33m";
const ANSI_RESET = "\x1b[0m";
function createServerCallId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
/**
 * Extracts the operation name from a GraphQL query string.
 * Returns "anonymous" if no named operation is found.
 */ function extractGraphqlOperationName(query) {
    const match = query.match(/^\s*(?:query|mutation|subscription)\s+([A-Za-z_][A-Za-z0-9_]*)/m);
    return match?.[1] ?? "anonymous";
}
function buildGraphqlPayloadLog(query, variables) {
    const compactQuery = query.replace(/\s+/g, " ").trim();
    return {
        query: compactQuery.length > MAX_QUERY_LOG_LENGTH ? `${compactQuery.slice(0, MAX_QUERY_LOG_LENGTH)}...` : compactQuery,
        variables: sanitizeGraphqlVariablesForLog(variables)
    };
}
function sanitizeGraphqlVariablesForLog(variables) {
    if (!variables) {
        return variables;
    }
    const sanitized = {
        ...variables
    };
    for (const key of [
        "hscIds",
        "authIds",
        "indvIds"
    ]){
        const value = sanitized[key];
        if (Array.isArray(value)) {
            sanitized[key] = `[hidden ${key}; count=${value.length}]`;
        }
    }
    return sanitized;
}
function logServerCall(entry) {
    if (!SERVER_CALL_LOGGING_ENABLED) {
        return;
    }
    if (LOG_MODE === "tracking") {
        logTrackingLine(entry);
        return;
    }
    logDebugBlock(entry);
}
function logTrackingLine(entry) {
    const payload = entry.payload;
    const operationName = payload && typeof payload.query === "string" ? extractGraphqlOperationName(payload.query) : "n/a";
    const parts = [
        `[gql]`,
        operationName,
        entry.service,
        entry.destinationUrl,
        entry.status,
        `${entry.durationMs}ms`
    ];
    if (entry.httpStatus !== undefined) {
        parts.push(`HTTP ${entry.httpStatus}`);
    }
    const line = parts.join(" · ");
    const formattedLine = formatSlowCallLog(line, entry.durationMs);
    if (entry.status === "success") {
        console.info(formattedLine);
    } else {
        console.error(`${formattedLine}\n  error: ${entry.errorMessage ?? "unknown"}`);
    }
}
function logDebugBlock(entry) {
    const timestamp = new Date().toISOString();
    const payloadText = formatForConsole(entry.payload);
    const lines = [
        "[server-call]",
        `  time: ${timestamp}`,
        `  requestId: ${entry.requestId}`,
        `  service: ${entry.service}`,
        `  destinationUrl: ${entry.destinationUrl}`,
        `  status: ${entry.status}`,
        `  durationMs: ${entry.durationMs}`,
        `  httpStatus: ${entry.httpStatus ?? "n/a"}`,
        `  payload: ${payloadText}`
    ];
    if (entry.errorMessage) {
        lines.push(`  error: ${entry.errorMessage}`);
    }
    const output = lines.join("\n");
    const formattedOutput = formatSlowCallLog(output, entry.durationMs);
    if (entry.status === "success") {
        console.info(formattedOutput);
        return;
    }
    console.error(formattedOutput);
}
function formatSlowCallLog(text, durationMs) {
    if (durationMs <= SLOW_CALL_THRESHOLD_MS) {
        return text;
    }
    return `${ANSI_YELLOW}${text}${ANSI_RESET}`;
}
function formatForConsole(value) {
    if (value == null) {
        return "n/a";
    }
    if (typeof value === "string") {
        return value;
    }
    try {
        return JSON.stringify(value, null, 2);
    } catch  {
        return String(value);
    }
}
}),
"[project]/apps/dashboards/lib/graphql/client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "requestGraphql",
    ()=>requestGraphql
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/server-call-logger.ts [app-rsc] (ecmascript)");
;
const DOMAIN_CONFIG = {
    adm: {
        endpointEnv: "ADM_GRAPHQL_ENDPOINT",
        secretEnv: "ADM_GRAPHQL_ADMIN_SECRET",
        service: "hasura-graphql"
    },
    cm: {
        endpointEnv: "CM_GRAPHQL_ENDPOINT",
        secretEnv: "CM_GRAPHQL_ADMIN_SECRET",
        service: "cm-graphql",
        missingConfigBehavior: "empty-pha-id-strat"
    },
    hsc: {
        endpointEnv: "HSC_GRAPHQL_ENDPOINT",
        secretEnv: "HSC_GRAPHQL_ADMIN_SECRET",
        service: "hsc-graphql"
    },
    other: {
        endpointEnv: "DATAMONITOR_GRAPHQL_ENDPOINT",
        secretEnv: "DATAMONITOR_GRAPHQL_ADMIN_SECRET",
        service: "datmonitor-graphql"
    }
};
function getConfig(domain) {
    const config = DOMAIN_CONFIG[domain];
    const endpoint = process.env[config.endpointEnv];
    const secret = process.env[config.secretEnv];
    return {
        ...config,
        endpoint,
        secret
    };
}
async function requestGraphql(domain, query, variables) {
    const { endpointEnv, secretEnv, service, missingConfigBehavior, endpoint, secret } = getConfig(domain);
    if (!endpoint) {
        if (missingConfigBehavior === "empty-pha-id-strat") {
            console.warn(`${endpointEnv} is not configured, skipping ${service} query`);
            return {
                pha_id_strat: []
            };
        }
        throw new Error(`${endpointEnv} is not configured`);
    }
    if (!secret) {
        if (missingConfigBehavior === "empty-pha-id-strat") {
            console.warn(`${secretEnv} is not configured, skipping ${service} query`);
            return {
                pha_id_strat: []
            };
        }
        throw new Error(`${secretEnv} is not configured`);
    }
    const requestId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerCallId"])();
    const startedAt = Date.now();
    const payloadLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildGraphqlPayloadLog"])(query, variables);
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-hasura-admin-secret": secret
            },
            body: JSON.stringify({
                query,
                variables
            })
        });
        if (!response.ok) {
            const durationMs = Date.now() - startedAt;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logServerCall"])({
                requestId,
                service,
                destinationUrl: endpoint,
                payload: payloadLog,
                status: "http_error",
                durationMs,
                httpStatus: response.status,
                errorMessage: `GraphQL request failed with status ${response.status}`
            });
            throw new Error(`GraphQL request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (data.errors) {
            const durationMs = Date.now() - startedAt;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logServerCall"])({
                requestId,
                service,
                destinationUrl: endpoint,
                payload: payloadLog,
                status: "graphql_error",
                durationMs,
                httpStatus: response.status,
                errorMessage: JSON.stringify(data.errors)
            });
            throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
        }
        const durationMs = Date.now() - startedAt;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logServerCall"])({
            requestId,
            service,
            destinationUrl: endpoint,
            payload: payloadLog,
            status: "success",
            durationMs,
            httpStatus: response.status
        });
        return data.data;
    } catch (error) {
        const durationMs = Date.now() - startedAt;
        const message = error instanceof Error ? error.message : "Unknown network error";
        if (!message.startsWith("GraphQL request failed with status") && !message.startsWith("GraphQL errors:")) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logServerCall"])({
                requestId,
                service,
                destinationUrl: endpoint,
                payload: payloadLog,
                status: "network_error",
                durationMs,
                errorMessage: message
            });
        }
        throw error;
    }
}
}),
"[project]/apps/dashboards/lib/api/graphql-client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "graphqlRequest",
    ()=>graphqlRequest
]);
/**
 * ADM GraphQL wrapper.
 * Kept as a thin compatibility layer while the app is reorganized by domain.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/graphql/client.ts [app-rsc] (ecmascript)");
;
async function graphqlRequest(query, variables) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requestGraphql"])("adm", query, variables);
}
}),
"[project]/apps/dashboards/lib/api/cm-graphql-client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cmGraphqlRequest",
    ()=>cmGraphqlRequest
]);
/**
 * CM GraphQL wrapper.
 * Kept as a thin compatibility layer while the app is reorganized by domain.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/graphql/client.ts [app-rsc] (ecmascript)");
;
async function cmGraphqlRequest(query, variables) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requestGraphql"])("cm", query, variables);
}
}),
"[project]/apps/dashboards/lib/shared/hsc-ref-service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHscRefCacheStatus",
    ()=>getHscRefCacheStatus,
    "getHscRefLookup",
    ()=>getHscRefLookup,
    "invalidateHscRefCache",
    ()=>invalidateHscRefCache,
    "resolveRef",
    ()=>resolveRef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/graphql-client.ts [app-rsc] (ecmascript)");
;
let refCache = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;
async function getHscRefLookup() {
    const now = Date.now();
    if (refCache && now - cacheTimestamp < CACHE_TTL_MS) {
        return refCache;
    }
    const query = `
    query GetHscRef {
      hsc_ref {
        ref_id
        ref_dspl
      }
    }
  `;
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(query);
    const lookup = new Map();
    for (const row of data.hsc_ref || []){
        lookup.set(row.ref_id, row.ref_dspl);
    }
    refCache = lookup;
    cacheTimestamp = now;
    return lookup;
}
function getHscRefCacheStatus() {
    return {
        cachedAt: cacheTimestamp || null,
        ttlMs: CACHE_TTL_MS
    };
}
function invalidateHscRefCache() {
    refCache = null;
    cacheTimestamp = 0;
}
function resolveRef(lookup, id) {
    if (id == null) return "";
    return lookup.get(id) ?? String(id);
}
}),
"[project]/apps/dashboards/lib/constants/orgs.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PREHASHED_ORG_BY_ID",
    ()=>PREHASHED_ORG_BY_ID
]);
const PREHASHED_ORG_BY_ID = {
    ecp: "Enterprise Clinical Platform",
    "100": "Midwest",
    "110": "New York",
    "120": "California",
    "130": "Demo",
    "140": "Oregon",
    "150": "Connecticut",
    "160": "New Jersey",
    "170": "Kansas",
    "180": "Wisconsin",
    "190": "South Carolina",
    "200": "Utah",
    "210": "Arizona",
    "220": "New Mexico",
    "230": "Nevada",
    "240": "Colorado",
    "250": "Idaho",
    "260": "Washington",
    "270": "Wisconsin Midwest",
    "280": "Georgia",
    "290": "Kentucky",
    "300": "Nebraska",
    "320": "Pennsylvania",
    "330": "Tennessee",
    "340": "Virginia",
    "370": "North Carolina",
    "380": "Rhode Island",
    "390": "WellMed",
    "400": "NP3",
    "1000": "HealthSystem and line of business",
    "1100": "USC Keck"
};
}),
"[project]/apps/dashboards/features/adm/services/inpatient-census-service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchHscRecords",
    ()=>fetchHscRecords
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/graphql-client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$cm$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/cm-graphql-client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$shared$2f$hsc$2d$ref$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/shared/hsc-ref-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/constants/orgs.ts [app-rsc] (ecmascript)");
;
;
;
;
const STATUS_ID_MAP = {
    "Active Admissions": [
        1004238
    ],
    "Discharged Pending Closure": [
        1004239
    ],
    "Discharged Closed": [
        1006597
    ],
    "Anticipated Admission": [
        1002259,
        1005617
    ],
    "Other": [
        1000894,
        1002526,
        1004361,
        1005694
    ]
};
const ICD10_DESCRIPTION_CACHE_TTL_MS = 60 * 60 * 1000;
const icd10DescriptionCache = new Map();
// Maps UI SortKey values to their direct column names on the `hsc` table.
// Fields that live on related tables (hsc_facl, etc.) or are computed/JSON-derived
// are intentionally omitted — those remain client-side sorted.
const HSC_DIRECT_SORT_FIELDS = {
    authId: "hsc_id",
    received: "creat_dttm"
};
function buildOrderByClause(sortKey, sortDir) {
    const field = HSC_DIRECT_SORT_FIELDS[sortKey];
    if (field) {
        return `{ ${field}: ${sortDir} }`;
    }
    // For computed/JSON/related-table columns, fall back to default; client-side sort handles the rest.
    return `{ creat_dttm: desc }`;
}
function reverseMapRef(refLookup, labels) {
    const ids = [];
    for (const [id, label] of refLookup){
        if (labels.includes(label)) ids.push(id);
    }
    return ids;
}
function intersectSets(sets) {
    if (sets.length === 0) return new Set();
    const [first, ...rest] = sets;
    const result = new Set(first);
    for (const s of rest){
        for (const item of result){
            if (!s.has(item)) result.delete(item);
        }
    }
    return result;
}
async function fetchHscRecords(dateRange, page, pageSize, statusFilter, sortKey = "received", sortDir = "desc", columnFilters = {}) {
    const { startDate, endDate } = getDateRange(dateRange);
    const offset = (page - 1) * pageSize;
    const refLookup = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$shared$2f$hsc$2d$ref$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHscRefLookup"])();
    const statusIds = getStatusIdsForFilter(refLookup, statusFilter);
    const orderBy = buildOrderByClause(sortKey, sortDir);
    // ─── Dynamic WHERE building ────────────────────────────────────────────────
    // Always wrap conditions in _and[] so multiple top-level clauses compose safely.
    const andConditions = [
        `{ creat_dttm: { _gte: $startDate, _lte: $endDate } }`,
        `{ hsc_sts_typ_id: { _in: $statusIds } }`
    ];
    const queryVarDecls = [
        "$limit: Int!",
        "$offset: Int!",
        "$startDate: timestamptz!",
        "$endDate: timestamptz!",
        "$statusIds: [Int!]!"
    ];
    const variables = {
        limit: pageSize,
        offset,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        statusIds
    };
    // org — direct column on hsc
    const orgFilter = columnFilters.org ?? [];
    if (orgFilter.length > 0) {
        const orgIds = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PREHASHED_ORG_BY_ID"]).filter(([, name])=>orgFilter.includes(name)).map(([id])=>id);
        if (orgIds.length === 0) return {
            records: [],
            totalCount: 0,
            refLookup
        };
        andConditions.push("{ org_id: { _in: $orgIds } }");
        queryVarDecls.push("$orgIds: [String!]!");
        variables.orgIds = orgIds;
    }
    // admitType — auth_typ_ref_id on hsc (reverse-mapped from ref labels)
    const admitTypeFilter = columnFilters.admitType ?? [];
    if (admitTypeFilter.length > 0) {
        const admitTypeIds = reverseMapRef(refLookup, admitTypeFilter);
        if (admitTypeIds.length === 0) return {
            records: [],
            totalCount: 0,
            refLookup
        };
        andConditions.push("{ auth_typ_ref_id: { _in: $admitTypeIds } }");
        queryVarDecls.push("$admitTypeIds: [Int!]!");
        variables.admitTypeIds = admitTypeIds;
    }
    // healthPlan / memberState / ipa — inline JSONB _contains with _or for multiselect
    const healthPlanFilter = columnFilters.healthPlan ?? [];
    if (healthPlanFilter.length > 0) {
        const orParts = healthPlanFilter.map((v)=>`{ mbr_cov_dtl: { _contains: ${JSON.stringify({
                memberEligibilities: [
                    {
                        healthPlanName: v
                    }
                ]
            })} } }`);
        andConditions.push(`{ _or: [${orParts.join(", ")}] }`);
    }
    const memberStateFilter = columnFilters.memberState ?? [];
    if (memberStateFilter.length > 0) {
        const orParts = memberStateFilter.map((v)=>`{ mbr_cov_dtl: { _contains: ${JSON.stringify({
                memberAddresses: [
                    {
                        stateValue: v
                    }
                ]
            })} } }`);
        andConditions.push(`{ _or: [${orParts.join(", ")}] }`);
    }
    const ipaFilter = columnFilters.ipa ?? [];
    if (ipaFilter.length > 0) {
        const orParts = ipaFilter.map((v)=>`{ mbr_cov_dtl: { _contains: ${JSON.stringify({
                memberEligibilities: [
                    {
                        eligibilityPod: {
                            podName: v
                        }
                    }
                ]
            })} } }`);
        andConditions.push(`{ _or: [${orParts.join(", ")}] }`);
    }
    // ─── Parallel pre-queries for related-table filters ────────────────────────
    // Each returns Set<number> of matching hsc_ids, or null if the filter is inactive.
    // An empty Set means the filter matched nothing → we short-circuit to 0 results.
    const clinicianFilter = columnFilters.clinician ?? [];
    const clinicianPreQuery = clinicianFilter.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(`query PreFilterClinician($clinicians: [String!]!) {
            hsr_asgn(where: {
              asgn_to_user_nm: { _in: $clinicians }
              asgn_typ_ref_id: { _eq: 1002281 }
            }) { hsc_id }
          }`, {
        clinicians: clinicianFilter
    }).then((d)=>new Set((d.hsr_asgn || []).map((r)=>Number(r.hsc_id)))) : Promise.resolve(null);
    const facilityFilter = columnFilters.facility ?? [];
    const facilityPreQuery = facilityFilter.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(`query PreFilterFacility {
            hsc_prov(where: {
              prov_role_ref_id: { _eq: 1000908 }
              _or: [${facilityFilter.map((v)=>`{ prov_loc_affil_dtl: { _contains: ${JSON.stringify({
            name: v
        })} } }`).join(", ")}]
            }) { hsc_id }
          }`, {}).then((d)=>new Set((d.hsc_prov || []).map((r)=>Number(r.hsc_id)))) : Promise.resolve(null);
    const hceRiskFilter = columnFilters.hceReadmissionRisk ?? [];
    const hceRiskPreQuery = (()=>{
        if (hceRiskFilter.length === 0) return Promise.resolve(null);
        const riskIds = hceRiskFilter.map((v)=>parseInt(v, 10)).filter((v)=>!Number.isNaN(v));
        if (riskIds.length === 0) return Promise.resolve(new Set());
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(`query PreFilterHceRisk($riskIds: [Int!]!) {
        hsc_decn(where: { readmis_risk_scor_id: { _in: $riskIds } }) { hsc_id }
      }`, {
            riskIds
        }).then((d)=>new Set((d.hsc_decn || []).map((r)=>Number(r.hsc_id))));
    })();
    const serviceDetailFilter = columnFilters.serviceDetail ?? [];
    const serviceDetailPreQuery = (()=>{
        if (serviceDetailFilter.length === 0) return Promise.resolve(null);
        const sdIds = reverseMapRef(refLookup, serviceDetailFilter);
        if (sdIds.length === 0) return Promise.resolve(new Set());
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(`query PreFilterServiceDetail($sdIds: [Int!]!) {
        hsc_facl(where: { srvc_dtl_ref_id: { _in: $sdIds } }) { hsc_id }
      }`, {
            sdIds
        }).then((d)=>new Set((d.hsc_facl || []).map((r)=>Number(r.hsc_id))));
    })();
    // hceLevel + bh both come from CM pha_id_strat — combined into one CM pre-query
    const hceLevelFilter = columnFilters.hceLevel ?? [];
    const bhFilter = columnFilters.bh ?? [];
    const cmPreQuery = (()=>{
        if (hceLevelFilter.length === 0 && bhFilter.length === 0) return Promise.resolve(null);
        const cmWhereConditions = [];
        const cmVarDecls = [];
        const cmVars = {};
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$cm$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cmGraphqlRequest"])(`query PreFilterCM(${cmVarDecls.join(", ")}) {
        pha_id_strat(where: { ${cmWhereConditions.join(" ")} }) { indv_id }
      }`, cmVars).then((d)=>new Set((d.pha_id_strat || []).map((r)=>Number(r.indv_id)))).catch((err)=>{
            console.warn("CM pre-filter query failed, CM filters will be skipped:", err instanceof Error ? err.message : err);
            return null;
        });
    })();
    // Run all pre-queries in parallel
    const [clinicianSet, facilitySet, hceRiskSet, serviceDetailSet, cmIndvSet] = await Promise.all([
        clinicianPreQuery,
        facilityPreQuery,
        hceRiskPreQuery,
        serviceDetailPreQuery,
        cmPreQuery
    ]);
    // Intersect all hsc_id constraint sets; null means filter was not active
    const hscIdConstraints = [
        clinicianSet,
        facilitySet,
        hceRiskSet,
        serviceDetailSet
    ].filter((s)=>s !== null);
    if (hscIdConstraints.length > 0) {
        const intersection = intersectSets(hscIdConstraints);
        if (intersection.size === 0) return {
            records: [],
            totalCount: 0,
            refLookup
        };
        andConditions.push("{ hsc_id: { _in: $filteredHscIds } }");
        queryVarDecls.push("$filteredHscIds: [bigint!]!");
        variables.filteredHscIds = Array.from(intersection);
    }
    // CM indv_id constraint
    if (cmIndvSet !== null) {
        if (cmIndvSet.size === 0) return {
            records: [],
            totalCount: 0,
            refLookup
        };
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
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(query, variables);
    const hscIds = (data.hsc || []).map((record)=>Number(record.hsc_id)).filter((value)=>!Number.isNaN(value));
    const indvIds = Array.from(new Set((data.hsc || []).map((record)=>Number(record.indv_id)).filter((value)=>!Number.isNaN(value))));
    let faclLookup = new Map();
    let provLookup = new Map();
    let clinicianLookup = new Map();
    let diagLookup = new Map();
    let decnLookup = new Map();
    let readmitRiskLookup = new Map();
    let phaIdStratLookup = new Map();
    if (hscIds.length > 0) {
        const faclData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(`
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
      `, {
            hscIds
        });
        faclLookup = new Map((faclData.hsc_facl || []).map((row)=>[
                String(row.hsc_id),
                {
                    actul_admis_dttm: row.actul_admis_dttm,
                    nxt_rvw_dt: row.nxt_rvw_dt,
                    dschrg_dt_fr_ip_census: row.dschrg_dt_fr_ip_census,
                    srvc_dtl_ref_id: row.srvc_dtl_ref_id,
                    approved_bed_day_cnt: row.approved_bed_day_cnt,
                    denied_bed_day_cnt: row.denied_bed_day_cnt
                }
            ]));
        const provData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(`
        query GetHscProviderData($hscIds: [bigint!]!) {
          hsc_prov(where: { hsc_id: { _in: $hscIds } }) {
            hsc_id
            prov_role_ref_id
            prov_loc_affil_dtl
          }
        }
      `, {
            hscIds
        });
        // Process provider data by role
        const allProvs = provData.hsc_prov || [];
        for (const prov of allProvs){
            const hscId = String(prov.hsc_id);
            const provName = prov.prov_loc_affil_dtl?.name || "";
            if (!provLookup.has(hscId)) {
                provLookup.set(hscId, {});
            }
            const provMap = provLookup.get(hscId);
            switch(prov.prov_role_ref_id){
                case 1002775:
                    provMap.admitting = provName;
                    break;
                case 1000908:
                    provMap.facility = provName;
                    break;
            }
        }
        // Fetch admitting diagnosis from hsc_diag (primary + admitting type) then resolve to icd10.full_desc
        const diagData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(`
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
      `, {
            hscIds
        });
        const hscToDiagCode = new Map();
        for (const row of diagData.hsc_diag || []){
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
            for (const [hscId, diagCode] of hscToDiagCode.entries()){
                const fullDesc = codeToDesc.get(diagCode);
                if (fullDesc) {
                    diagLookup.set(hscId, fullDesc);
                }
            }
        }
        const decnData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(`
        query GetHscDecnRiskScores($hscIds: [bigint!]!) {
          hsc_decn(where: { hsc_id: { _in: $hscIds } }) {
            hsc_id
            readmis_risk_scor_id
          }
        }
      `, {
            hscIds
        });
        decnLookup = new Map((decnData.hsc_decn || []).map((row)=>[
                String(row.hsc_id),
                {
                    readmis_risk_scor_id: row.readmis_risk_scor_id
                }
            ]));
        const readmitRiskData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(`
        query GetReadmitRiskScores($authIds: [String!]!) {
          pha_readmit_risk(where: { auth_id: { _in: $authIds } }) {
            auth_id
            readmit_risk
          }
        }
      `, {
            authIds: hscIds.map((id)=>String(id))
        });
        readmitRiskLookup = new Map((readmitRiskData.pha_readmit_risk || []).map((row)=>[
                String(row.auth_id),
                row.readmit_risk ?? ""
            ]));
        const clinicianData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(`
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
      `, {
            hscIds
        });
        clinicianLookup = new Map((clinicianData.hsr_asgn || []).filter((row)=>row.asgn_to_user_nm).map((row)=>[
                String(row.hsc_id),
                String(row.asgn_to_user_nm)
            ]));
    }
    if (indvIds.length > 0) {
        try {
            const phaIdStratData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$cm$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cmGraphqlRequest"])(`
          query GetPhaIdStrat($indvIds: [Int!]!) {
            pha_id_strat(where: { indv_id: { _in: $indvIds } }) {
              indv_id
              referral_pathway
              hce_level
              behavioral_health_category
            }
          }
        `, {
                indvIds
            });
            for (const row of phaIdStratData.pha_id_strat || []){
                const indvId = String(row.indv_id);
                if (phaIdStratLookup.has(indvId)) {
                    continue;
                }
                phaIdStratLookup.set(indvId, {
                    referral_pathway: row.referral_pathway,
                    hce_level: row.hce_level,
                    behavioral_health_category: row.behavioral_health_category
                });
            }
        } catch (error) {
            console.warn("CM database query failed (pha_id_strat), continuing without CM data:", error instanceof Error ? error.message : error);
        }
    }
    const records = (data.hsc || []).map((record)=>({
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
            pha_readmit_risk_readmit_risk: readmitRiskLookup.get(String(record.hsc_id))
        }));
    return {
        records,
        totalCount: data.hsc_aggregate?.aggregate?.count ?? 0,
        refLookup
    };
}
function getStatusIdsForFilter(_refLookup, statusFilter) {
    return STATUS_ID_MAP[statusFilter] ?? [];
}
async function getIcd10DescriptionsWithCache(diagCodes) {
    const now = Date.now();
    const uniqueCodes = Array.from(new Set(diagCodes));
    const result = new Map();
    const missingCodes = [];
    for (const code of uniqueCodes){
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
    const icd10Data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(`
      query GetIcd10Descriptions($diagCodes: [String!]!) {
        icd10(where: { diag_cd: { _in: $diagCodes } }) {
          diag_cd
          full_desc
        }
      }
    `, {
        diagCodes: missingCodes
    });
    for (const row of icd10Data.icd10 || []){
        const code = String(row.diag_cd);
        const description = row.full_desc ? String(row.full_desc) : "";
        if (!description) {
            continue;
        }
        result.set(code, description);
        icd10DescriptionCache.set(code, {
            description,
            expiresAt: now + ICD10_DESCRIPTION_CACHE_TTL_MS
        });
    }
    return result;
}
function getDateRange(dateRange) {
    const today = new Date();
    switch(dateRange){
        case "today":
            return {
                startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
            };
        case "lastWeek":
            {
                const start = new Date(today);
                start.setDate(start.getDate() - 7);
                return {
                    startDate: start,
                    endDate: today
                };
            }
        case "lastMonth":
            {
                const start = new Date(today);
                start.setMonth(start.getMonth() - 1);
                return {
                    startDate: start,
                    endDate: today
                };
            }
        case "lastYear":
            {
                const start = new Date(today);
                start.setFullYear(start.getFullYear() - 1);
                return {
                    startDate: start,
                    endDate: today
                };
            }
        case "last3Years":
            {
                const start = new Date(today);
                start.setFullYear(start.getFullYear() - 3);
                return {
                    startDate: start,
                    endDate: today
                };
            }
        case "last3Months":
            {
                const start = new Date(today);
                start.setMonth(start.getMonth() - 3);
                return {
                    startDate: start,
                    endDate: today
                };
            }
        case "ytd":
            return {
                startDate: new Date(today.getFullYear(), 0, 1),
                endDate: today
            };
        default:
            return {
                startDate: today,
                endDate: today
            };
    }
}
}),
"[project]/apps/dashboards/features/adm/actions/inpatient-census-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"7f9ab7acc337a0030a042562a8b30fff99e309c21f":{"name":"getHscRecords"}},"apps/dashboards/features/adm/actions/inpatient-census-actions.ts",""] */ __turbopack_context__.s([
    "getHscRecords",
    ()=>getHscRecords
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$adm$2f$services$2f$inpatient$2d$census$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/features/adm/services/inpatient-census-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getHscRecords(dateRange, page, pageSize, statusFilter, sortKey = "received", sortDir = "desc", columnFilters = {}) {
    try {
        const { records, totalCount, refLookup } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$adm$2f$services$2f$inpatient$2d$census$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchHscRecords"])(dateRange, page, pageSize, statusFilter, sortKey, sortDir, columnFilters);
        // Convert Map to plain object so it can cross the server→client boundary
        const refLookupObj = {};
        for (const [k, v] of refLookup){
            refLookupObj[k] = v;
        }
        return {
            records,
            totalCount,
            refLookup: refLookupObj
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch HSC records: ${message}`);
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getHscRecords
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getHscRecords, "7f9ab7acc337a0030a042562a8b30fff99e309c21f", null);
}),
"[project]/apps/dashboards/.next-internal/server/app/dashboards/um-inpatient-census/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/dashboards/features/adm/actions/inpatient-census-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$adm$2f$actions$2f$inpatient$2d$census$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/features/adm/actions/inpatient-census-actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/apps/dashboards/.next-internal/server/app/dashboards/um-inpatient-census/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/dashboards/features/adm/actions/inpatient-census-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "7f9ab7acc337a0030a042562a8b30fff99e309c21f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$adm$2f$actions$2f$inpatient$2d$census$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHscRecords"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f2e$next$2d$internal$2f$server$2f$app$2f$dashboards$2f$um$2d$inpatient$2d$census$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$apps$2f$dashboards$2f$features$2f$adm$2f$actions$2f$inpatient$2d$census$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/apps/dashboards/.next-internal/server/app/dashboards/um-inpatient-census/page/actions.js { ACTIONS_MODULE0 => "[project]/apps/dashboards/features/adm/actions/inpatient-census-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$adm$2f$actions$2f$inpatient$2d$census$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/features/adm/actions/inpatient-census-actions.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
}
}),
];

//# sourceMappingURL=_08fp9bl._.js.map