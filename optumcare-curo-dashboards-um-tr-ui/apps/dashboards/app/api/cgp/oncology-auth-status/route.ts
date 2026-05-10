import type { NextRequest } from "next/server";
import {
  getOncologyAuthStatusData,
  type OncologyDateRangeKey,
} from "@/features/cgp/services/oncology-auth-status-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_DATE_RANGES = new Set<OncologyDateRangeKey>([
  "last-7-days",
  "last-30-days",
  "last-90-days",
  "year-to-date",
]);

function parseDateRange(value: string | null): OncologyDateRangeKey {
  const fallback: OncologyDateRangeKey = "last-30-days";
  if (!value) {
    return fallback;
  }
  const candidate = value as OncologyDateRangeKey;
  return ALLOWED_DATE_RANGES.has(candidate) ? candidate : fallback;
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const dateRange = parseDateRange(request.nextUrl.searchParams.get("dateRange"));
    const data = await getOncologyAuthStatusData(dateRange);
    return Response.json(data, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load oncology auth status data";
    return Response.json({ error: message }, { status: 500 });
  }
}
