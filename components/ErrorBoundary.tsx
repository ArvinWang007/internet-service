"use client";

import { useEffect, useState } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      setHasError(true);
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    };

    window.onerror = (message, source, lineno, colno, error) => {
      handleError(error, { message, source, lineno, colno });
      return true; // Prevents the default handling.
    };

    return () => {
      window.onerror = null;
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
};

export default ErrorBoundary;