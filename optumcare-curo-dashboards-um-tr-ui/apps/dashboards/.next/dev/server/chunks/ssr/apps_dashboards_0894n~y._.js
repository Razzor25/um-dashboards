module.exports = [
"[project]/apps/dashboards/lib/constants/orgs.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/apps/dashboards/lib/constants/priorities.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/apps/dashboards/lib/api/data:370858 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getExpeditedUrgentMemberTatChartData",
    ()=>$$RSC_SERVER_ACTION_7
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"789c5657cb3564cc2032b44a818bab019f1562302e":{"name":"getExpeditedUrgentMemberTatChartData"}},"apps/dashboards/lib/api/chart-data-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("789c5657cb3564cc2032b44a818bab019f1562302e", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getExpeditedUrgentMemberTatChartData");
;
}),
"[project]/apps/dashboards/lib/api/data:04813e [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getExpeditedUrgentProviderTatChartData",
    ()=>$$RSC_SERVER_ACTION_9
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"78275ce71605479e82a117b1455e1c7ee387869fdf":{"name":"getExpeditedUrgentProviderTatChartData"}},"apps/dashboards/lib/api/chart-data-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("78275ce71605479e82a117b1455e1c7ee387869fdf", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getExpeditedUrgentProviderTatChartData");
;
}),
"[project]/apps/dashboards/lib/api/data:30e5d0 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRoutineProviderTatChartData",
    ()=>$$RSC_SERVER_ACTION_8
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"783469d1a742f18697970aba5e9d9862e97c83a4ff":{"name":"getRoutineProviderTatChartData"}},"apps/dashboards/lib/api/chart-data-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("783469d1a742f18697970aba5e9d9862e97c83a4ff", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getRoutineProviderTatChartData");
;
}),
"[project]/apps/dashboards/lib/api/data:b42ee3 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStatusChartData",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"78dc14f6c35d80108154c55ec0fb0eac156a44b899":{"name":"getStatusChartData"}},"apps/dashboards/lib/api/chart-data-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("78dc14f6c35d80108154c55ec0fb0eac156a44b899", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getStatusChartData");
;
}),
"[project]/apps/dashboards/lib/api/data:bf5e9d [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRoutineTatChartData",
    ()=>$$RSC_SERVER_ACTION_6
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"789e5a0e5e49baf2086c003504fd6b140ddf4a1c28":{"name":"getRoutineTatChartData"}},"apps/dashboards/lib/api/chart-data-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("789e5a0e5e49baf2086c003504fd6b140ddf4a1c28", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getRoutineTatChartData");
;
}),
"[project]/apps/dashboards/app/components/DoughnutChartCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DoughnutChartCard",
    ()=>DoughnutChartCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function PlotlyDoughnutChart({ data }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (window.Plotly) {
            setIsLoaded(true);
            return;
        }
        const script = document.createElement("script");
        script.src = "https://cdn.plot.ly/plotly-2.26.0.min.js";
        script.async = true;
        script.onload = ()=>{
            setIsLoaded(true);
        };
        document.head.appendChild(script);
        return ()=>{
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoaded || !containerRef.current || !window.Plotly || !data.length) return;
        const total = data.reduce((sum, item)=>sum + item.count, 0);
        const segmentColors = data.map((item, index)=>{
            const normalizedLabel = item.label.toLowerCase();
            if (normalizedLabel.includes("approved")) return "#10b981";
            if (normalizedLabel.includes("denied")) return "#ef4444";
            if (normalizedLabel.includes("partially favorable")) return "#f59e0b";
            if (normalizedLabel.includes("timely")) return "#10b981";
            if (normalizedLabel.includes("late")) return "#ef4444";
            const fallbackPalette = [
                "#06b6d4",
                "#8b5cf6",
                "#10b981",
                "#f97316"
            ];
            return fallbackPalette[index % fallbackPalette.length];
        });
        const plotData = [
            {
                labels: data.map((datum)=>{
                    const percentage = (datum.count / total * 100).toFixed(1);
                    return `${datum.label} (${datum.count.toLocaleString()}, ${percentage}%)`;
                }),
                values: data.map((datum)=>datum.count),
                type: "pie",
                hole: 0.4,
                marker: {
                    colors: segmentColors
                },
                textposition: "none",
                hovertemplate: "<b>%{label}</b><br>Percentage: %{percent}<extra></extra>"
            }
        ];
        const layout = {
            margin: {
                l: 10,
                r: 10,
                t: 30,
                b: 80
            },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: {
                family: "system-ui, -apple-system",
                size: 10,
                color: "#374151"
            },
            showlegend: true,
            legend: {
                orientation: "h",
                x: 0.5,
                y: -0.2,
                xanchor: "center",
                yanchor: "top",
                bgcolor: "rgba(255,255,255,0)",
                bordercolor: "rgba(0,0,0,0)",
                borderwidth: 0
            },
            annotations: [
                {
                    text: `<b style="font-size: 20px">${total.toLocaleString()}</b><br><sub>Total Records</sub>`,
                    x: 0.5,
                    y: 0.5,
                    xref: "paper",
                    yref: "paper",
                    showarrow: false,
                    font: {
                        size: 12,
                        color: "#111827"
                    }
                }
            ]
        };
        const config = {
            responsive: true,
            displayModeBar: false,
            displaylogo: false
        };
        window.Plotly.newPlot(containerRef.current, plotData, layout, config);
    }, [
        isLoaded,
        data
    ]);
    if (!data.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full items-center justify-center text-xs text-slate-400",
            children: "No data available"
        }, void 0, false, {
            fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
            lineNumber: 119,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        style: {
            minHeight: "300px"
        }
    }, void 0, false, {
        fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
        lineNumber: 122,
        columnNumber: 10
    }, this);
}
function DoughnutChartCard({ title, data, isLoading = false, isTbd = false, infoContent }) {
    const [showTable, setShowTable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showInfo, setShowInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 min-w-[400px]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-3 flex items-center justify-between gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1.5 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "truncate text-sm font-semibold text-slate-900",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this),
                                infoContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex-shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setShowInfo((c)=>!c),
                                            className: "inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-400 text-[9px] font-bold leading-none text-slate-500 transition-colors hover:border-slate-600 hover:text-slate-700",
                                            "aria-label": "Chart information",
                                            "aria-expanded": showInfo,
                                            children: "i"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                            lineNumber: 137,
                                            columnNumber: 17
                                        }, this),
                                        showInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "fixed inset-0 z-40",
                                                    onClick: ()=>setShowInfo(false)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute left-0 top-full z-50 mt-1 w-80 rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-xs text-cyan-900 shadow-lg",
                                                    children: infoContent
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setShowTable((current)=>!current),
                            className: "flex-shrink-0 rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200",
                            title: showTable ? "Show chart" : "Show data",
                            children: showTable ? "Chart" : "Data"
                        }, void 0, false, {
                            fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-0 flex-1 overflow-auto",
                    children: isTbd ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-full min-h-[220px] items-center justify-center text-sm font-semibold text-slate-400",
                        children: "TBD"
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                        lineNumber: 168,
                        columnNumber: 13
                    }, this) : isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-full min-h-[220px] items-center justify-center text-xs text-slate-500",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-cyan-600"
                                }, void 0, false, {
                                    fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                    lineNumber: 174,
                                    columnNumber: 17
                                }, this),
                                "Loading chart..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                            lineNumber: 173,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                        lineNumber: 172,
                        columnNumber: 13
                    }, this) : showTable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full border-collapse text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "sticky top-0 border-b border-slate-200 bg-slate-50",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3 py-2 text-left font-semibold text-slate-700",
                                                children: "Category"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                                lineNumber: 183,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3 py-2 text-right font-semibold text-slate-700",
                                                children: "Count"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                                lineNumber: 184,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3 py-2 text-right font-semibold text-slate-700",
                                                children: "%"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                                lineNumber: 185,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                        lineNumber: 182,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                    lineNumber: 181,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: data.map((item, index)=>{
                                        const total = data.reduce((sum, datum)=>sum + datum.count, 0);
                                        const percentage = total > 0 ? (item.count / total * 100).toFixed(1) : "0.0";
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b border-slate-100 hover:bg-slate-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2 text-slate-700",
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2 text-right font-mono text-slate-700",
                                                    children: item.count.toLocaleString()
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2 text-right text-slate-600",
                                                    children: [
                                                        percentage,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                            lineNumber: 194,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                    lineNumber: 188,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                                    className: "border-t-2 border-slate-200 bg-slate-50 font-semibold",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-3 py-2 text-slate-900",
                                                children: "Total"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                                lineNumber: 204,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-3 py-2 text-right font-mono text-slate-900",
                                                children: data.reduce((sum, datum)=>sum + datum.count, 0).toLocaleString()
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                                lineNumber: 205,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-3 py-2 text-right text-slate-900",
                                                children: "100%"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                                lineNumber: 208,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                        lineNumber: 203,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                                    lineNumber: 202,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                            lineNumber: 180,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                        lineNumber: 179,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlotlyDoughnutChart, {
                        data: data
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                        lineNumber: 214,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
            lineNumber: 131,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/dashboards/app/components/DoughnutChartCard.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/dashboards/app/components/ApprovedDeniedPartiallyFavorableChart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApprovedDeniedPartiallyFavorableChart",
    ()=>ApprovedDeniedPartiallyFavorableChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$DoughnutChartCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/app/components/DoughnutChartCard.tsx [app-ssr] (ecmascript)");
;
;
const STATUS_CHART_INFO = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-semibold",
            children: "What this chart counts"
        }, void 0, false, {
            fileName: "[project]/apps/dashboards/app/components/ApprovedDeniedPartiallyFavorableChart.tsx",
            lineNumber: 12,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "mt-2 list-disc space-y-1 pl-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: "Includes only these status IDs: 1000895 (Approved), 1000935 (Denied), 1005006 (Partially Favorable)."
                }, void 0, false, {
                    fileName: "[project]/apps/dashboards/app/components/ApprovedDeniedPartiallyFavorableChart.tsx",
                    lineNumber: 14,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: [
                        "Date range is based on Created datetime (",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono",
                            children: "creat_dttm"
                        }, void 0, false, {
                            fileName: "[project]/apps/dashboards/app/components/ApprovedDeniedPartiallyFavorableChart.tsx",
                            lineNumber: 15,
                            columnNumber: 52
                        }, ("TURBOPACK compile-time value", void 0)),
                        ") from the top date controls."
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/dashboards/app/components/ApprovedDeniedPartiallyFavorableChart.tsx",
                    lineNumber: 15,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: [
                        "Excludes records where Member ID is missing or non-positive (",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono",
                            children: "indv_id <= 0"
                        }, void 0, false, {
                            fileName: "[project]/apps/dashboards/app/components/ApprovedDeniedPartiallyFavorableChart.tsx",
                            lineNumber: 16,
                            columnNumber: 72
                        }, ("TURBOPACK compile-time value", void 0)),
                        ")."
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/dashboards/app/components/ApprovedDeniedPartiallyFavorableChart.tsx",
                    lineNumber: 16,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: [
                        "Uses the selected data source: Cached calls ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono",
                            children: "/v1/prior-auth/status-chart"
                        }, void 0, false, {
                            fileName: "[project]/apps/dashboards/app/components/ApprovedDeniedPartiallyFavorableChart.tsx",
                            lineNumber: 17,
                            columnNumber: 55
                        }, ("TURBOPACK compile-time value", void 0)),
                        "; Live uses GraphQL aggregate counts."
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/dashboards/app/components/ApprovedDeniedPartiallyFavorableChart.tsx",
                    lineNumber: 17,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: "This status chart currently reflects the date range and data source, not the table filter chips."
                }, void 0, false, {
                    fileName: "[project]/apps/dashboards/app/components/ApprovedDeniedPartiallyFavorableChart.tsx",
                    lineNumber: 18,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/apps/dashboards/app/components/ApprovedDeniedPartiallyFavorableChart.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true);
function ApprovedDeniedPartiallyFavorableChart({ data, isLoading = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$DoughnutChartCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoughnutChartCard"], {
        title: "Approved / Denied / Partially Favorable",
        data: data,
        isLoading: isLoading,
        infoContent: STATUS_CHART_INFO
    }, void 0, false, {
        fileName: "[project]/apps/dashboards/app/components/ApprovedDeniedPartiallyFavorableChart.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/dashboards/app/components/RoutineMemberTatComplianceChart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RoutineMemberTatComplianceChart",
    ()=>RoutineMemberTatComplianceChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$DoughnutChartCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/app/components/DoughnutChartCard.tsx [app-ssr] (ecmascript)");
;
;
function RoutineMemberTatComplianceChart({ data, isLoading = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$DoughnutChartCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoughnutChartCard"], {
        title: "Routine Member TAT Compliance",
        data: data,
        isLoading: isLoading
    }, void 0, false, {
        fileName: "[project]/apps/dashboards/app/components/RoutineMemberTatComplianceChart.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/dashboards/app/components/ChartsGrid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChartsGrid",
    ()=>ChartsGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$ApprovedDeniedPartiallyFavorableChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/app/components/ApprovedDeniedPartiallyFavorableChart.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$DoughnutChartCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/app/components/DoughnutChartCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$RoutineMemberTatComplianceChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/app/components/RoutineMemberTatComplianceChart.tsx [app-ssr] (ecmascript)");
;
;
;
;
function ChartsGrid({ statusData = [], requestTypeData = [], orgData = [], createdDateData = [], routineTatData = [], statusLoading = false, requestTypeLoading = false, orgLoading = false, createdDateLoading = false, routineTatLoading = false, requestTypeTbd = false, orgTbd = false, createdDateTbd = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-4 overflow-x-auto pb-4 pr-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$ApprovedDeniedPartiallyFavorableChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApprovedDeniedPartiallyFavorableChart"], {
                data: statusData,
                isLoading: statusLoading
            }, void 0, false, {
                fileName: "[project]/apps/dashboards/app/components/ChartsGrid.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$RoutineMemberTatComplianceChart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoutineMemberTatComplianceChart"], {
                data: routineTatData,
                isLoading: routineTatLoading
            }, void 0, false, {
                fileName: "[project]/apps/dashboards/app/components/ChartsGrid.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$DoughnutChartCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoughnutChartCard"], {
                title: "Expedited / Urgent Member TAT Compliance",
                data: requestTypeData,
                isLoading: requestTypeLoading,
                isTbd: requestTypeTbd
            }, void 0, false, {
                fileName: "[project]/apps/dashboards/app/components/ChartsGrid.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$DoughnutChartCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoughnutChartCard"], {
                title: "Routine Provider TAT Compliance",
                data: orgData,
                isLoading: orgLoading,
                isTbd: orgTbd
            }, void 0, false, {
                fileName: "[project]/apps/dashboards/app/components/ChartsGrid.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$DoughnutChartCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoughnutChartCard"], {
                title: "Expedited / Urgent Provider TAT Compliance",
                data: createdDateData,
                isLoading: createdDateLoading,
                isTbd: createdDateTbd
            }, void 0, false, {
                fileName: "[project]/apps/dashboards/app/components/ChartsGrid.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/dashboards/app/components/ChartsGrid.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/dashboards/app/components/FilterChip.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FilterChip",
    ()=>FilterChip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function FilterChip({ label, isSelected, onClick, size = "md", badge, children }) {
    const sizeClasses = {
        sm: "px-3 py-1.5 text-xs font-medium",
        md: "px-4 py-2 text-sm font-medium"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: `inline-flex items-center gap-2 rounded-full border transition-colors whitespace-nowrap ${isSelected ? "border-cyan-500 bg-cyan-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"} ${sizeClasses[size]}`,
        children: [
            label,
            badge !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
}),
"[project]/apps/dashboards/features/um/actions/data:d1f21b [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTatCacheMetadata",
    ()=>$$RSC_SERVER_ACTION_3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"00b6268c56ba33af3b6d7c8c1378ed36a8cc4e7710":{"name":"getTatCacheMetadata"}},"apps/dashboards/features/um/actions/tat-compliance-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("00b6268c56ba33af3b6d7c8c1378ed36a8cc4e7710", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getTatCacheMetadata");
;
}),
"[project]/apps/dashboards/features/um/actions/data:1cc163 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTatFilterOptions",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"6091ffd7388c4ed266b4a7a642c43abee37365ff42":{"name":"getTatFilterOptions"}},"apps/dashboards/features/um/actions/tat-compliance-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("6091ffd7388c4ed266b4a7a642c43abee37365ff42", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getTatFilterOptions");
;
}),
"[project]/apps/dashboards/features/um/actions/data:fe53bd [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHscRecordsForTatCompliance",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"7f7aef72bed002647f8fc48d0671ef351e3cb422b3":{"name":"getHscRecordsForTatCompliance"}},"apps/dashboards/features/um/actions/tat-compliance-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7f7aef72bed002647f8fc48d0671ef351e3cb422b3", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getHscRecordsForTatCompliance");
;
}),
"[project]/apps/dashboards/features/um/actions/data:1dc02f [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRefCacheStatus",
    ()=>$$RSC_SERVER_ACTION_4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"000b24ff1d9ee68674c1ec9924823854d154e3f678":{"name":"getRefCacheStatus"}},"apps/dashboards/features/um/actions/tat-compliance-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("000b24ff1d9ee68674c1ec9924823854d154e3f678", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getRefCacheStatus");
;
}),
"[project]/apps/dashboards/features/um/actions/data:944aa2 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "refreshRefCache",
    ()=>$$RSC_SERVER_ACTION_5
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"008fef4d92b8244ebf36f2f3f898605cc56be22a6f":{"name":"refreshRefCache"}},"apps/dashboards/features/um/actions/tat-compliance-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("008fef4d92b8244ebf36f2f3f898605cc56be22a6f", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "refreshRefCache");
;
}),
"[project]/apps/dashboards/lib/formats.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UmTatCompliancePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@uhg-netra-ai/core-react-components/src/ui/select.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/constants/orgs.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$priorities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/constants/priorities.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$data$3a$370858__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/data:370858 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$data$3a$04813e__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/data:04813e [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$data$3a$30e5d0__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/data:30e5d0 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$data$3a$b42ee3__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/data:b42ee3 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$data$3a$bf5e9d__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/api/data:bf5e9d [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$ChartsGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/app/components/ChartsGrid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$FilterChip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/app/components/FilterChip.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$data$3a$d1f21b__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/apps/dashboards/features/um/actions/data:d1f21b [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$data$3a$1cc163__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/apps/dashboards/features/um/actions/data:1cc163 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$data$3a$fe53bd__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/apps/dashboards/features/um/actions/data:fe53bd [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$data$3a$1dc02f__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/apps/dashboards/features/um/actions/data:1dc02f [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$data$3a$944aa2__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/apps/dashboards/features/um/actions/data:944aa2 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/lib/formats.ts [app-ssr] (ecmascript)");
"use client";
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
const requestCategoryChips = [
    "Non - Part B",
    "Injectable/Part - B"
];
const DEFAULT_CACHE_START_YEAR = new Date().getFullYear() - 1;
const dateRangePresets = [
    {
        key: "this-week",
        label: "This week"
    },
    {
        key: "7-days",
        label: "7 days"
    },
    {
        key: "one-month",
        label: "1 month"
    },
    {
        key: "3-months",
        label: "3 months"
    },
    {
        key: "6-months",
        label: "6 months"
    },
    {
        key: "12-months",
        label: "12 months"
    },
    {
        key: "ytd",
        label: "Year to date"
    }
];
const US_TIMEZONES = [
    {
        value: "America/New_York",
        label: "Eastern (ET)"
    },
    {
        value: "America/Chicago",
        label: "Central (CT)"
    },
    {
        value: "America/Denver",
        label: "Mountain (MT)"
    },
    {
        value: "America/Phoenix",
        label: "Arizona (MST)"
    },
    {
        value: "America/Los_Angeles",
        label: "Pacific (PT)"
    }
];
function toIsoDateOnly(value) {
    return value.toISOString().split("T")[0] ?? "";
}
function getDateRangeLengthInDays(fromDate, toDate) {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const oneDayMs = 24 * 60 * 60 * 1000;
    const diff = Math.floor((end.getTime() - start.getTime()) / oneDayMs);
    return diff + 1;
}
function getDefaultDataSource(fromDate, toDate) {
    if (!fromDate || !toDate) return "graphql";
    return getDateRangeLengthInDays(fromDate, toDate) <= 7 ? "graphql" : "cache";
}
function getDateRangeFromPreset(preset) {
    const today = new Date();
    const toDate = toIsoDateOnly(today);
    if (preset === "this-week") {
        const start = new Date(today);
        const day = start.getDay();
        const diffToMonday = (day + 6) % 7;
        start.setDate(start.getDate() - diffToMonday);
        const fromDate = toIsoDateOnly(start);
        return {
            fromDate,
            toDate
        };
    }
    if (preset === "7-days") {
        const start = new Date(today);
        start.setDate(start.getDate() - 6);
        const fromDate = toIsoDateOnly(start);
        return {
            fromDate,
            toDate
        };
    }
    if (preset === "one-month") {
        const start = new Date(today);
        start.setMonth(start.getMonth() - 1);
        const fromDate = toIsoDateOnly(start);
        return {
            fromDate,
            toDate
        };
    }
    if (preset === "3-months") {
        const start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
        const fromDate = toIsoDateOnly(start);
        return {
            fromDate,
            toDate
        };
    }
    if (preset === "6-months") {
        const start = new Date(today.getFullYear(), today.getMonth() - 5, 1);
        const fromDate = toIsoDateOnly(start);
        return {
            fromDate,
            toDate
        };
    }
    if (preset === "12-months") {
        const start = new Date(today.getFullYear(), today.getMonth() - 11, 1);
        const fromDate = toIsoDateOnly(start);
        return {
            fromDate,
            toDate
        };
    }
    if (preset === "ytd") {
        const ytdStart = new Date(today.getFullYear(), 0, 1);
        const fromDate = toIsoDateOnly(ytdStart);
        return {
            fromDate,
            toDate
        };
    } else if (preset === "last-year-start-now") {
        const fromDate = `${DEFAULT_CACHE_START_YEAR}-01-01`;
        return {
            fromDate,
            toDate
        };
    }
    return {
        fromDate: toDate,
        toDate
    };
}
const years = [
    "2026",
    "2025",
    "2024"
];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const priorities = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$priorities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAT_PRIORITY_OPTIONS"]
];
const requestTypes = [
    "All Request Types",
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
const lineOfBusinessOptions = [
    "All Lines of Business",
    "Loading..."
];
const ipaOptions = [
    "All IPAs"
];
const superCommunityOptions = [
    "All Super Communities"
];
const healthPlanOptions = [
    "All Health Plans"
];
const defaultFilters = {
    year: "2026",
    month: "April",
    priority: [
        "All Priorities"
    ],
    requestType: [
        "All Request Types"
    ],
    lineOfBusiness: [
        "All Lines of Business"
    ],
    healthPlan: [
        "All Health Plans"
    ],
    superCommunity: [
        "All Super Communities"
    ],
    ipa: [
        "All IPAs"
    ],
    orgs: [],
    dateRangePreset: "7-days",
    fromDate: "",
    toDate: "",
    timezone: "America/New_York",
    dataSource: "graphql"
};
const FILTER_OPTIONS = [
    {
        key: "priority",
        label: "Priority",
        options: priorities
    },
    {
        key: "requestType",
        label: "Request Type",
        options: requestTypes
    },
    {
        key: "lineOfBusiness",
        label: "Line of Business",
        options: lineOfBusinessOptions
    },
    {
        key: "healthPlan",
        label: "Health Plan",
        options: healthPlanOptions
    },
    {
        key: "superCommunity",
        label: "Super Community",
        options: superCommunityOptions
    },
    {
        key: "ipa",
        label: "IPA",
        options: ipaOptions
    },
    {
        key: "orgs",
        label: "Org",
        options: []
    }
];
const PAGE_SIZE_OPTIONS = [
    50,
    100,
    200,
    500
];
const EXPORT_MAX_RECORDS = 250_000;
const TAT_COLUMNS = [
    {
        key: "hscId",
        label: "Auth Id"
    },
    {
        key: "tatDeadline",
        label: "TAT Deadline"
    },
    {
        key: "indvId",
        label: "Member Id"
    },
    {
        key: "authorizationType",
        label: "Request Type"
    },
    {
        key: "status",
        label: "Auth Decision (Status)"
    },
    {
        key: "received",
        label: "Received"
    },
    {
        key: "member",
        label: "Member"
    },
    {
        key: "org",
        label: "Org"
    },
    {
        key: "reviewDue",
        label: "Review Due"
    },
    {
        key: "timely",
        label: "Timely"
    },
    {
        key: "priority",
        label: "Priority"
    },
    {
        key: "authDecision",
        label: "Auth Decision"
    },
    {
        key: "decisioned",
        label: "Decisioned"
    },
    {
        key: "memberNodTatDeadline",
        label: "Member NOD TAT Deadline"
    },
    {
        key: "providerNodTatDeadline",
        label: "Provider NOD TAT Deadline"
    },
    {
        key: "memberWrittenSent",
        label: "Member Written Sent"
    },
    {
        key: "providerWrittenSent",
        label: "Provider Written Sent"
    },
    {
        key: "memberVerbalDone",
        label: "Member Verbal Done"
    },
    {
        key: "lineOfBusiness",
        label: "Line of Business"
    },
    {
        key: "healthPlan",
        label: "Health Plan"
    },
    {
        key: "superCommunity",
        label: "Super Community"
    },
    {
        key: "timing",
        label: "Timing"
    },
    {
        key: "ipa",
        label: "IPA"
    }
];
const SORTABLE_COLUMNS = {
    received: "Received",
    hscId: "Auth Id",
    tatDeadline: "TAT Deadline",
    authorizationType: "Request Type",
    status: "Auth Decision (Status)",
    indvId: "Member Id",
    reviewDue: "Review Due",
    org: "Org",
    lineOfBusiness: "Line of Business",
    healthPlan: "Health Plan",
    superCommunity: "Super Community",
    ipa: "IPA",
    priority: "Priority",
    authDecision: "Auth Decision",
    decisioned: "Decisioned"
};
const SORTABLE_COLUMN_KEYS = new Set(Object.keys(SORTABLE_COLUMNS));
function UmTatCompliancePage() {
    const [selectedChip, setSelectedChip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(requestCategoryChips[0]);
    const [appliedFilters, setAppliedFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultFilters);
    const [selectedFilters, setSelectedFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultFilters);
    const [openFilter, setOpenFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [records, setRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [totalCount, setTotalCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [chartsData, setChartsData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        status: [],
        priority: [],
        requestType: [],
        org: [],
        createdDate: [],
        routineTat: []
    });
    const [chartLoading, setChartLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        status: false,
        priority: false,
        requestType: false,
        org: false,
        createdDate: false,
        routineTat: false
    });
    const [isChartsLoading, setIsChartsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [pageInput, setPageInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("1");
    const [pageSize, setPageSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(50);
    const [showColumnModal, setShowColumnModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCharts, setShowCharts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isExportingCsv, setIsExportingCsv] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showDateRangeInfo, setShowDateRangeInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dynamicFilterOptions, setDynamicFilterOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        priority: priorities,
        priorityRefIds: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$priorities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAT_PRIORITY_REF_ID_BY_LABEL"]
        },
        requestType: requestTypes,
        lineOfBusiness: lineOfBusinessOptions,
        healthPlan: healthPlanOptions,
        superCommunity: superCommunityOptions,
        ipa: ipaOptions,
        orgs: [
            "All Orgs",
            ...Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PREHASHED_ORG_BY_ID"]).sort((left, right)=>left.localeCompare(right))
        ]
    });
    const [isFilterOptionsLoading, setIsFilterOptionsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [visibleColumns, setVisibleColumns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(TAT_COLUMNS.map((column)=>column.key));
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("received");
    const [sortDir, setSortDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("desc");
    const [hasRenderedOnce, setHasRenderedOnce] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [refCacheStatus, setRefCacheStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        cachedAt: null,
        expiresAt: null,
        isStale: true
    });
    const [isRefCacheRefreshing, setIsRefCacheRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cacheMetadata, setCacheMetadata] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cacheSourceError, setCacheSourceError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const latestRequestIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const latestChartRequestIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const latestFilterOptionsRequestIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Initialize date range based on default preset
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const { fromDate, toDate } = getDateRangeFromPreset(appliedFilters.dateRangePreset);
        const dataSource = getDefaultDataSource(fromDate, toDate);
        setAppliedFilters((current)=>({
                ...current,
                fromDate,
                toDate,
                dataSource
            }));
        setSelectedFilters((current)=>({
                ...current,
                fromDate,
                toDate,
                dataSource
            }));
    }, []);
    // Load initial ref cache status
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$data$3a$1dc02f__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getRefCacheStatus"])().then(setRefCacheStatus).catch(console.error);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (appliedFilters.dataSource !== "cache") {
            setCacheSourceError(null);
            return;
        }
        let cancelled = false;
        const loadCacheMetadata = async ()=>{
            try {
                const metadata = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$data$3a$d1f21b__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getTatCacheMetadata"])();
                if (!cancelled) {
                    setCacheMetadata(metadata);
                    setCacheSourceError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    const message = err instanceof Error ? err.message : "Failed to load cache metadata";
                    setCacheSourceError(message);
                }
            }
        };
        loadCacheMetadata();
        return ()=>{
            cancelled = true;
        };
    }, [
        appliedFilters.dataSource
    ]);
    async function handleRefreshRefCache() {
        setIsRefCacheRefreshing(true);
        try {
            const status = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$data$3a$944aa2__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["refreshRefCache"])();
            setRefCacheStatus(status);
        } catch (err) {
            console.error("Failed to refresh ref cache:", err);
        } finally{
            setIsRefCacheRefreshing(false);
        }
    }
    // Mark initial client render completion so chart loading starts after first paint.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setHasRenderedOnce(true);
    }, []);
    // Load chart data independently (respect date range)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!hasRenderedOnce || !appliedFilters.fromDate || !appliedFilters.toDate) return;
        let cancelled = false;
        const chartRequestId = ++latestChartRequestIdRef.current;
        const loadingStartState = {
            status: true,
            priority: false,
            requestType: true,
            org: true,
            createdDate: true,
            routineTat: true
        };
        const emptyChartsState = {
            status: [],
            priority: [],
            requestType: [],
            org: [],
            createdDate: [],
            routineTat: []
        };
        const chartFilters = {
            selectedChip,
            priority: appliedFilters.priority,
            requestType: appliedFilters.requestType[0],
            lineOfBusiness: appliedFilters.lineOfBusiness[0],
            healthPlan: appliedFilters.healthPlan[0],
            superCommunity: appliedFilters.superCommunity[0],
            ipa: appliedFilters.ipa[0],
            orgs: appliedFilters.orgs.length > 0 ? appliedFilters.orgs : undefined
        };
        const steps = [
            {
                key: "status",
                loader: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$data$3a$b42ee3__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getStatusChartData"])(appliedFilters.fromDate, appliedFilters.toDate, appliedFilters.dataSource, chartFilters)
            },
            {
                key: "routineTat",
                loader: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$data$3a$bf5e9d__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getRoutineTatChartData"])(appliedFilters.fromDate, appliedFilters.toDate, appliedFilters.dataSource, chartFilters)
            },
            {
                key: "requestType",
                loader: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$data$3a$370858__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getExpeditedUrgentMemberTatChartData"])(appliedFilters.fromDate, appliedFilters.toDate, appliedFilters.dataSource, chartFilters)
            },
            {
                key: "org",
                loader: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$data$3a$30e5d0__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getRoutineProviderTatChartData"])(appliedFilters.fromDate, appliedFilters.toDate, appliedFilters.dataSource, chartFilters)
            },
            {
                key: "createdDate",
                loader: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$api$2f$data$3a$04813e__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getExpeditedUrgentProviderTatChartData"])(appliedFilters.fromDate, appliedFilters.toDate, appliedFilters.dataSource, chartFilters)
            }
        ];
        const loadCharts = async ()=>{
            setIsChartsLoading(true);
            setChartsData(emptyChartsState);
            setChartLoading(loadingStartState);
            try {
                for (const step of steps){
                    if (cancelled || chartRequestId !== latestChartRequestIdRef.current) {
                        return;
                    }
                    try {
                        const chartData = await step.loader();
                        if (!cancelled && chartRequestId === latestChartRequestIdRef.current) {
                            setChartsData((current)=>({
                                    ...current,
                                    [step.key]: chartData
                                }));
                        }
                    } catch (stepError) {
                        if (!cancelled && chartRequestId === latestChartRequestIdRef.current) {
                            console.error(`Failed to load ${step.key} chart data:`, stepError);
                            setChartsData((current)=>({
                                    ...current,
                                    [step.key]: []
                                }));
                        }
                    } finally{
                        if (!cancelled && chartRequestId === latestChartRequestIdRef.current) {
                            setChartLoading((current)=>({
                                    ...current,
                                    [step.key]: false
                                }));
                        }
                    }
                }
            } catch (err) {
                if (!cancelled) {
                    console.error("Failed to load charts data:", err);
                }
            } finally{
                if (!cancelled && chartRequestId === latestChartRequestIdRef.current) {
                    setIsChartsLoading(false);
                }
            }
        };
        // Defer chart fetch to the next macrotask so first paint is not delayed.
        const timer = window.setTimeout(loadCharts, 0);
        return ()=>{
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [
        hasRenderedOnce,
        appliedFilters.dataSource,
        appliedFilters.fromDate,
        appliedFilters.toDate,
        appliedFilters.priority,
        appliedFilters.requestType,
        appliedFilters.lineOfBusiness,
        appliedFilters.healthPlan,
        appliedFilters.superCommunity,
        appliedFilters.ipa,
        appliedFilters.orgs,
        selectedChip
    ]);
    // Load dynamic filter options from server-side distinct/aggregate queries.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!appliedFilters.fromDate || !appliedFilters.toDate) return;
        let cancelled = false;
        const filterOptionsRequestId = ++latestFilterOptionsRequestIdRef.current;
        const loadFilterOptions = async ()=>{
            setIsFilterOptionsLoading(true);
            try {
                const options = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$data$3a$1cc163__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getTatFilterOptions"])({
                    fromDate: appliedFilters.fromDate,
                    toDate: appliedFilters.toDate,
                    selectedChip,
                    priority: appliedFilters.priority,
                    requestType: appliedFilters.requestType[0],
                    lineOfBusiness: appliedFilters.lineOfBusiness[0],
                    healthPlan: appliedFilters.healthPlan[0],
                    superCommunity: appliedFilters.superCommunity[0],
                    ipa: appliedFilters.ipa[0],
                    orgs: appliedFilters.orgs.length > 0 ? appliedFilters.orgs : undefined
                }, "cache");
                if (!cancelled && filterOptionsRequestId === latestFilterOptionsRequestIdRef.current) {
                    setDynamicFilterOptions(options);
                    if (options.cache) {
                        setCacheMetadata(options.cache);
                    }
                }
            } catch (filterOptionsError) {
                if (!cancelled && filterOptionsRequestId === latestFilterOptionsRequestIdRef.current) {
                    console.error("Failed to load filter options:", filterOptionsError);
                }
            } finally{
                if (!cancelled && filterOptionsRequestId === latestFilterOptionsRequestIdRef.current) {
                    setIsFilterOptionsLoading(false);
                }
            }
        };
        const timer = window.setTimeout(loadFilterOptions, 0);
        return ()=>{
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [
        appliedFilters.fromDate,
        appliedFilters.ipa,
        appliedFilters.healthPlan,
        appliedFilters.lineOfBusiness,
        appliedFilters.superCommunity,
        appliedFilters.orgs,
        appliedFilters.priority,
        appliedFilters.requestType,
        appliedFilters.toDate,
        selectedChip
    ]);
    const loadData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (currentFilters, currentPage)=>{
        if (!currentFilters.fromDate || !currentFilters.toDate) return;
        const requestId = ++latestRequestIdRef.current;
        const shouldIncludeTotalCount = currentPage === 1;
        setIsLoading(true);
        setError(null);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$data$3a$fe53bd__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getHscRecordsForTatCompliance"])({
                fromDate: currentFilters.fromDate,
                toDate: currentFilters.toDate,
                selectedChip,
                priority: currentFilters.priority,
                requestType: currentFilters.requestType[0],
                lineOfBusiness: currentFilters.lineOfBusiness[0],
                healthPlan: currentFilters.healthPlan[0],
                superCommunity: currentFilters.superCommunity[0],
                ipa: currentFilters.ipa[0],
                orgs: currentFilters.orgs.length > 0 ? currentFilters.orgs : undefined
            }, currentPage, pageSize, sortBy, sortDir, shouldIncludeTotalCount, currentFilters.dataSource);
            if (requestId === latestRequestIdRef.current) {
                setRecords(result.records);
                if (shouldIncludeTotalCount && result.totalCount >= 0) {
                    setTotalCount(result.totalCount);
                }
                if (result.cache) {
                    setCacheMetadata(result.cache);
                }
            }
        } catch (err) {
            if (requestId === latestRequestIdRef.current) {
                setError(err instanceof Error ? err.message : "Failed to load data");
            }
        } finally{
            if (requestId === latestRequestIdRef.current) {
                setIsLoading(false);
            }
        }
    }, [
        pageSize,
        selectedChip,
        sortBy,
        sortDir
    ]);
    const handleSortClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((columnKey)=>{
        if (!SORTABLE_COLUMN_KEYS.has(columnKey)) {
            return;
        }
        const sortableColumn = columnKey;
        setPage(1);
        if (sortableColumn === sortBy) {
            setSortDir((current)=>current === "asc" ? "desc" : "asc");
            return;
        }
        setSortBy(sortableColumn);
        setSortDir("asc");
    }, [
        sortBy
    ]);
    // Reload whenever applied filters or page changes (but only once dates are initialised)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (appliedFilters.fromDate && appliedFilters.toDate) {
            loadData(appliedFilters, page);
        }
    }, [
        appliedFilters,
        page,
        selectedChip,
        loadData
    ]);
    const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
    const currentPage = Math.min(page, pageCount);
    const startRow = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endRow = totalCount === 0 ? 0 : Math.min(currentPage * pageSize, totalCount);
    const showInitialLoading = isLoading && records.length === 0;
    const exportDisabledReason = totalCount > EXPORT_MAX_RECORDS ? `Export is disabled because ${totalCount.toLocaleString()} records exceed the ${EXPORT_MAX_RECORDS.toLocaleString()} limit.` : totalCount === 0 ? "Export is unavailable because there are no records for the current filters." : null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setPageInput(String(currentPage));
    }, [
        currentPage
    ]);
    function applyPageInput() {
        const next = Number(pageInput);
        if (!Number.isFinite(next)) {
            setPageInput(String(currentPage));
            return;
        }
        const clamped = Math.max(1, Math.min(pageCount, Math.trunc(next)));
        setPage(clamped);
        setPageInput(String(clamped));
    }
    function toggleColumn(key) {
        setVisibleColumns((current)=>{
            if (current.includes(key)) {
                if (current.length === 1) return current;
                return current.filter((columnKey)=>columnKey !== key);
            }
            return [
                ...current,
                key
            ];
        });
    }
    function csvEscape(value) {
        if (value.includes(",") || value.includes("\n") || value.includes("\"")) {
            return `"${value.replace(/\"/g, '""')}"`;
        }
        return value;
    }
    function getIsTimelyDisplay(record) {
        if (record.decn_rndr_dttm && record.tat_due_dttm) {
            return new Date(record.decn_rndr_dttm) <= new Date(record.tat_due_dttm) ? "Yes" : "No";
        }
        return "—";
    }
    function getExportCellValue(record, key) {
        const orgName = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PREHASHED_ORG_BY_ID"][record.org_id] ?? record.org_id;
        switch(key){
            case "hscId":
                return record.hsc_id;
            case "tatDeadline":
                return record.tat_due_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.tat_due_dttm, appliedFilters.timezone) : "";
            case "indvId":
                return record.indv_id;
            case "authorizationType":
                return record.auth_typ_label ?? "";
            case "status":
                return record.hsc_sts_typ_label ?? "";
            case "received":
                return record.recv_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.recv_dttm, appliedFilters.timezone) : "";
            case "member":
                return record.member_name ?? "";
            case "org":
                return orgName;
            case "reviewDue":
                return record.review_due_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.review_due_dttm, appliedFilters.timezone) : "";
            case "timely":
                return getIsTimelyDisplay(record);
            case "priority":
                return record.rev_prr_ref_label ?? "";
            case "authDecision":
                return record.hsc_sts_typ_label ?? "";
            case "decisioned":
                return record.decn_rndr_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.decn_rndr_dttm, appliedFilters.timezone) : "";
            case "memberNodTatDeadline":
                return record.curr_tat_nod_mbr_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.curr_tat_nod_mbr_dttm, appliedFilters.timezone) : "";
            case "providerNodTatDeadline":
                return record.tat_nod_prov_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.tat_nod_prov_dttm, appliedFilters.timezone) : "";
            case "memberWrittenSent":
                return record.wrt_decn_mbr_cmnct_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.wrt_decn_mbr_cmnct_dttm, appliedFilters.timezone) : "";
            case "providerWrittenSent":
                return record.wrt_decn_prov_cmnct_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.wrt_decn_prov_cmnct_dttm, appliedFilters.timezone) : "";
            case "memberVerbalDone":
                return record.decn_mbr_cmnct_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.decn_mbr_cmnct_dttm, appliedFilters.timezone) : "";
            case "lineOfBusiness":
                return record.lob ?? "";
            case "healthPlan":
                return record.health_plan ?? "";
            case "superCommunity":
                return record.super_community ?? "";
            case "timing":
                return record.rev_term_typ_ref_label ?? "";
            case "ipa":
                return record.ipa ?? "";
            default:
                return "";
        }
    }
    async function handleExportCsv() {
        if (totalCount > EXPORT_MAX_RECORDS) {
            setError(`CSV export is limited to ${EXPORT_MAX_RECORDS.toLocaleString()} records. Narrow your filters and try again.`);
            return;
        }
        const exportPageSize = 1000;
        const pages = Math.max(1, Math.ceil(totalCount / exportPageSize));
        const rows = [];
        setIsExportingCsv(true);
        setError(null);
        try {
            for(let exportPage = 1; exportPage <= pages; exportPage += 1){
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$features$2f$um$2f$actions$2f$data$3a$fe53bd__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getHscRecordsForTatCompliance"])({
                    fromDate: appliedFilters.fromDate,
                    toDate: appliedFilters.toDate,
                    selectedChip,
                    priority: appliedFilters.priority,
                    requestType: appliedFilters.requestType[0],
                    lineOfBusiness: appliedFilters.lineOfBusiness[0],
                    healthPlan: appliedFilters.healthPlan[0],
                    superCommunity: appliedFilters.superCommunity[0],
                    ipa: appliedFilters.ipa[0],
                    orgs: appliedFilters.orgs.length > 0 ? appliedFilters.orgs : undefined
                }, exportPage, exportPageSize, sortBy, sortDir, exportPage === 1, appliedFilters.dataSource);
                if (result.records.length === 0) {
                    break;
                }
                rows.push(...result.records);
            }
            const exportColumns = TAT_COLUMNS.filter((column)=>visibleColumns.includes(column.key));
            const header = exportColumns.map((column)=>csvEscape(column.label)).join(",");
            const body = rows.map((record)=>exportColumns.map((column)=>csvEscape(getExportCellValue(record, column.key))).join(",")).join("\n");
            const csv = `${header}\n${body}`;
            const blob = new Blob([
                csv
            ], {
                type: "text/csv;charset=utf-8;"
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            const today = new Date().toISOString().split("T")[0];
            link.href = url;
            link.download = `prior-auth-export-${today}.csv`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        } catch (exportError) {
            const message = exportError instanceof Error ? exportError.message : "Failed to export CSV";
            setError(message);
        } finally{
            setIsExportingCsv(false);
        }
    }
    const filterOptionsWithOrg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>FILTER_OPTIONS.map((f)=>{
            if (f.key === "priority") return {
                ...f,
                options: dynamicFilterOptions.priority
            };
            if (f.key === "requestType") return {
                ...f,
                options: dynamicFilterOptions.requestType
            };
            if (f.key === "lineOfBusiness") return {
                ...f,
                options: dynamicFilterOptions.lineOfBusiness
            };
            if (f.key === "healthPlan") return {
                ...f,
                options: dynamicFilterOptions.healthPlan
            };
            if (f.key === "superCommunity") return {
                ...f,
                options: dynamicFilterOptions.superCommunity
            };
            if (f.key === "ipa") return {
                ...f,
                options: dynamicFilterOptions.ipa
            };
            if (f.key === "orgs") return {
                ...f,
                options: dynamicFilterOptions.orgs
            };
            return f;
        }), [
        dynamicFilterOptions
    ]);
    const appliedSummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const parts = [
            `Data Source: ${appliedFilters.dataSource === "cache" ? "Cached" : "Live"}`,
            `Sort: ${SORTABLE_COLUMNS[sortBy]} (${sortDir.toUpperCase()})`,
            `Date Range (Received): ${appliedFilters.fromDate || "—"} to ${appliedFilters.toDate || "—"}`,
            `Timezone: ${US_TIMEZONES.find((tz)=>tz.value === appliedFilters.timezone)?.label ?? appliedFilters.timezone}`,
            `Request Category: ${selectedChip}`
        ];
        if (appliedFilters.priority[0] !== defaultFilters.priority[0]) parts.push(`Priority: ${appliedFilters.priority[0]}`);
        if (appliedFilters.requestType[0] !== defaultFilters.requestType[0]) parts.push(`Request Type: ${appliedFilters.requestType[0]}`);
        if (appliedFilters.lineOfBusiness[0] !== defaultFilters.lineOfBusiness[0]) parts.push(`Line of Business: ${appliedFilters.lineOfBusiness[0]}`);
        if (appliedFilters.healthPlan[0] !== defaultFilters.healthPlan[0]) parts.push(`Health Plan: ${appliedFilters.healthPlan[0]}`);
        if (appliedFilters.superCommunity[0] !== defaultFilters.superCommunity[0]) parts.push(`Super Community: ${appliedFilters.superCommunity[0]}`);
        if (appliedFilters.ipa[0] !== defaultFilters.ipa[0]) parts.push(`IPA: ${appliedFilters.ipa[0]}`);
        if (appliedFilters.orgs.length > 0) {
            parts.push(`Orgs: ${appliedFilters.orgs.length === 1 ? appliedFilters.orgs[0] : `${appliedFilters.orgs.length} selected`}`);
        }
        return parts.join(" · ");
    }, [
        appliedFilters.fromDate,
        appliedFilters.dataSource,
        appliedFilters.ipa,
        appliedFilters.healthPlan,
        appliedFilters.lineOfBusiness,
        appliedFilters.superCommunity,
        appliedFilters.orgs,
        appliedFilters.priority,
        appliedFilters.requestType,
        appliedFilters.timezone,
        appliedFilters.toDate,
        selectedChip,
        sortBy,
        sortDir
    ]);
    function toggleFilterValue(key, value) {
        setSelectedFilters((prev)=>{
            if (key === "orgs") {
                const currentOrgs = prev.orgs;
                if (currentOrgs.includes(value)) {
                    return {
                        ...prev,
                        orgs: currentOrgs.filter((o)=>o !== value)
                    };
                } else {
                    return {
                        ...prev,
                        orgs: [
                            ...currentOrgs,
                            value
                        ]
                    };
                }
            }
            const prev_value = prev[key];
            if (Array.isArray(prev_value)) {
                const defaultAllValue = defaultFilters[key];
                const allLabel = defaultAllValue[0]; // e.g. "All Priorities"
                if (value === allLabel) {
                    // Selecting "All X" resets to just the all-label
                    return {
                        ...prev,
                        [key]: [
                            allLabel
                        ]
                    };
                }
                // Selecting a specific option: remove the all-label, toggle the value
                const withoutAll = prev_value.filter((v)=>v !== allLabel);
                if (withoutAll.includes(value)) {
                    const next = withoutAll.filter((v)=>v !== value);
                    // If nothing left, revert to all-label
                    return {
                        ...prev,
                        [key]: next.length > 0 ? next : [
                            allLabel
                        ]
                    };
                } else {
                    return {
                        ...prev,
                        [key]: [
                            ...withoutAll,
                            value
                        ]
                    };
                }
            }
            return prev;
        });
    }
    function clearFilterSelections() {
        setSelectedFilters(defaultFilters);
    }
    function applyFilters() {
        setPage(1);
        setAppliedFilters(selectedFilters);
    }
    function handleFilterChange(key, value) {
        if (key === "dateRangePreset" || key === "fromDate" || key === "toDate" || key === "timezone") {
            // Date and timezone changes apply immediately
            setAppliedFilters((current)=>{
                const next = {
                    ...current,
                    [key]: value
                };
                if (key === "fromDate" || key === "toDate") {
                    next.dataSource = getDefaultDataSource(next.fromDate, next.toDate);
                }
                return next;
            });
            setSelectedFilters((current)=>{
                const next = {
                    ...current,
                    [key]: value
                };
                if (key === "fromDate" || key === "toDate") {
                    next.dataSource = getDefaultDataSource(next.fromDate, next.toDate);
                }
                return next;
            });
            setPage(1);
        }
    }
    function handleDateRangePresetChange(preset) {
        setPage(1);
        const { fromDate, toDate } = getDateRangeFromPreset(preset);
        const dataSource = getDefaultDataSource(fromDate, toDate);
        setAppliedFilters((current)=>({
                ...current,
                dateRangePreset: preset,
                fromDate,
                toDate,
                dataSource
            }));
        setSelectedFilters((current)=>({
                ...current,
                dateRangePreset: preset,
                fromDate,
                toDate,
                dataSource
            }));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex h-[calc(100vh-4rem)] bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 overflow-hidden flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "border-b border-slate-200 bg-white px-6 py-3 flex-shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-3 items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-3 items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "date-range-preset",
                                            className: "flex flex-col gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center gap-1 text-xs font-medium text-slate-700",
                                                    children: [
                                                        "Date Range",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "relative inline-flex items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>setShowDateRangeInfo((current)=>!current),
                                                                    className: "inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-400 text-[9px] font-bold leading-none text-slate-500 transition-colors hover:border-slate-500 hover:text-slate-700",
                                                                    "aria-label": "Date range filter info",
                                                                    "aria-expanded": showDateRangeInfo,
                                                                    children: "i"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1042,
                                                                    columnNumber: 21
                                                                }, this),
                                                                showDateRangeInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "absolute left-5 top-1/2 z-20 -translate-y-1/2 whitespace-nowrap rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 shadow-sm",
                                                                    children: "Filters by Received date (recv_dttm)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1052,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1041,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1039,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: appliedFilters.dateRangePreset,
                                                    onValueChange: (value)=>handleDateRangePresetChange(value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            id: "date-range-preset",
                                                            className: "h-9 rounded-lg border-slate-300 bg-white px-2 text-sm text-slate-900 focus:border-cyan-500",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                placeholder: "Date Range"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                lineNumber: 1066,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1062,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: dateRangePresets.map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: preset.key,
                                                                    children: preset.label
                                                                }, preset.key, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1070,
                                                                    columnNumber: 23
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1068,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1058,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1038,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "timezone",
                                            className: "flex flex-col gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-medium text-slate-700",
                                                    children: "Timezone"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1078,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: appliedFilters.timezone,
                                                    onValueChange: (value)=>handleFilterChange("timezone", value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            id: "timezone",
                                                            className: "h-9 rounded-lg border-slate-300 bg-white px-2 text-sm text-slate-900 focus:border-cyan-500",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                placeholder: "Timezone"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                lineNumber: 1087,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1083,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: US_TIMEZONES.map((tz)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: tz.value,
                                                                    children: tz.label
                                                                }, tz.value, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1091,
                                                                    columnNumber: 23
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1089,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1079,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1077,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-medium text-slate-700",
                                                    children: "Data Source"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1099,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "inline-flex items-center rounded-lg border border-slate-300 bg-white p-0.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>{
                                                                setPage(1);
                                                                setAppliedFilters((current)=>({
                                                                        ...current,
                                                                        dataSource: "graphql"
                                                                    }));
                                                                setSelectedFilters((current)=>({
                                                                        ...current,
                                                                        dataSource: "graphql"
                                                                    }));
                                                            },
                                                            className: `rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${appliedFilters.dataSource === "graphql" ? "bg-cyan-600 text-white" : "text-slate-600 hover:bg-slate-50"}`,
                                                            children: "Live"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1101,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>{
                                                                setPage(1);
                                                                setAppliedFilters((current)=>({
                                                                        ...current,
                                                                        dataSource: "cache"
                                                                    }));
                                                                setSelectedFilters((current)=>({
                                                                        ...current,
                                                                        dataSource: "cache"
                                                                    }));
                                                            },
                                                            className: `rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${appliedFilters.dataSource === "cache" ? "bg-cyan-600 text-white" : "text-slate-600 hover:bg-slate-50"}`,
                                                            children: "Cached"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1116,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1100,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1098,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "from-date",
                                            className: "flex flex-col gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-medium text-slate-700",
                                                    children: "From"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1134,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "from-date",
                                                    type: "date",
                                                    value: appliedFilters.fromDate,
                                                    onChange: (event)=>handleFilterChange("fromDate", event.target.value),
                                                    className: "rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none transition-colors focus:border-cyan-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1133,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-end gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "to-date",
                                                    className: "flex flex-col gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-medium text-slate-700",
                                                            children: "To"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1145,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "to-date",
                                                            type: "date",
                                                            value: appliedFilters.toDate,
                                                            onChange: (event)=>handleFilterChange("toDate", event.target.value),
                                                            className: "rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none transition-colors focus:border-cyan-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1146,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1144,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "group relative inline-flex",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            "aria-label": "Excluded records",
                                                            className: "mb-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-cyan-500 bg-cyan-50 text-xs font-bold leading-none text-cyan-700",
                                                            children: "i"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1155,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "pointer-events-none absolute left-1/2 top-[125%] z-[60] hidden w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700 shadow-lg group-hover:block group-focus-within:block",
                                                            children: [
                                                                "excluding auth_typ_ref_id:",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1164,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "1002259: Draft",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1166,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "1002526: Abandoned",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1168,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "1005617: Draft Not Submitted",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1170,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "1005694: Draft Expired",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1172,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "and indv_id <= 0"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1162,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1154,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1143,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                    lineNumber: 1037,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-3 items-end",
                                    children: requestCategoryChips.map((chip)=>{
                                        const isSelected = chip === selectedChip;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$FilterChip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FilterChip"], {
                                            label: chip,
                                            isSelected: isSelected,
                                            onClick: ()=>{
                                                setPage(1);
                                                setSelectedChip(chip);
                                            },
                                            size: "md"
                                        }, chip, false, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1184,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                    lineNumber: 1179,
                                    columnNumber: 13
                                }, this),
                                appliedFilters.dataSource === "cache" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 self-end rounded-lg border border-cyan-100 bg-cyan-50 px-3 py-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-end gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-semibold uppercase tracking-wide text-cyan-700",
                                                children: "Cache Metadata"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1201,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] text-cyan-800",
                                                children: cacheMetadata?.last_refresh_at ? `Refreshed ${new Date(cacheMetadata.last_refresh_at).toLocaleString()}` : "Refresh timestamp unavailable"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1202,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-cyan-700",
                                                children: [
                                                    "Records: ",
                                                    cacheMetadata?.record_count?.toLocaleString() ?? "—",
                                                    typeof cacheMetadata?.refresh_age_seconds === "number" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-1",
                                                        children: [
                                                            "· Age ",
                                                            Math.floor(cacheMetadata.refresh_age_seconds / 60),
                                                            "m"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                        lineNumber: 1210,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1207,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1200,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                    lineNumber: 1199,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 self-end",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-end gap-0.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-semibold uppercase tracking-wide text-slate-400",
                                                    children: "Ref Cache"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1218,
                                                    columnNumber: 19
                                                }, this),
                                                refCacheStatus.cachedAt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-[11px] font-medium ${refCacheStatus.isStale ? "text-amber-600" : "text-slate-500"}`,
                                                            children: [
                                                                "Refreshed ",
                                                                new Date(refCacheStatus.cachedAt).toLocaleTimeString("en-US", {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                    second: "2-digit"
                                                                })
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1221,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-slate-400",
                                                            children: [
                                                                "Expires ",
                                                                new Date(refCacheStatus.expiresAt).toLocaleTimeString("en-US", {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                    second: "2-digit"
                                                                }),
                                                                refCacheStatus.isStale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "ml-1 text-amber-500 font-semibold",
                                                                    children: "· stale"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1226,
                                                                    columnNumber: 52
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1224,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] text-slate-400",
                                                    children: "Not loaded"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1230,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1217,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleRefreshRefCache,
                                            disabled: isRefCacheRefreshing,
                                            "aria-label": "Reload ref data cache",
                                            className: "inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-sm leading-none ${isRefCacheRefreshing ? "animate-spin" : ""}`,
                                                children: "↻"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1240,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1233,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                    lineNumber: 1216,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                            lineNumber: 1036,
                            columnNumber: 11
                        }, this),
                        cacheSourceError && appliedFilters.dataSource === "cache" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700",
                            children: [
                                "Cache source unavailable: ",
                                cacheSourceError
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                            lineNumber: 1246,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                    lineNumber: 1035,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "border-b border-slate-200 bg-white px-6 py-3 flex-shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2 items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-semibold text-slate-400 whitespace-nowrap",
                                    children: "Filter"
                                }, void 0, false, {
                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                    lineNumber: 1257,
                                    columnNumber: 15
                                }, this),
                                filterOptionsWithOrg.map(({ key, label, options })=>{
                                    const isOrgsFilter = key === "orgs";
                                    const safeOptions = Array.isArray(options) ? options : [];
                                    const defaultOption = isOrgsFilter ? "All Orgs" : defaultFilters[key][0];
                                    const selectedValue = isOrgsFilter ? selectedFilters.orgs : selectedFilters[key];
                                    const appliedValue = isOrgsFilter ? appliedFilters.orgs : appliedFilters[key];
                                    const isOpen = openFilter === key;
                                    const isApplied = isOrgsFilter ? appliedValue.length > 0 : appliedValue[0] !== defaultOption;
                                    const isSelected = isOrgsFilter ? selectedValue.length > 0 : selectedValue[0] !== defaultOption;
                                    const selectedCount = isOrgsFilter ? selectedValue.length : isSelected ? 1 : 0;
                                    // Disable these filters when using live data (GraphQL)
                                    const disabledFiltersForLiveData = [
                                        "lineOfBusiness",
                                        "healthPlan",
                                        "superCommunity",
                                        "ipa"
                                    ];
                                    const isDisabledForLiveData = appliedFilters.dataSource === "graphql" && disabledFiltersForLiveData.includes(key);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>!isDisabledForLiveData && setOpenFilter(isOpen ? null : key),
                                                disabled: isDisabledForLiveData,
                                                title: isDisabledForLiveData ? "This filter is disabled when using Live data" : "",
                                                className: `inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap ${isDisabledForLiveData ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-60" : isSelected ? isApplied ? "border-cyan-400 bg-cyan-50 text-cyan-800" : "border-amber-400 bg-amber-50 text-amber-800" : isApplied ? "border-cyan-400 bg-cyan-50 text-cyan-800" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`,
                                                children: [
                                                    label,
                                                    selectedCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${isApplied && isSelected ? "bg-cyan-600 text-white" : isApplied ? "bg-cyan-600 text-white" : "bg-amber-600 text-white"}`,
                                                        children: selectedCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                        lineNumber: 1296,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-400 text-[10px]",
                                                        children: isOpen ? "▲" : "▼"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                        lineNumber: 1306,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1277,
                                                columnNumber: 21
                                            }, this),
                                            isOpen && !isDisabledForLiveData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute left-0 top-full mt-1 z-50 min-w-[180px] max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-3 py-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-semibold text-slate-700",
                                                                children: label
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                lineNumber: 1311,
                                                                columnNumber: 27
                                                            }, this),
                                                            isFilterOptionsLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-medium text-slate-400",
                                                                children: "Loading…"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                lineNumber: 1313,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                        lineNumber: 1310,
                                                        columnNumber: 25
                                                    }, this),
                                                    safeOptions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "px-3 py-2 text-xs text-slate-400",
                                                        children: "No options available"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                        lineNumber: 1317,
                                                        columnNumber: 27
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "py-1",
                                                        children: safeOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-slate-50",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "checkbox",
                                                                            name: key,
                                                                            value: option,
                                                                            checked: selectedValue.includes(option),
                                                                            onChange: ()=>toggleFilterValue(key, option),
                                                                            className: "rounded-sm border-slate-300"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                            lineNumber: 1323,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-slate-700",
                                                                            children: [
                                                                                option,
                                                                                key === "priority" && dynamicFilterOptions.priorityRefIds[option] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "ml-1 text-slate-400 text-[11px]",
                                                                                    children: [
                                                                                        "(",
                                                                                        dynamicFilterOptions.priorityRefIds[option],
                                                                                        ")"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                                    lineNumber: 1334,
                                                                                    columnNumber: 39
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                            lineNumber: 1331,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1322,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, option, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                lineNumber: 1321,
                                                                columnNumber: 31
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                        lineNumber: 1319,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1309,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, key, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1276,
                                        columnNumber: 19
                                    }, this);
                                }),
                                (()=>{
                                    const hasPendingChanges = Object.entries(selectedFilters).some(([key, value])=>{
                                        // Skip non-filter fields
                                        if ([
                                            "dateRangePreset",
                                            "fromDate",
                                            "toDate",
                                            "timezone",
                                            "year",
                                            "month"
                                        ].includes(key)) {
                                            return false;
                                        }
                                        // Compare current selection with what's already applied
                                        const appliedValue = appliedFilters[key];
                                        if (Array.isArray(value) && Array.isArray(appliedValue)) {
                                            if (value.length !== appliedValue.length) return true;
                                            return !value.every((v, i)=>v === appliedValue[i]);
                                        }
                                        return value !== appliedValue;
                                    });
                                    const hasSelections = Object.entries(selectedFilters).some(([key, value])=>{
                                        if ([
                                            "dateRangePreset",
                                            "fromDate",
                                            "toDate",
                                            "timezone",
                                            "year",
                                            "month"
                                        ].includes(key)) {
                                            return false;
                                        }
                                        const defaultValue = defaultFilters[key];
                                        if (Array.isArray(value) && Array.isArray(defaultValue)) {
                                            if (value.length !== defaultValue.length) return true;
                                            return !value.every((v, i)=>v === defaultValue[i]);
                                        }
                                        return value !== defaultValue;
                                    });
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 ml-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: applyFilters,
                                                disabled: !hasPendingChanges || isLoading,
                                                className: "cursor-pointer rounded-full border border-cyan-600 bg-cyan-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-300 disabled:opacity-60",
                                                children: "Apply Filters"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1379,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: clearFilterSelections,
                                                disabled: !hasSelections,
                                                className: "rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40",
                                                children: "Clear"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1387,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setShowCharts((current)=>!current),
                                                className: "rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50",
                                                children: showCharts ? "Hide Charts" : "Show Charts"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1395,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1378,
                                        columnNumber: 19
                                    }, this);
                                })()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                            lineNumber: 1256,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                        lineNumber: 1254,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                    lineNumber: 1253,
                    columnNumber: 9
                }, this),
                openFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-40",
                    onClick: ()=>setOpenFilter(null)
                }, void 0, false, {
                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                    lineNumber: 1411,
                    columnNumber: 11
                }, this),
                showColumnModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-40",
                    onClick: ()=>setShowColumnModal(false)
                }, void 0, false, {
                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                    lineNumber: 1414,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "border-b border-slate-200 bg-white px-6 py-3 flex-shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            showCharts && isChartsLoading && chartLoading.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium text-slate-600",
                                children: "Loading charts..."
                            }, void 0, false, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                lineNumber: 1421,
                                columnNumber: 15
                            }, this),
                            showCharts && isChartsLoading && !chartLoading.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-xs font-medium text-cyan-800",
                                children: "Refreshing charts..."
                            }, void 0, false, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                lineNumber: 1427,
                                columnNumber: 15
                            }, this),
                            showCharts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$ChartsGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChartsGrid"], {
                                statusData: chartsData.status,
                                priorityData: chartsData.priority,
                                requestTypeData: chartsData.requestType,
                                orgData: chartsData.org,
                                createdDateData: chartsData.createdDate,
                                routineTatData: chartsData.routineTat,
                                statusLoading: chartLoading.status,
                                priorityLoading: chartLoading.priority,
                                requestTypeLoading: chartLoading.requestType,
                                orgLoading: chartLoading.org,
                                createdDateLoading: chartLoading.createdDate,
                                routineTatLoading: chartLoading.routineTat
                            }, void 0, false, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                lineNumber: 1433,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                        lineNumber: 1419,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                    lineNumber: 1418,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "border-b border-slate-200 bg-white px-6 py-3 flex-shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-baseline gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold tracking-tight text-slate-900",
                                                children: "Auths"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1456,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl font-bold tracking-tight text-slate-900",
                                                children: isLoading ? "…" : totalCount.toLocaleString()
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1457,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1455,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Page ",
                                                    currentPage,
                                                    " of ",
                                                    pageCount,
                                                    "  ·  Showing ",
                                                    startRow,
                                                    "–",
                                                    endRow,
                                                    " of ",
                                                    totalCount.toLocaleString()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1462,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-300",
                                                children: "·"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1465,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-slate-600",
                                                children: appliedSummary
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1466,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1461,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                lineNumber: 1454,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "group relative inline-flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleExportCsv,
                                                disabled: isLoading || isExportingCsv || totalCount === 0 || totalCount > EXPORT_MAX_RECORDS,
                                                className: "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                                children: isExportingCsv ? "Exporting..." : "Export CSV"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1471,
                                                columnNumber: 17
                                            }, this),
                                            exportDisabledReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden w-max max-w-xs -translate-x-1/2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-md group-hover:block",
                                                children: exportDisabledReason
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1480,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1470,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setShowColumnModal((current)=>!current),
                                                className: "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50",
                                                children: "⚙ Columns"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1486,
                                                columnNumber: 17
                                            }, this),
                                            showColumnModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-slate-200 bg-white p-2 shadow-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "px-2 pb-1 text-xs font-semibold text-slate-700",
                                                        children: "Visible Columns"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                        lineNumber: 1495,
                                                        columnNumber: 21
                                                    }, this),
                                                    TAT_COLUMNS.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "flex items-center gap-2 rounded px-2 py-1 text-xs text-slate-700 hover:bg-slate-50",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    checked: visibleColumns.includes(column.key),
                                                                    onChange: ()=>toggleColumn(column.key),
                                                                    className: "rounded border-slate-300"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1498,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: column.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1504,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, column.key, true, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1497,
                                                            columnNumber: 23
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1494,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1485,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "rows-per-page",
                                        className: "text-xs font-semibold text-slate-500 whitespace-nowrap",
                                        children: "Rows"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1510,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                        value: String(pageSize),
                                        onValueChange: (value)=>{
                                            setPageSize(Number(value));
                                            setPage(1);
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                id: "rows-per-page",
                                                className: "h-9 w-[92px] rounded-lg border-slate-300 bg-white px-2 text-sm text-slate-900 focus:border-slate-400",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Rows"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1524,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1520,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: PAGE_SIZE_OPTIONS.map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: String(size),
                                                        children: size
                                                    }, size, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                        lineNumber: 1528,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1526,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1513,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setPage((current)=>Math.max(1, current - 1)),
                                        disabled: currentPage === 1 || isLoading,
                                        className: "rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                        children: "Previous"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1534,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "page-jump",
                                        className: "text-xs font-semibold text-slate-500 whitespace-nowrap",
                                        children: "Page"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1542,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "page-jump",
                                        type: "number",
                                        min: 1,
                                        max: pageCount,
                                        value: pageInput,
                                        onChange: (event)=>setPageInput(event.target.value),
                                        onBlur: applyPageInput,
                                        onKeyDown: (event)=>{
                                            if (event.key === "Enter") {
                                                applyPageInput();
                                            }
                                        },
                                        className: "rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1545,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setPage((current)=>Math.min(pageCount, current + 1)),
                                        disabled: currentPage >= pageCount || isLoading,
                                        className: "rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                        children: "Next"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1560,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                lineNumber: 1469,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                        lineNumber: 1453,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                    lineNumber: 1452,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "flex-1 overflow-auto relative",
                    children: [
                        showInitialLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center py-16",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-cyan-600"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1577,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-600",
                                        children: "Loading data…"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1578,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                lineNumber: 1576,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                            lineNumber: 1575,
                            columnNumber: 13
                        }, this),
                        isLoading && records.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-[1px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-cyan-600"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1586,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-slate-700",
                                        children: "Applying filters…"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                        lineNumber: 1587,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                lineNumber: 1585,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                            lineNumber: 1584,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "m-6 rounded-lg bg-red-50 p-4 text-sm text-red-700",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                            lineNumber: 1593,
                            columnNumber: 13
                        }, this),
                        !isLoading && !error && records.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center py-16",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500",
                                children: "No records found for the selected filters."
                            }, void 0, false, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                lineNumber: 1600,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                            lineNumber: 1599,
                            columnNumber: 13
                        }, this),
                        !error && records.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6 p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "min-w-full text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "sticky top-0 z-10 bg-slate-50",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-b border-slate-200",
                                                children: TAT_COLUMNS.filter((column)=>visibleColumns.includes(column.key)).map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "whitespace-nowrap px-4 py-2 text-left font-semibold text-slate-600",
                                                        children: SORTABLE_COLUMN_KEYS.has(column.key) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>handleSortClick(column.key),
                                                            className: "inline-flex items-center gap-1 rounded px-1 py-0.5 text-left text-slate-700 transition hover:bg-slate-100",
                                                            "aria-label": `Sort by ${column.label}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: column.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1622,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `inline-block w-3 text-center ${sortBy === column.key ? "text-cyan-700" : "text-transparent"}`,
                                                                    "aria-hidden": "true",
                                                                    children: sortDir === "asc" ? "↑" : "↓"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                    lineNumber: 1623,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1616,
                                                            columnNumber: 25
                                                        }, this) : column.label
                                                    }, column.key, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                        lineNumber: 1611,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                lineNumber: 1609,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1608,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: records.map((record, index)=>{
                                                const orgName = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$constants$2f$orgs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PREHASHED_ORG_BY_ID"][record.org_id] ?? record.org_id;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: `border-b border-slate-100 hover:bg-slate-50 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`,
                                                    children: [
                                                        visibleColumns.includes("hscId") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 font-mono",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: `https://localhost:4200/pa/member/${encodeURIComponent(record.indv_id)}/context?action=details&hscId=${encodeURIComponent(record.hsc_id)}`,
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                className: "text-cyan-700 underline underline-offset-2 hover:text-cyan-900",
                                                                children: record.hsc_id
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                lineNumber: 1649,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1648,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("tatDeadline") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.tat_due_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.tat_due_dttm, appliedFilters.timezone) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1660,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("indvId") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 font-mono text-slate-700",
                                                            children: record.indv_id
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1663,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("authorizationType") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.auth_typ_label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    record.auth_typ_label,
                                                                    record.auth_typ_ref_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "ml-1 text-slate-400 text-[11px]",
                                                                        children: [
                                                                            "(",
                                                                            record.auth_typ_ref_id,
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                        lineNumber: 1668,
                                                                        columnNumber: 83
                                                                    }, this)
                                                                ]
                                                            }, void 0, true) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1666,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("status") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.hsc_sts_typ_label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    record.hsc_sts_typ_label,
                                                                    record.hsc_sts_typ_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "ml-1 text-slate-400 text-[11px]",
                                                                        children: [
                                                                            "(",
                                                                            record.hsc_sts_typ_id,
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                        lineNumber: 1675,
                                                                        columnNumber: 85
                                                                    }, this)
                                                                ]
                                                            }, void 0, true) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1673,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("received") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.recv_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.recv_dttm, appliedFilters.timezone) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1680,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("member") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-2 text-slate-700",
                                                            children: record.member_name ?? "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1683,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("org") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: orgName
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1686,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("reviewDue") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.review_due_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.review_due_dttm, appliedFilters.timezone) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1689,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("timely") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: getIsTimelyDisplay(record)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1694,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("priority") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.rev_prr_ref_label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    record.rev_prr_ref_label,
                                                                    record.rev_prr_ref_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "ml-1 text-slate-400 text-[11px]",
                                                                        children: [
                                                                            "(",
                                                                            record.rev_prr_ref_id,
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                        lineNumber: 1699,
                                                                        columnNumber: 85
                                                                    }, this)
                                                                ]
                                                            }, void 0, true) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1697,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("authDecision") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.hsc_sts_typ_label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    record.hsc_sts_typ_label,
                                                                    record.hsc_sts_typ_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "ml-1 text-slate-400 text-[11px]",
                                                                        children: [
                                                                            "(",
                                                                            record.hsc_sts_typ_id,
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                        lineNumber: 1706,
                                                                        columnNumber: 85
                                                                    }, this)
                                                                ]
                                                            }, void 0, true) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1704,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("decisioned") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.decn_rndr_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.decn_rndr_dttm, appliedFilters.timezone) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1711,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("memberNodTatDeadline") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.curr_tat_nod_mbr_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.curr_tat_nod_mbr_dttm, appliedFilters.timezone) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1714,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("providerNodTatDeadline") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.tat_nod_prov_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.tat_nod_prov_dttm, appliedFilters.timezone) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1717,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("memberWrittenSent") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.wrt_decn_mbr_cmnct_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.wrt_decn_mbr_cmnct_dttm, appliedFilters.timezone) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1720,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("providerWrittenSent") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.wrt_decn_prov_cmnct_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.wrt_decn_prov_cmnct_dttm, appliedFilters.timezone) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1723,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("memberVerbalDone") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.decn_mbr_cmnct_dttm ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$lib$2f$formats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateTimeInZone"])(record.decn_mbr_cmnct_dttm, appliedFilters.timezone) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1726,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("lineOfBusiness") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.lob ?? "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1729,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("healthPlan") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.health_plan ?? "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1732,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("superCommunity") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.super_community ?? "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1735,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("timing") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.rev_term_typ_ref_label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    record.rev_term_typ_ref_label,
                                                                    record.rev_term_typ_ref_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "ml-1 text-slate-400 text-[11px]",
                                                                        children: [
                                                                            "(",
                                                                            record.rev_term_typ_ref_id,
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                                        lineNumber: 1740,
                                                                        columnNumber: 95
                                                                    }, this)
                                                                ]
                                                            }, void 0, true) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1738,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.includes("ipa") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "whitespace-nowrap px-4 py-2 text-slate-700",
                                                            children: record.ipa ?? "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1745,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, record.hsc_id, true, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1641,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1637,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                    lineNumber: 1607,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sticky bottom-0 z-10 mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-slate-200 bg-white/95 px-1 pt-3 pb-2 backdrop-blur",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "rows-per-page-bottom",
                                            className: "text-xs font-semibold text-slate-500 whitespace-nowrap",
                                            children: "Rows"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1754,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                            value: String(pageSize),
                                            onValueChange: (value)=>{
                                                setPageSize(Number(value));
                                                setPage(1);
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    id: "rows-per-page-bottom",
                                                    className: "h-9 w-[92px] rounded-lg border-slate-300 bg-white px-2 text-sm text-slate-900 focus:border-slate-400",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Rows"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                        lineNumber: 1768,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1764,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: PAGE_SIZE_OPTIONS.map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: String(size),
                                                            children: size
                                                        }, size, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                            lineNumber: 1772,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                                    lineNumber: 1770,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1757,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setPage((current)=>Math.max(1, current - 1)),
                                            disabled: currentPage === 1 || isLoading,
                                            className: "rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                            children: "Previous"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1778,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "page-jump-bottom",
                                            className: "text-xs font-semibold text-slate-500 whitespace-nowrap",
                                            children: "Page"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1786,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "page-jump-bottom",
                                            type: "number",
                                            min: 1,
                                            max: pageCount,
                                            value: pageInput,
                                            onChange: (event)=>setPageInput(event.target.value),
                                            onBlur: applyPageInput,
                                            onKeyDown: (event)=>{
                                                if (event.key === "Enter") {
                                                    applyPageInput();
                                                }
                                            },
                                            className: "rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1789,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setPage((current)=>Math.min(pageCount, current + 1)),
                                            disabled: currentPage >= pageCount || isLoading,
                                            className: "rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                            children: "Next"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                            lineNumber: 1804,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                                    lineNumber: 1753,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                            lineNumber: 1605,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
                    lineNumber: 1573,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
            lineNumber: 1033,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/dashboards/app/dashboards/um-tat-compliance/page.tsx",
        lineNumber: 1032,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=apps_dashboards_0894n~y._.js.map