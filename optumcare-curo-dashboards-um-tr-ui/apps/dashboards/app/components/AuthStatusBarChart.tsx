"use client";

import React, { useEffect, useRef, useState } from "react";

export type AuthStatusBarDataPoint = {
  label: string;
  count: number;
};

export type AuthStatusBarSeries = {
  label: string;
  values: number[];
};

type AuthStatusBarChartProps = {
  title?: string;
  data?: AuthStatusBarDataPoint[];
  xAxisLabels?: string[];
  series?: AuthStatusBarSeries[];
  isLoading?: boolean;
};

const PLACEHOLDER_DATA: AuthStatusBarDataPoint[] = [
  { label: "Approved", count: 0 },
  { label: "Denied", count: 0 },
  { label: "Pending", count: 0 },
  { label: "Partially Favorable", count: 0 },
  { label: "Withdrawn", count: 0 },
];

const BAR_COLORS: Record<string, string> = {
  Approved: "#10b981",
  Denied: "#ef4444",
  Pending: "#06b6d4",
  "Partially Favorable": "#f59e0b",
  Withdrawn: "#8b5cf6",
  "Auto Approved": "#22c55e",
  "No Auth Needed": "#0ea5e9",
};

declare global {
  interface Window {
    Plotly?: {
      newPlot: (container: HTMLDivElement, data: unknown[], layout: unknown, config: unknown) => void;
    };
  }
}

function PlotlyBarChart({
  data,
  xAxisLabels,
  series,
}: {
  data: AuthStatusBarDataPoint[];
  xAxisLabels?: string[];
  series?: AuthStatusBarSeries[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(
    () => typeof window !== "undefined" && !!window.Plotly,
  );

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.plot.ly/plotly-2.26.0.min.js";
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded || !containerRef.current || !window.Plotly) {
      return;
    }

    const hasGroupedSeries = !!xAxisLabels && !!series && series.length > 0;

    const plotData = hasGroupedSeries
      ? series.map((item) => ({
          x: xAxisLabels,
          y: item.values,
          type: "bar",
          name: item.label,
          marker: {
            color: BAR_COLORS[item.label] ?? "#06b6d4",
          },
          hovertemplate: "<b>%{x}</b><br>%{fullData.name}: %{y:,}<extra></extra>",
        }))
      : [
          {
            x: data.map((d) => d.label),
            y: data.map((d) => d.count),
            type: "bar",
            marker: {
              color: data.map((d) => BAR_COLORS[d.label] ?? "#06b6d4"),
            },
            hovertemplate: "<b>%{x}</b><br>Count: %{y:,}<extra></extra>",
          },
        ];

    const layout = {
      margin: { l: 48, r: 16, t: 16, b: 48 },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: { family: "system-ui, -apple-system", size: 11, color: "#374151" },
      xaxis: {
        tickfont: { size: 11 },
        gridcolor: "rgba(0,0,0,0)",
        zeroline: false,
      },
      yaxis: {
        tickfont: { size: 11 },
        gridcolor: "#f1f5f9",
        zeroline: false,
      },
      barmode: hasGroupedSeries ? "group" : "relative",
      showlegend: false,
      legend: {
        orientation: "h",
        x: 0,
        y: 1.18,
        xanchor: "left",
        yanchor: "bottom",
        traceorder: "normal",
      },
      bargap: 0.35,
    };

    window.Plotly.newPlot(containerRef.current, plotData, layout, {
      responsive: true,
      displayModeBar: false,
    });
  }, [isLoaded, data, xAxisLabels, series]);

  return <div ref={containerRef} className="h-56 w-full" />;
}

export function AuthStatusBarChart({
  title = "Trend by Month",
  data,
  xAxisLabels,
  series,
  isLoading = false,
}: AuthStatusBarChartProps) {
  const chartData = data && data.length > 0 ? data : PLACEHOLDER_DATA;
  const hasGroupedSeries = !!xAxisLabels && !!series && series.length > 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
      {hasGroupedSeries && series && (
        <div className="mt-2 overflow-x-auto">
          <div className="flex w-max items-center gap-4 whitespace-nowrap text-xs text-slate-600">
            {series.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: BAR_COLORS[item.label] ?? "#06b6d4" }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="mt-4 flex h-56 items-center justify-center">
          <span className="text-sm text-slate-400">Loading...</span>
        </div>
      ) : (
        <PlotlyBarChart data={chartData} xAxisLabels={xAxisLabels} series={series} />
      )}
    </div>
  );
}
