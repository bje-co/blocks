# @bjeco/blocks

A collection of utility React components.

## Table of Contents

- [components](#components)
  - [Boundaries](#boundaries)
  - [ExternalLink](#externallink)
  - [Placeholder](#placeholder)

## components

### [Boundaries](src/components/Boundaries/Boundaries.tsx)

A component that wraps its children in an ErrorBoundary and Suspense.
It provides default components for error and suspense fallbacks,
which can be overridden by passing custom components as props.

### Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| ErrorComponent | `React.ComponentType<FallbackProps>` | No | Custom function | Can provide an ErrorComponent to show as a fallback. |
| SuspenseComponent | `React.ComponentType<SuspenseProps>` | No | Custom function | Can provide an SuspenseComponent to show as a fallback. |
| children | `React.ReactNode` | No | - |  |

---

### [ExternalLink](src/components/ExternalLink/ExternalLink.tsx)

A component for rendering external links with appropriate attributes.
It sets the `target` to `_blank` and adds `noopener` and `noreferrer` to the `rel` attribute.

### Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| rel | `string` | No | - |  |

---

### [Placeholder](src/components/Placeholder/Placeholder.tsx)

A simple placeholder component that can display JSON data.

### Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| data | `| null
| boolean
| number
| string
| Json[]
| { [prop: string]: Json }` | No | - |  |

---
