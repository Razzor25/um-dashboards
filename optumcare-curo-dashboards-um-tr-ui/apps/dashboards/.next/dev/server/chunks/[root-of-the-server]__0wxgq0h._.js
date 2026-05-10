module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/apps/dashboards/lib/constants/orgs.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/apps/dashboards/lib/formats.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Application-wide date and time format constants
 */ __turbopack_context__.s([
    "DATETIME_FORMAT",
    ()=>DATETIME_FORMAT,
    "DATE_FORMAT",
    ()=>DATE_FORMAT,
    "dateFormatOptions",
    ()=>dateFormatOptions,
    "dateTimeFormatOptions",
    ()=>dateTimeFormatOptions,
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime,
    "formatDateTimeInZone",
    ()=>formatDateTimeInZone,
    "formatISODate",
    ()=>formatISODate,
    "formatISODateTime",
    ()=>formatISODateTime
]);
const DATE_FORMAT = "MM/DD/YYYY";
const DATETIME_FORMAT = "MM/DD/YYYY HH:MM:SS Timezone";
const dateFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
};
const dateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short"
};
function formatDate(date) {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", dateFormatOptions);
}
function formatDateTime(date) {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", dateTimeFormatOptions);
}
function formatDateTimeInZone(date, timeZone) {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleString("en-US", {
        ...dateTimeFormatOptions,
        timeZone
    });
}
function formatISODate(isoString) {
    try {
        return formatDate(new Date(isoString));
    } catch  {
        return isoString;
    }
}
function formatISODateTime(isoString) {
    try {
        return formatDateTime(new Date(isoString));
    } catch  {
        return isoString;
    }
}
}),
"[project]/apps/dashboards/lib/api/server-call-logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/apps/dashboards/lib/graphql/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "requestGraphql",
    ()=>requestGraphql
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/server-call-logger.ts [app-route] (ecmascript)");
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
    const requestId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerCallId"])();
    const startedAt = Date.now();
    const payloadLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildGraphqlPayloadLog"])(query, variables);
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logServerCall"])({
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logServerCall"])({
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logServerCall"])({
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$server$2d$call$2d$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logServerCall"])({
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
"[project]/apps/dashboards/lib/api/hsc-graphql-client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hscGraphqlRequest",
    ()=>hscGraphqlRequest
]);
/**
 * HSC GraphQL wrapper.
 * Kept as a thin compatibility layer while the app is reorganized by domain.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/graphql/client.ts [app-route] (ecmascript)");
;
async function hscGraphqlRequest(query, variables) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requestGraphql"])("hsc", query, variables);
}
}),
"[project]/apps/dashboards/lib/api/graphql-client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "graphqlRequest",
    ()=>graphqlRequest
]);
/**
 * ADM GraphQL wrapper.
 * Kept as a thin compatibility layer while the app is reorganized by domain.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/graphql/client.ts [app-route] (ecmascript)");
;
async function graphqlRequest(query, variables) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requestGraphql"])("adm", query, variables);
}
}),
"[project]/apps/dashboards/lib/shared/hsc-ref-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/graphql-client.ts [app-route] (ecmascript)");
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
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$graphql$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["graphqlRequest"])(query);
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
"[project]/apps/dashboards/features/cgp/services/oncology-auth-status-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40c87310e4574dccb7bfc9aa26757d6abe3771e0a7":{"name":"getOncologyAuthStatusData"}},"apps/dashboards/features/cgp/services/oncology-auth-status-service.ts",""] */ __turbopack_context__.s([
    "getOncologyAuthStatusData",
    ()=>getOncologyAuthStatusData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/constants/orgs.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/formats.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/hsc-graphql-client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$shared$2f$hsc$2d$ref$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/shared/hsc-ref-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)");
;
;
;
;
;
const EXCLUDED_STATUS_IDS = [
    1002526,
    1002259
];
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
    "75cf6f56-9b91-44eb-b80a-7ede3cb5273b"
];
function getDateBounds(dateRange) {
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
    return {
        startDate,
        endDate
    };
}
function getMonthLabel(isoDate) {
    return new Date(isoDate).toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit"
    });
}
function getMonthKey(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
}
function getMemberName(payload) {
    if (!payload || typeof payload !== "object") {
        return "-";
    }
    const source = payload;
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
function getSuperCommunity(payload) {
    if (!payload || typeof payload !== "object") {
        return "-";
    }
    const record = payload;
    const value = record.memberEligibilities?.[0]?.eligibilityPod?.superCommunity;
    return typeof value === "string" && value.trim().length > 0 ? value : "-";
}
function getOrgName(orgId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PREHASHED_ORG_BY_ID"][orgId] ?? orgId;
}
function parseNumeric(value) {
    if (typeof value === "number") {
        return value;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
}
function normalizeLabel(value) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}
function deriveAuthStatus(status, statusReason) {
    const normalizedReason = normalizeLabel(statusReason);
    if (normalizedReason === "autoapproved") {
        return "Auto Approved";
    }
    return status;
}
const EXCLUDED_CHART_STATUS_NORMALIZED = new Set([
    "tracking",
    "draftnotsubmitted"
]);
async function getOncologyAuthStatusData(dateRange) {
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
    const hscResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hscGraphqlRequest"])(query, {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        excludedStatusIds: EXCLUDED_STATUS_IDS,
        excludedCreatorIds: EXCLUDED_CREATOR_IDS,
        limit: 5000
    });
    const rows = hscResponse.hsc ?? [];
    const refLookup = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$shared$2f$hsc$2d$ref$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHscRefLookup"])();
    const hscIds = rows.map((row)=>parseNumeric(row.hsc_id)).filter((value)=>value > 0);
    const decisionLookup = new Map();
    if (hscIds.length > 0) {
        const decisionResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$hsc$2d$graphql$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hscGraphqlRequest"])(`
        query GetOncologyDecisionDates($hscIds: [bigint!]!) {
          hsc_decn(where: { hsc_id: { _in: $hscIds } }, order_by: [{ decn_rndr_dttm: desc }]) {
            hsc_id
            decn_rndr_dttm
          }
        }
      `, {
            hscIds
        });
        for (const item of decisionResponse.hsc_decn || []){
            const key = String(item.hsc_id);
            if (decisionLookup.has(key)) {
                continue;
            }
            if (item.decn_rndr_dttm) {
                decisionLookup.set(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatDate"])(item.decn_rndr_dttm));
            }
        }
    }
    const trendMap = new Map();
    const statusMap = new Map();
    const monthKeyToLabel = new Map();
    const monthStatusMap = new Map();
    const normalizedRows = [];
    for (const row of rows){
        const resolvedStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$shared$2f$hsc$2d$ref$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRef"])(refLookup, row.hsc_sts_typ_id) || "-";
        const resolvedStatusReason = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$shared$2f$hsc$2d$ref$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRef"])(refLookup, row.hsc_sts_rsn_typ_id) || "-";
        const authStatus = deriveAuthStatus(resolvedStatus, resolvedStatusReason);
        normalizedRows.push({
            row,
            authStatus,
            statusReason: resolvedStatusReason
        });
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
            monthStatusMap.set(monthKey, new Map());
        }
        const statusCounts = monthStatusMap.get(monthKey);
        if (statusCounts) {
            statusCounts.set(authStatus, (statusCounts.get(authStatus) ?? 0) + 1);
        }
    }
    const detailedInformationRows = normalizedRows.map(({ row, authStatus, statusReason })=>{
        const authId = String(row.hsc_id);
        return {
            authId,
            status: authStatus,
            statusReason,
            memberName: getMemberName(row.mbr_cov_dtl),
            createDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatDate"])(row.creat_dttm),
            decisionedDate: decisionLookup.get(authId) ?? "-",
            org: getOrgName(String(row.org_id)),
            superCommunity: getSuperCommunity(row.mbr_cov_dtl)
        };
    });
    const trendByMonth = Array.from(trendMap.entries()).map(([label, count])=>({
            label,
            count
        })).sort((left, right)=>{
        const leftDate = new Date(`01 ${left.label}`);
        const rightDate = new Date(`01 ${right.label}`);
        return leftDate.getTime() - rightDate.getTime();
    });
    const totalAuthsByStatus = Array.from(statusMap.entries()).map(([label, count])=>({
            label,
            count
        })).sort((a, b)=>b.count - a.count);
    const orderedMonthKeys = Array.from(monthStatusMap.keys()).sort((a, b)=>a.localeCompare(b));
    const orderedMonths = orderedMonthKeys.map((monthKey)=>monthKeyToLabel.get(monthKey) ?? monthKey);
    const orderedStatuses = totalAuthsByStatus.map((item)=>item.label);
    const trendByMonthStatus = {
        months: orderedMonths,
        series: orderedStatuses.map((statusLabel)=>({
                label: statusLabel,
                values: orderedMonthKeys.map((monthKey)=>monthStatusMap.get(monthKey)?.get(statusLabel) ?? 0)
            }))
    };
    return {
        trendByMonth,
        trendByMonthStatus,
        totalAuthsByStatus,
        detailedInformationRows
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getOncologyAuthStatusData
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getOncologyAuthStatusData, "40c87310e4574dccb7bfc9aa26757d6abe3771e0a7", null);
}),
"[project]/apps/dashboards/app/api/cgp/oncology-auth-status/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$cgp$2f$services$2f$oncology$2d$auth$2d$status$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/features/cgp/services/oncology-auth-status-service.ts [app-route] (ecmascript)");
;
const runtime = "nodejs";
const dynamic = "force-dynamic";
const ALLOWED_DATE_RANGES = new Set([
    "last-7-days",
    "last-30-days",
    "last-90-days",
    "year-to-date"
]);
function parseDateRange(value) {
    const fallback = "last-30-days";
    if (!value) {
        return fallback;
    }
    const candidate = value;
    return ALLOWED_DATE_RANGES.has(candidate) ? candidate : fallback;
}
async function GET(request) {
    try {
        const dateRange = parseDateRange(request.nextUrl.searchParams.get("dateRange"));
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$cgp$2f$services$2f$oncology$2d$auth$2d$status$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOncologyAuthStatusData"])(dateRange);
        return Response.json(data, {
            status: 200
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load oncology auth status data";
        return Response.json({
            error: message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0wxgq0h._.js.map