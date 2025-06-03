# Adverity Dynamic Form System

A React-based form system that renders forms dynamically from JSON schemas. Built as a POC to demonstrate architecture with TypeScript, modern React patterns, and robust validation.

## Design Spec

A fully fletched Design Spec can be found [here](./docs/design-spec.md)

## What it does

Instead of hardcoding forms, this system takes a JSON schema from an API and renders the complete form with validation, error handling, and submission logic. Most likely for scenarios where forms need to be configurable, A/B tested, or managed by non-developers.

## Tech Stack

- **React** with TypeScript for the UI
- **React Hook Form** for form state management and validation
- **TanStack Query** for schema fetching and caching
- **Emotion** fo css in js styling with design tokens
- **Vite** for fast development and building
- **MSW** for API mocking during development

## Features

- **Schema-driven forms** - Define forms with JSON, render with React
- **Type-safe validation** - Field constraints + custom validation rules
- **Smart caching** - Schemas are cached and refreshed intelligently
- **Extensible** - Easy to add new field types and validation rules

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
