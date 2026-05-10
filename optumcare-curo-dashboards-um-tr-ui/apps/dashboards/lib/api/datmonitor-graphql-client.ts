import { requestGraphql } from "@/lib/graphql/client";

export async function datmonitorGraphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  return requestGraphql<T>("other", query, variables);
}
