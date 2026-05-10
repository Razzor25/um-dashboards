# CGP Feature

## Purpose
Owns oncology auth status domain behavior.

## What Belongs Here
- Date-range based oncology auth retrieval
- Trend/series construction
- Detailed row composition for table display

## Subfolder Responsibilities

### services/
- Implement date-range retrieval logic
- Assemble trend and table output objects

Do not put here:
- HTTP response handling
- UI component concerns

## Boundaries
- Route parsing/validation belongs in `app/api/cgp/*`.
- Shared lookups/utilities come from `lib/*`.
- UI concerns stay in pages/components.
