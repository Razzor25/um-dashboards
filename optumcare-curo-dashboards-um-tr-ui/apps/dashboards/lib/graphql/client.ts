import {
  buildGraphqlPayloadLog,
  createServerCallId,
  logServerCall,
} from "@/lib/api/server-call-logger";

export type GraphqlDomain = "adm" | "cm" | "hsc" | "other";

type DomainConfig = {
  endpointEnv: string;
  secretEnv: string;
  service: string;
  missingConfigBehavior?: "throw" | "empty-pha-id-strat";
};

const DOMAIN_CONFIG: Record<GraphqlDomain, DomainConfig> = {
  adm: {
    endpointEnv: "ADM_GRAPHQL_ENDPOINT",
    secretEnv: "ADM_GRAPHQL_ADMIN_SECRET",
    service: "hasura-graphql",
  },
  cm: {
    endpointEnv: "CM_GRAPHQL_ENDPOINT",
    secretEnv: "CM_GRAPHQL_ADMIN_SECRET",
    service: "cm-graphql",
    missingConfigBehavior: "empty-pha-id-strat",
  },
  hsc: {
    endpointEnv: "HSC_GRAPHQL_ENDPOINT",
    secretEnv: "HSC_GRAPHQL_ADMIN_SECRET",
    service: "hsc-graphql",
  },
  other: {
    endpointEnv: "DATAMONITOR_GRAPHQL_ENDPOINT",
    secretEnv: "DATAMONITOR_GRAPHQL_ADMIN_SECRET",
    service: "datmonitor-graphql",
  },
};

function getConfig(domain: GraphqlDomain) {
  const config = DOMAIN_CONFIG[domain];
  const endpoint = process.env[config.endpointEnv];
  const secret = process.env[config.secretEnv];

  return {
    ...config,
    endpoint,
    secret,
  };
}

export async function requestGraphql<T>(
  domain: GraphqlDomain,
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const { endpointEnv, secretEnv, service, missingConfigBehavior, endpoint, secret } = getConfig(domain);

  if (!endpoint) {
    if (missingConfigBehavior === "empty-pha-id-strat") {
      console.warn(`${endpointEnv} is not configured, skipping ${service} query`);
      return { pha_id_strat: [] } as T;
    }

    throw new Error(`${endpointEnv} is not configured`);
  }

  if (!secret) {
    if (missingConfigBehavior === "empty-pha-id-strat") {
      console.warn(`${secretEnv} is not configured, skipping ${service} query`);
      return { pha_id_strat: [] } as T;
    }

    throw new Error(`${secretEnv} is not configured`);
  }

  const requestId = createServerCallId();
  const startedAt = Date.now();
  const payloadLog = buildGraphqlPayloadLog(query, variables);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": secret,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      const durationMs = Date.now() - startedAt;
      logServerCall({
        requestId,
        service,
        destinationUrl: endpoint,
        payload: payloadLog,
        status: "http_error",
        durationMs,
        httpStatus: response.status,
        errorMessage: `GraphQL request failed with status ${response.status}`,
      });

      throw new Error(`GraphQL request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      const durationMs = Date.now() - startedAt;
      logServerCall({
        requestId,
        service,
        destinationUrl: endpoint,
        payload: payloadLog,
        status: "graphql_error",
        durationMs,
        httpStatus: response.status,
        errorMessage: JSON.stringify(data.errors),
      });

      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    const durationMs = Date.now() - startedAt;
    logServerCall({
      requestId,
      service,
      destinationUrl: endpoint,
      payload: payloadLog,
      status: "success",
      durationMs,
      httpStatus: response.status,
    });

    return data.data as T;
  } catch (error) {
    const durationMs = Date.now() - startedAt;
    const message = error instanceof Error ? error.message : "Unknown network error";

    if (!message.startsWith("GraphQL request failed with status") && !message.startsWith("GraphQL errors:")) {
      logServerCall({
        requestId,
        service,
        destinationUrl: endpoint,
        payload: payloadLog,
        status: "network_error",
        durationMs,
        errorMessage: message,
      });
    }

    throw error;
  }
}
