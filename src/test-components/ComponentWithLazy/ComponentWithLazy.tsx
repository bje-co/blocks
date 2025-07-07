import { lazy } from 'react';
import { PROMISE_DELAY } from './_config';

/**
 * A component for use in testing to artificially trigger a React Suspense
 * boundary using React.lazy() with a Promise() and setTimeout().
 */
export const ComponentWithLazy = lazy(() => {
  return new Promise((resolve) => {
    // @ts-expect-error: Argument of type 'Promise
    setTimeout(() => resolve(import('./BigComponent')), PROMISE_DELAY);
  });
});
