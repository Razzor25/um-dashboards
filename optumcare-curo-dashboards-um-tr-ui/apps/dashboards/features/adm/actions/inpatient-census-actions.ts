"use server";

import { fetchHscRecords } from "@/features/adm/services/inpatient-census-service";
import type { HscRecord, DateRangeKey, StatusFilter } from "@/features/adm/services/inpatient-census-service";

export type HscPageResult = {
  records: HscRecord[];
  totalCount: number;
  refLookup: Record<number, string>;
};

export async function getHscRecords(
  dateRange: DateRangeKey,
  page: number,
  pageSize: number,
  statusFilter: StatusFilter,
  sortKey: string = "received",
  sortDir: "asc" | "desc" = "desc",
  columnFilters: Record<string, string[]> = {},
): Promise<HscPageResult> {
  try {
    const { records, totalCount, refLookup } = await fetchHscRecords(
      dateRange,
      page,
      pageSize,
      statusFilter,
      sortKey,
      sortDir,
      columnFilters,
    );
    // Convert Map to plain object so it can cross the server→client boundary
    const refLookupObj: Record<number, string> = {};
    for (const [k, v] of refLookup) {
      refLookupObj[k] = v;
    }
    return { records, totalCount, refLookup: refLookupObj };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch HSC records: ${message}`);
  }
}
