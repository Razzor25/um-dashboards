import { createServerCallId, logServerCall } from "./server-call-logger";

export type TatCacheMetadata = {
  snapshot_version: string | null;
  last_refresh_at: string | null;
  refresh_age_seconds: number | null;
  record_count: number;
  refresh_status: string;
  active_color: string;
};

const cacheBaseUrl = process.env.HSC_CACHE_BASE_URL?.replace(/\/$/, "");

function ensureCacheBaseUrl(): string {
  if (!cacheBaseUrl) {
    throw new Error("HSC_CACHE_BASE_URL is not configured");
  }
  return cacheBaseUrl;
}

function toQueryString(query: Record<string, string | number | boolean | undefined>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) continue;
    params.set(key, String(value));
  }
  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

export async function tatCacheGet<T>(path: string, query: Record<string, string | number | boolean | undefined> = {}): Promise<T> {
  const baseUrl = ensureCacheBaseUrl();
  const url = `${baseUrl}${path}${toQueryString(query)}`;
  const requestId = createServerCallId();
  const startedAt = Date.now();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    const durationMs = Date.now() - startedAt;

    if (!response.ok) {
      logServerCall({
        requestId,
        service: "tat-cache",
        destinationUrl: url,
        payload: { method: "GET", query },
        status: "http_error",
        durationMs,
        httpStatus: response.status,
        errorMessage: `Cache request failed with status ${response.status}`,
      });
      throw new Error(`Cache request failed with status ${response.status}`);
    }

    logServerCall({
      requestId,
      service: "tat-cache",
      destinationUrl: url,
      payload: { method: "GET", query },
      status: "success",
      durationMs,
      httpStatus: response.status,
    });

    return (await response.json()) as T;
  } catch (error) {
    const durationMs = Date.now() - startedAt;
    const message = error instanceof Error ? error.message : "Unknown network error";

    if (!message.startsWith("Cache request failed with status")) {
      logServerCall({
        requestId,
        service: "tat-cache",
        destinationUrl: url,
        payload: { method: "GET", query },
        status: "network_error",
        durationMs,
        errorMessage: message,
      });
    }

    throw error;
  }
}
