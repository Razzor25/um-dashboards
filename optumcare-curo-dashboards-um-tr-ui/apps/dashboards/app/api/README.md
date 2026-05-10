# API Routes

## Purpose
Next.js route handlers that expose HTTP endpoints for the dashboard.

## What Belongs Here
- Request parsing
- Query param/body validation
- HTTP response shaping (status, headers)
- Delegation to feature services

## What Does Not Belong Here
- Domain orchestration and transformation logic
- Generic GraphQL client code
- UI behavior

## Current Route Groups
- `adm/*`: inpatient census endpoints
- `cgp/*`: oncology auth status endpoints
- `other/*`: database changes endpoints

## Rule
Keep handlers thin; call feature services for business logic.
