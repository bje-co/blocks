'use client';

import { Suspense, type SuspenseProps } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import DefaultErrorFallback from './ErrorFallback';
import DefaultSuspenseFallback from './SuspenseFallback';

export interface BoundariesProps {
  /**
   * Can provide an ErrorComponent to show as a fallback.
   */
  ErrorComponent?: React.ComponentType;
  /**
   * Can provide an SuspenseComponent to show as a fallback.
   */
  SuspenseComponent?: React.ComponentType<SuspenseProps>;

  children?: React.ReactNode;
}

/**
 * A component that wraps its children in an ErrorBoundary and Suspense.
 * It provides default components for error and suspense fallbacks,
 * which can be overridden by passing custom components as props.
 */
export function Boundaries({
  ErrorComponent = DefaultErrorFallback,
  SuspenseComponent = DefaultSuspenseFallback,
  children,
}: BoundariesProps) {
  return (
    <Suspense fallback={<SuspenseComponent />}>
      <ErrorBoundary fallback={<ErrorComponent />}>{children}</ErrorBoundary>
    </Suspense>
  );
}
