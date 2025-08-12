import { useState, useCallback } from 'react'

export const useFetch = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (url, options = {}) => {
        setIsLoading(true);
        setHasError(false);
        setError(null);
        setData(null);
        try {
            const res = await fetch(url, options);
            if (!res.ok) {
                setHasError(true);
                setError({
                    code: res.status,
                    message: res.statusText,
                });
                setIsLoading(false);
                return;
            }
            const json = await res.json();
            setData(json);
        } catch (err) {
            setHasError(true);
            setError({ message: err.message });
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        data,
        isLoading,
        hasError,
        error,
        fetchData, // Call this manually for POST, PUT, DELETE, etc.
    };
}

