# Curo Dashboards

Dashboard applications for Curo operations and analytics using Next.js in the monorepo.

## Overview

This app provides real-time and historical dashboard views for:
- **UM TAT Compliance**: Monitor TAT (Turnaround Time) performance by priority level and date range
- **UM Oncology Auth Status**: Track oncology auth trends, statuses, and detailed rows
- **Curo Database Changes**: View database modification events and trends
- **UM Inpatient Census**: Track inpatient census data across facilities

## Architecture

- **Data Source Selection**:
  - **Live Data** (≤7 days): Fetches directly from GraphQL API
  - **Cached Data** (>7 days): Retrieves from DuckDB cache service
- **Streaming Restore**: Checkpoint-based incremental refresh with infinite retry on transient failures

### Current Layering

- `app/`: Next.js routes, pages, layouts, and HTTP handlers only
- `features/`: domain logic grouped by business area
   - `features/adm`: inpatient census actions/services/mappers
   - `features/um`: TAT compliance actions/services
   - `features/cgp`: oncology auth status services
   - `features/other`: database changes services/export
- `lib/`: shared cross-feature infrastructure and utilities
   - centralized GraphQL transport/client plumbing (`lib/graphql`, `lib/api`)
   - shared lookup/cache helpers (`lib/shared`)
   - constants and formatting (`lib/constants`, `lib/formats`)

## Setup

### Prerequisites
- Node.js 18+ (handled by monorepo setup)
- Cache service running locally (if testing with cached data)
- GraphQL API access (production only)

### Local Development

1. Install dependencies from repo root:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev --filter=dashboards
   ```
   Server runs on http://localhost:3000

3. Access dashboards:
   - TAT Compliance: http://localhost:3000/dashboards/um-tat-compliance
   - Database Changes: http://localhost:3000/dashboards/curo-database-changes
   - Inpatient Census: http://localhost:3000/dashboards/um-inpatient-census

### Environment Variables

Create `.env.local` with:
```
NEXT_PUBLIC_HSC_GRAPHQL_ENDPOINT=https://optumcare-api.optum.com/health-service-read-fs/v1/graphql
NEXT_PUBLIC_CACHE_API_URL=http://localhost:8001
```

## Building

Production build:
```bash
npm run build:prod --filter=dashboards
```

This clears `.env.local` before building to ensure production endpoints are used.

## Testing

Run unit and integration tests:
```bash
npm run test --filter=dashboards
```

## Code Style

- Follow monorepo conventions in [root README](../../README.md)
- React components use PascalCase; helpers use camelCase
- Tailwind CSS for styling (v4); avoid custom CSS
- Server-first data retrieval: fetch in page components or server actions, then pass to client components

## Key Files

- `app/dashboards/*/page.tsx` - Main dashboard pages
- `features/*/services/*-service.ts` - Domain data retrieval and orchestration
- `features/*/actions/*-actions.ts` - Server actions for client boundary
- `features/*/mappers/*` - Domain-specific output mapping where needed
- `app/api/*` - HTTP route handlers (validation, request parsing, response shaping)
- `lib/graphql/client.ts` - Centralized GraphQL transport
- `lib/constants/` - Domain constants and lookup tables
- `components/` - Reusable React components

## Related

- Cache service: [curo-dashboards-cache](https://github.com/optumcare/curo-dashboards-cache)
- Original standalone repo: [curo-dashboards-ui](https://github.com/optumcare/curo-dashboards-ui)

## Contributing

See [AGENTS.md](./AGENTS.md) for repo-wide coding standards and patterns.
