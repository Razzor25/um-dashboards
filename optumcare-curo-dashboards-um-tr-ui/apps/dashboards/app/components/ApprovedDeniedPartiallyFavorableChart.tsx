import React, { type ReactNode } from "react";
import type { ChartDataPoint } from "@/lib/api/chart-data-service";
import { DoughnutChartCard } from "@/app/components/DoughnutChartCard";

type ApprovedDeniedPartiallyFavorableChartProps = {
  data: ChartDataPoint[];
  isLoading?: boolean;
};

const STATUS_CHART_INFO = (
  <>
    <p className="font-semibold">What this chart counts</p>
    <ul className="mt-2 list-disc space-y-1 pl-4">
      <li>Includes only these status IDs: 1000895 (Approved), 1000935 (Denied), 1005006 (Partially Favorable).</li>
      <li>Date range is based on Created datetime (<span className="font-mono">creat_dttm</span>) from the top date controls.</li>
      <li>Excludes records where Member ID is missing or non-positive (<span className="font-mono">indv_id &lt;= 0</span>).</li>
      <li>Uses the selected data source: Cached calls <span className="font-mono">/v1/prior-auth/status-chart</span>; Live uses GraphQL aggregate counts.</li>
      <li>This status chart currently reflects the date range and data source, not the table filter chips.</li>
    </ul>
  </>
);

export function ApprovedDeniedPartiallyFavorableChart({
  data,
  isLoading = false,
}: ApprovedDeniedPartiallyFavorableChartProps) {
  return (
    <DoughnutChartCard
      title="Approved / Denied / Partially Favorable"
      data={data}
      isLoading={isLoading}
      infoContent={STATUS_CHART_INFO}
    />
  );
}