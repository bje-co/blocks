/**
 * Checks if the `window` and `window.document` are present to verify if we are
 * running in a browser.
 */
export const isBrowser = Boolean(
  typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);
