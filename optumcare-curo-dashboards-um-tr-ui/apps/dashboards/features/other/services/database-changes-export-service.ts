import {
  getDatabaseChangeLog,
  type DatabaseChangeFilterKey,
  type DatabaseChangeSortKey,
} from "@/features/other/services/database-changes-service";

export type DatabaseChangeExportFilters = {
  sortKey: DatabaseChangeSortKey;
  sortDirection: "asc" | "desc";
  filters?: Partial<Record<DatabaseChangeFilterKey, string[]>>;
};

export async function buildDatabaseChangeLogCsvStream(
  filters: DatabaseChangeExportFilters,
): Promise<ReadableStream<Uint8Array>> {
  const { columns, rows } = await getDatabaseChangeLog(filters);
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(`${toCsvLine(columns)}\n`));

      for (const row of rows) {
        controller.enqueue(encoder.encode(`${toCsvLine(columns.map((column) => row[column] ?? ""))}\n`));
      }

      controller.close();
    },
  });
}

function toCsvLine(values: Array<string | number>): string {
  return values.map(toCsvField).join(",");
}

function toCsvField(value: string | number): string {
  const raw = String(value ?? "");
  if (!/[",\n]/.test(raw)) {
    return raw;
  }

  const escaped = raw.replaceAll('"', '""');
  return `"${escaped}"`;
}
