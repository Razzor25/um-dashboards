import type { ChartDataPoint } from "@/lib/api/chart-data-service";
import { ApprovedDeniedPartiallyFavorableChart } from "@/app/components/ApprovedDeniedPartiallyFavorableChart";
import { DoughnutChartCard } from "@/app/components/DoughnutChartCard";
import { RoutineMemberTatComplianceChart } from "@/app/components/RoutineMemberTatComplianceChart";

type ChartsGridProps = {
  statusData?: ChartDataPoint[];
  priorityData?: ChartDataPoint[];
  requestTypeData?: ChartDataPoint[];
  orgData?: ChartDataPoint[];
  createdDateData?: ChartDataPoint[];
  routineTatData?: ChartDataPoint[];
  statusLoading?: boolean;
  priorityLoading?: boolean;
  requestTypeLoading?: boolean;
  orgLoading?: boolean;
  createdDateLoading?: boolean;
  routineTatLoading?: boolean;
  requestTypeTbd?: boolean;
  orgTbd?: boolean;
  createdDateTbd?: boolean;
};

export function ChartsGrid({
  statusData = [],
  requestTypeData = [],
  orgData = [],
  createdDateData = [],
  routineTatData = [],
  statusLoading = false,
  requestTypeLoading = false,
  orgLoading = false,
  createdDateLoading = false,
  routineTatLoading = false,
  requestTypeTbd = false,
  orgTbd = false,
  createdDateTbd = false,
}: ChartsGridProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pr-6">
      <ApprovedDeniedPartiallyFavorableChart data={statusData} isLoading={statusLoading} />

      <RoutineMemberTatComplianceChart data={routineTatData} isLoading={routineTatLoading} />

      <DoughnutChartCard
        title="Expedited / Urgent Member TAT Compliance"
        data={requestTypeData}
        isLoading={requestTypeLoading}
        isTbd={requestTypeTbd}
      />

      <DoughnutChartCard title="Routine Provider TAT Compliance" data={orgData} isLoading={orgLoading} isTbd={orgTbd} />

      <DoughnutChartCard
        title="Expedited / Urgent Provider TAT Compliance"
        data={createdDateData}
        isLoading={createdDateLoading}
        isTbd={createdDateTbd}
      />
    </div>
  );
}

