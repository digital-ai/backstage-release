import { useEffect, useState } from 'react';
import { FolderBackendResponse } from '@digital-ai/plugin-dai-release-common';
import { daiReleaseApiRef } from '../api';
import { useApi } from '@backstage/core-plugin-api';

export function useFolders() {
  const [folders, setFolders] = useState<FolderBackendResponse>({
    folders: [],
    totalPages: 0,
    totalElements: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false); // Control fetching
  const [fetchParams, setFetchParams] = useState<{
    instance: string;
    workflowId: string;
  } | null>(null);
  const api = useApi(daiReleaseApiRef);

  useEffect(() => {
    const fetchFolders = async () => {
      if (!fetchParams) return; // No fetchParams, exit early

      try {
        const folderResults = await api.getFolders(fetchParams.instance);
        setFolders(folderResults);
        setError(null); // Clear previous errors
      } catch (err) {
        setError(
          `Error in workflowID: ${fetchParams.workflowId} ${(err as Error).message}`,
        );
      } finally {
        setShouldFetch(false); // Reset trigger
      }
    };

    if (shouldFetch) {
      fetchFolders();
    }
  }, [shouldFetch, fetchParams, api]);

  const triggerFetch = (instance: string, workflowId: string) => {
    setFetchParams({ instance, workflowId }); // Update parameters
    setShouldFetch(true); // Trigger fetching
  };

  return { folders, error, triggerFetch };
}
