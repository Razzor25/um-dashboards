# ADM Feature

## Purpose
Owns UM inpatient census domain logic.

## What Belongs Here
- `actions/`: server action boundary for inpatient census requests
- `services/`: data retrieval/orchestration for census and export
- `mappers/`: export row mapping and column shaping

## Subfolder Responsibilities

### actions/
- Accept UI and page inputs
- Delegate work to ADM services
- Return serialized, UI-safe response shapes

Do not put here:
- Complex business logic
- Query construction and domain orchestration

### services/
- Build data queries and filters
- Join related domain datasets
- Handle export retrieval behavior

Do not put here:
- UI rendering concerns
- HTTP request parsing (belongs in route handlers)

### mappers/
- Translate ADM domain records into output-specific shapes
- Provide CSV and header row mapping
- Apply output normalization and safe fallbacks

Do not put here:
- Network calls
- Feature orchestration logic

## Do Not Put Here
- React page composition
- Generic GraphQL transport code
- Unrelated UM or CGP logic

## Typical Flow
1. `app/dashboards/um-inpatient-census/page.tsx` calls an action.
2. Action delegates to services.
3. Services fetch/aggregate data and return typed results.
4. Mapper converts records to export rows when needed.
