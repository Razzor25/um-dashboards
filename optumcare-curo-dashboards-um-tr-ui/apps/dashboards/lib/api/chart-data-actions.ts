"use server";

import {
  fetchExpeditedUrgentMemberTatChartData,
  fetchExpeditedUrgentProviderTatChartData,
  fetchAllChartsData,
  fetchChartDataByCreatedDate,
  fetchChartDataByOrg,
  fetchChartDataByPriority,
  fetchChartDataByRequestType,
  fetchChartDataByStatus,
  fetchRoutineProviderTatChartData,
  fetchRoutineTatChartData,
  type AllChartsData,
  type ChartDataSource,
  type ChartDataPoint,
  type StatusChartFilters,
} from "./chart-data-service";

export async function getAllChartsData(
  fromDate: string,
  toDate: string,
): Promise<AllChartsData> {
  try {
    return await fetchAllChartsData(fromDate, toDate);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch charts data: ${message}`);
  }
}

export async function getStatusChartData(
  fromDate: string,
  toDate: string,
  dataSource: ChartDataSource = "graphql",
  filters: StatusChartFilters = {},
): Promise<ChartDataPoint[]> {
  try {
    return await fetchChartDataByStatus(fromDate, toDate, dataSource, filters);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch status chart data: ${message}`);
  }
}

export async function getPriorityChartData(fromDate: string, toDate: string): Promise<ChartDataPoint[]> {
  try {
    return await fetchChartDataByPriority(fromDate, toDate);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch priority chart data: ${message}`);
  }
}

export async function getRequestTypeChartData(fromDate: string, toDate: string): Promise<ChartDataPoint[]> {
  try {
    return await fetchChartDataByRequestType(fromDate, toDate);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch request type chart data: ${message}`);
  }
}

export async function getOrgChartData(fromDate: string, toDate: string): Promise<ChartDataPoint[]> {
  try {
    return await fetchChartDataByOrg(fromDate, toDate);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch organization chart data: ${message}`);
  }
}

export async function getCreatedDateChartData(fromDate: string, toDate: string): Promise<ChartDataPoint[]> {
  try {
    return await fetchChartDataByCreatedDate(fromDate, toDate);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch created date chart data: ${message}`);
  }
}

export async function getRoutineTatChartData(
  fromDate: string,
  toDate: string,
  dataSource: ChartDataSource = "graphql",
  filters: StatusChartFilters = {},
): Promise<ChartDataPoint[]> {
  try {
    return await fetchRoutineTatChartData(fromDate, toDate, dataSource, filters);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch routine TAT chart data: ${message}`);
  }
}

export async function getExpeditedUrgentMemberTatChartData(
  fromDate: string,
  toDate: string,
  dataSource: ChartDataSource = "graphql",
  filters: StatusChartFilters = {},
): Promise<ChartDataPoint[]> {
  try {
    return await fetchExpeditedUrgentMemberTatChartData(fromDate, toDate, dataSource, filters);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch expedited / urgent member TAT chart data: ${message}`);
  }
}

export async function getRoutineProviderTatChartData(
  fromDate: string,
  toDate: string,
  dataSource: ChartDataSource = "graphql",
  filters: StatusChartFilters = {},
): Promise<ChartDataPoint[]> {
  try {
    return await fetchRoutineProviderTatChartData(fromDate, toDate, dataSource, filters);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch routine provider TAT chart data: ${message}`);
  }
}

export async function getExpeditedUrgentProviderTatChartData(
  fromDate: string,
  toDate: string,
  dataSource: ChartDataSource = "graphql",
  filters: StatusChartFilters = {},
): Promise<ChartDataPoint[]> {
  try {
    return await fetchExpeditedUrgentProviderTatChartData(fromDate, toDate, dataSource, filters);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch expedited / urgent provider TAT chart data: ${message}`);
  }
}
