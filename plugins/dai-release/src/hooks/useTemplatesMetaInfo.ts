import { useEffect, useRef } from 'react';
import { TemplateGitMetaInfo } from '@digital-ai/plugin-dai-release-common';
import { daiReleaseApiRef } from '../api';
import { useApi } from '@backstage/core-plugin-api';

export function useGetTemplateMetaInfo(
  instance: string,
  folderId: string,
  setMetaInfo: (metaInfo: TemplateGitMetaInfo | undefined) => void,
) {
  const api = useApi(daiReleaseApiRef);
  const abortControllerRef = useRef<AbortController | null>(null);
  const previousMetaInfoRef = useRef<TemplateGitMetaInfo | undefined>(
    undefined,
  );

  useEffect(() => {
    let isMounted = true;

    const fetchMetaInfo = async () => {
      try {
        // Cancel the previous request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create a new AbortController for the current request
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        setMetaInfo(undefined);

        const result = await api.getTemplateMetaInfo(instance, folderId, {
          signal: abortController.signal,
        });

        // Only proceed if the request was not aborted
        if (isMounted && !abortController.signal.aborted) {
          if (
            result &&
            JSON.stringify(result) !==
              JSON.stringify(previousMetaInfoRef.current)
          ) {
            previousMetaInfoRef.current = result;
            setMetaInfo(result);
          }
        }
      } catch (err) {
        // Check if error is due to abort, otherwise handle the error
        const abortError = err as Error;
        if (abortError.name !== 'AbortError') {
          setMetaInfo({} as TemplateGitMetaInfo);
        }
      }
    };

    if (folderId) {
      fetchMetaInfo();
    }

    return () => {
      isMounted = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [folderId, api, setMetaInfo, instance]);
}
