/**
 * CM GraphQL wrapper.
 * Kept as a thin compatibility layer while the app is reorganized by domain.
 */

import { requestGraphql } from "@/lib/graphql/client";

export async function cmGraphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  return requestGraphql<T>("cm", query, variables);
}