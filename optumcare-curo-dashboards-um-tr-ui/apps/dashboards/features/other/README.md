# Other Feature

## Purpose
Holds domain logic that is dashboard-specific but not part of ADM/UM/CGP domains.

## Current Scope
- Database changes listing
- Database changes CSV export service

## Subfolder Responsibilities

### services/
- Implement database changes listing logic
- Support sorting/filtering payload shaping for pages
- Build export streams for route handlers

Do not put here:
- Route concerns
- Shared infra concerns that belong in lib

## Rules
- Keep this folder focused; move logic into a dedicated feature folder once a domain grows.
- Keep route handlers under `app/api/other/*` thin and delegated.
