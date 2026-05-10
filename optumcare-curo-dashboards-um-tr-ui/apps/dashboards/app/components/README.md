# App Components

## Purpose
Reusable React UI building blocks used by dashboard pages.

## What Belongs Here
- Presentational components
- Chart wrappers and cards
- UI controls (filters, nav, shell pieces)

## What Does Not Belong Here
- Data fetching and business rules
- GraphQL/query logic
- Route request parsing

## Guidelines
- Keep props explicit and typed.
- Prefer stateless components unless local UI state is required.
- Call server actions from pages or dedicated containers, not deep presentational components.
