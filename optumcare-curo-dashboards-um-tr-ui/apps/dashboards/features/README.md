# Features Folder

## Purpose
This folder holds domain/business logic by business area. Keep feature behavior here, not in route files.

## Current Domains
- `adm`: UM inpatient census behavior
- `um`: UM TAT compliance behavior
- `cgp`: oncology auth status behavior
- `other`: database changes behavior

## What Goes Here
- Domain services (`services/*`)
- Server actions (`actions/*`) used by client pages/components
- Domain mappers (`mappers/*`) for export or shaping output

## What Does Not Go Here
- Next.js route handlers (`app/api/*`)
- Page/layout wiring (`app/*`)
- Shared cross-domain infrastructure (`lib/*`)

## Rules
- Keep each feature self-contained.
- Import shared infra from `lib/*`.
- Avoid feature-to-feature circular dependencies.
