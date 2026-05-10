import type { NextRequest } from "next/server";
import {
  buildDatabaseChangeLogCsvStream,
  type DatabaseChangeExportFilters,
} from "@/features/other/services/database-changes-export-service";
import type {
  DatabaseChangeFilterKey,
  DatabaseChangeSortKey,
} from "@/features/other/services/database-changes-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_FILTER_KEYS = new Set<DatabaseChangeFilterKey>([
  "team_name",
  "release_number",
  "db_domain_name",
  "change_type",
]);

const ALLOWED_SORT_KEYS = new Set<DatabaseChangeSortKey>([
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
]);

function parseSortKey(value: string | null): DatabaseChangeSortKey | null {
  const sortKey = (value ?? "create_dttm") as DatabaseChangeSortKey;
  return ALLOWED_SORT_KEYS.has(sortKey) ? sortKey : null;
}

function parseFilters(filtersParam: string | null): Partial<Record<DatabaseChangeFilterKey, string[]>> | Response {
  const filters: Partial<Record<DatabaseChangeFilterKey, string[]>> = {};

  if (!filtersParam) {
    return filters;
  }

  try {
    const parsed = JSON.parse(filtersParam) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return Response.json({ error: "Invalid filters payload" }, { status: 400 });
    }

    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (!ALLOWED_FILTER_KEYS.has(key as DatabaseChangeFilterKey)) {
        return Response.json({ error: `Invalid filter key: ${key}` }, { status: 400 });
      }

      if (!Array.isArray(value)) {
        return Response.json({ error: `Invalid filter values for ${key}` }, { status: 400 });
      }

      const sanitizedValues = value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      if (sanitizedValues.length > 0) {
        filters[key as DatabaseChangeFilterKey] = sanitizedValues;
      }
    }

    return filters;
  } catch {
    return Response.json({ error: "Invalid filters JSON" }, { status: 400 });
  }
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const sortKey = parseSortKey(request.nextUrl.searchParams.get("sortKey"));
    const sortDirectionParam = request.nextUrl.searchParams.get("sortDirection");
    const sortDirection = sortDirectionParam === "asc" ? "asc" : "desc";

    if (!sortKey) {
      return Response.json({ error: "Invalid sortKey" }, { status: 400 });
    }

    const parsedFilters = parseFilters(request.nextUrl.searchParams.get("filters"));
    if (parsedFilters instanceof Response) {
      return parsedFilters;
    }

    const stream = await buildDatabaseChangeLogCsvStream({
      sortKey,
      sortDirection,
      filters: parsedFilters,
    });

    const timestamp = new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
    const filename = `curo-database-changes-${timestamp}.csv`;

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected export failure";
    return Response.json({ error: message }, { status: 500 });
  }
}
