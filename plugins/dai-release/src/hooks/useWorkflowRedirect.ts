import { useEffect, useRef } from 'react';
import { daiReleaseApiRef } from '../api';
import { useApi } from '@backstage/core-plugin-api';

export function useWorkflowRedirect(
  instance: string,
  templateId: string,
  releaseTitle: string,
  releaseId: string,
  setRedirectUrl: (redirectUrl: string) => void,
  setErrorMessage: (message: string) => void,
) {
  const api = useApi(daiReleaseApiRef);
  const abortControllerRef = useRef<AbortController | null>(null);
  const previousRedirectUrl = useRef<{ url: string } | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    const fetchRedirectUrl = async () => {
      try {
        // Cancel the previous request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create a new AbortController for the current request
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        setRedirectUrl(undefined as unknown as string);

        const result = await api.getWorkflowRedirectLink(
          instance,
          templateId,
          releaseTitle,
          releaseId,
          {
            signal: abortController.signal,
          },
        );

        // Only proceed if the request was not aborted
        if (isMounted && !abortController.signal.aborted) {
          if (
            result &&
            JSON.stringify(result) !==
              JSON.stringify(previousRedirectUrl.current)
          ) {
            previousRedirectUrl.current = result;
            setRedirectUrl(result.url);
          }
        }
      } catch (err) {
        // Check if error is due to abort, otherwise handle the error
        const abortError = err as Error;
        setErrorMessage(abortError.message);
        if (abortError.name !== 'AbortError') {
          setRedirectUrl('');
        }
      }
    };

    if (templateId && releaseTitle && releaseId) {
      fetchRedirectUrl();
    }
    return () => {
      isMounted = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [
    templateId,
    api,
    releaseTitle,
    releaseId,
    setRedirectUrl,
    instance,
    setErrorMessage,
  ]);
}
