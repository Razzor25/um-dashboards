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
"[project]/apps/dashboards/lib/api/hsc-graphql-client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hscGraphqlRequest",
    ()=>hscGraphqlRequest
]);
/**
 * HSC GraphQL wrapper.
 * Kept as a thin compatibility layer while the app is reorganized by domain.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/graphql/client.ts [app-rsc] (ecmascript)");
;
async function hscGraphqlRequest(query, variables) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requestGraphql"])("hsc", query, variables);
}
}),
"[project]/apps/dashboards/lib/api/tat-cache-client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tatCacheGet",
    ()=>tatCacheGet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/server-call-logger.ts [app-rsc] (ecmascript)");
;
const cacheBaseUrl = process.env.HSC_CACHE_BASE_URL?.replace(/\/$/, "");
function ensureCacheBaseUrl() {
    if (!cacheBaseUrl) {
        throw new Error("HSC_CACHE_BASE_URL is not configured");
    }
    return cacheBaseUrl;
}
function toQueryString(query) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (value === undefined) continue;
        params.set(key, String(value));
    }
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
}
async function tatCacheGet(path, query = {}) {
    const baseUrl = ensureCacheBaseUrl();
    const url = `${baseUrl}${path}${toQueryString(query)}`;
    const requestId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerCallId"])();
    const startedAt = Date.now();
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
            cache: "no-store"
        });
        const durationMs = Date.now() - startedAt;
        if (!response.ok) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logServerCall"])({
                requestId,
                service: "tat-cache",
                destinationUrl: url,
                payload: {
                    method: "GET",
                    query
                },
                status: "http_error",
                durationMs,
                httpStatus: response.status,
                errorMessage: `Cache request failed with status ${response.status}`
            });
            throw new Error(`Cache request failed with status ${response.status}`);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logServerCall"])({
            requestId,
            service: "tat-cache",
            destinationUrl: url,
            payload: {
                method: "GET",
                query
            },
            status: "success",
            durationMs,
            httpStatus: response.status
        });
        return await response.json();
    } catch (error) {
        const durationMs = Date.now() - startedAt;
        const message = error instanceof Error ? error.message : "Unknown network error";
        if (!message.startsWith("Cache request failed with status")) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logServerCall"])({
                requestId,
                service: "tat-cache",
                destinationUrl: url,
                payload: {
                    method: "GET",
                    query
                },
                status: "network_error",
                durationMs,
                errorMessage: message
            });
        }
        throw error;
    }
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
"[project]/apps/dashboards/lib/constants/priorities.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TAT_PRIORITY_OPTIONS",
    ()=>TAT_PRIORITY_OPTIONS,
    "TAT_PRIORITY_REF_IDS",
    ()=>TAT_PRIORITY_REF_IDS,
    "TAT_PRIORITY_REF_IDS_BY_LABEL",
    ()=>TAT_PRIORITY_REF_IDS_BY_LABEL,
    "TAT_PRIORITY_REF_ID_BY_LABEL",
    ()=>TAT_PRIORITY_REF_ID_BY_LABEL
]);
const TAT_PRIORITY_REF_IDS = {
    Urgent: 1000163,
    Routine: 1000161,
    Expedited: 1002495
};
const TAT_PRIORITY_OPTIONS = [
    "All Priorities",
    "Urgent",
    "Routine",
    "Expedited"
];
const TAT_PRIORITY_REF_ID_BY_LABEL = {
    Urgent: TAT_PRIORITY_REF_IDS.Urgent,
    Routine: TAT_PRIORITY_REF_IDS.Routine,
    Expedited: TAT_PRIORITY_REF_IDS.Expedited
};
const TAT_PRIORITY_REF_IDS_BY_LABEL = {
    Urgent: [
        TAT_PRIORITY_REF_IDS.Urgent
    ],
    Routine: [
        TAT_PRIORITY_REF_IDS.Routine
    ],
    Expedited: [
        TAT_PRIORITY_REF_IDS.Expedited
    ]
};
}),
"[project]/apps/dashboards/lib/api/chart-data-service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"6029dc9d5c7618879be087d98b74378c7e2a97821d":{"name":"fetchChartDataByOrg"},"609be698a31d07a9c53527a5e1598de6946da38549":{"name":"fetchChartDataByPriority"},"60d05996028bf0a743d641d971f3bb7b111c8d43d4":{"name":"fetchChartDataByCreatedDate"},"60df13602e22a7bb5e8f30183e470efe510212c7d3":{"name":"fetchAllChartsData"},"60e329e2fa9d67134fa54f6860b74614bcda8e2dea":{"name":"fetchChartDataByRequestType"},"78265c44d077cd36af976c98423068fc8d9b2bd6ae":{"name":"fetchRoutineProviderTatChartData"},"785a1e058d5930620796443855fd01f01b0aa3ad07":{"name":"fetchExpeditedUrgentProviderTatChartData"},"7861bda9a98a95badc2c4d652ab5a9d49815cab48f":{"name":"fetchExpeditedUrgentMemberTatChartData"},"788008fd5fb1ebe8f8b03e916619bb5e25d68915c1":{"name":"fetchChartDataByStatus"},"78d14424a51166511b701acc5b981f54f03d5b2ce5":{"name":"fetchRoutineTatChartData"}},"apps/dashboards/lib/api/chart-data-service.ts",""] */ __turbopack_context__.s([
    "fetchAllChartsData",
    ()=>fetchAllChartsData,
    "fetchChartDataByCreatedDate",
    ()=>fetchChartDataByCreatedDate,
    "fetchChartDataByOrg",
    ()=>fetchChartDataByOrg,
    "fetchChartDataByPriority",
    ()=>fetchChartDataByPriority,
    "fetchChartDataByRequestType",
    ()=>fetchChartDataByRequestType,
    "fetchChartDataByStatus",
    ()=>fetchChartDataByStatus,
    "fetchExpeditedUrgentMemberTatChartData",
    ()=>fetchExpeditedUrgentMemberTatChartData,
    "fetchExpeditedUrgentProviderTatChartData",
    ()=>fetchExpeditedUrgentProviderTatChartData,
    "fetchRoutineProviderTatChartData",
    ()=>fetchRoutineProviderTatChartData,
    "fetchRoutineTatChartData",
    ()=>fetchRoutineTatChartData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/hsc-graphql-client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$tat$2d$cache$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/tat-cache-client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/constants/orgs.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$priorities$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/constants/priorities.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
const INCLUDED_STATUS_IDS = [
    1000895,
    1000935,
    1005006
];
function getDateVariables(fromDate, toDate) {
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
    return {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
    };
}
function toCountPoints(map) {
    return Array.from(map.entries()).map(([label, count])=>({
            label,
            count
        })).sort((a, b)=>b.count - a.count);
}
// Mirrors the service-layer chip auth type ID list (Injectable/Part B)
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
    1008032
];
async function fetchStatusChartDataByAggregate(fromDate, toDate, filters = {}) {
    const { startDate, endDate } = getDateVariables(fromDate, toDate);
    const varDecls = [
        "$startDate: timestamptz!",
        "$endDate: timestamptz!",
        "$approvedId: Int!",
        "$deniedId: Int!",
        "$partialId: Int!"
    ];
    const variables = {
        startDate,
        endDate,
        approvedId: 1000895,
        deniedId: 1000935,
        partialId: 1005006
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
    function statusWhere(statusVar) {
        const conditions = [
            `{ recv_dttm: { _gte: $startDate, _lte: $endDate } }`,
            `{ indv_id: { _gt: 0 } }`,
            `{ hsc_sts_typ_id: { _eq: ${statusVar} } }`,
            ...chipCondition ? [
                chipCondition
            ] : []
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
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hscGraphqlRequest"])(query, variables);
    const points = [
        {
            label: "Approved",
            count: data.approved?.aggregate?.count ?? 0
        },
        {
            label: "Denied",
            count: data.denied?.aggregate?.count ?? 0
        },
        {
            label: "Partially Favorable",
            count: data.partiallyFavorable?.aggregate?.count ?? 0
        }
    ];
    return points.filter((point)=>point.count > 0);
}
async function fetchPriorityChartData(fromDate, toDate) {
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
        includedStatusIds: INCLUDED_STATUS_IDS
    };
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hscGraphqlRequest"])(query, variables);
    const countMap = new Map();
    for (const item of data.hsc || []){
        const key = item.auth_typ_ref_id?.toString() ?? "Unknown";
        countMap.set(key, (countMap.get(key) ?? 0) + 1);
    }
    return toCountPoints(countMap);
}
async function fetchRequestTypeChartData(fromDate, toDate) {
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
        includedStatusIds: INCLUDED_STATUS_IDS
    };
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hscGraphqlRequest"])(query, variables);
    const countMap = new Map();
    for (const item of data.hsc || []){
        const key = item.auth_cat_type_id?.toString() ?? "Unknown";
        countMap.set(key, (countMap.get(key) ?? 0) + 1);
    }
    return toCountPoints(countMap);
}
async function fetchOrgChartData(fromDate, toDate) {
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
        includedStatusIds: INCLUDED_STATUS_IDS
    };
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hscGraphqlRequest"])(query, variables);
    const countMap = new Map();
    for (const item of data.hsc || []){
        const key = item.org_id?.toString() ?? "Unknown";
        countMap.set(key, (countMap.get(key) ?? 0) + 1);
    }
    return toCountPoints(countMap);
}
async function fetchCreatedDateChartData(fromDate, toDate) {
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
        includedStatusIds: INCLUDED_STATUS_IDS
    };
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hscGraphqlRequest"])(query, variables);
    const countMap = new Map();
    for (const item of data.hsc || []){
        const dateKey = item.creat_dttm ? new Date(item.creat_dttm).toISOString().split("T")[0] ?? "Unknown" : "Unknown";
        countMap.set(dateKey, (countMap.get(dateKey) ?? 0) + 1);
    }
    return Array.from(countMap.entries()).map(([label, count])=>({
            label,
            count
        })).sort((a, b)=>b.label.localeCompare(a.label));
}
async function fetchAllChartsData(fromDate, toDate) {
    const [status, priority, requestType, org, createdDate] = await Promise.all([
        fetchStatusChartDataByAggregate(fromDate, toDate),
        fetchPriorityChartData(fromDate, toDate),
        fetchRequestTypeChartData(fromDate, toDate),
        fetchOrgChartData(fromDate, toDate),
        fetchCreatedDateChartData(fromDate, toDate)
    ]);
    return {
        status,
        priority,
        requestType,
        org,
        createdDate
    };
}
async function fetchChartDataByStatus(fromDate, toDate, dataSource = "graphql", filters = {}) {
    if (dataSource === "cache") {
        const params = {
            from_date: fromDate,
            to_date: toDate
        };
        if (filters.selectedChip) params.selected_chip = filters.selectedChip;
        if (filters.priority?.length && filters.priority[0] !== "All Priorities") {
            params.priority = filters.priority.filter((p)=>p !== "All Priorities").join(",");
        }
        if (filters.requestType && filters.requestType !== "All Request Types") params.request_type = filters.requestType;
        if (filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business") params.line_of_business = filters.lineOfBusiness;
        if (filters.healthPlan && filters.healthPlan !== "All Health Plans") params.health_plan = filters.healthPlan;
        if (filters.superCommunity && filters.superCommunity !== "All Super Communities") params.super_community = filters.superCommunity;
        if (filters.ipa && filters.ipa !== "All IPAs") params.ipa = filters.ipa;
        if (filters.orgs?.length) params.orgs = filters.orgs.join(",");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$tat$2d$cache$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tatCacheGet"])("/v1/prior-auth/status-chart", params);
    }
    return fetchStatusChartDataByAggregate(fromDate, toDate, filters);
}
async function fetchChartDataByPriority(fromDate, toDate) {
    return fetchPriorityChartData(fromDate, toDate);
}
async function fetchChartDataByRequestType(fromDate, toDate) {
    return fetchRequestTypeChartData(fromDate, toDate);
}
async function fetchChartDataByOrg(fromDate, toDate) {
    return fetchOrgChartData(fromDate, toDate);
}
async function fetchChartDataByCreatedDate(fromDate, toDate) {
    return fetchCreatedDateChartData(fromDate, toDate);
}
// Status IDs excluded from TAT compliance charts (matches um-tat-compliance-service.ts)
const TAT_EXCLUDED_STATUS_IDS = [
    1002259,
    1002526,
    1005617,
    1005694
];
// Request type label → auth_typ_ref_id (mirrors um-tat-compliance-service.ts)
const TAT_REQUEST_TYPE_REF_ID_MAP = {
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
    "Appeal": 1002527
};
/**
 * Shared two-step GraphQL fetch for TAT compliance charts.
 * Step 1: fetch hsc rows matching the given priority labels and filters.
 * Step 2: batch-fetch hsc_decn rows for those IDs, then count Timely/Late.
 */ async function fetchTatComplianceFromGraphQL(fromDate, toDate, filters, priorityLabels, isTimely) {
    const { startDate, endDate } = getDateVariables(fromDate, toDate);
    const priorityIds = priorityLabels.flatMap((label)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$priorities$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TAT_PRIORITY_REF_IDS_BY_LABEL"][label] ?? []);
    if (priorityIds.length === 0) return [];
    const varDecls = [
        "$startDate: timestamptz!",
        "$endDate: timestamptz!",
        "$excludedStatusIds: [Int!]!",
        "$priorityIds: [Int!]!"
    ];
    const variables = {
        startDate,
        endDate,
        excludedStatusIds: TAT_EXCLUDED_STATUS_IDS,
        priorityIds
    };
    const conditions = [
        "{ recv_dttm: { _gte: $startDate, _lte: $endDate } }",
        "{ hsc_sts_typ_id: { _nin: $excludedStatusIds } }",
        "{ indv_id: { _gt: 0 } }",
        "{ rev_prr_ref_id: { _in: $priorityIds } }"
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
        variables.lobContains = {
            memberEligibilities: [
                {
                    lineOfBusiness: filters.lineOfBusiness
                }
            ]
        };
        conditions.push("{ mbr_cov_dtl: { _contains: $lobContains } }");
    }
    if (filters.healthPlan && filters.healthPlan !== "All Health Plans") {
        varDecls.push("$healthPlanContains: jsonb!");
        variables.healthPlanContains = {
            memberEligibilities: [
                {
                    healthPlanName: filters.healthPlan
                }
            ]
        };
        conditions.push("{ mbr_cov_dtl: { _contains: $healthPlanContains } }");
    }
    if (filters.superCommunity && filters.superCommunity !== "All Super Communities") {
        varDecls.push("$superCommunityContains: jsonb!");
        variables.superCommunityContains = {
            memberEligibilities: [
                {
                    eligibilityPod: {
                        superCommunity: filters.superCommunity
                    }
                }
            ]
        };
        conditions.push("{ mbr_cov_dtl: { _contains: $superCommunityContains } }");
    }
    if (filters.ipa && filters.ipa !== "All IPAs") {
        varDecls.push("$ipaContains: jsonb!");
        variables.ipaContains = {
            memberEligibilities: [
                {
                    eligibilityPod: {
                        podName: filters.ipa
                    }
                }
            ]
        };
        conditions.push("{ mbr_cov_dtl: { _contains: $ipaContains } }");
    }
    // Org filter
    if (filters.orgs?.length) {
        const orgIds = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PREHASHED_ORG_BY_ID"]).filter(([, name])=>filters.orgs.includes(name)).map(([id])=>id);
        if (orgIds.length > 0) {
            varDecls.push("$orgIds: [String!]!");
            variables.orgIds = orgIds;
            conditions.push("{ org_id: { _in: $orgIds } }");
        }
    }
    const whereClause = `_and: [${conditions.join(", ")}]`;
    // Step 1: fetch hsc rows
    const hscData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hscGraphqlRequest"])(`query GetTatChartHsc(${varDecls.join(", ")}) {
      hsc(where: { ${whereClause} }) {
        hsc_id
        tat_due_dttm
      }
    }`, variables);
    const hscRows = hscData.hsc || [];
    if (hscRows.length === 0) return [];
    // Step 2: batch-fetch hsc_decn
    const hscIds = hscRows.map((r)=>r.hsc_id);
    const decnData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hscGraphqlRequest"])(`query GetTatChartDecn($hscIds: [bigint!]!) {
      hsc_decn(where: { hsc_id: { _in: $hscIds } }) {
        hsc_id
        decn_rndr_dttm
        tat_nod_prov_dttm
        wrt_decn_prov_cmnct_dttm
      }
    }`, {
        hscIds
    });
    const decnLookup = new Map((decnData.hsc_decn || []).map((r)=>[
            String(r.hsc_id),
            r
        ]));
    // Step 3: count Timely / Late
    let timely = 0;
    let late = 0;
    for (const hsc of hscRows){
        const decn = decnLookup.get(String(hsc.hsc_id));
        const result = isTimely(hsc, decn);
        if (result === true) timely++;
        else if (result === false) late++;
    }
    const points = [];
    if (timely > 0) points.push({
        label: "Timely",
        count: timely
    });
    if (late > 0) points.push({
        label: "Late",
        count: late
    });
    return points;
}
async function fetchRoutineTatChartData(fromDate, toDate, dataSource = "graphql", filters = {}) {
    if (dataSource === "cache") {
        const params = {
            from_date: fromDate,
            to_date: toDate
        };
        if (filters.selectedChip) params.selected_chip = filters.selectedChip;
        if (filters.requestType && filters.requestType !== "All Request Types") params.request_type = filters.requestType;
        if (filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business") params.line_of_business = filters.lineOfBusiness;
        if (filters.healthPlan && filters.healthPlan !== "All Health Plans") params.health_plan = filters.healthPlan;
        if (filters.superCommunity && filters.superCommunity !== "All Super Communities") params.super_community = filters.superCommunity;
        if (filters.ipa && filters.ipa !== "All IPAs") params.ipa = filters.ipa;
        if (filters.orgs?.length) params.orgs = filters.orgs.join(",");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$tat$2d$cache$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tatCacheGet"])("/v1/prior-auth/routine-tat-chart", params);
    }
    // GraphQL: Routine priority; timely when decn_rndr_dttm <= tat_due_dttm
    return fetchTatComplianceFromGraphQL(fromDate, toDate, filters, [
        "Routine"
    ], (hsc, decn)=>{
        if (!decn?.decn_rndr_dttm || !hsc.tat_due_dttm) return null;
        return new Date(decn.decn_rndr_dttm) <= new Date(hsc.tat_due_dttm);
    });
}
async function fetchExpeditedUrgentMemberTatChartData(fromDate, toDate, dataSource = "graphql", filters = {}) {
    if (dataSource === "cache") {
        const params = {
            from_date: fromDate,
            to_date: toDate
        };
        if (filters.selectedChip) params.selected_chip = filters.selectedChip;
        if (filters.requestType && filters.requestType !== "All Request Types") params.request_type = filters.requestType;
        if (filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business") params.line_of_business = filters.lineOfBusiness;
        if (filters.healthPlan && filters.healthPlan !== "All Health Plans") params.health_plan = filters.healthPlan;
        if (filters.superCommunity && filters.superCommunity !== "All Super Communities") params.super_community = filters.superCommunity;
        if (filters.ipa && filters.ipa !== "All IPAs") params.ipa = filters.ipa;
        if (filters.orgs?.length) params.orgs = filters.orgs.join(",");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$tat$2d$cache$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tatCacheGet"])("/v1/prior-auth/expedited-urgent-member-tat-chart", params);
    }
    // GraphQL: Urgent + Expedited priority; timely when decn_rndr_dttm <= tat_due_dttm
    return fetchTatComplianceFromGraphQL(fromDate, toDate, filters, [
        "Urgent",
        "Expedited"
    ], (hsc, decn)=>{
        if (!decn?.decn_rndr_dttm || !hsc.tat_due_dttm) return null;
        return new Date(decn.decn_rndr_dttm) <= new Date(hsc.tat_due_dttm);
    });
}
async function fetchRoutineProviderTatChartData(fromDate, toDate, dataSource = "graphql", filters = {}) {
    if (dataSource === "cache") {
        const params = {
            from_date: fromDate,
            to_date: toDate
        };
        if (filters.selectedChip) params.selected_chip = filters.selectedChip;
        if (filters.requestType && filters.requestType !== "All Request Types") params.request_type = filters.requestType;
        if (filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business") params.line_of_business = filters.lineOfBusiness;
        if (filters.healthPlan && filters.healthPlan !== "All Health Plans") params.health_plan = filters.healthPlan;
        if (filters.superCommunity && filters.superCommunity !== "All Super Communities") params.super_community = filters.superCommunity;
        if (filters.ipa && filters.ipa !== "All IPAs") params.ipa = filters.ipa;
        if (filters.orgs?.length) params.orgs = filters.orgs.join(",");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$tat$2d$cache$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tatCacheGet"])("/v1/prior-auth/routine-provider-tat-chart", params);
    }
    // GraphQL: Routine priority; timely when wrt_decn_prov_cmnct_dttm <= tat_nod_prov_dttm
    return fetchTatComplianceFromGraphQL(fromDate, toDate, filters, [
        "Routine"
    ], (_, decn)=>{
        if (!decn?.wrt_decn_prov_cmnct_dttm || !decn?.tat_nod_prov_dttm) return null;
        return new Date(decn.wrt_decn_prov_cmnct_dttm) <= new Date(decn.tat_nod_prov_dttm);
    });
}
async function fetchExpeditedUrgentProviderTatChartData(fromDate, toDate, dataSource = "graphql", filters = {}) {
    if (dataSource === "cache") {
        const params = {
            from_date: fromDate,
            to_date: toDate
        };
        if (filters.selectedChip) params.selected_chip = filters.selectedChip;
        if (filters.requestType && filters.requestType !== "All Request Types") params.request_type = filters.requestType;
        if (filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business") params.line_of_business = filters.lineOfBusiness;
        if (filters.healthPlan && filters.healthPlan !== "All Health Plans") params.health_plan = filters.healthPlan;
        if (filters.superCommunity && filters.superCommunity !== "All Super Communities") params.super_community = filters.superCommunity;
        if (filters.ipa && filters.ipa !== "All IPAs") params.ipa = filters.ipa;
        if (filters.orgs?.length) params.orgs = filters.orgs.join(",");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$tat$2d$cache$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tatCacheGet"])("/v1/prior-auth/expedited-urgent-provider-tat-chart", params);
    }
    // GraphQL: Urgent + Expedited priority; timely when wrt_decn_prov_cmnct_dttm <= tat_nod_prov_dttm
    return fetchTatComplianceFromGraphQL(fromDate, toDate, filters, [
        "Urgent",
        "Expedited"
    ], (_, decn)=>{
        if (!decn?.wrt_decn_prov_cmnct_dttm || !decn?.tat_nod_prov_dttm) return null;
        return new Date(decn.wrt_decn_prov_cmnct_dttm) <= new Date(decn.tat_nod_prov_dttm);
    });
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchAllChartsData,
    fetchChartDataByStatus,
    fetchChartDataByPriority,
    fetchChartDataByRequestType,
    fetchChartDataByOrg,
    fetchChartDataByCreatedDate,
    fetchRoutineTatChartData,
    fetchExpeditedUrgentMemberTatChartData,
    fetchRoutineProviderTatChartData,
    fetchExpeditedUrgentProviderTatChartData
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchAllChartsData, "60df13602e22a7bb5e8f30183e470efe510212c7d3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchChartDataByStatus, "788008fd5fb1ebe8f8b03e916619bb5e25d68915c1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchChartDataByPriority, "609be698a31d07a9c53527a5e1598de6946da38549", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchChartDataByRequestType, "60e329e2fa9d67134fa54f6860b74614bcda8e2dea", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchChartDataByOrg, "6029dc9d5c7618879be087d98b74378c7e2a97821d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchChartDataByCreatedDate, "60d05996028bf0a743d641d971f3bb7b111c8d43d4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchRoutineTatChartData, "78d14424a51166511b701acc5b981f54f03d5b2ce5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchExpeditedUrgentMemberTatChartData, "7861bda9a98a95badc2c4d652ab5a9d49815cab48f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchRoutineProviderTatChartData, "78265c44d077cd36af976c98423068fc8d9b2bd6ae", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchExpeditedUrgentProviderTatChartData, "785a1e058d5930620796443855fd01f01b0aa3ad07", null);
}),
"[project]/apps/dashboards/lib/api/chart-data-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"602853bd7fbeedf8793fb0f8303783cc70746daca5":{"name":"getPriorityChartData"},"6032a0be1e10a4acea1d7585da2baa422b629f136f":{"name":"getOrgChartData"},"607c833207e405022cbfea964ee9b853ceeb9e21e5":{"name":"getAllChartsData"},"608dfbe3575d291087ac30e7641f9a7599ab823008":{"name":"getCreatedDateChartData"},"60a30ad89ba21e551c54cfc2e30d8de39764fba56c":{"name":"getRequestTypeChartData"},"78275ce71605479e82a117b1455e1c7ee387869fdf":{"name":"getExpeditedUrgentProviderTatChartData"},"783469d1a742f18697970aba5e9d9862e97c83a4ff":{"name":"getRoutineProviderTatChartData"},"789c5657cb3564cc2032b44a818bab019f1562302e":{"name":"getExpeditedUrgentMemberTatChartData"},"789e5a0e5e49baf2086c003504fd6b140ddf4a1c28":{"name":"getRoutineTatChartData"},"78dc14f6c35d80108154c55ec0fb0eac156a44b899":{"name":"getStatusChartData"}},"apps/dashboards/lib/api/chart-data-actions.ts",""] */ __turbopack_context__.s([
    "getAllChartsData",
    ()=>getAllChartsData,
    "getCreatedDateChartData",
    ()=>getCreatedDateChartData,
    "getExpeditedUrgentMemberTatChartData",
    ()=>getExpeditedUrgentMemberTatChartData,
    "getExpeditedUrgentProviderTatChartData",
    ()=>getExpeditedUrgentProviderTatChartData,
    "getOrgChartData",
    ()=>getOrgChartData,
    "getPriorityChartData",
    ()=>getPriorityChartData,
    "getRequestTypeChartData",
    ()=>getRequestTypeChartData,
    "getRoutineProviderTatChartData",
    ()=>getRoutineProviderTatChartData,
    "getRoutineTatChartData",
    ()=>getRoutineTatChartData,
    "getStatusChartData",
    ()=>getStatusChartData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/chart-data-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getAllChartsData(fromDate, toDate) {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchAllChartsData"])(fromDate, toDate);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch charts data: ${message}`);
    }
}
async function getStatusChartData(fromDate, toDate, dataSource = "graphql", filters = {}) {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchChartDataByStatus"])(fromDate, toDate, dataSource, filters);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch status chart data: ${message}`);
    }
}
async function getPriorityChartData(fromDate, toDate) {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchChartDataByPriority"])(fromDate, toDate);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch priority chart data: ${message}`);
    }
}
async function getRequestTypeChartData(fromDate, toDate) {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchChartDataByRequestType"])(fromDate, toDate);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch request type chart data: ${message}`);
    }
}
async function getOrgChartData(fromDate, toDate) {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchChartDataByOrg"])(fromDate, toDate);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch organization chart data: ${message}`);
    }
}
async function getCreatedDateChartData(fromDate, toDate) {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchChartDataByCreatedDate"])(fromDate, toDate);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch created date chart data: ${message}`);
    }
}
async function getRoutineTatChartData(fromDate, toDate, dataSource = "graphql", filters = {}) {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchRoutineTatChartData"])(fromDate, toDate, dataSource, filters);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch routine TAT chart data: ${message}`);
    }
}
async function getExpeditedUrgentMemberTatChartData(fromDate, toDate, dataSource = "graphql", filters = {}) {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchExpeditedUrgentMemberTatChartData"])(fromDate, toDate, dataSource, filters);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch expedited / urgent member TAT chart data: ${message}`);
    }
}
async function getRoutineProviderTatChartData(fromDate, toDate, dataSource = "graphql", filters = {}) {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchRoutineProviderTatChartData"])(fromDate, toDate, dataSource, filters);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch routine provider TAT chart data: ${message}`);
    }
}
async function getExpeditedUrgentProviderTatChartData(fromDate, toDate, dataSource = "graphql", filters = {}) {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchExpeditedUrgentProviderTatChartData"])(fromDate, toDate, dataSource, filters);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch expedited / urgent provider TAT chart data: ${message}`);
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getAllChartsData,
    getStatusChartData,
    getPriorityChartData,
    getRequestTypeChartData,
    getOrgChartData,
    getCreatedDateChartData,
    getRoutineTatChartData,
    getExpeditedUrgentMemberTatChartData,
    getRoutineProviderTatChartData,
    getExpeditedUrgentProviderTatChartData
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllChartsData, "607c833207e405022cbfea964ee9b853ceeb9e21e5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStatusChartData, "78dc14f6c35d80108154c55ec0fb0eac156a44b899", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPriorityChartData, "602853bd7fbeedf8793fb0f8303783cc70746daca5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRequestTypeChartData, "60a30ad89ba21e551c54cfc2e30d8de39764fba56c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getOrgChartData, "6032a0be1e10a4acea1d7585da2baa422b629f136f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCreatedDateChartData, "608dfbe3575d291087ac30e7641f9a7599ab823008", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRoutineTatChartData, "789e5a0e5e49baf2086c003504fd6b140ddf4a1c28", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getExpeditedUrgentMemberTatChartData, "789c5657cb3564cc2032b44a818bab019f1562302e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRoutineProviderTatChartData, "783469d1a742f18697970aba5e9d9862e97c83a4ff", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getExpeditedUrgentProviderTatChartData, "78275ce71605479e82a117b1455e1c7ee387869fdf", null);
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
"[project]/apps/dashboards/features/um/services/tat-compliance-service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchTatCacheMetadata",
    ()=>fetchTatCacheMetadata,
    "fetchTatFilterOptions",
    ()=>fetchTatFilterOptions,
    "fetchTatFilterOptionsViaCache",
    ()=>fetchTatFilterOptionsViaCache,
    "fetchTatPriorityCounts",
    ()=>fetchTatPriorityCounts,
    "fetchTatPriorityCountsViaCache",
    ()=>fetchTatPriorityCountsViaCache,
    "fetchTatRecords",
    ()=>fetchTatRecords,
    "fetchTatRecordsViaCache",
    ()=>fetchTatRecordsViaCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/hsc-graphql-client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/constants/orgs.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$priorities$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/constants/priorities.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$shared$2f$hsc$2d$ref$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/shared/hsc-ref-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$tat$2d$cache$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/tat-cache-client.ts [app-rsc] (ecmascript)");
;
;
;
;
;
// Maps priority label to TAT rev_prr_ref_id values.
const PRIORITY_LABEL_MAP = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$priorities$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TAT_PRIORITY_REF_IDS_BY_LABEL"];
// Maps request type label to auth_typ_ref_id
const REQUEST_TYPE_REF_ID_MAP = {
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
    "Appeal": 1002527
};
const EXCLUDED_STATUS_IDS = [
    1002259,
    1002526,
    1005617,
    1005694
];
const REQUEST_TYPE_OPTION_ORDER = [
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
    "Appeal"
];
const LINE_OF_BUSINESS_OPTION_ORDER = [
    "Commercial",
    "Medicaid",
    "Medicare"
];
const IPA_OPTION_ORDER = [
    "Bay Area IPA",
    "Desert Plains IPA",
    "Lone Star IPA",
    "Mesa IPA",
    "North Texas IPA",
    "Prairie IPA",
    "Rocky Mountain IPA",
    "Sonoran IPA"
];
const ORDER_BY_BY_SORT_COLUMN = {
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
    decisioned: "creat_dttm"
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
    1008032
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
function buildDateRange(fromDate, toDate) {
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    // Include the full end day
    endDate.setHours(23, 59, 59, 999);
    return {
        startDate,
        endDate
    };
}
function extractMemberFullName(mbrCovDtl) {
    if (!mbrCovDtl) return null;
    const readName = (value)=>{
        if (!value || typeof value !== "object") return null;
        const fullName = value.fullName;
        if (typeof fullName !== "string") return null;
        const trimmed = fullName.trim();
        return trimmed.length > 0 ? trimmed : null;
    };
    if (typeof mbrCovDtl === "string") {
        try {
            return readName(JSON.parse(mbrCovDtl));
        } catch  {
            return null;
        }
    }
    return readName(mbrCovDtl);
}
function extractMbrCovDtlField(mbrCovDtl, path) {
    if (!mbrCovDtl) return null;
    const extract = (obj)=>{
        if (!obj || typeof obj !== "object") return null;
        const data = obj;
        const eligibilities = data.memberEligibilities;
        if (!Array.isArray(eligibilities) || eligibilities.length === 0) return null;
        let value = eligibilities[0];
        for (const key of path){
            if (!value || typeof value !== "object") return null;
            value = value[key];
        }
        return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
    };
    if (typeof mbrCovDtl === "string") {
        try {
            return extract(JSON.parse(mbrCovDtl));
        } catch  {
            return null;
        }
    }
    return extract(mbrCovDtl);
}
async function fetchTatRecords(filters, page, pageSize, sortBy = "received", sortDir = "desc", includeTotalCount = true) {
    const { startDate, endDate } = buildDateRange(filters.fromDate, filters.toDate);
    const offset = (page - 1) * pageSize;
    const refLookup = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$shared$2f$hsc$2d$ref$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHscRefLookup"])();
    const andConditions = [
        `{ recv_dttm: { _gte: $startDate, _lte: $endDate } }`,
        `{ hsc_sts_typ_id: { _nin: $excludedStatusIds } }`,
        `{ indv_id: { _gt: 0 } }`
    ];
    const queryVarDecls = [
        "$limit: Int!",
        "$offset: Int!",
        "$startDate: timestamptz!",
        "$endDate: timestamptz!",
        "$excludedStatusIds: [Int!]!"
    ];
    const variables = {
        limit: pageSize,
        offset,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        excludedStatusIds: EXCLUDED_STATUS_IDS
    };
    // org filter (multi-select)
    if (filters.orgs && filters.orgs.length > 0) {
        const orgIds = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PREHASHED_ORG_BY_ID"]).filter(([, name])=>filters.orgs.includes(name)).map(([id])=>id);
        if (orgIds.length > 0) {
            andConditions.push("{ org_id: { _in: $orgIds } }");
            queryVarDecls.push("$orgIds: [String!]!");
            variables.orgIds = orgIds;
        }
    }
    // priority → rev_prr_ref_id
    {
        const labels = Array.isArray(filters.priority) ? filters.priority : filters.priority ? [
            filters.priority
        ] : [];
        const activeLabels = labels.filter((l)=>l && l !== "All Priorities");
        if (activeLabels.length > 0) {
            const priorityIds = activeLabels.flatMap((label)=>PRIORITY_LABEL_MAP[label] ?? []);
            if (priorityIds.length === 0) return {
                records: [],
                totalCount: 0
            };
            andConditions.push("{ rev_prr_ref_id: { _in: $priorityIds } }");
            queryVarDecls.push("$priorityIds: [Int!]!");
            variables.priorityIds = priorityIds;
        }
    }
    // requestType → auth_typ_ref_id
    if (filters.requestType && filters.requestType !== "All Request Types") {
        const requestTypeId = REQUEST_TYPE_REF_ID_MAP[filters.requestType];
        if (!requestTypeId) return {
            records: [],
            totalCount: 0
        };
        andConditions.push("{ auth_typ_ref_id: { _in: $requestTypeIds } }");
        queryVarDecls.push("$requestTypeIds: [Int!]!");
        variables.requestTypeIds = [
            requestTypeId
        ];
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
        variables.lobContains = {
            memberEligibilities: [
                {
                    lineOfBusiness: filters.lineOfBusiness
                }
            ]
        };
    }
    // ipa — from mbr_cov_dtl JSONB
    if (filters.ipa && filters.ipa !== "All IPAs") {
        andConditions.push("{ mbr_cov_dtl: { _contains: $ipaContains } }");
        queryVarDecls.push("$ipaContains: jsonb!");
        variables.ipaContains = {
            memberEligibilities: [
                {
                    eligibilityPod: {
                        podName: filters.ipa
                    }
                }
            ]
        };
    }
    // superCommunity — from mbr_cov_dtl JSONB
    if (filters.superCommunity && filters.superCommunity !== "All Super Communities") {
        andConditions.push("{ mbr_cov_dtl: { _contains: $superCommunityContains } }");
        queryVarDecls.push("$superCommunityContains: jsonb!");
        variables.superCommunityContains = {
            memberEligibilities: [
                {
                    eligibilityPod: {
                        superCommunity: filters.superCommunity
                    }
                }
            ]
        };
    }
    const whereClause = `_and: [\n        ${andConditions.join(",\n        ")}\n      ]`;
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
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hscGraphqlRequest"])(query, variables);
    const hscRows = data.hsc || [];
    const totalCount = includeTotalCount ? data.hsc_aggregate?.aggregate?.count ?? 0 : -1;
    // Fetch hsc_decn data for the returned records in batches to avoid payload size limits
    const hscIds = hscRows.map((row)=>row.hsc_id);
    let decnLookup = new Map();
    if (hscIds.length > 0) {
        // Batch hscIds to avoid GraphQL payload size limits (batch size: 5000)
        const BATCH_SIZE = 5000;
        const batches = [];
        for(let i = 0; i < hscIds.length; i += BATCH_SIZE){
            batches.push(hscIds.slice(i, i + BATCH_SIZE));
        }
        // Fetch all batches concurrently
        const decnResults = await Promise.all(batches.map((batch)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hscGraphqlRequest"])(`
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
          `, {
                hscIds: batch
            })));
        // Merge all results into decnLookup
        for (const decnData of decnResults){
            for (const row of decnData.hsc_decn || []){
                decnLookup.set(String(row.hsc_id), {
                    curr_tat_nod_mbr_dttm: row.curr_tat_nod_mbr_dttm,
                    wrt_decn_prov_cmnct_dttm: row.wrt_decn_prov_cmnct_dttm,
                    wrt_decn_mbr_cmnct_dttm: row.wrt_decn_mbr_cmnct_dttm,
                    tat_nod_prov_dttm: row.tat_nod_prov_dttm,
                    decn_mbr_cmnct_dttm: row.decn_mbr_cmnct_dttm,
                    decn_rndr_dttm: row.decn_rndr_dttm
                });
            }
        }
    }
    const records = hscRows.map((row)=>{
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
            ipa: extractMbrCovDtlField(row.mbr_cov_dtl, [
                "eligibilityPod",
                "podName"
            ]),
            super_community: extractMbrCovDtlField(row.mbr_cov_dtl, [
                "eligibilityPod",
                "superCommunity"
            ]),
            lob: extractMbrCovDtlField(row.mbr_cov_dtl, [
                "lobValue"
            ]),
            health_plan: extractMbrCovDtlField(row.mbr_cov_dtl, [
                "healthPlanName"
            ])
        };
    });
    return {
        records,
        totalCount
    };
}
async function fetchTatPriorityCounts(filters) {
    const { startDate, endDate } = buildDateRange(filters.fromDate, filters.toDate);
    const routineIds = PRIORITY_LABEL_MAP.Routine;
    const andConditions = [
        `{ recv_dttm: { _gte: $startDate, _lte: $endDate } }`,
        `{ hsc_sts_typ_id: { _nin: $excludedStatusIds } }`,
        `{ indv_id: { _gt: 0 } }`
    ];
    const queryVarDecls = [
        "$startDate: timestamptz!",
        "$endDate: timestamptz!",
        "$excludedStatusIds: [Int!]!",
        "$urgentIds: [Int!]!",
        "$routineIds: [Int!]!",
        "$expeditedIds: [Int!]!"
    ];
    const variables = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        excludedStatusIds: EXCLUDED_STATUS_IDS,
        urgentIds: PRIORITY_LABEL_MAP.Urgent,
        routineIds,
        expeditedIds: PRIORITY_LABEL_MAP.Expedited
    };
    // org filter (multi-select)
    if (filters.orgs && filters.orgs.length > 0) {
        const orgIds = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PREHASHED_ORG_BY_ID"]).filter(([, name])=>filters.orgs.includes(name)).map(([id])=>id);
        if (orgIds.length > 0) {
            andConditions.push("{ org_id: { _in: $orgIds } }");
            queryVarDecls.push("$orgIds: [String!]!");
            variables.orgIds = orgIds;
        }
    }
    // requestType → auth_typ_ref_id
    if (filters.requestType && filters.requestType !== "All Request Types") {
        const requestTypeId = REQUEST_TYPE_REF_ID_MAP[filters.requestType];
        if (!requestTypeId) return {
            all: 0,
            byLabel: {
                Urgent: 0,
                Routine: 0,
                Expedited: 0
            }
        };
        andConditions.push("{ auth_typ_ref_id: { _in: $requestTypeIds } }");
        queryVarDecls.push("$requestTypeIds: [Int!]!");
        variables.requestTypeIds = [
            requestTypeId
        ];
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
        variables.lobContains = {
            memberEligibilities: [
                {
                    lineOfBusiness: filters.lineOfBusiness
                }
            ]
        };
    }
    // ipa — from mbr_cov_dtl JSONB
    if (filters.ipa && filters.ipa !== "All IPAs") {
        andConditions.push("{ mbr_cov_dtl: { _contains: $ipaContains } }");
        queryVarDecls.push("$ipaContains: jsonb!");
        variables.ipaContains = {
            memberEligibilities: [
                {
                    eligibilityPod: {
                        podName: filters.ipa
                    }
                }
            ]
        };
    }
    const baseWhereClause = `_and: [\n        ${andConditions.join(",\n        ")}\n      ]`;
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
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hscGraphqlRequest"])(query, variables);
    return {
        all: data.all?.aggregate?.count ?? 0,
        byLabel: {
            Urgent: data.urgent?.aggregate?.count ?? 0,
            Routine: data.routine?.aggregate?.count ?? 0,
            Expedited: data.expedited?.aggregate?.count ?? 0
        }
    };
}
function buildTatWhereParts(filters, omit = {}, priorityIdsOverride) {
    const { startDate, endDate } = buildDateRange(filters.fromDate, filters.toDate);
    const andConditions = [
        `{ recv_dttm: { _gte: $startDate, _lte: $endDate } }`,
        `{ hsc_sts_typ_id: { _nin: $excludedStatusIds } }`,
        `{ indv_id: { _gt: 0 } }`
    ];
    const queryVarDecls = [
        "$startDate: timestamptz!",
        "$endDate: timestamptz!",
        "$excludedStatusIds: [Int!]!"
    ];
    const variables = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        excludedStatusIds: EXCLUDED_STATUS_IDS
    };
    if (!omit.orgs && filters.orgs && filters.orgs.length > 0) {
        const orgIds = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PREHASHED_ORG_BY_ID"]).filter(([, name])=>filters.orgs.includes(name)).map(([id])=>id);
        if (orgIds.length > 0) {
            andConditions.push("{ org_id: { _in: $orgIds } }");
            queryVarDecls.push("$orgIds: [String!]!");
            variables.orgIds = orgIds;
        }
    }
    if (!omit.priority) {
        const activeLabels = Array.isArray(filters.priority) ? filters.priority.filter((l)=>l && l !== "All Priorities") : filters.priority && filters.priority !== "All Priorities" ? [
            filters.priority
        ] : [];
        if (activeLabels.length > 0) {
            const priorityIds = priorityIdsOverride ?? activeLabels.flatMap((l)=>PRIORITY_LABEL_MAP[l] ?? []);
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
            variables.requestTypeIds = [
                requestTypeId
            ];
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
        variables.lobContains = {
            memberEligibilities: [
                {
                    lineOfBusiness: filters.lineOfBusiness
                }
            ]
        };
    }
    if (!omit.healthPlan && filters.healthPlan && filters.healthPlan !== "All Health Plans") {
        andConditions.push("{ mbr_cov_dtl: { _contains: $healthPlanContains } }");
        queryVarDecls.push("$healthPlanContains: jsonb!");
        variables.healthPlanContains = {
            memberEligibilities: [
                {
                    healthPlanName: filters.healthPlan
                }
            ]
        };
    }
    if (!omit.ipa && filters.ipa && filters.ipa !== "All IPAs") {
        andConditions.push("{ mbr_cov_dtl: { _contains: $ipaContains } }");
        queryVarDecls.push("$ipaContains: jsonb!");
        variables.ipaContains = {
            memberEligibilities: [
                {
                    eligibilityPod: {
                        podName: filters.ipa
                    }
                }
            ]
        };
    }
    const whereClause = `_and: [\n        ${andConditions.join(",\n        ")}\n      ]`;
    return {
        whereClause,
        queryVarDecls,
        variables
    };
}
async function fetchTatFilterOptions(filters) {
    const refLookup = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$shared$2f$hsc$2d$ref$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHscRefLookup"])();
    const priority = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$priorities$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TAT_PRIORITY_OPTIONS"]
    ];
    const priorityRefIds = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$priorities$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TAT_PRIORITY_REF_ID_BY_LABEL"]
    };
    const selectedPriorityIds = (()=>{
        const labels = Array.isArray(filters.priority) ? filters.priority : filters.priority ? [
            filters.priority
        ] : [];
        const active = labels.filter((l)=>l && l !== "All Priorities");
        if (active.length === 0) return undefined;
        const ids = active.flatMap((l)=>PRIORITY_LABEL_MAP[l] ?? []);
        return ids.length > 0 ? ids : undefined;
    })();
    const orgCtx = buildTatWhereParts(filters, {
        orgs: true
    }, selectedPriorityIds);
    const orgData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hscGraphqlRequest"])(`
        query GetTatOrgOptions(${orgCtx.queryVarDecls.join(", ")}) {
          hsc(distinct_on: [org_id], where: { ${orgCtx.whereClause} }, order_by: [{ org_id: asc }]) {
            org_id
          }
        }
      `, orgCtx.variables);
    const orgNames = Array.from(new Set((orgData.hsc || []).map((row)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PREHASHED_ORG_BY_ID"][row.org_id] ?? row.org_id).filter((name)=>typeof name === "string" && name.trim().length > 0))).sort((left, right)=>left.localeCompare(right));
    if (filters.orgs && filters.orgs.length > 0) {
        for (const selectedOrg of filters.orgs){
            if (!orgNames.includes(selectedOrg)) {
                orgNames.unshift(selectedOrg);
            }
        }
    }
    // Fetch LOB, health_plan, ipa, super_community from GraphQL when ≤7 days
    let lineOfBusinessOptions = [
        ...LINE_OF_BUSINESS_OPTION_ORDER
    ];
    let healthPlanOptions = [];
    let ipaOptions = [
        ...IPA_OPTION_ORDER
    ];
    let superCommunityOptions = [];
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
        requestType: [
            "All Request Types",
            ...REQUEST_TYPE_OPTION_ORDER
        ],
        lineOfBusiness: [
            "All Lines of Business",
            ...lineOfBusinessOptions
        ],
        healthPlan: [
            "All Health Plans",
            ...healthPlanOptions
        ],
        ipa: [
            "All IPAs",
            ...ipaOptions
        ],
        superCommunity: [
            "All Super Communities",
            ...superCommunityOptions
        ],
        orgs: [
            "All Orgs",
            ...orgNames
        ]
    };
}
function isDateRangeSevenDaysOrLess(fromDate, toDate) {
    try {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        const diffMs = to.getTime() - from.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        return diffDays <= 7;
    } catch  {
        return false;
    }
}
async function fetchFilterDimensionsFromGraphQL(filters, selectedPriorityIds, refLookup) {
    try {
        // Build where conditions with all filters EXCEPT the dimensions we're fetching.
        // This matches the cache API pattern: when computing LOB options, exclude LOB filter, etc.
        const filtersExcludingDimensions = {
            ...filters,
            lineOfBusiness: undefined,
            healthPlan: undefined,
            ipa: undefined,
            superCommunity: undefined
        };
        const ctx = buildTatWhereParts(filtersExcludingDimensions, {}, selectedPriorityIds);
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hscGraphqlRequest"])(`
        query GetFilterDimensions(${ctx.queryVarDecls.join(", ")}) {
          hsc(limit: 50000, where: { ${ctx.whereClause} }) {
            mbr_cov_dtl
          }
        }
      `, ctx.variables);
        const lob = new Set();
        const hp = new Set();
        const ipaSet = new Set();
        const sc = new Set();
        for (const row of data.hsc || []){
            if (!row.mbr_cov_dtl) continue;
            let cov = row.mbr_cov_dtl;
            if (typeof cov === "string") {
                try {
                    cov = JSON.parse(cov);
                } catch  {
                    continue;
                }
            }
            if (typeof cov !== "object" || cov === null) continue;
            const covObj = cov;
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
            superCommunity: Array.from(sc).sort()
        };
    } catch (error) {
        console.warn("Failed to fetch filter dimensions from GraphQL, using defaults:", error);
        return {
            lineOfBusiness: [
                ...LINE_OF_BUSINESS_OPTION_ORDER
            ],
            healthPlan: [],
            ipa: [
                ...IPA_OPTION_ORDER
            ],
            superCommunity: []
        };
    }
}
function normalizeCacheTatFilterOptions(data) {
    return {
        priority: Array.isArray(data.priority) ? data.priority : [
            "All Priorities"
        ],
        priorityRefIds: data.priority_ref_ids,
        requestType: Array.isArray(data.request_type) ? data.request_type : [
            "All Request Types"
        ],
        lineOfBusiness: Array.isArray(data.line_of_business) ? data.line_of_business : [
            "All Lines of Business"
        ],
        healthPlan: Array.isArray(data.health_plan) ? data.health_plan : [
            "All Health Plans"
        ],
        ipa: Array.isArray(data.ipa) ? data.ipa : [
            "All IPAs"
        ],
        superCommunity: Array.isArray(data.super_community) ? data.super_community : [
            "All Super Communities"
        ],
        orgs: Array.isArray(data.orgs) ? data.orgs : [
            "All Orgs"
        ],
        cache: data.cache
    };
}
function buildCacheQueryParams(filters) {
    const priority = Array.isArray(filters.priority) ? filters.priority.filter((value)=>value !== "All Priorities") : filters.priority && filters.priority !== "All Priorities" ? [
        filters.priority
    ] : [];
    const orgs = filters.orgs && filters.orgs.length > 0 ? filters.orgs.filter((value)=>value !== "All Orgs") : [];
    return {
        from_date: filters.fromDate,
        to_date: filters.toDate,
        selected_chip: filters.selectedChip,
        priority: priority.length > 0 ? priority.join(",") : undefined,
        request_type: filters.requestType && filters.requestType !== "All Request Types" ? filters.requestType : undefined,
        line_of_business: filters.lineOfBusiness && filters.lineOfBusiness !== "All Lines of Business" ? filters.lineOfBusiness : undefined,
        health_plan: filters.healthPlan && filters.healthPlan !== "All Health Plans" ? filters.healthPlan : undefined,
        super_community: filters.superCommunity && filters.superCommunity !== "All Super Communities" ? filters.superCommunity : undefined,
        ipa: filters.ipa && filters.ipa !== "All IPAs" ? filters.ipa : undefined,
        orgs: orgs.length > 0 ? orgs.join(",") : undefined
    };
}
async function fetchTatRecordsViaCache(filters, page, pageSize, sortBy = "received", sortDir = "desc", includeTotalCount = true) {
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$tat$2d$cache$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tatCacheGet"])("/v1/prior-auth/records", {
        ...buildCacheQueryParams(filters),
        page,
        page_size: pageSize,
        sort_by: sortBy,
        sort_dir: sortDir,
        include_total_count: includeTotalCount
    });
    return {
        records: data.records,
        totalCount: data.total_count,
        cache: data.cache
    };
}
async function fetchTatPriorityCountsViaCache(filters) {
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$tat$2d$cache$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tatCacheGet"])("/v1/prior-auth/priority-counts", buildCacheQueryParams(filters));
    return {
        all: data.all,
        byLabel: data.by_label,
        cache: data.cache
    };
}
async function fetchTatFilterOptionsViaCache(filters) {
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$tat$2d$cache$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tatCacheGet"])("/v1/prior-auth/filter-options", buildCacheQueryParams(filters));
    return normalizeCacheTatFilterOptions(data);
}
async function fetchTatCacheMetadata() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$tat$2d$cache$2d$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tatCacheGet"])("/v1/metadata");
}
}),
"[project]/apps/dashboards/features/um/actions/tat-compliance-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"000b24ff1d9ee68674c1ec9924823854d154e3f678":{"name":"getRefCacheStatus"},"008fef4d92b8244ebf36f2f3f898605cc56be22a6f":{"name":"refreshRefCache"},"00b6268c56ba33af3b6d7c8c1378ed36a8cc4e7710":{"name":"getTatCacheMetadata"},"6091ffd7388c4ed266b4a7a642c43abee37365ff42":{"name":"getTatFilterOptions"},"60a9bcd359fba10bdd67a5cb6225bd0d528b6a05fe":{"name":"getTatPriorityCounts"},"7f7aef72bed002647f8fc48d0671ef351e3cb422b3":{"name":"getHscRecordsForTatCompliance"}},"apps/dashboards/features/um/actions/tat-compliance-actions.ts",""] */ __turbopack_context__.s([
    "getHscRecordsForTatCompliance",
    ()=>getHscRecordsForTatCompliance,
    "getRefCacheStatus",
    ()=>getRefCacheStatus,
    "getTatCacheMetadata",
    ()=>getTatCacheMetadata,
    "getTatFilterOptions",
    ()=>getTatFilterOptions,
    "getTatPriorityCounts",
    ()=>getTatPriorityCounts,
    "refreshRefCache",
    ()=>refreshRefCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$services$2f$tat$2d$compliance$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/features/um/services/tat-compliance-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$shared$2f$hsc$2d$ref$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/shared/hsc-ref-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getHscRecordsForTatCompliance(filters, page, pageSize, sortBy = "received", sortDir = "desc", includeTotalCount = true, dataSource = "graphql") {
    try {
        if (dataSource === "cache") {
        // return await fetchTatRecordsViaCache(filters, page, pageSize, sortBy, sortDir, includeTotalCount);
        }
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$services$2f$tat$2d$compliance$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchTatRecords"])(filters, page, pageSize, sortBy, sortDir, includeTotalCount);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch TAT records: ${message}`);
    }
}
async function getTatPriorityCounts(filters, dataSource = "graphql") {
    try {
        if (dataSource === "cache") {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$services$2f$tat$2d$compliance$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchTatPriorityCountsViaCache"])(filters);
        }
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$services$2f$tat$2d$compliance$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchTatPriorityCounts"])(filters);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch TAT priority counts: ${message}`);
    }
}
async function getTatFilterOptions(filters, dataSource = "graphql") {
    try {
        if (dataSource === "cache") {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$services$2f$tat$2d$compliance$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchTatFilterOptionsViaCache"])(filters);
        }
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$services$2f$tat$2d$compliance$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchTatFilterOptions"])(filters);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch TAT filter options: ${message}`);
    }
}
async function getTatCacheMetadata() {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$services$2f$tat$2d$compliance$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchTatCacheMetadata"])();
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch cache metadata: ${message}`);
    }
}
function buildRefCacheStatus() {
    const { cachedAt, ttlMs } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$shared$2f$hsc$2d$ref$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHscRefCacheStatus"])();
    if (!cachedAt) {
        return {
            cachedAt: null,
            expiresAt: null,
            isStale: true
        };
    }
    const expiresAt = cachedAt + ttlMs;
    return {
        cachedAt: new Date(cachedAt).toISOString(),
        expiresAt: new Date(expiresAt).toISOString(),
        isStale: Date.now() >= expiresAt
    };
}
async function getRefCacheStatus() {
    return buildRefCacheStatus();
}
async function refreshRefCache() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$shared$2f$hsc$2d$ref$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["invalidateHscRefCache"])();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$shared$2f$hsc$2d$ref$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHscRefLookup"])();
    return buildRefCacheStatus();
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getHscRecordsForTatCompliance,
    getTatPriorityCounts,
    getTatFilterOptions,
    getTatCacheMetadata,
    getRefCacheStatus,
    refreshRefCache
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getHscRecordsForTatCompliance, "7f7aef72bed002647f8fc48d0671ef351e3cb422b3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTatPriorityCounts, "60a9bcd359fba10bdd67a5cb6225bd0d528b6a05fe", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTatFilterOptions, "6091ffd7388c4ed266b4a7a642c43abee37365ff42", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTatCacheMetadata, "00b6268c56ba33af3b6d7c8c1378ed36a8cc4e7710", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRefCacheStatus, "000b24ff1d9ee68674c1ec9924823854d154e3f678", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(refreshRefCache, "008fef4d92b8244ebf36f2f3f898605cc56be22a6f", null);
}),
"[project]/apps/dashboards/.next-internal/server/app/dashboards/um-tat-compliance/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/dashboards/lib/api/chart-data-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/apps/dashboards/features/um/actions/tat-compliance-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/chart-data-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$tat$2d$compliance$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/features/um/actions/tat-compliance-actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
}),
"[project]/apps/dashboards/.next-internal/server/app/dashboards/um-tat-compliance/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/dashboards/lib/api/chart-data-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/apps/dashboards/features/um/actions/tat-compliance-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "000b24ff1d9ee68674c1ec9924823854d154e3f678",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$tat$2d$compliance$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRefCacheStatus"],
    "008fef4d92b8244ebf36f2f3f898605cc56be22a6f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$tat$2d$compliance$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshRefCache"],
    "00b6268c56ba33af3b6d7c8c1378ed36a8cc4e7710",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$tat$2d$compliance$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTatCacheMetadata"],
    "6091ffd7388c4ed266b4a7a642c43abee37365ff42",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$tat$2d$compliance$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTatFilterOptions"],
    "78275ce71605479e82a117b1455e1c7ee387869fdf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getExpeditedUrgentProviderTatChartData"],
    "783469d1a742f18697970aba5e9d9862e97c83a4ff",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRoutineProviderTatChartData"],
    "789c5657cb3564cc2032b44a818bab019f1562302e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getExpeditedUrgentMemberTatChartData"],
    "789e5a0e5e49baf2086c003504fd6b140ddf4a1c28",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRoutineTatChartData"],
    "78dc14f6c35d80108154c55ec0fb0eac156a44b899",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStatusChartData"],
    "7f7aef72bed002647f8fc48d0671ef351e3cb422b3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$tat$2d$compliance$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHscRecordsForTatCompliance"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f2e$next$2d$internal$2f$server$2f$app$2f$dashboards$2f$um$2d$tat$2d$compliance$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$tat$2d$compliance$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/apps/dashboards/.next-internal/server/app/dashboards/um-tat-compliance/page/actions.js { ACTIONS_MODULE0 => "[project]/apps/dashboards/lib/api/chart-data-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/apps/dashboards/features/um/actions/tat-compliance-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$chart$2d$data$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/chart-data-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$tat$2d$compliance$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/features/um/actions/tat-compliance-actions.ts [app-rsc] (ecmascript)");
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

//# sourceMappingURL=_0ucr0az._.js.map