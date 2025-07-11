import { useCallback } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { isDev } from '../../utils';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const handleTryAgain = useCallback(() => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    }
  }, [resetErrorBoundary]);

  return (
    <div role='alert'>
      {isDev && (
        <code>
          <pre>{error?.message}</pre>
        </code>
      )}
      <button onClick={handleTryAgain} type='button'>
        Try again
      </button>
    </div>
  );
};

export default ErrorFallback;
