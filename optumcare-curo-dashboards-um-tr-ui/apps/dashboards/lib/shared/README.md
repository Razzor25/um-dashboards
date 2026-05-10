# Shared Domain Utilities

## Purpose
Cross-feature shared utilities that are still domain-adjacent.

## Current Contents
- HSC ref lookup cache and helpers

## What Belongs Here
- Shared helpers used by multiple features
- Lightweight cache/lookup utilities

## What Does Not Belong Here
- Feature-specific services/actions/mappers
- Generic infra that belongs to `lib/graphql` or `lib/api`

## Rule
Only place code here when at least two features need it.
