"use server";

import { fetchTatFilterOptions, fetchTatPriorityCounts, fetchTatRecords } from "@/features/um/services/tat-compliance-service";
import {
  fetchTatCacheMetadata,
  fetchTatFilterOptionsViaCache,
  fetchTatPriorityCountsViaCache,
  fetchTatRecordsViaCache,
} from "@/features/um/services/tat-compliance-service";
import type {
  TatCacheMetadata,
  TatDataSource,
  TatRecord,
  TatFilters,
  TatSortColumn,
  TatPriorityCounts,
  TatFilterOptions,
} from "@/features/um/services/tat-compliance-service";
import {
  getHscRefCacheStatus,
  invalidateHscRefCache,
  getHscRefLookup,
} from "@/lib/shared/hsc-ref-service";

export type RefCacheStatus = {
  cachedAt: string | null;
  expiresAt: string | null;
  isStale: boolean;
};

export type TatPageResult = {
  records: TatRecord[];
  totalCount: number;
  cache?: TatCacheMetadata;
};

export async function getHscRecordsForTatCompliance(
  filters: TatFilters,
  page: number,
  pageSize: number,
  sortBy: TatSortColumn = "received",
  sortDir: "asc" | "desc" = "desc",
  includeTotalCount: boolean = true,
  dataSource: TatDataSource = "graphql",
): Promise<TatPageResult> {
  try {
    if (dataSource === "cache") {
      // return await fetchTatRecordsViaCache(filters, page, pageSize, sortBy, sortDir, includeTotalCount);
    }
    return await fetchTatRecords(filters, page, pageSize, sortBy, sortDir, includeTotalCount);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch TAT records: ${message}`);
  }
}

export async function getTatPriorityCounts(
  filters: TatFilters,
  dataSource: TatDataSource = "graphql",
): Promise<TatPriorityCounts> {
  try {
    if (dataSource === "cache") {
      return await fetchTatPriorityCountsViaCache(filters);
    }
    return await fetchTatPriorityCounts(filters);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch TAT priority counts: ${message}`);
  }
}

export async function getTatFilterOptions(
  filters: TatFilters,
  dataSource: TatDataSource = "graphql",
): Promise<TatFilterOptions> {
  try {
    if (dataSource === "cache") {
      return await fetchTatFilterOptionsViaCache(filters);
    }
    return await fetchTatFilterOptions(filters);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch TAT filter options: ${message}`);
  }
}

export async function getTatCacheMetadata(): Promise<TatCacheMetadata> {
  try {
    return await fetchTatCacheMetadata();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch cache metadata: ${message}`);
  }
}

function buildRefCacheStatus(): RefCacheStatus {
  const { cachedAt, ttlMs } = getHscRefCacheStatus();
  if (!cachedAt) {
    return { cachedAt: null, expiresAt: null, isStale: true };
  }
  const expiresAt = cachedAt + ttlMs;
  return {
    cachedAt: new Date(cachedAt).toISOString(),
    expiresAt: new Date(expiresAt).toISOString(),
    isStale: Date.now() >= expiresAt,
  };
}

export async function getRefCacheStatus(): Promise<RefCacheStatus> {
  return buildRefCacheStatus();
}

export async function refreshRefCache(): Promise<RefCacheStatus> {
  invalidateHscRefCache();
  await getHscRefLookup();
  return buildRefCacheStatus();
}
