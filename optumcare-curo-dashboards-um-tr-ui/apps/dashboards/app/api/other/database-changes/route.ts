import { getDatabaseChangeLog } from "@/features/other/services/database-changes-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    const data = await getDatabaseChangeLog();
    return Response.json(data, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load database change log";
    return Response.json({ error: message }, { status: 500 });
  }
}
