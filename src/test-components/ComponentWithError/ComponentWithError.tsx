/**
 * A component that wraps its children in an ErrorBoundary and Suspense.
 * It provides default components for error and suspense fallbacks,
 * which can be overridden by passing custom components as props.
 */
export function ComponentWithError() {
  throw new Error('I am a component throwing an error.');
  return null;
}
