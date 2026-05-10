import { datmonitorGraphqlRequest } from "@/lib/api/datmonitor-graphql-client";

type DatabaseChangeRowsResponse = {
  database_change_form: Array<Record<string, unknown>>;
};

type ReleaseRowsResponse = {
  curo_releases: Array<{
    release_number: string;
    expected_stage_date: string | null;
    expected_prod_date: string | null;
  }>;
};

export type DatabaseChangeLogResult = {
  columns: string[];
  rows: Array<Record<string, string>>;
  orderField: string | null;
};

export type DatabaseChangeSortKey = (typeof DATABASE_CHANGE_COLUMNS)[number];
export type DatabaseChangeFilterKey =
  | "team_name"
  | "release_number"
  | "db_domain_name"
  | "change_type";

export type DatabaseChangeLogOptions = {
  sortKey?: DatabaseChangeSortKey;
  sortDirection?: "asc" | "desc";
  filters?: Partial<Record<DatabaseChangeFilterKey, string[]>>;
};

const DATABASE_CHANGE_COLUMNS = [
  "change_id",
  "team_name",
  "release_number",
  "expected_stage_date",
  "expected_prod_date",
  "db_domain_name",
  "change_type",
  "change_type_other_dec",
  "change_description",
  "sql_change",
  "additional_notes",
  "create_dttm",
  "change_dttm",
] as const;

const DATABASE_CHANGE_SOURCE_COLUMNS = [
  "change_id",
  "team_name",
  "release_number",
  "db_domain_name",
  "change_type",
  "change_type_other_dec",
  "change_description",
  "sql_change",
  "additional_notes",
  "create_dttm",
  "change_dttm",
] as const;

function toCellValue(value: unknown): string {
  if (value === null || value === undefined) return "-";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return JSON.stringify(value);
}

function normalizeValue(value: string | undefined): string {
  if (!value || value.trim().length === 0) {
    return "-";
  }

  return value;
}

function applyFilters(
  rows: Array<Record<string, string>>,
  filters: Partial<Record<DatabaseChangeFilterKey, string[]>>,
): Array<Record<string, string>> {
  const activeFilters = Object.entries(filters).filter(([, values]) => values && values.length > 0) as Array<
    [DatabaseChangeFilterKey, string[]]
  >;

  if (activeFilters.length === 0) {
    return rows;
  }

  return rows.filter((row) => {
    for (const [key, values] of activeFilters) {
      const normalizedRowValue = normalizeValue(row[key]);
      if (!values.includes(normalizedRowValue)) {
        return false;
      }
    }

    return true;
  });
}

function applySort(
  rows: Array<Record<string, string>>,
  sortKey: DatabaseChangeSortKey,
  sortDirection: "asc" | "desc",
): Array<Record<string, string>> {
  return [...rows].sort((left, right) => {
    const leftValue = normalizeValue(left[sortKey]);
    const rightValue = normalizeValue(right[sortKey]);

    const leftNumber = Number(leftValue);
    const rightNumber = Number(rightValue);
    const bothNumeric =
      leftValue !== "-" &&
      rightValue !== "-" &&
      Number.isFinite(leftNumber) &&
      Number.isFinite(rightNumber);

    if (bothNumeric) {
      return sortDirection === "asc" ? leftNumber - rightNumber : rightNumber - leftNumber;
    }

    const comparison = leftValue.localeCompare(rightValue, undefined, {
      numeric: true,
      sensitivity: "base",
    });

    return sortDirection === "asc" ? comparison : -comparison;
  });
}

export async function getDatabaseChangeLog(options: DatabaseChangeLogOptions = {}): Promise<DatabaseChangeLogResult> {
  const sortKey = options.sortKey ?? "create_dttm";
  const sortDirection = options.sortDirection ?? "desc";
  const filters = options.filters ?? {};

  const rowsQuery = `
    query GetDatabaseChangeRows {
      database_change_form(order_by: { create_dttm: desc }) {
        ${DATABASE_CHANGE_SOURCE_COLUMNS.join("\n        ")}
      }
    }
  `;

  const data = await datmonitorGraphqlRequest<DatabaseChangeRowsResponse>(rowsQuery);
  const releaseNumbers = Array.from(
    new Set(
      (data.database_change_form ?? [])
        .map((row) => toCellValue(row.release_number))
        .filter((releaseNumber) => releaseNumber !== "-"),
    ),
  );

  let releaseLookup = new Map<string, { expected_stage_date: string; expected_prod_date: string }>();

  if (releaseNumbers.length > 0) {
    const releasesQuery = `
      query GetReleaseDates($releaseNumbers: [String!]!) {
        curo_releases(where: { release_number: { _in: $releaseNumbers } }) {
          release_number
          expected_stage_date
          expected_prod_date
        }
      }
    `;

    const releaseData = await datmonitorGraphqlRequest<ReleaseRowsResponse>(releasesQuery, {
      releaseNumbers,
    });

    releaseLookup = new Map(
      (releaseData.curo_releases ?? []).map((release) => [
        release.release_number,
        {
          expected_stage_date: toCellValue(release.expected_stage_date),
          expected_prod_date: toCellValue(release.expected_prod_date),
        },
      ]),
    );
  }

  const rows = (data.database_change_form ?? []).map((row) => {
    const normalized: Record<string, string> = {};
    const releaseNumber = toCellValue(row.release_number);
    const release = releaseLookup.get(releaseNumber);

    for (const column of DATABASE_CHANGE_COLUMNS) {
      if (column === "expected_stage_date") {
        normalized[column] = release?.expected_stage_date ?? "-";
        continue;
      }

      if (column === "expected_prod_date") {
        normalized[column] = release?.expected_prod_date ?? "-";
        continue;
      }

      normalized[column] = toCellValue(row[column]);
    }
    return normalized;
  });

  const filteredRows = applyFilters(rows, filters);
  const sortedRows = applySort(filteredRows, sortKey, sortDirection);

  return {
    columns: [...DATABASE_CHANGE_COLUMNS],
    rows: sortedRows,
    orderField: sortKey,
  };
}
