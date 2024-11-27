import { useRef, useState } from 'react';
import { ReleaseInstanceConfig } from '@digital-ai/plugin-dai-release-common';
import { daiReleaseApiRef } from '../api';
import { useApi } from '@backstage/core-plugin-api';
import useAsyncRetryWithSelectiveDeps from './stateSelectiveDeps';
import { workflowCatalogsList } from '../mocks/workflowMocks';

export function useWorkflowCatalog(): {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  data: any;
  error: Error | undefined;
  hasMore: Boolean;
  instance: string;
  instanceList: ReleaseInstanceConfig[] | undefined;
  setPage: (page: (prevPage: number) => number) => void;
  setRowsPerPage: (pageSize: number) => void;
  setInstance: (instance: string) => void;
  setHasMore: (hasMore: boolean) => void;
  setData: (data: any) => void;
} {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [instance, setInstance] = useState('');
  const [instanceList, setInstanceList] = useState<
    ReleaseInstanceConfig[] | undefined
  >([]);
  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const api = useApi(daiReleaseApiRef);

  // AbortController reference to cancel the ongoing request
  const abortControllerRef = useRef<AbortController | null>(null);
  const { error } = useAsyncRetryWithSelectiveDeps(
    // eslint-disable-next-line consistent-return
    async () => {
      try {
        setLoading(true);
        // Cancel the previous request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create a new AbortController for the current request
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        if (instance.trim() === '') {
          return api.getInstanceList().then(dataVal => {
            setInstance(dataVal[0].name);
            setInstanceList(dataVal);
            setLoading(false);
          });
        }

        const result = workflowCatalogsList;

        // Only proceed if the request was not aborted
        if (!abortController.signal.aborted) {
          // setLoading(false);
          if (result?.workflows?.length < rowsPerPage) {
            setHasMore(false);
          }
          setData((prevData: any) => [...prevData, ...result?.workflows]);
          return result;
        }
      } catch (err) {
        // Check if error is due to abort, otherwise handle the error
        const abortError = err as Error;
        if (abortError.name !== 'AbortError') {
          setData([]);
          throw err;
        }
      } finally {
        setLoading(false);
      }
    },
    page,
    setPage,
    [api, rowsPerPage, instance],
  );
  return {
    loading,
    hasMore,
    setLoading,
    data,
    error,
    instance,
    instanceList,
    setPage,
    setRowsPerPage,
    setInstance,
    setHasMore,
    setData,
  };
}
