# UM Feature

## Purpose
Owns UM TAT compliance domain behavior.

## What Belongs Here
- TAT filter option retrieval
- TAT record retrieval and shaping
- TAT aggregate metrics/counts
- Action wrappers used by UI pages

## Subfolder Responsibilities

### actions/
- Validate and adapt page inputs
- Delegate to UM services
- Expose typed result objects to UI

Do not put here:
- Heavy data shaping and fetch logic

### services/
- Select live vs cache data sources
- Retrieve records, counts, and filter options
- Apply domain-level filtering and aggregation rules

Do not put here:
- Route parsing
- Presentation formatting

## Do Not Put Here
- Route handlers under `app/api/*`
- Shared constants and formatting utilities
- Generic GraphQL connection management

## Notes
- Keep cache-vs-live-source decisions in services.
- Keep UI formatting in pages/components unless truly reusable.
