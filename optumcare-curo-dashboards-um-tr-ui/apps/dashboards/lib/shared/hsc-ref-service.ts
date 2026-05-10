import { graphqlRequest } from "@/lib/api/graphql-client";

export type HscRefRecord = {
  ref_id: number;
  ref_dspl: string;
};

let refCache: Map<number, string> | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

export async function getHscRefLookup(): Promise<Map<number, string>> {
  const now = Date.now();

  if (refCache && now - cacheTimestamp < CACHE_TTL_MS) {
    return refCache;
  }

  const query = `
    query GetHscRef {
      hsc_ref {
        ref_id
        ref_dspl
      }
    }
  `;

  type GraphQLResponse = {
    hsc_ref: HscRefRecord[];
  };

  const data = await graphqlRequest<GraphQLResponse>(query);

  const lookup = new Map<number, string>();
  for (const row of data.hsc_ref || []) {
    lookup.set(row.ref_id, row.ref_dspl);
  }

  refCache = lookup;
  cacheTimestamp = now;

  return lookup;
}

export function getHscRefCacheStatus(): { cachedAt: number | null; ttlMs: number } {
  return { cachedAt: cacheTimestamp || null, ttlMs: CACHE_TTL_MS };
}

export function invalidateHscRefCache(): void {
  refCache = null;
  cacheTimestamp = 0;
}

export function resolveRef(lookup: Map<number, string>, id: number | undefined | null): string {
  if (id == null) return "";
  return lookup.get(id) ?? String(id);
}
