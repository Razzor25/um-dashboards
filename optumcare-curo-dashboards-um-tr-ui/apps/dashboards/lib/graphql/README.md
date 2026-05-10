# GraphQL Infrastructure

## Purpose
Centralized GraphQL transport used across domains.

## What Belongs Here
- Endpoint/secret resolution by domain
- Request execution
- Shared logging/error handling behavior

## What Does Not Belong Here
- Domain-specific query construction
- Feature-level data mapping
- UI formatting

## Rule
Feature services call this layer through domain wrappers in `lib/api/*-graphql-client.ts` or direct shared abstractions when appropriate.
