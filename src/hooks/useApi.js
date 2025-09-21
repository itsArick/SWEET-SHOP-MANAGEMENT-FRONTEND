import { useState, useEffect, useCallback } from 'react';

export const useApi = (apiFunction, dependencies = [], options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { 
    immediate = true, 
    onSuccess, 
    onError 
  } = options;

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFunction(...args);
      
      if (result.success) {
        setData(result.data);
        onSuccess?.(result.data);
        return result;
      } else {
        setError(result.error);
        onError?.(result.error);
        return result;
      }
    } catch (err) {
      const error = err.message || 'An error occurred';
      setError(error);
      onError?.(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError]);

  useEffect(() => {
    if (immediate && apiFunction) {
      execute();
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};