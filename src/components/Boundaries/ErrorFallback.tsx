'use client';

import { useErrorBoundary } from 'react-error-boundary';

const ErrorFallback = () => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div role='alert'>
      <button
        style={{ backgroundColor: 'red', color: 'white' }}
        onClick={resetBoundary}
        type='button'
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorFallback;
