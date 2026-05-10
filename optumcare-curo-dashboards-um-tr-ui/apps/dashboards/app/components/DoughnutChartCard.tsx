"use client";

import React, { useEffect, useRef, useState } from "react";
import type { ChartDataPoint } from "@/lib/api/chart-data-service";

type DoughnutChartCardProps = {
  title: string;
  data: ChartDataPoint[];
  isLoading?: boolean;
  isTbd?: boolean;
  infoContent?: React.ReactNode;
};

declare global {
  interface Window {
    Plotly?: {
      newPlot: (container: HTMLDivElement, data: unknown[], layout: unknown, config: unknown) => void;
    };
  }
}

function PlotlyDoughnutChart({ data }: { data: ChartDataPoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.Plotly) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.plot.ly/plotly-2.26.0.min.js";
    script.async = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current || !window.Plotly || !data.length) return;

    const total = data.reduce((sum, item) => sum + item.count, 0);
    const segmentColors = data.map((item, index) => {
      const normalizedLabel = item.label.toLowerCase();
      if (normalizedLabel.includes("approved")) return "#10b981";
      if (normalizedLabel.includes("denied")) return "#ef4444";
      if (normalizedLabel.includes("partially favorable")) return "#f59e0b";
      if (normalizedLabel.includes("timely")) return "#10b981";
      if (normalizedLabel.includes("late")) return "#ef4444";

      const fallbackPalette = ["#06b6d4", "#8b5cf6", "#10b981", "#f97316"];
      return fallbackPalette[index % fallbackPalette.length];
    });

    const plotData = [
      {
        labels: data.map((datum) => {
          const percentage = ((datum.count / total) * 100).toFixed(1);
          return `${datum.label} (${datum.count.toLocaleString()}, ${percentage}%)`;
        }),
        values: data.map((datum) => datum.count),
        type: "pie",
        hole: 0.4,
        marker: {
          colors: segmentColors,
        },
        textposition: "none",
        hovertemplate: "<b>%{label}</b><br>Percentage: %{percent}<extra></extra>",
      },
    ];

    const layout = {
      margin: { l: 10, r: 10, t: 30, b: 80 },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: { family: "system-ui, -apple-system", size: 10, color: "#374151" },
      showlegend: true,
      legend: {
        orientation: "h",
        x: 0.5,
        y: -0.2,
        xanchor: "center",
        yanchor: "top",
        bgcolor: "rgba(255,255,255,0)",
        bordercolor: "rgba(0,0,0,0)",
        borderwidth: 0,
      },
      annotations: [
        {
          text: `<b style="font-size: 20px">${total.toLocaleString()}</b><br><sub>Total Records</sub>`,
          x: 0.5,
          y: 0.5,
          xref: "paper",
          yref: "paper",
          showarrow: false,
          font: { size: 12, color: "#111827" },
        },
      ],
    };

    const config = {
      responsive: true,
      displayModeBar: false,
      displaylogo: false,
    };

    window.Plotly.newPlot(containerRef.current, plotData, layout, config);
  }, [isLoaded, data]);

  if (!data.length) {
    return <div className="flex h-full items-center justify-center text-xs text-slate-400">No data available</div>;
  }

  return <div ref={containerRef} style={{ minHeight: "300px" }} />;
}

export function DoughnutChartCard({ title, data, isLoading = false, isTbd = false, infoContent }: DoughnutChartCardProps) {
  const [showTable, setShowTable] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="flex-1 min-w-[400px]">
      <div className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3 className="truncate text-sm font-semibold text-slate-900">{title}</h3>
            {infoContent && (
              <div className="relative flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setShowInfo((c) => !c)}
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-400 text-[9px] font-bold leading-none text-slate-500 transition-colors hover:border-slate-600 hover:text-slate-700"
                  aria-label="Chart information"
                  aria-expanded={showInfo}
                >
                  i
                </button>
                {showInfo && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowInfo(false)} />
                    <div className="absolute left-0 top-full z-50 mt-1 w-80 rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-xs text-cyan-900 shadow-lg">
                      {infoContent}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowTable((current) => !current)}
            className="flex-shrink-0 rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200"
            title={showTable ? "Show chart" : "Show data"}
          >
            {showTable ? "Chart" : "Data"}
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">
          {isTbd ? (
            <div className="flex h-full min-h-[220px] items-center justify-center text-sm font-semibold text-slate-400">
              TBD
            </div>
          ) : isLoading ? (
            <div className="flex h-full min-h-[220px] items-center justify-center text-xs text-slate-500">
              <div className="inline-flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-cyan-600" />
                Loading chart...
              </div>
            </div>
          ) : showTable ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead className="sticky top-0 border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">Category</th>
                    <th className="px-3 py-2 text-right font-semibold text-slate-700">Count</th>
                    <th className="px-3 py-2 text-right font-semibold text-slate-700">%</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    const total = data.reduce((sum, datum) => sum + datum.count, 0);
                    const percentage = total > 0 ? ((item.count / total) * 100).toFixed(1) : "0.0";

                    return (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-3 py-2 text-slate-700">{item.label}</td>
                        <td className="px-3 py-2 text-right font-mono text-slate-700">{item.count.toLocaleString()}</td>
                        <td className="px-3 py-2 text-right text-slate-600">{percentage}%</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="border-t-2 border-slate-200 bg-slate-50 font-semibold">
                  <tr>
                    <td className="px-3 py-2 text-slate-900">Total</td>
                    <td className="px-3 py-2 text-right font-mono text-slate-900">
                      {data.reduce((sum, datum) => sum + datum.count, 0).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-900">100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <PlotlyDoughnutChart data={data} />
          )}
        </div>
      </div>
    </div>
  );
}