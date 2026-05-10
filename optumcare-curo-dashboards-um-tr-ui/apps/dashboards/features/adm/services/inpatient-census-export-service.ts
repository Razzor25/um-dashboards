import { fetchHscRecords } from "@/features/adm/services/inpatient-census-service";
import type { DateRangeKey, StatusFilter } from "@/features/adm/services/inpatient-census-service";
import {
  UM_INPATIENT_CENSUS_EXPORT_HEADERS,
  mapHscToInpatientCensusExportRow,
} from "@/features/adm/mappers/um-inpatient-census-export-mapper";

const EXPORT_PAGE_SIZE = 10000;
const EXPORT_FETCH_RETRIES = 3;

export type ExportFilters = {
  dateRange: DateRangeKey;
  statusFilter: StatusFilter;
  columnFilters?: Record<string, string[]>;
};

export async function buildInpatientCensusCsvStream(
  filters: ExportFilters,
  signal?: AbortSignal,
): Promise<ReadableStream<Uint8Array>> {
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(`${toCsvLine([...UM_INPATIENT_CENSUS_EXPORT_HEADERS])}\n`));
    },
    async pull(controller) {
      const state = getState(controller);
      if (!state) {
        controller.close();
        return;
      }

      if (signal?.aborted) {
        controller.error(new Error("Export request was aborted."));
        return;
      }

      if (state.finished) {
        controller.close();
        return;
      }

      try {
        const { records, totalCount, refLookup } = await fetchPageWithRetry(
          filters,
          state.page,
          signal,
        );

        if (state.totalCount === null) {
          state.totalCount = totalCount;
        }

        if (records.length === 0) {
          state.finished = true;
          controller.close();
          return;
        }

        for (const record of records) {
          const row = mapHscToInpatientCensusExportRow(record, refLookup);
          controller.enqueue(encoder.encode(`${toCsvLine(row)}\n`));
        }

        state.exported += records.length;
        state.page += 1;

        if (state.totalCount != null && state.exported >= state.totalCount) {
          state.finished = true;
        }
      } catch (error) {
        controller.error(error instanceof Error ? error : new Error("CSV export failed."));
      }
    },
  });
}

type StreamState = {
  page: number;
  exported: number;
  totalCount: number | null;
  finished: boolean;
};

const streamState = new WeakMap<ReadableStreamDefaultController<Uint8Array>, StreamState>();

function getState(
  controller: ReadableStreamDefaultController<Uint8Array>,
): StreamState | null {
  const existing = streamState.get(controller);
  if (existing) {
    return existing;
  }

  const created: StreamState = {
    page: 1,
    exported: 0,
    totalCount: null,
    finished: false,
  };

  streamState.set(controller, created);
  return created;
}

function toCsvLine(values: Array<string | number>): string {
  return values.map(toCsvField).join(",");
}

function toCsvField(value: string | number): string {
  const raw = String(value ?? "");
  if (!/[",\n]/.test(raw)) {
    return raw;
  }

  const escaped = raw.replace(/"/g, '""');
  return `"${escaped}"`;
}

async function fetchPageWithRetry(
  filters: ExportFilters,
  page: number,
  signal?: AbortSignal,
) {
  let attempt = 0;
  let lastError: unknown;

  while (attempt < EXPORT_FETCH_RETRIES) {
    if (signal?.aborted) {
      throw new Error("Export request was aborted.");
    }

    try {
      return await fetchHscRecords(
        filters.dateRange,
        page,
        EXPORT_PAGE_SIZE,
        filters.statusFilter,
        "received",
        "desc",
        filters.columnFilters || {},
      );
    } catch (error) {
      lastError = error;
      attempt += 1;

      if (attempt >= EXPORT_FETCH_RETRIES) {
        break;
      }

      await delay(attempt * 300);
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Failed to fetch export page.");
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
