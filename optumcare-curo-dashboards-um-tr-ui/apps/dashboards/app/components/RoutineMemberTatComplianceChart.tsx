import type { ChartDataPoint } from "@/lib/api/chart-data-service";
import { DoughnutChartCard } from "@/app/components/DoughnutChartCard";
import React from "react";

type RoutineMemberTatComplianceChartProps = {
  data: ChartDataPoint[];
  isLoading?: boolean;
};

export function RoutineMemberTatComplianceChart({
  data,
  isLoading = false,
}: RoutineMemberTatComplianceChartProps) {
  return (
    <DoughnutChartCard
      title="Routine Member TAT Compliance"
      data={data}
      isLoading={isLoading}
    />
  );
}