import type { NextRequest } from "next/server";
import { buildInpatientCensusCsvStream } from "@/features/adm/services/inpatient-census-export-service";
import type { DateRangeKey, StatusFilter } from "@/features/adm/services/inpatient-census-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_DATE_RANGES: DateRangeKey[] = [
  "ytd",
  "last3Years",
  "lastYear",
  "last3Months",
  "lastMonth",
  "lastWeek",
  "today",
];

const ALLOWED_STATUS_FILTERS: StatusFilter[] = [
  "Active Admissions",
  "Discharged Pending Closure",
  "Discharged Closed",
  "Anticipated Admission",
  "Other",
];

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const dateRange = request.nextUrl.searchParams.get("dateRange") as DateRangeKey | null;
    const statusFilter = request.nextUrl.searchParams.get("statusFilter") as StatusFilter | null;
    const columnFiltersParam = request.nextUrl.searchParams.get("columnFilters");

    if (!dateRange || !ALLOWED_DATE_RANGES.includes(dateRange)) {
      return Response.json({ error: "Invalid or missing dateRange" }, { status: 400 });
    }

    if (!statusFilter || !ALLOWED_STATUS_FILTERS.includes(statusFilter)) {
      return Response.json({ error: "Invalid or missing statusFilter" }, { status: 400 });
    }

    let columnFilters: Record<string, string[]> = {};
    if (columnFiltersParam) {
      try {
        const parsed = JSON.parse(columnFiltersParam) as unknown;
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          return Response.json({ error: "Invalid columnFilters payload" }, { status: 400 });
        }

        for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
          if (!Array.isArray(value)) {
            return Response.json({ error: `Invalid columnFilters value for ${key}` }, { status: 400 });
          }

          const sanitizedValues = value
            .filter((item): item is string => typeof item === "string")
            .map((item) => item.trim())
            .filter((item) => item.length > 0);

          if (sanitizedValues.length > 0) {
            columnFilters[key] = sanitizedValues;
          }
        }
      } catch {
        return Response.json({ error: "Invalid columnFilters JSON" }, { status: 400 });
      }
    }

    const stream = await buildInpatientCensusCsvStream(
      {
        dateRange,
        statusFilter,
        columnFilters,
      },
      request.signal,
    );

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `um-inpatient-census-${statusFilter.replace(/\s+/g, "-").toLowerCase()}-${dateRange}-${timestamp}.csv`;

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
