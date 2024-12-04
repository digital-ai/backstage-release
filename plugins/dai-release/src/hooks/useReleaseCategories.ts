import { useEffect, useRef } from 'react';
import { CategoriesContentActiveList } from '@digital-ai/plugin-dai-release-common';
import { daiReleaseApiRef } from '../api';
import { useApi } from '@backstage/core-plugin-api';

export function useReleaseCategories(
  instance: string,
  setReleaseCategories: (value: CategoriesContentActiveList[]) => void,
  setLoadingReleaseCategories: (loading: boolean) => void,
) {
  const api = useApi(daiReleaseApiRef);
  const abortControllerRef = useRef<AbortController | null>(null);
  useEffect(() => {
    let isMounted = true;

    const getReleaseCategories = async () => {
      if (!isMounted) return;
      setLoadingReleaseCategories(true);
      try {
        // Cancel the previous request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        // Create a new AbortController for the current request
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        setReleaseCategories([]);
        const result = await api.getReleaseCategories(instance);
        if (isMounted && !abortController.signal.aborted) {
          setReleaseCategories(result.activeCategory);
          setLoadingReleaseCategories(false);
        }
      } catch (err) {
        // Check if error is due to abort, otherwise handle the error
        const abortError = err as Error;
        if (abortError.name !== 'AbortError') {
          setReleaseCategories([]);
          setLoadingReleaseCategories(false);
        }
      }
    };
    if (instance) {
      getReleaseCategories();
    }

    return () => {
      isMounted = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [api, instance, setReleaseCategories, setLoadingReleaseCategories]);
}
