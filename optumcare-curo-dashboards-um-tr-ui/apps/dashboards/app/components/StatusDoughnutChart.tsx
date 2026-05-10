"use client";

import React, { useEffect, useRef, useState } from "react";

type StatusCategory = "Approved" | "Denied" | "Partially Favorable";

type Props = {
  statusCounts: Record<StatusCategory, number>;
};

const STATUS_COLORS: Record<StatusCategory, string> = {
  Approved: "#10b981", // green-500
  Denied: "#ef4444", // red-500
  "Partially Favorable": "#f59e0b", // amber-500
};

const STATUS_LABELS: Record<StatusCategory, string> = {
  Approved: "Approved (1000895)",
  Denied: "Denied (1000935)",
  "Partially Favorable": "Partially Favorable (1005006)",
};

declare global {
  interface Window {
    Plotly?: {
      newPlot: (container: HTMLDivElement, data: unknown[], layout: unknown, config: unknown) => void;
    };
  }
}

export function StatusDoughnutChart({ statusCounts }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Plotly from CDN
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

  // Create chart
  useEffect(() => {
    if (!isLoaded || !containerRef.current || !window.Plotly) return;

    const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);

    const counts = {
      Approved: statusCounts["Approved"] ?? 0,
      Denied: statusCounts["Denied"] ?? 0,
      "Partially Favorable": statusCounts["Partially Favorable"] ?? 0,
    };

    const data = [
      {
        labels: [
          `${STATUS_LABELS["Approved"]} (${counts.Approved.toLocaleString()}, ${((counts.Approved / total) * 100).toFixed(1)}%)`,
          `${STATUS_LABELS["Denied"]} (${counts.Denied.toLocaleString()}, ${((counts.Denied / total) * 100).toFixed(1)}%)`,
          `${STATUS_LABELS["Partially Favorable"]} (${counts["Partially Favorable"].toLocaleString()}, ${((counts["Partially Favorable"] / total) * 100).toFixed(1)}%)`,
        ],
        values: [
          counts.Approved,
          counts.Denied,
          counts["Partially Favorable"],
        ],
        type: "pie",
        hole: 0.4,
        marker: {
          colors: [
            STATUS_COLORS["Approved"],
            STATUS_COLORS["Denied"],
            STATUS_COLORS["Partially Favorable"],
          ],
        },
        textposition: "none",
        hovertemplate: "<b>%{label}</b><br>Count: %{value}<br>Percentage: %{percent}<extra></extra>",
      },
    ];

    const layout = {
      title: {
        text: "Authorization Status Breakdown",
        font: { size: 18, color: "#111827", family: "system-ui, -apple-system" },
      },
      margin: { l: 20, r: 200, t: 60, b: 20 },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: { family: "system-ui, -apple-system", size: 12, color: "#374151" },
      showlegend: true,
      legend: {
        orientation: "v",
        x: 1.02,
        y: 1,
        xanchor: "left",
        yanchor: "top",
        bgcolor: "rgba(255,255,255,0.9)",
        bordercolor: "#e2e8f0",
        borderwidth: 1,
        font: { size: 13 },
      },
      annotations: [
        {
          text: `<b style="font-size: 28px">${total.toLocaleString()}</b><br><sub>Total Auths</sub>`,
          x: 0.5,
          y: 0.5,
          xref: "paper",
          yref: "paper",
          showarrow: false,
          font: { size: 14, color: "#111827" },
        },
      ],
    };

    const config = {
      responsive: true,
      displayModeBar: false,
      displaylogo: false,
    };

    window.Plotly.newPlot(containerRef.current, data as any, layout, config as any);
  }, [isLoaded, statusCounts]);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div ref={containerRef} style={{ minHeight: "400px" }} />
    </div>
  );
}
