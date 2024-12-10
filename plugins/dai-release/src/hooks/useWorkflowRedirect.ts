import { useEffect, useRef } from 'react';

import { daiReleaseApiRef } from '../api';
import { useApi } from '@backstage/core-plugin-api';

export function useWorkflowRedirect(
  instance: string,
  templateId: string,
  releaseTitle: string,
  releaseId: string,
  setUrl: (url: string) => void,
) {
  const api = useApi(daiReleaseApiRef);
  const abortControllerRef = useRef<AbortController | null>(null);
  const previousUrl = useRef<{ url: string } | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    const fetchUrl = async () => {
      try {
        // Cancel the previous request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create a new AbortController for the current request
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        setUrl(undefined as unknown as string);
        //setMetaInfo(undefined);

        const result = await api.getWorkflowRedirectLink(instance, templateId, releaseTitle, releaseId, {
          signal: abortController.signal,
        });

        // Only proceed if the request was not aborted
        if (isMounted && !abortController.signal.aborted) {
          if (
            result
             &&
             JSON.stringify(result) !==
               JSON.stringify(previousUrl.current)
          ) {
            previousUrl.current = result;
            setUrl(result.url);
          }
        }
      } catch (err) {
        // Check if error is due to abort, otherwise handle the error
        const abortError = err as Error;
        if (abortError.name !== 'AbortError') {
          setUrl('');
        }
      }
    };

    if (templateId && releaseTitle && releaseId) {
      fetchUrl();
    }
    return () => {
      isMounted = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [templateId, api, releaseTitle, releaseId, setUrl, instance]);
}
