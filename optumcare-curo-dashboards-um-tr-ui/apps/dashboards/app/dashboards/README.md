# Dashboard Pages

## Purpose
Page-level composition for each dashboard view.

## What Belongs Here
- Screen composition/layout
- Local UI state and interactions
- Calling server actions and rendering returned data

## What Does Not Belong Here
- Deep domain logic
- GraphQL query construction
- Cross-feature shared infrastructure

## Guidelines
- Keep page files focused on orchestration and presentation.
- Move reusable UI to "app/components".
- Move data/domain behavior to `features/*`.
