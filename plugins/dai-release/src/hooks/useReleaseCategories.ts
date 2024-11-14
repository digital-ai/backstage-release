import { useEffect, useRef } from 'react';
import {
    ReleaseCategories,
} from '@digital-ai/plugin-dai-release-common';
import { daiReleaseApiRef } from '../api';
import { useApi } from '@backstage/core-plugin-api';

export function useReleaseCategories(
    instance: string,
    setReleaseCategories: (categories: ReleaseCategories | undefined) => void,
) {
    const api = useApi(daiReleaseApiRef);
    const abortControllerRef = useRef<AbortController | null>(null);
    useEffect(() => {
        const getReleaseCategories = async () => {
            try {                // Cancel the previous request
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }
                // Create a new AbortController for the current request
                const abortController = new AbortController();
                abortControllerRef.current = abortController;
                setReleaseCategories(undefined);

                const result = await api.getReleaseCategories(instance);
                setReleaseCategories(result)
            } catch (err) {
                // Check if error is due to abort, otherwise handle the error
                const abortError = err as Error;
                if (abortError.name !== 'AbortError') {
                    setReleaseCategories({} as ReleaseCategories);
                }
            }
        };
        getReleaseCategories();
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [api, setReleaseCategories, instance]);
}
