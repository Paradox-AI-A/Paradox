import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for making API calls with loading, error, and data states
 * @param apiFunction The API function to call
 * @param immediate Whether to call the API function immediately
 * @param initialData Initial data value
 * @returns Object containing data, loading, error states and execute function
 */
function useApi<T, P extends any[]>(
  apiFunction: (...args: P) => Promise<T>,
  immediate = false,
  initialData?: T
) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);

  // Function to execute the API call
  const execute = useCallback(
    async (...args: P) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  // Call API function immediately if specified
  useEffect(() => {
    if (immediate) {
      execute([] as unknown as P);
    }
  }, [execute, immediate]);

  return { data, loading, error, execute };
}

export default useApi; 