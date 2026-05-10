# Constants

## Purpose
Shared immutable reference values used across app and features.

## What Belongs Here
- Reference maps/lists (orgs, priorities, status mappings)
- Stable labels and key mappings

## What Does Not Belong Here
- Runtime state
- Request/response logic
- Derived UI state that should be computed near usage

## Rule
Keep constants source-of-truth and avoid duplicate copies in pages/features.
