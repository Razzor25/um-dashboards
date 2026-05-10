(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/dashboards/features/adm/actions/data:fd41ce [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHscRecords",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"7f9ab7acc337a0030a042562a8b30fff99e309c21f":{"name":"getHscRecords"}},"apps/dashboards/features/adm/actions/inpatient-census-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("7f9ab7acc337a0030a042562a8b30fff99e309c21f", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getHscRecords");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/dashboards/lib/formats.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/dashboards/lib/constants/orgs.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/dashboards/app/components/FilterSelect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FilterSelect",
    ()=>FilterSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@uhg-netra-ai/core-react-components/src/ui/select.js [app-client] (ecmascript)");
;
;
function FilterSelect({ id, label, value, options, optionLabels, size = "md", onChange }) {
    const sizeClasses = {
        sm: "h-8 px-2 text-sm",
        md: "h-10 px-3 text-sm"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        htmlFor: id,
        className: "flex flex-col gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-medium text-slate-700",
                children: label
            }, void 0, false, {
                fileName: "[project]/apps/dashboards/app/components/FilterSelect.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                value: value,
                onValueChange: onChange,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                        id: id,
                        className: `w-full rounded-lg border-slate-300 bg-white text-slate-700 focus:border-cyan-500 ${sizeClasses[size]}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                            placeholder: label
                        }, void 0, false, {
                            fileName: "[project]/apps/dashboards/app/components/FilterSelect.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboards/app/components/FilterSelect.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                        children: options.map((option, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: option,
                                children: optionLabels?.[index] || option
                            }, option, false, {
                                fileName: "[project]/apps/dashboards/app/components/FilterSelect.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboards/app/components/FilterSelect.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/dashboards/app/components/FilterSelect.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/dashboards/app/components/FilterSelect.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = FilterSelect;
var _c;
__turbopack_context__.k.register(_c, "FilterSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/dashboards/app/components/FilterChip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FilterChip",
    ()=>FilterChip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function FilterChip({ label, isSelected, onClick, size = "md", badge, children }) {
    const sizeClasses = {
        sm: "px-3 py-1.5 text-xs font-medium",
        md: "px-4 py-2 text-sm font-medium"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: `inline-flex items-center gap-2 rounded-full border transition-colors whitespace-nowrap ${isSelected ? "border-cyan-500 bg-cyan-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"} ${sizeClasses[size]}`,
        children: [
            label,
            badge !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-1 rounded-full bg-cyan-600 px-1.5 py-0.5 text-[10px] font-bold text-white leading-none",
                children: badge
            }, void 0, false, {
                fileName: "[project]/apps/dashboards/app/components/FilterChip.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/apps/dashboards/app/components/FilterChip.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = FilterChip;
var _c;
__turbopack_context__.k.register(_c, "FilterChip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UmInpatientCensusPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$adm$2f$actions$2f$data$3a$fd41ce__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/apps/dashboards/features/adm/actions/data:fd41ce [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/formats.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/constants/orgs.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$FilterSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/app/components/FilterSelect.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$FilterChip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/app/components/FilterChip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@uhg-netra-ai/core-react-components/src/ui/select.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const DEFAULT_PAGE_SIZE = 50;
const PAGE_SIZE_OPTIONS = [
    50,
    100,
    200,
    500
];
const MULTISELECT_FILTERS = [
    {
        key: "admitType",
        label: "Admit Type"
    },
    {
        key: "clinician",
        label: "Clinician"
    },
    {
        key: "facility",
        label: "Facility"
    },
    {
        key: "hceLevel",
        label: "HCE Level"
    },
    {
        key: "hceReadmissionRisk",
        label: "HCE Readmission Risk"
    },
    {
        key: "healthPlan",
        label: "Health Plan"
    },
    {
        key: "memberState",
        label: "Member State"
    },
    {
        key: "bh",
        label: "BH"
    },
    {
        key: "org",
        label: "Org"
    },
    {
        key: "serviceDetail",
        label: "Service Detail"
    },
    {
        key: "ipa",
        label: "IPA"
    }
];
const dateRanges = [
    {
        key: "ytd",
        label: "Year to date"
    },
    {
        key: "last3Years",
        label: "Last 3 years"
    },
    {
        key: "lastYear",
        label: "Last year"
    },
    {
        key: "last3Months",
        label: "Last 3 months"
    },
    {
        key: "lastMonth",
        label: "Last month"
    },
    {
        key: "lastWeek",
        label: "Last week"
    },
    {
        key: "today",
        label: "Today"
    }
];
const statusFilters = [
    "Active Admissions",
    "Discharged Pending Closure",
    "Discharged Closed",
    "Anticipated Admission",
    "Other"
];
const CHIP_STATUS_DETAILS = {
    "Active Admissions": [
        {
            id: 1004238,
            label: "Open (Admitted)"
        }
    ],
    "Discharged Pending Closure": [
        {
            id: 1004239,
            label: "Open (Discharged)"
        }
    ],
    "Discharged Closed": [
        {
            id: 1006597,
            label: "Closed (Discharged)"
        }
    ],
    "Anticipated Admission": [
        {
            id: 1002259,
            label: "Draft"
        },
        {
            id: 1005617,
            label: "Draft Not Submitted"
        }
    ],
    "Other": [
        {
            id: 1000894,
            label: "Canceled"
        },
        {
            id: 1002526,
            label: "Abandoned"
        },
        {
            id: 1004361,
            label: "Terminated"
        },
        {
            id: 1005694,
            label: "Draft Expired"
        }
    ]
};
const columnGroups = [
    {
        name: "Requested Order",
        columns: [
            {
                key: "authId",
                label: "Auth ID",
                hscField: "hsc_id"
            },
            {
                key: "member",
                label: "Member Name",
                hscField: "mbr_cov_dtl.lastName, mbr_cov_dtl.firstName"
            },
            {
                key: "subscriberId",
                label: "Subscriber ID",
                hscField: "mbr_cov_dtl.memberEligibilities[0].subscriberId"
            },
            {
                key: "received",
                label: "Received",
                hscField: "creat_dttm"
            },
            {
                key: "actualAdmitted",
                label: "Actual Admitted",
                hscField: "hsc_facl.actul_admis_dttm::date"
            },
            {
                key: "nextReview",
                label: "Next Review",
                hscField: "hsc_facl.nxt_rvw_dt"
            },
            {
                key: "admitType",
                label: "Admit Type",
                hscField: "ref_id: hsc_facl.admis_typ_ref_id"
            },
            {
                key: "los",
                label: "LOS",
                hscField: "hsc_facl.actul_admis_dttm"
            },
            {
                key: "pos",
                label: "POS",
                hscField: "ref_id: hsc.srvc_pl_ref_id"
            },
            {
                key: "serviceDetail",
                label: "Service Detail",
                hscField: "hsc_facl.srvc_dtl_ref_id"
            },
            {
                key: "admittingProvider",
                label: "Admitting Provider",
                hscField: "hsc_prov.prov_role_ref_id=1002775"
            },
            {
                key: "facility",
                label: "Facility",
                hscField: "hsc_prov.prov_role_ref_id=1000908"
            },
            {
                key: "admittingDiagnosis",
                label: "Admitting Diagnosis",
                hscField: "hsc_diag(diag_typ_ref_id=1004535, pri_ind=1) -> icd10.full_desc"
            },
            {
                key: "healthPlan",
                label: "Health Plan",
                hscField: "mbr_cov_dtl.memberEligibilities[0].healthPlanName"
            },
            {
                key: "lineOfBusiness",
                label: "Line of Business",
                hscField: "jsonb_array_elements(mbr_cov_dtl.memberEligibilities)->>lobValue"
            },
            {
                key: "pcp",
                label: "PCP",
                hscField: "mbr_cov_dtl.memberEligibilities[0].pcp.name"
            },
            {
                key: "hceLevel",
                label: "HCE Level",
                hscField: "pha_id_strat.hce_level (joined by indv_id)"
            },
            {
                key: "hceReadmissionRisk",
                label: "HCE Readmission Risk",
                hscField: "hsc_decn.readmis_risk_scor_id"
            },
            {
                key: "readmission",
                label: "Readmission",
                hscField: "hsc_facl.dschrg_dt_fr_ip_census"
            },
            {
                key: "riskScoreAssessment",
                label: "Risk Score Assessment",
                hscField: "pha_readmit_risk.readmit_risk"
            },
            {
                key: "referralPathway",
                label: "Referral Pathway",
                hscField: "pha_id_strat.referral_pathway (joined by indv_id)"
            },
            {
                key: "memberState",
                label: "Member State",
                hscField: "mbr_cov_dtl.memberAddresses[0].stateValue"
            },
            {
                key: "clinician",
                label: "Clinician",
                hscField: "hsr_asgn.asgn_to_user_nm (asgn_typ_ref_id=1002281)"
            },
            {
                key: "totalApproved",
                label: "Total Approved",
                hscField: "hsc_facl.approved_bed_day_cnt"
            },
            {
                key: "totalDenied",
                label: "Total Denied",
                hscField: "hsc_facl.denied_bed_day_cnt"
            },
            {
                key: "bh",
                label: "BH",
                hscField: "pha_id_strat.behavioral_health_category (joined by indv_id)"
            },
            {
                key: "medicareNo",
                label: "Medicare No",
                hscField: "mbr_cov_dtl.mbiId"
            },
            {
                key: "dob",
                label: "DOB",
                hscField: "mbr_cov_dtl.birthDate"
            },
            {
                key: "superCommunity",
                label: "Super Community",
                hscField: "mbr_cov_dtl.memberEligibilities[0].eligibilityPod.superCommunity"
            },
            {
                key: "ipa",
                label: "IPA",
                hscField: "mbr_cov_dtl.memberEligibilities[0].eligibilityPod.podName"
            },
            {
                key: "org",
                label: "Org",
                hscField: "org_id -> PREHASHED_ORG_BY_ID"
            }
        ]
    }
];
// Flatten for easy lookup
const columns = columnGroups.flatMap((g)=>g.columns);
const authRecords = [
    {
        authId: "AUTH-10241",
        subscriberId: "SUB-884201",
        received: "Apr 21, 2026",
        receivedAt: "2026-04-21",
        actualAdmitted: "Apr 21, 2026",
        nextReview: "Apr 24, 2026",
        admitType: "Urgent",
        los: 4,
        pos: "Inpatient",
        serviceDetail: "Medical stabilization",
        admittingProvider: "Dr. L. Patel",
        member: "Amelia Torres",
        facility: "Northside Medical Center",
        admittingDiagnosis: "CHF exacerbation",
        healthPlan: "UnitedHealthcare",
        lineOfBusiness: "Medicaid",
        pcp: "Dr. E. Harper",
        hceLevel: "Level 2",
        hceReadmissionRisk: "High",
        readmission: "Yes",
        riskScoreAssessment: "8.9",
        referralPathway: "ED",
        memberState: "TX",
        totalApproved: 4,
        totalDenied: 0,
        bh: "No",
        medicareNo: "M1024901",
        dob: "02/14/1954",
        superCommunity: "Gulf Coast",
        ipa: "Lone Star IPA",
        org: "Optum South",
        status: "Active Admissions"
    },
    {
        authId: "AUTH-10237",
        subscriberId: "SUB-884155",
        received: "Apr 19, 2026",
        receivedAt: "2026-04-19",
        actualAdmitted: "Apr 20, 2026",
        nextReview: "Apr 23, 2026",
        admitType: "Elective",
        los: 2,
        pos: "Inpatient",
        serviceDetail: "Post-op monitoring",
        admittingProvider: "Dr. K. Morgan",
        member: "Joseph Kim",
        facility: "Curo Regional Hospital",
        admittingDiagnosis: "Hip replacement",
        healthPlan: "UnitedHealthcare",
        lineOfBusiness: "Commercial",
        pcp: "Dr. R. Mason",
        hceLevel: "Level 1",
        hceReadmissionRisk: "Medium",
        readmission: "No",
        riskScoreAssessment: "5.4",
        referralPathway: "Direct Admit",
        memberState: "AZ",
        totalApproved: 2,
        totalDenied: 0,
        bh: "No",
        medicareNo: "M1024877",
        dob: "11/06/1961",
        superCommunity: "Desert Valley",
        ipa: "Sonoran IPA",
        org: "Optum West",
        status: "Active Admissions"
    },
    {
        authId: "AUTH-10229",
        subscriberId: "SUB-884002",
        received: "Apr 17, 2026",
        receivedAt: "2026-04-17",
        actualAdmitted: "Apr 18, 2026",
        nextReview: "Closed",
        admitType: "Urgent",
        los: 6,
        pos: "Inpatient",
        serviceDetail: "Respiratory management",
        admittingProvider: "Dr. P. Owens",
        member: "Diana Brooks",
        facility: "St. Mary Health",
        admittingDiagnosis: "COPD flare",
        healthPlan: "UnitedHealthcare",
        lineOfBusiness: "Medicare",
        pcp: "Dr. S. Lane",
        hceLevel: "Level 3",
        hceReadmissionRisk: "High",
        readmission: "Yes",
        riskScoreAssessment: "9.1",
        referralPathway: "ED",
        memberState: "NM",
        totalApproved: 6,
        totalDenied: 1,
        bh: "No",
        medicareNo: "M1024812",
        dob: "09/02/1949",
        superCommunity: "High Plains",
        ipa: "Mesa IPA",
        org: "Optum Southwest",
        status: "Discharged Pending Closure"
    },
    {
        authId: "AUTH-10214",
        subscriberId: "SUB-883921",
        received: "Apr 15, 2026",
        receivedAt: "2026-04-15",
        actualAdmitted: "Pending",
        nextReview: "Apr 22, 2026",
        admitType: "Observation",
        los: 1,
        pos: "Facility",
        serviceDetail: "Chest pain workup",
        admittingProvider: "Dr. N. Ibrahim",
        member: "Marcus Allen",
        facility: "Eastview Community Hospital",
        admittingDiagnosis: "Rule out ACS",
        healthPlan: "UnitedHealthcare",
        lineOfBusiness: "Commercial",
        pcp: "Dr. V. Simon",
        hceLevel: "Level 1",
        hceReadmissionRisk: "Low",
        readmission: "No",
        riskScoreAssessment: "3.6",
        referralPathway: "PCP",
        memberState: "TX",
        totalApproved: 1,
        totalDenied: 0,
        bh: "No",
        medicareNo: "M1024788",
        dob: "03/29/1980",
        superCommunity: "Metroplex",
        ipa: "North Texas IPA",
        org: "Optum South",
        status: "Anticipated Admission"
    },
    {
        authId: "AUTH-10188",
        subscriberId: "SUB-883610",
        received: "Apr 10, 2026",
        receivedAt: "2026-04-10",
        actualAdmitted: "Apr 11, 2026",
        nextReview: "Apr 22, 2026",
        admitType: "Urgent",
        los: 11,
        pos: "Inpatient",
        serviceDetail: "Sepsis treatment",
        admittingProvider: "Dr. A. Reeves",
        member: "Gloria Young",
        facility: "Lakeshore Medical",
        admittingDiagnosis: "Sepsis",
        healthPlan: "UnitedHealthcare",
        lineOfBusiness: "Medicare",
        pcp: "Dr. H. Lowe",
        hceLevel: "Level 4",
        hceReadmissionRisk: "High",
        readmission: "No",
        riskScoreAssessment: "9.5",
        referralPathway: "ED",
        memberState: "OK",
        totalApproved: 10,
        totalDenied: 1,
        bh: "No",
        medicareNo: "M1024622",
        dob: "07/18/1947",
        superCommunity: "Red River",
        ipa: "Prairie IPA",
        org: "Optum Central",
        status: "Active Admissions"
    },
    {
        authId: "AUTH-10140",
        subscriberId: "SUB-883211",
        received: "Mar 27, 2026",
        receivedAt: "2026-03-27",
        actualAdmitted: "Mar 28, 2026",
        nextReview: "Closed",
        admitType: "Elective",
        los: 3,
        pos: "Inpatient",
        serviceDetail: "Cardiac monitoring",
        admittingProvider: "Dr. C. Quinn",
        member: "Helen Price",
        facility: "Riverbend Heart Institute",
        admittingDiagnosis: "AFib",
        healthPlan: "UnitedHealthcare",
        lineOfBusiness: "Commercial",
        pcp: "Dr. F. Grant",
        hceLevel: "Level 2",
        hceReadmissionRisk: "Medium",
        readmission: "No",
        riskScoreAssessment: "6.2",
        referralPathway: "Specialist",
        memberState: "CO",
        totalApproved: 3,
        totalDenied: 0,
        bh: "No",
        medicareNo: "M1024330",
        dob: "04/25/1958",
        superCommunity: "Front Range",
        ipa: "Rocky Mountain IPA",
        org: "Optum Mountain",
        status: "Discharged Pending Closure"
    },
    {
        authId: "AUTH-10094",
        subscriberId: "SUB-882845",
        received: "Mar 03, 2026",
        receivedAt: "2026-03-03",
        actualAdmitted: "Pending",
        nextReview: "Apr 22, 2026",
        admitType: "Urgent",
        los: 2,
        pos: "Inpatient",
        serviceDetail: "Behavioral health stabilization",
        admittingProvider: "Dr. T. Booker",
        member: "Naomi Sanders",
        facility: "Harborview Behavioral Health",
        admittingDiagnosis: "Major depression",
        healthPlan: "UnitedHealthcare",
        lineOfBusiness: "Medicaid",
        pcp: "Dr. M. Ellis",
        hceLevel: "Level 2",
        hceReadmissionRisk: "Medium",
        readmission: "Yes",
        riskScoreAssessment: "7.0",
        referralPathway: "Behavioral Health",
        memberState: "CA",
        totalApproved: 2,
        totalDenied: 0,
        bh: "Yes",
        medicareNo: "M1024019",
        dob: "08/15/1989",
        superCommunity: "Pacific Care",
        ipa: "Bay Area IPA",
        org: "Optum West",
        status: "Anticipated Admission"
    },
    {
        authId: "AUTH-10031",
        subscriberId: "SUB-882490",
        received: "Feb 12, 2026",
        receivedAt: "2026-02-12",
        actualAdmitted: "Feb 13, 2026",
        nextReview: "Closed",
        admitType: "Urgent",
        los: 8,
        pos: "Inpatient",
        serviceDetail: "Stroke recovery",
        admittingProvider: "Dr. J. Alvarez",
        member: "Walter Gomez",
        facility: "Mercy General",
        admittingDiagnosis: "Ischemic stroke",
        healthPlan: "UnitedHealthcare",
        lineOfBusiness: "Medicare",
        pcp: "Dr. D. Peters",
        hceLevel: "Level 4",
        hceReadmissionRisk: "High",
        readmission: "No",
        riskScoreAssessment: "8.3",
        referralPathway: "ED",
        memberState: "NV",
        totalApproved: 8,
        totalDenied: 0,
        bh: "No",
        medicareNo: "M1023621",
        dob: "12/05/1951",
        superCommunity: "Silver State",
        ipa: "Desert Plains IPA",
        org: "Optum West",
        status: "Discharged Pending Closure"
    },
    {
        authId: "AUTH-09987",
        subscriberId: "SUB-881955",
        received: "Jan 29, 2026",
        receivedAt: "2026-01-29",
        actualAdmitted: "Jan 30, 2026",
        nextReview: "Feb 02, 2026",
        admitType: "Elective",
        los: 5,
        pos: "Inpatient",
        serviceDetail: "Spinal fusion",
        admittingProvider: "Dr. R. Duncan",
        member: "Patricia Cole",
        facility: "Summit Orthopedics",
        admittingDiagnosis: "Lumbar stenosis",
        healthPlan: "UnitedHealthcare",
        lineOfBusiness: "Commercial",
        pcp: "Dr. C. Burke",
        hceLevel: "Level 2",
        hceReadmissionRisk: "Low",
        readmission: "No",
        riskScoreAssessment: "4.2",
        referralPathway: "Specialist",
        memberState: "UT",
        totalApproved: 5,
        totalDenied: 0,
        bh: "No",
        medicareNo: "M1023188",
        dob: "06/10/1963",
        superCommunity: "Wasatch",
        ipa: "Summit IPA",
        org: "Optum Mountain",
        status: "Active Admissions"
    },
    {
        authId: "AUTH-09910",
        subscriberId: "SUB-881500",
        received: "Dec 18, 2025",
        receivedAt: "2025-12-18",
        actualAdmitted: "Dec 19, 2025",
        nextReview: "Closed",
        admitType: "Urgent",
        los: 7,
        pos: "Inpatient",
        serviceDetail: "Diabetic ketoacidosis",
        admittingProvider: "Dr. G. Watts",
        member: "Olivia Murphy",
        facility: "Cedar Valley Hospital",
        admittingDiagnosis: "DKA",
        healthPlan: "UnitedHealthcare",
        lineOfBusiness: "Medicaid",
        pcp: "Dr. T. Cole",
        hceLevel: "Level 3",
        hceReadmissionRisk: "Medium",
        readmission: "Yes",
        riskScoreAssessment: "7.7",
        referralPathway: "ED",
        memberState: "KS",
        totalApproved: 6,
        totalDenied: 1,
        bh: "No",
        medicareNo: "M1022710",
        dob: "01/22/1972",
        superCommunity: "Plains Care",
        ipa: "Heartland IPA",
        org: "Optum Central",
        status: "Discharged Pending Closure"
    }
];
function transformHscToAuthRecord(hsc, index, ref) {
    const creatDttm = new Date(hsc.creat_dttm);
    const resolve = (id)=>id != null ? ref[id] ?? String(id) : "";
    const subscriberId = extractSubscriberId(hsc.mbr_cov_dtl, hsc.indv_id, index);
    const los = calculateLos(hsc.hsc_facl_actul_admis_dttm);
    const pcpName = extractPcpName(hsc.mbr_cov_dtl);
    const nextReview = formatValidDateOrBlank(hsc.hsc_facl_nxt_rvw_dt);
    const eligibility = extractPrimaryEligibility(hsc.mbr_cov_dtl);
    const lineOfBusiness = extractLineOfBusiness(hsc.mbr_cov_dtl);
    const medicareNo = extractMedicareNo(hsc.mbr_cov_dtl);
    const memberName = extractMemberName(hsc.mbr_cov_dtl, hsc.indv_id);
    const memberState = extractMemberState(hsc.mbr_cov_dtl, resolve);
    return {
        authId: String(hsc.hsc_id) || `AUTH-${index}`,
        subscriberId,
        received: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateTime"])(creatDttm),
        receivedAt: (hsc.creat_dttm || "").split("T")[0] ?? "",
        actualAdmitted: hsc.hsc_facl_actul_admis_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(new Date(hsc.hsc_facl_actul_admis_dttm)) : "Pending",
        nextReview,
        admitType: resolve(hsc.auth_typ_ref_id) || "Unknown",
        los,
        pos: "-",
        serviceDetail: resolve(hsc.hsc_facl_srvc_dtl_ref_id) || hsc.rev_prr_rsn_txt || "Service",
        member: memberName,
        admittingProvider: hsc.hsc_prov_admitting_prov_name || "Unknown",
        facility: hsc.hsc_prov_facility_name || hsc.org_id || "Unknown",
        admittingDiagnosis: hsc.hsc_diag_admitting_diag_desc || "Unknown",
        healthPlan: eligibility?.healthPlanName || "Unknown",
        lineOfBusiness,
        pcp: pcpName,
        hceLevel: hsc.pha_id_strat_hce_level || "Unknown",
        hceReadmissionRisk: String(hsc.hsc_decn_readmis_risk_scor_id ?? ""),
        readmission: hsc.hsc_facl_dschrg_dt_fr_ip_census || "",
        riskScoreAssessment: String(hsc.pha_readmit_risk_readmit_risk ?? ""),
        referralPathway: hsc.pha_id_strat_referral_pathway || "Unknown",
        memberState,
        clinician: hsc.hsr_asgn_clinician_name || "Unknown",
        totalApproved: hsc.hsc_facl_approved_bed_day_cnt ?? 0,
        totalDenied: hsc.hsc_facl_denied_bed_day_cnt ?? 0,
        bh: hsc.pha_id_strat_behavioral_health_category || "Unknown",
        medicareNo,
        dob: "/",
        superCommunity: eligibility?.eligibilityPod?.superCommunity || "Unknown",
        ipa: eligibility?.eligibilityPod?.podName || "Unknown",
        org: resolveOrgName(hsc.org_id),
        status: "Active Admissions"
    };
}
function resolveOrgName(orgId) {
    if (!orgId) {
        return "Unknown";
    }
    const normalized = String(orgId).trim();
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PREHASHED_ORG_BY_ID"][normalized] || normalized;
}
function formatValidDateOrBlank(value) {
    if (!value) {
        return "";
    }
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return "";
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(parsed);
}
function calculateLos(actualAdmittedDate) {
    if (!actualAdmittedDate) {
        return 0;
    }
    const admitted = new Date(`${actualAdmittedDate}T12:00:00Z`);
    if (Number.isNaN(admitted.getTime())) {
        return 0;
    }
    const today = new Date();
    const current = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    const admittedUtc = Date.UTC(admitted.getUTCFullYear(), admitted.getUTCMonth(), admitted.getUTCDate());
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.max(0, Math.floor((current - admittedUtc) / msPerDay));
}
function extractMemberState(coverageDetail, resolveRef) {
    const detail = normalizeCoverageDetail(coverageDetail);
    const addresses = detail?.memberAddresses ?? [];
    if (addresses.length === 0) {
        return "-";
    }
    const preferred = addresses.find((address)=>(address.stateValue || "").trim().length > 0) || addresses[0];
    if (!preferred) {
        return "-";
    }
    const stateValue = (preferred.stateValue || "").trim();
    if (stateValue) {
        return stateValue;
    }
    const stateRefId = Number(preferred.state);
    if (!Number.isNaN(stateRefId)) {
        const resolved = resolveRef(stateRefId).trim();
        if (resolved) {
            return resolved;
        }
    }
    return "-";
}
function extractMemberName(coverageDetail, fallbackIndvId) {
    const detail = normalizeCoverageDetail(coverageDetail);
    return buildMemberName(detail?.firstName, detail?.lastName, fallbackIndvId);
}
function buildMemberName(firstName, lastName, fallback) {
    const first = (firstName || "").trim();
    const last = (lastName || "").trim();
    if (first || last) {
        const comma = first && last ? ", " : "";
        return `${last}${comma}${first}`.trim();
    }
    return fallback ? String(fallback) : "Unknown";
}
function extractSubscriberId(coverageDetail, fallbackIndvId, index) {
    const detail = normalizeCoverageDetail(coverageDetail);
    const eligibilities = detail?.memberEligibilities ?? [];
    if (eligibilities.length > 1) {
        return "<multiple eligibilities>";
    }
    if (eligibilities.length === 1) {
        const firstEligibility = eligibilities[0];
        if (firstEligibility) {
            return firstEligibility.subscriberId || String(fallbackIndvId) || `SUB-${index}`;
        }
    }
    return String(fallbackIndvId) || `SUB-${index}`;
}
function extractPcpName(coverageDetail) {
    const detail = normalizeCoverageDetail(coverageDetail);
    const eligibilities = detail?.memberEligibilities ?? [];
    if (eligibilities.length === 0) return "Unknown";
    const pcpName = eligibilities[0]?.pcp?.name;
    return pcpName ? String(pcpName).trim() : "Unknown";
}
function extractPrimaryEligibility(coverageDetail) {
    const detail = normalizeCoverageDetail(coverageDetail);
    const eligibilities = detail?.memberEligibilities ?? [];
    return eligibilities.length > 0 ? eligibilities[0] ?? null : null;
}
function extractLineOfBusiness(coverageDetail) {
    const detail = normalizeCoverageDetail(coverageDetail);
    const eligibilities = detail?.memberEligibilities ?? [];
    if (eligibilities.length === 0) {
        return "Unknown";
    }
    const lobValues = Array.from(new Set(eligibilities.map((eligibility)=>eligibility.lobValue ? String(eligibility.lobValue).trim() : "").filter((value)=>value.length > 0)));
    return lobValues.length > 0 ? lobValues.join(", ") : "Unknown";
}
function extractMedicareNo(coverageDetail) {
    const detail = normalizeCoverageDetail(coverageDetail);
    const mbiId = detail?.mbiId;
    return mbiId ? String(mbiId).trim() : "Unknown";
}
function normalizeCoverageDetail(value) {
    if (!value) {
        return null;
    }
    if (typeof value === "string") {
        try {
            return JSON.parse(value);
        } catch  {
            return null;
        }
    }
    if (typeof value === "object") {
        return value;
    }
    return null;
}
function UmInpatientCensusPage() {
    _s();
    const [dateRange, setDateRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("today");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Active Admissions");
    const [sortKey, setSortKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("received");
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desc");
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [pageSize, setPageSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_PAGE_SIZE);
    const [records, setRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [totalCount, setTotalCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [visibleColumns, setVisibleColumns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set(columns.map({
        "UmInpatientCensusPage.useState": (c)=>c.key
    }["UmInpatientCensusPage.useState"])));
    const [forceShownColumns, setForceShownColumns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [collapsedGroups, setCollapsedGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [showColumnModal, setShowColumnModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isExportingCsv, setIsExportingCsv] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [openFilter, setOpenFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [columnFilters, setColumnFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [filterPanelOpen, setFilterPanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [filterPanelPinned, setFilterPanelPinned] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UmInpatientCensusPage.useEffect": ()=>{
            const loadData = {
                "UmInpatientCensusPage.useEffect.loadData": async ()=>{
                    try {
                        setIsLoading(true);
                        setError(null);
                        const filtersForServer = {};
                        for (const [key, set] of Object.entries(columnFilters)){
                            if (set.size > 0) filtersForServer[key] = Array.from(set);
                        }
                        const { records: hscRecords, totalCount: count, refLookup } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$adm$2f$actions$2f$data$3a$fd41ce__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getHscRecords"])(dateRange, page, pageSize, statusFilter, sortKey, sortDirection, filtersForServer);
                        const transformedRecords = hscRecords.map({
                            "UmInpatientCensusPage.useEffect.loadData.transformedRecords": (hsc, index)=>transformHscToAuthRecord(hsc, index, refLookup)
                        }["UmInpatientCensusPage.useEffect.loadData.transformedRecords"]);
                        setRecords(transformedRecords);
                        setTotalCount(count);
                    } catch (err) {
                        const errorMessage = err instanceof Error ? err.message : "Failed to load data";
                        setError(errorMessage);
                        console.error("Error loading HSC data:", err);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["UmInpatientCensusPage.useEffect.loadData"];
            loadData();
        }
    }["UmInpatientCensusPage.useEffect"], [
        dateRange,
        page,
        pageSize,
        statusFilter,
        sortKey,
        sortDirection,
        columnFilters
    ]);
    const sortedRecords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UmInpatientCensusPage.useMemo[sortedRecords]": ()=>{
            return [
                ...records
            ].sort({
                "UmInpatientCensusPage.useMemo[sortedRecords]": (left, right)=>{
                    const leftValue = getSortValue(left, sortKey);
                    const rightValue = getSortValue(right, sortKey);
                    if (typeof leftValue === "number" && typeof rightValue === "number") {
                        return sortDirection === "asc" ? leftValue - rightValue : rightValue - leftValue;
                    }
                    const comparison = String(leftValue).localeCompare(String(rightValue), undefined, {
                        numeric: true,
                        sensitivity: "base"
                    });
                    return sortDirection === "asc" ? comparison : -comparison;
                }
            }["UmInpatientCensusPage.useMemo[sortedRecords]"]);
        }
    }["UmInpatientCensusPage.useMemo[sortedRecords]"], [
        records,
        sortDirection,
        sortKey
    ]);
    const filterOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UmInpatientCensusPage.useMemo[filterOptions]": ()=>{
            const opts = {};
            for (const { key } of MULTISELECT_FILTERS){
                const values = new Set();
                for (const record of records){
                    const v = String(record[key] ?? "").trim();
                    if (v && v.toLowerCase() !== "unknown" && v !== "-") {
                        values.add(v);
                    }
                }
                opts[key] = Array.from(values).sort();
            }
            return opts;
        }
    }["UmInpatientCensusPage.useMemo[filterOptions]"], [
        records
    ]);
    const autoHiddenColumnKeys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UmInpatientCensusPage.useMemo[autoHiddenColumnKeys]": ()=>{
            if (sortedRecords.length === 0) {
                return new Set();
            }
            const keys = new Set();
            for (const column of columns){
                if (!visibleColumns.has(column.key)) {
                    continue;
                }
                if (forceShownColumns.has(column.key)) {
                    continue;
                }
                const hasAnyValue = sortedRecords.some({
                    "UmInpatientCensusPage.useMemo[autoHiddenColumnKeys].hasAnyValue": (record)=>hasDisplayValue(record[column.key])
                }["UmInpatientCensusPage.useMemo[autoHiddenColumnKeys].hasAnyValue"]);
                if (!hasAnyValue) {
                    keys.add(column.key);
                }
            }
            return keys;
        }
    }["UmInpatientCensusPage.useMemo[autoHiddenColumnKeys]"], [
        sortedRecords,
        visibleColumns,
        forceShownColumns
    ]);
    const displayedColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UmInpatientCensusPage.useMemo[displayedColumns]": ()=>columns.filter({
                "UmInpatientCensusPage.useMemo[displayedColumns]": (column)=>visibleColumns.has(column.key) && !autoHiddenColumnKeys.has(column.key)
            }["UmInpatientCensusPage.useMemo[displayedColumns]"])
    }["UmInpatientCensusPage.useMemo[displayedColumns]"], [
        visibleColumns,
        autoHiddenColumnKeys
    ]);
    const manuallyHiddenColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UmInpatientCensusPage.useMemo[manuallyHiddenColumns]": ()=>columns.filter({
                "UmInpatientCensusPage.useMemo[manuallyHiddenColumns]": (column)=>!visibleColumns.has(column.key)
            }["UmInpatientCensusPage.useMemo[manuallyHiddenColumns]"])
    }["UmInpatientCensusPage.useMemo[manuallyHiddenColumns]"], [
        visibleColumns
    ]);
    const autoHiddenColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UmInpatientCensusPage.useMemo[autoHiddenColumns]": ()=>columns.filter({
                "UmInpatientCensusPage.useMemo[autoHiddenColumns]": (column)=>visibleColumns.has(column.key) && autoHiddenColumnKeys.has(column.key)
            }["UmInpatientCensusPage.useMemo[autoHiddenColumns]"])
    }["UmInpatientCensusPage.useMemo[autoHiddenColumns]"], [
        visibleColumns,
        autoHiddenColumnKeys
    ]);
    const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
    const currentPage = Math.min(page, pageCount);
    function handleSort(column) {
        setPage(1);
        if (sortKey === column) {
            setSortDirection((current)=>current === "asc" ? "desc" : "asc");
            return;
        }
        setSortKey(column);
        setSortDirection("asc");
    }
    function toggleColumn(columnKey) {
        setVisibleColumns((current)=>{
            const next = new Set(current);
            if (next.has(columnKey)) {
                next.delete(columnKey);
            } else {
                next.add(columnKey);
            }
            return next;
        });
        setForceShownColumns((current)=>{
            const next = new Set(current);
            next.delete(columnKey);
            return next;
        });
    }
    function showAutoHiddenColumn(columnKey) {
        setVisibleColumns((current)=>{
            const next = new Set(current);
            next.add(columnKey);
            return next;
        });
        setForceShownColumns((current)=>{
            const next = new Set(current);
            next.add(columnKey);
            return next;
        });
    }
    function toggleGroup(groupName) {
        setCollapsedGroups((current)=>{
            const next = new Set(current);
            if (next.has(groupName)) {
                next.delete(groupName);
            } else {
                next.add(groupName);
            }
            return next;
        });
    }
    function showAllColumns() {
        setVisibleColumns(new Set(columns.map((c)=>c.key)));
        setForceShownColumns(new Set());
        setCollapsedGroups(new Set());
    }
    function hideAllColumns() {
        setVisibleColumns(new Set());
        setForceShownColumns(new Set());
    }
    function handleExportCsv() {
        if (isExportingCsv) {
            return;
        }
        setIsExportingCsv(true);
        const params = new URLSearchParams({
            dateRange,
            statusFilter
        });
        const filtersForServer = {};
        for (const [key, set] of Object.entries(columnFilters)){
            if (set.size > 0) {
                filtersForServer[key] = Array.from(set);
            }
        }
        if (Object.keys(filtersForServer).length > 0) {
            params.set("columnFilters", JSON.stringify(filtersForServer));
        }
        const exportUrl = `/api/adm/inpatient-census/export?${params.toString()}`;
        window.location.href = exportUrl;
        // Browser download navigation is fire-and-forget; reset the button after brief cooldown.
        window.setTimeout(()=>{
            setIsExportingCsv(false);
        }, 1500);
    }
    function toggleFilterValue(key, value) {
        setPage(1);
        setColumnFilters((prev)=>{
            const next = {
                ...prev
            };
            const set = new Set(next[key] ?? []);
            if (set.has(value)) {
                set.delete(value);
            } else {
                set.add(value);
            }
            next[key] = set;
            return next;
        });
    }
    function clearFilter(key) {
        setPage(1);
        setColumnFilters((prev)=>{
            const next = {
                ...prev
            };
            delete next[key];
            return next;
        });
    }
    function clearAllFilters() {
        setPage(1);
        setColumnFilters({});
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-[calc(100vh-4rem)] bg-white",
        children: [
            openFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-40",
                onClick: ()=>setOpenFilter(null)
            }, void 0, false, {
                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                lineNumber: 1063,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex min-h-0 flex-1 flex-col overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-3xl border border-slate-200 bg-white p-3 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 flex-shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "date-range",
                                                className: "text-xs font-semibold text-slate-500 whitespace-nowrap",
                                                children: "Date Range"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1072,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$FilterSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterSelect"], {
                                                id: "date-range",
                                                label: "",
                                                value: dateRange,
                                                options: dateRanges.map((range)=>range.key),
                                                optionLabels: dateRanges.map((range)=>range.label),
                                                size: "md",
                                                onChange: (value)=>{
                                                    setDateRange(value);
                                                    setPage(1);
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1078,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                        lineNumber: 1071,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2 items-center",
                                        children: statusFilters.map((filter)=>{
                                            const isSelected = filter === statusFilter;
                                            const detailItems = CHIP_STATUS_DETAILS[filter];
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative group",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$FilterChip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterChip"], {
                                                    label: filter,
                                                    isSelected: isSelected,
                                                    onClick: ()=>{
                                                        setStatusFilter(filter);
                                                        setPage(1);
                                                    },
                                                    size: "sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative group ml-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                "aria-label": `Status mapping for ${filter}`,
                                                                className: "inline-flex h-3 w-3 items-center justify-center rounded-full border border-slate-400 text-[8px] font-semibold leading-none text-slate-600",
                                                                children: "i"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                lineNumber: 1109,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "pointer-events-none absolute left-1/2 top-[125%] z-[60] hidden w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700 shadow-lg group-hover:block group-focus-within:block",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mb-2 font-semibold text-slate-900",
                                                                        children: [
                                                                            "Status IDs for ",
                                                                            filter
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                        lineNumber: 1117,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                        className: "space-y-1",
                                                                        children: detailItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                                children: [
                                                                                    item.id,
                                                                                    ": ",
                                                                                    item.label
                                                                                ]
                                                                            }, item.id, true, {
                                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                                lineNumber: 1120,
                                                                                columnNumber: 31
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                        lineNumber: 1118,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                lineNumber: 1116,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1108,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                    lineNumber: 1099,
                                                    columnNumber: 21
                                                }, this)
                                            }, filter, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1098,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                        lineNumber: 1092,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleExportCsv,
                                        disabled: isLoading || isExportingCsv,
                                        className: "flex-shrink-0 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                        children: isExportingCsv ? "Preparing CSV..." : "Export CSV"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                        lineNumber: 1133,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                lineNumber: 1070,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 items-center border-t border-slate-100 pt-2 mt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-semibold text-slate-400 whitespace-nowrap",
                                        children: "Filter"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                        lineNumber: 1145,
                                        columnNumber: 13
                                    }, this),
                                    MULTISELECT_FILTERS.map(({ key, label })=>{
                                        const selected = columnFilters[key];
                                        const count = selected?.size ?? 0;
                                        const isOpen = openFilter === key;
                                        const options = filterOptions[key] ?? [];
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative z-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setOpenFilter(isOpen ? null : key),
                                                    className: `inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap ${count > 0 ? "border-cyan-400 bg-cyan-50 text-cyan-800" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`,
                                                    children: [
                                                        label,
                                                        count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-1 rounded-full bg-cyan-600 px-1.5 py-0.5 text-[10px] font-bold text-white leading-none",
                                                            children: count
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                            lineNumber: 1165,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400 text-[10px]",
                                                            children: isOpen ? "▲" : "▼"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                            lineNumber: 1169,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                    lineNumber: 1154,
                                                    columnNumber: 19
                                                }, this),
                                                isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute left-0 top-full mt-1 z-50 min-w-[180px] max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-3 py-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-semibold text-slate-700",
                                                                    children: label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                    lineNumber: 1174,
                                                                    columnNumber: 25
                                                                }, this),
                                                                count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>clearFilter(key),
                                                                    className: "text-[10px] font-medium text-cyan-600 hover:text-cyan-800",
                                                                    children: "Clear"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                    lineNumber: 1176,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                            lineNumber: 1173,
                                                            columnNumber: 23
                                                        }, this),
                                                        options.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "px-3 py-2 text-xs text-slate-400",
                                                            children: "No options available"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                            lineNumber: 1186,
                                                            columnNumber: 25
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                            className: "py-1",
                                                            children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-slate-50",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "checkbox",
                                                                                checked: selected?.has(option) ?? false,
                                                                                onChange: ()=>toggleFilterValue(key, option),
                                                                                className: "rounded border-slate-300"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                                lineNumber: 1192,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-slate-700",
                                                                                children: option
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                                lineNumber: 1198,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                        lineNumber: 1191,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, option, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                    lineNumber: 1190,
                                                                    columnNumber: 29
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                            lineNumber: 1188,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                    lineNumber: 1172,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                            lineNumber: 1153,
                                            columnNumber: 17
                                        }, this);
                                    }),
                                    Object.values(columnFilters).some((s)=>s && s.size > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: clearAllFilters,
                                        className: "rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors whitespace-nowrap",
                                        children: "Clear all"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                        lineNumber: 1210,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                lineNumber: 1144,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                        lineNumber: 1069,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex min-h-0 flex-1 flex-col rounded-3xl border border-slate-200 bg-white shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2 border-b border-slate-200 px-6 py-3 sm:flex-row sm:items-center sm:justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-baseline gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-2xl font-bold tracking-tight text-slate-900",
                                                        children: "Admissions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1225,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl font-bold tracking-tight text-slate-900",
                                                        children: totalCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1226,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1224,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: [
                                                    "Sorted by ",
                                                    getColumnLabel(sortKey),
                                                    " (",
                                                    sortDirection,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1228,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                        lineNumber: 1223,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-500",
                                                children: [
                                                    "Page ",
                                                    currentPage,
                                                    " of ",
                                                    pageCount,
                                                    "  ·  Showing ",
                                                    sortedRecords.length === 0 ? 0 : (currentPage - 1) * pageSize + 1,
                                                    "–",
                                                    (currentPage - 1) * pageSize + sortedRecords.length,
                                                    " of ",
                                                    totalCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1233,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setShowColumnModal(!showColumnModal),
                                                        className: "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50",
                                                        children: "⚙ Columns"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1237,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "page-size-top",
                                                        className: "text-xs font-semibold text-slate-500 whitespace-nowrap",
                                                        children: "Rows"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1244,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                        value: String(pageSize),
                                                        onValueChange: (value)=>{
                                                            setPageSize(Number(value));
                                                            setPage(1);
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                id: "page-size-top",
                                                                className: "h-9 w-[92px] rounded-lg border-slate-300 text-sm text-slate-900",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                    placeholder: "Rows"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                    lineNumber: 1255,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                lineNumber: 1254,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                children: PAGE_SIZE_OPTIONS.map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                        value: String(size),
                                                                        children: size
                                                                    }, size, false, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                        lineNumber: 1259,
                                                                        columnNumber: 23
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                lineNumber: 1257,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1247,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1236,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setPage((current)=>Math.max(1, current - 1)),
                                                disabled: currentPage === 1,
                                                className: "rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                                children: "Previous"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1266,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "page-jump-top",
                                                className: "text-xs font-semibold text-slate-500 whitespace-nowrap",
                                                children: "Page"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1274,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                value: String(currentPage),
                                                onValueChange: (value)=>setPage(Number(value)),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                        id: "page-jump-top",
                                                        className: "h-9 w-[92px] rounded-lg border-slate-300 text-sm text-slate-900",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                            placeholder: "Page"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                            lineNumber: 1279,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1278,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                        children: Array.from({
                                                            length: pageCount
                                                        }, (_, index)=>index + 1).map((pageNumber)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                value: String(pageNumber),
                                                                children: pageNumber
                                                            }, pageNumber, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                lineNumber: 1283,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1281,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1277,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setPage((current)=>Math.min(pageCount, current + 1)),
                                                disabled: currentPage === pageCount || sortedRecords.length === 0,
                                                className: "rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                                children: "Next"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1289,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                        lineNumber: 1232,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                lineNumber: 1222,
                                columnNumber: 11
                            }, this),
                            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center px-6 py-12",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-cyan-600"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                            lineNumber: 1303,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-600",
                                            children: "Loading data..."
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                            lineNumber: 1304,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                    lineNumber: 1302,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                lineNumber: 1301,
                                columnNumber: 13
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center px-6 py-12",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg bg-red-50 p-4 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-red-900",
                                            children: "Error loading data"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                            lineNumber: 1312,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-red-700",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                            lineNumber: 1313,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                    lineNumber: 1311,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                lineNumber: 1310,
                                columnNumber: 13
                            }, this),
                            !isLoading && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    showColumnModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-b border-slate-200 bg-slate-50 px-6 py-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-3 flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-sm font-semibold text-slate-900",
                                                        children: "Column Visibility"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1323,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: showAllColumns,
                                                                className: "rounded px-2 py-1 text-xs font-medium text-slate-600 hover:bg-white hover:text-slate-900",
                                                                children: "Show All"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                lineNumber: 1325,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: hideAllColumns,
                                                                className: "rounded px-2 py-1 text-xs font-medium text-slate-600 hover:bg-white hover:text-slate-900",
                                                                children: "Hide All"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                lineNumber: 1332,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1324,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1322,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: columnGroups.map((group)=>{
                                                    const isCollapsed = collapsedGroups.has(group.name);
                                                    const visibleInGroup = group.columns.filter((c)=>visibleColumns.has(c.key)).length;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-lg bg-white p-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>toggleGroup(group.name),
                                                                className: "mb-1 flex w-full items-center justify-between text-left text-sm font-medium text-slate-900 hover:text-slate-700",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            group.name,
                                                                            " (",
                                                                            visibleInGroup,
                                                                            "/",
                                                                            group.columns.length,
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                        lineNumber: 1353,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-slate-400",
                                                                        children: isCollapsed ? "▶" : "▼"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                        lineNumber: 1354,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                lineNumber: 1348,
                                                                columnNumber: 27
                                                            }, this),
                                                            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4",
                                                                children: group.columns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-slate-100",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "checkbox",
                                                                                checked: visibleColumns.has(column.key),
                                                                                onChange: ()=>toggleColumn(column.key),
                                                                                className: "rounded border-slate-300"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                                lineNumber: 1363,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-slate-700",
                                                                                children: column.label
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                                lineNumber: 1369,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, column.key, true, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                        lineNumber: 1359,
                                                                        columnNumber: 33
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                lineNumber: 1357,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, group.name, true, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1347,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1341,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                        lineNumber: 1321,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-h-0 flex-1 overflow-auto",
                                        children: [
                                            (manuallyHiddenColumns.length > 0 || autoHiddenColumns.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-b border-slate-200 bg-blue-50 px-4 py-2 flex items-center gap-2 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-medium text-slate-600",
                                                        children: "Hidden columns:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1384,
                                                        columnNumber: 21
                                                    }, this),
                                                    manuallyHiddenColumns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>toggleColumn(column.key),
                                                            className: "inline-flex items-center gap-1 rounded-md bg-white border border-blue-200 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors",
                                                            children: [
                                                                column.label,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-blue-400",
                                                                    children: "+"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                    lineNumber: 1393,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, column.key, true, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                            lineNumber: 1386,
                                                            columnNumber: 25
                                                        }, this)),
                                                    autoHiddenColumns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>showAutoHiddenColumn(column.key),
                                                            className: "inline-flex items-center rounded-md bg-slate-100 border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600",
                                                            title: "Automatically hidden on this page because all rows are empty. Click to show anyway.",
                                                            children: [
                                                                column.label,
                                                                " (auto) +"
                                                            ]
                                                        }, `auto-${column.key}`, true, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                            lineNumber: 1397,
                                                            columnNumber: 23
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1383,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                className: "min-w-[2400px] w-full border-separate border-spacing-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                        className: "sticky top-0 z-10 bg-slate-50",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: displayedColumns.map((column)=>{
                                                                const isSorted = sortKey === column.key;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "group border-b border-slate-200 px-2 py-2 text-left",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-between gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>handleSort(column.key),
                                                                                className: "flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: column.label
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                                        lineNumber: 1423,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-slate-400",
                                                                                        children: isSorted ? sortDirection === "asc" ? "↑" : "↓" : "↕"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                                        lineNumber: 1424,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                                lineNumber: 1418,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>toggleColumn(column.key),
                                                                                title: "Hide column",
                                                                                className: "opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center w-5 h-5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 text-lg leading-none",
                                                                                children: "×"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                                lineNumber: 1426,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                        lineNumber: 1417,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, column.key, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                    lineNumber: 1416,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                            lineNumber: 1411,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1410,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        children: sortedRecords.length > 0 ? sortedRecords.map((record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "odd:bg-white even:bg-slate-50/50",
                                                                children: displayedColumns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "group relative border-b border-slate-100 px-2 py-0.5 text-sm text-slate-700",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "pointer-events-none absolute left-1/2 top-[120%] z-20 hidden w-max -translate-x-1/2 rounded-lg border border-slate-300 bg-slate-900 px-2 py-1 text-[10px] font-semibold text-white shadow-lg group-hover:block whitespace-nowrap",
                                                                                children: column.hscField
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                                lineNumber: 1446,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            formatCellDisplayValue(record[column.key])
                                                                        ]
                                                                    }, `${record.authId}-${column.key}`, true, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                        lineNumber: 1445,
                                                                        columnNumber: 31
                                                                    }, this))
                                                            }, record.authId, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                lineNumber: 1443,
                                                                columnNumber: 25
                                                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                colSpan: Math.max(displayedColumns.length, 1),
                                                                className: "px-4 py-12 text-center text-sm text-slate-500",
                                                                children: "No authorizations found for the selected date range and filter."
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                lineNumber: 1456,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                            lineNumber: 1455,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1440,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1409,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                        lineNumber: 1380,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sticky bottom-0 z-10 flex flex-col gap-2 border-t border-slate-200 bg-white px-6 py-3 sm:flex-row sm:items-center sm:justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-500",
                                                children: [
                                                    "Page ",
                                                    currentPage,
                                                    " of ",
                                                    pageCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1466,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setPage((current)=>Math.max(1, current - 1)),
                                                        disabled: currentPage === 1,
                                                        className: "rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                                        children: "Previous"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1470,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "page-jump-bottom",
                                                        className: "sr-only",
                                                        children: "Jump to page"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1478,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                        value: String(currentPage),
                                                        onValueChange: (value)=>setPage(Number(value)),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                id: "page-jump-bottom",
                                                                className: "h-10 w-[128px] rounded-lg border-slate-300 text-sm text-slate-900",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                    placeholder: "Page"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                    lineNumber: 1483,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                lineNumber: 1482,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                children: Array.from({
                                                                    length: pageCount
                                                                }, (_, index)=>index + 1).map((pageNumber)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                        value: String(pageNumber),
                                                                        children: [
                                                                            "Page ",
                                                                            pageNumber
                                                                        ]
                                                                    }, pageNumber, true, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                        lineNumber: 1487,
                                                                        columnNumber: 25
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                                lineNumber: 1485,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1481,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setPage((current)=>Math.min(pageCount, current + 1)),
                                                        disabled: currentPage === pageCount || sortedRecords.length === 0,
                                                        className: "rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                                        children: "Next"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                        lineNumber: 1493,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                                lineNumber: 1469,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                                        lineNumber: 1465,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                        lineNumber: 1221,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
                lineNumber: 1068,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/dashboards/app/dashboards/um-inpatient-census/page.tsx",
        lineNumber: 1061,
        columnNumber: 5
    }, this);
}
_s(UmInpatientCensusPage, "OXhnX61wZ1kQBHShOzIfU2Vm3SQ=");
_c = UmInpatientCensusPage;
function getSortValue(record, key) {
    if (key === "received") {
        return new Date(`${record.receivedAt}T12:00:00Z`).getTime();
    }
    return record[key];
}
function getColumnLabel(key) {
    return columns.find((column)=>column.key === key)?.label ?? key;
}
function formatCellDisplayValue(value) {
    const normalized = String(value).trim();
    if (normalized.toLowerCase() === "unknown") {
        return "-";
    }
    return String(value);
}
function hasDisplayValue(value) {
    if (value == null) {
        return false;
    }
    if (typeof value === "number") {
        return !Number.isNaN(value);
    }
    const normalized = String(value).trim();
    if (!normalized) {
        return false;
    }
    const lowered = normalized.toLowerCase();
    const emptyMarkers = new Set([
        "unknown",
        "invalid date",
        "null",
        "undefined",
        "n/a",
        "na",
        "none"
    ]);
    return !emptyMarkers.has(lowered);
}
var _c;
__turbopack_context__.k.register(_c, "UmInpatientCensusPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_dashboards_12losc0._.js.map