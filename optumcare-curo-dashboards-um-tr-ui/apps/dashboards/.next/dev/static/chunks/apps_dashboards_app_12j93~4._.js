(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/dashboards/app/components/AuthStatusBarChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthStatusBarChart",
    ()=>AuthStatusBarChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const PLACEHOLDER_DATA = [
    {
        label: "Approved",
        count: 0
    },
    {
        label: "Denied",
        count: 0
    },
    {
        label: "Pending",
        count: 0
    },
    {
        label: "Partially Favorable",
        count: 0
    },
    {
        label: "Withdrawn",
        count: 0
    }
];
const BAR_COLORS = {
    Approved: "#10b981",
    Denied: "#ef4444",
    Pending: "#06b6d4",
    "Partially Favorable": "#f59e0b",
    Withdrawn: "#8b5cf6",
    "Auto Approved": "#22c55e",
    "No Auth Needed": "#0ea5e9"
};
function PlotlyBarChart({ data, xAxisLabels, series }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "PlotlyBarChart.useState": ()=>("TURBOPACK compile-time value", "object") !== "undefined" && !!window.Plotly
    }["PlotlyBarChart.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlotlyBarChart.useEffect": ()=>{
            if (isLoaded) {
                return;
            }
            const script = document.createElement("script");
            script.src = "https://cdn.plot.ly/plotly-2.26.0.min.js";
            script.async = true;
            script.onload = ({
                "PlotlyBarChart.useEffect": ()=>setIsLoaded(true)
            })["PlotlyBarChart.useEffect"];
            document.head.appendChild(script);
            return ({
                "PlotlyBarChart.useEffect": ()=>{
                    if (document.head.contains(script)) {
                        document.head.removeChild(script);
                    }
                }
            })["PlotlyBarChart.useEffect"];
        }
    }["PlotlyBarChart.useEffect"], [
        isLoaded
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlotlyBarChart.useEffect": ()=>{
            if (!isLoaded || !containerRef.current || !window.Plotly) {
                return;
            }
            const hasGroupedSeries = !!xAxisLabels && !!series && series.length > 0;
            const plotData = hasGroupedSeries ? series.map({
                "PlotlyBarChart.useEffect": (item)=>({
                        x: xAxisLabels,
                        y: item.values,
                        type: "bar",
                        name: item.label,
                        marker: {
                            color: BAR_COLORS[item.label] ?? "#06b6d4"
                        },
                        hovertemplate: "<b>%{x}</b><br>%{fullData.name}: %{y:,}<extra></extra>"
                    })
            }["PlotlyBarChart.useEffect"]) : [
                {
                    x: data.map({
                        "PlotlyBarChart.useEffect": (d)=>d.label
                    }["PlotlyBarChart.useEffect"]),
                    y: data.map({
                        "PlotlyBarChart.useEffect": (d)=>d.count
                    }["PlotlyBarChart.useEffect"]),
                    type: "bar",
                    marker: {
                        color: data.map({
                            "PlotlyBarChart.useEffect": (d)=>BAR_COLORS[d.label] ?? "#06b6d4"
                        }["PlotlyBarChart.useEffect"])
                    },
                    hovertemplate: "<b>%{x}</b><br>Count: %{y:,}<extra></extra>"
                }
            ];
            const layout = {
                margin: {
                    l: 48,
                    r: 16,
                    t: 16,
                    b: 48
                },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                font: {
                    family: "system-ui, -apple-system",
                    size: 11,
                    color: "#374151"
                },
                xaxis: {
                    tickfont: {
                        size: 11
                    },
                    gridcolor: "rgba(0,0,0,0)",
                    zeroline: false
                },
                yaxis: {
                    tickfont: {
                        size: 11
                    },
                    gridcolor: "#f1f5f9",
                    zeroline: false
                },
                barmode: hasGroupedSeries ? "group" : "relative",
                showlegend: false,
                legend: {
                    orientation: "h",
                    x: 0,
                    y: 1.18,
                    xanchor: "left",
                    yanchor: "bottom",
                    traceorder: "normal"
                },
                bargap: 0.35
            };
            window.Plotly.newPlot(containerRef.current, plotData, layout, {
                responsive: true,
                displayModeBar: false
            });
        }
    }["PlotlyBarChart.useEffect"], [
        isLoaded,
        data,
        xAxisLabels,
        series
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "h-56 w-full"
    }, void 0, false, {
        fileName: "[project]/apps/dashboards/app/components/AuthStatusBarChart.tsx",
        lineNumber: 145,
        columnNumber: 10
    }, this);
}
_s(PlotlyBarChart, "p78W86Z6PbKD8RAIGL74vJoDui4=");
_c = PlotlyBarChart;
function AuthStatusBarChart({ title = "Trend by Month", data, xAxisLabels, series, isLoading = false }) {
    const chartData = data && data.length > 0 ? data : PLACEHOLDER_DATA;
    const hasGroupedSeries = !!xAxisLabels && !!series && series.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-slate-200 bg-white p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-sm font-semibold text-slate-700",
                children: title
            }, void 0, false, {
                fileName: "[project]/apps/dashboards/app/components/AuthStatusBarChart.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            hasGroupedSeries && series && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex w-max items-center gap-4 whitespace-nowrap text-xs text-slate-600",
                    children: series.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-block h-2.5 w-2.5 rounded-full",
                                    style: {
                                        backgroundColor: BAR_COLORS[item.label] ?? "#06b6d4"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/dashboards/app/components/AuthStatusBarChart.tsx",
                                    lineNumber: 166,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/apps/dashboards/app/components/AuthStatusBarChart.tsx",
                                    lineNumber: 170,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, item.label, true, {
                            fileName: "[project]/apps/dashboards/app/components/AuthStatusBarChart.tsx",
                            lineNumber: 165,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/dashboards/app/components/AuthStatusBarChart.tsx",
                    lineNumber: 163,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/dashboards/app/components/AuthStatusBarChart.tsx",
                lineNumber: 162,
                columnNumber: 9
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex h-56 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm text-slate-400",
                    children: "Loading..."
                }, void 0, false, {
                    fileName: "[project]/apps/dashboards/app/components/AuthStatusBarChart.tsx",
                    lineNumber: 178,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/dashboards/app/components/AuthStatusBarChart.tsx",
                lineNumber: 177,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlotlyBarChart, {
                data: chartData,
                xAxisLabels: xAxisLabels,
                series: series
            }, void 0, false, {
                fileName: "[project]/apps/dashboards/app/components/AuthStatusBarChart.tsx",
                lineNumber: 181,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/dashboards/app/components/AuthStatusBarChart.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
_c1 = AuthStatusBarChart;
var _c, _c1;
__turbopack_context__.k.register(_c, "PlotlyBarChart");
__turbopack_context__.k.register(_c1, "AuthStatusBarChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UmOncologyAuthStatusPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$AuthStatusBarChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/dashboards/app/components/AuthStatusBarChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@uhg-netra-ai/core-react-components/src/ui/select.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const EMPTY_RESPONSE = {
    trendByMonth: [],
    trendByMonthStatus: {
        months: [],
        series: []
    },
    totalAuthsByStatus: [],
    detailedInformationRows: []
};
const DETAILED_INFO_PAGE_SIZE = 100;
function UmOncologyAuthStatusPage() {
    _s();
    const [dateRange, setDateRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("last-30-days");
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(EMPTY_RESPONSE);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const totalRows = data.detailedInformationRows.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / DETAILED_INFO_PAGE_SIZE));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UmOncologyAuthStatusPage.useMemo[paginatedRows]": ()=>{
            const startIndex = (safeCurrentPage - 1) * DETAILED_INFO_PAGE_SIZE;
            return data.detailedInformationRows.slice(startIndex, startIndex + DETAILED_INFO_PAGE_SIZE);
        }
    }["UmOncologyAuthStatusPage.useMemo[paginatedRows]"], [
        safeCurrentPage,
        data.detailedInformationRows
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UmOncologyAuthStatusPage.useEffect": ()=>{
            const controller = new AbortController();
            const loadData = {
                "UmOncologyAuthStatusPage.useEffect.loadData": async ()=>{
                    try {
                        setIsLoading(true);
                        setErrorMessage(null);
                        const response = await fetch(`/api/cgp/oncology-auth-status?dateRange=${encodeURIComponent(dateRange)}`, {
                            cache: "no-store",
                            signal: controller.signal
                        });
                        if (!response.ok) {
                            const body = await response.json().catch({
                                "UmOncologyAuthStatusPage.useEffect.loadData": ()=>null
                            }["UmOncologyAuthStatusPage.useEffect.loadData"]);
                            throw new Error(body?.error ?? "Failed to load oncology auth status data");
                        }
                        const body = await response.json();
                        setData(body);
                        setCurrentPage(1);
                    } catch (error) {
                        if (controller.signal.aborted) {
                            return;
                        }
                        const message = error instanceof Error ? error.message : "Unexpected error while loading data";
                        setErrorMessage(message);
                    } finally{
                        if (!controller.signal.aborted) {
                            setIsLoading(false);
                        }
                    }
                }
            }["UmOncologyAuthStatusPage.useEffect.loadData"];
            void loadData();
            return ({
                "UmOncologyAuthStatusPage.useEffect": ()=>controller.abort()
            })["UmOncologyAuthStatusPage.useEffect"];
        }
    }["UmOncologyAuthStatusPage.useEffect"], [
        dateRange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto flex w-full max-w-7xl flex-col gap-6 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-semibold text-slate-900",
                        children: "Oncology - Auth Status"
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-slate-500",
                        children: "Authorization status dashboard for Oncology."
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto mt-4 grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "date-range",
                                        className: "mb-1 block text-sm font-medium text-slate-700",
                                        children: "Referred Date"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: dateRange,
                                        onValueChange: (value)=>setDateRange(value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                id: "date-range",
                                                className: "w-full rounded-lg border-slate-300 bg-white text-sm text-slate-700 focus:border-cyan-400",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Referred Date"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 120,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "last-7-days",
                                                        children: "Last 7 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "last-30-days",
                                                        children: "Last 30 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "last-90-days",
                                                        children: "Last 90 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "year-to-date",
                                                        children: "Year to Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 123,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "request-type",
                                        className: "mb-1 block text-sm font-medium text-slate-700",
                                        children: "Request Type"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        defaultValue: "all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                id: "request-type",
                                                className: "w-full rounded-lg border-slate-300 bg-white text-sm text-slate-700 focus:border-cyan-400",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Request Type"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 136,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "all",
                                                        children: "All"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "urgent",
                                                        children: "Urgent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "routine",
                                                        children: "Routine"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "expedited",
                                                        children: "Expedited"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 139,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "channel-type",
                                        className: "mb-1 block text-sm font-medium text-slate-700",
                                        children: "Request Channel"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        defaultValue: "all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                id: "channel-type",
                                                className: "w-full rounded-lg border-slate-300 bg-white text-sm text-slate-700 focus:border-cyan-400",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Request Channel"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 152,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "all",
                                                        children: "All"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "fax",
                                                        children: "Fax"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 157,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "phone",
                                                        children: "Phone"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "portal",
                                                        children: "Portal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 159,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 155,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "super-community",
                                        className: "mb-1 block text-sm font-medium text-slate-700",
                                        children: "Super Community"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        defaultValue: "all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                id: "super-community",
                                                className: "w-full rounded-lg border-slate-300 bg-white text-sm text-slate-700 focus:border-cyan-400",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Super Community"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 168,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "all",
                                                        children: "All"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 172,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "community-a",
                                                        children: "Community A"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "community-b",
                                                        children: "Community B"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 174,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "community-c",
                                                        children: "Community C"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 171,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "org",
                                        className: "mb-1 block text-sm font-medium text-slate-700",
                                        children: "Org"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        defaultValue: "all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                id: "org",
                                                className: "w-full rounded-lg border-slate-300 bg-white text-sm text-slate-700 focus:border-cyan-400",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Org"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 184,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "all",
                                                        children: "All"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "100",
                                                        children: "Midwest"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 189,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "120",
                                                        children: "California"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$uhg$2d$netra$2d$ai$2f$core$2d$react$2d$components$2f$src$2f$ui$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "390",
                                                        children: "WellMed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                        lineNumber: 191,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 187,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 183,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-5xl rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700",
                children: errorMessage
            }, void 0, false, {
                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                lineNumber: 199,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$AuthStatusBarChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthStatusBarChart"], {
                        title: "Trend by Month",
                        data: data.trendByMonth,
                        xAxisLabels: data.trendByMonthStatus.months,
                        series: data.trendByMonthStatus.series,
                        isLoading: isLoading
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboards$2f$app$2f$components$2f$AuthStatusBarChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthStatusBarChart"], {
                        title: "Total Auths by Status",
                        data: data.totalAuthsByStatus,
                        isLoading: isLoading
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-7xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-sm font-semibold uppercase tracking-[0.16em] text-slate-600",
                                children: "DETAILED INFORMATION"
                            }, void 0, false, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this),
                            !isLoading && totalRows > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-start gap-3 text-sm text-slate-600 sm:items-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Showing ",
                                            (safeCurrentPage - 1) * DETAILED_INFO_PAGE_SIZE + 1,
                                            "-",
                                            Math.min(safeCurrentPage * DETAILED_INFO_PAGE_SIZE, totalRows),
                                            " of ",
                                            totalRows
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 221,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setCurrentPage((prev)=>Math.max(1, Math.min(prev, totalPages) - 1)),
                                                disabled: safeCurrentPage === 1,
                                                className: "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                                children: "Previous"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 226,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-500",
                                                children: [
                                                    "Page ",
                                                    safeCurrentPage,
                                                    " of ",
                                                    totalPages
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 234,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setCurrentPage((prev)=>Math.min(totalPages, Math.min(prev, totalPages) + 1)),
                                                disabled: safeCurrentPage === totalPages,
                                                className: "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                                children: "Next"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 237,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 max-h-[32rem] overflow-auto rounded-xl border border-slate-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "min-w-[1200px] divide-y divide-slate-200 text-sm whitespace-nowrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        className: "sticky top-0 z-10 bg-slate-50 text-left text-xs uppercase tracking-[0.08em] text-slate-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2",
                                                    children: "Auth ID"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2",
                                                    children: "Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2",
                                                    children: "Status Reason"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2",
                                                    children: "Member Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2",
                                                    children: "Create Date"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 257,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2",
                                                    children: "Decisioned Date"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2",
                                                    children: "Org"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2",
                                                    children: "Super Community"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                            lineNumber: 252,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        className: "bg-white text-slate-700",
                                        children: [
                                            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-3 text-slate-500",
                                                    colSpan: 8,
                                                    children: "Loading detailed information..."
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 265,
                                                columnNumber: 17
                                            }, this),
                                            !isLoading && data.detailedInformationRows.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-3 text-slate-500",
                                                    colSpan: 8,
                                                    children: "No records found for the selected filters."
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                lineNumber: 272,
                                                columnNumber: 17
                                            }, this),
                                            !isLoading && paginatedRows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-t border-slate-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-3 py-3",
                                                            children: row.authId
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                            lineNumber: 281,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-3 py-3",
                                                            children: row.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                            lineNumber: 282,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-3 py-3",
                                                            children: row.statusReason
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                            lineNumber: 283,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-3 py-3",
                                                            children: row.memberName
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                            lineNumber: 284,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-3 py-3",
                                                            children: row.createDate
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                            lineNumber: 285,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-3 py-3",
                                                            children: row.decisionedDate
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                            lineNumber: 286,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-3 py-3",
                                                            children: row.org
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                            lineNumber: 287,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-3 py-3",
                                                            children: row.superCommunity
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                            lineNumber: 288,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, `${row.authId}-${row.createDate}`, true, {
                                                    fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                                    lineNumber: 280,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 263,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this),
                            !isLoading && totalRows > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sticky bottom-0 z-10 flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setCurrentPage((prev)=>Math.max(1, Math.min(prev, totalPages) - 1)),
                                        disabled: safeCurrentPage === 1,
                                        className: "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                        children: "Previous"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-slate-500",
                                        children: [
                                            "Page ",
                                            safeCurrentPage,
                                            " of ",
                                            totalPages
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setCurrentPage((prev)=>Math.min(totalPages, Math.min(prev, totalPages) + 1)),
                                        disabled: safeCurrentPage === totalPages,
                                        className: "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                        children: "Next"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                        lineNumber: 307,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                                lineNumber: 295,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/dashboards/app/dashboards/um-oncology-auth-status/page.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(UmOncologyAuthStatusPage, "4ZDphvMNrV3o8TrYL7+04rTxG04=");
_c = UmOncologyAuthStatusPage;
var _c;
__turbopack_context__.k.register(_c, "UmOncologyAuthStatusPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_dashboards_app_12j93~4._.js.map