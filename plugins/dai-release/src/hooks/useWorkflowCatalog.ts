import { useRef, useState } from 'react';
import { ReleaseInstanceConfig } from '@digital-ai/plugin-dai-release-common';

import { daiReleaseApiRef } from '../api';

import { useApi } from '@backstage/core-plugin-api';
import useAsyncRetryWithSelectiveDeps from './stateSelectiveDeps';
import { useDebouncedValue } from '../utils/helpers';

export function useWorkflowCatalog(): {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  data: any;
  error: Error | undefined;
  hasMore: Boolean;
  instance: string;
  instanceList: ReleaseInstanceConfig[] | undefined;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  workflowSearch: { categories: string[]; author: string };
  setWorkflowSearch: (workflowSearch: {
    categories: string[];
    author: string;
  }) => void;
  setPage: (page: (prevPage: number) => number) => void;
  setRowsPerPage: (pageSize: number) => void;
  setInstance: (instance: string) => void;
  setHasMore: (hasMore: boolean) => void;
  setData: (data: any) => void;
} {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [instance, setInstance] = useState('');
  const [instanceList, setInstanceList] = useState<
    ReleaseInstanceConfig[] | undefined
  >([]);
  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [workflowSearch, setWorkflowSearch] = useState<{
    categories: string[];
    author: string;
  }>({
    categories: [],
    author: '',
  });

  const [searchInput, setSearchInput] = useState('');

  const api = useApi(daiReleaseApiRef);
  // Use the debounced value of instance, it will update the state after 1 second
  const debouncedInstance = useDebouncedValue(instance, 800);

  // Use the debounced value of searchAuthor, it will update the state after 1 second
  const debouncedSearchAuthor = useDebouncedValue(workflowSearch.author, 800);

  // Use the debounced value of searchCategories, it will update the state after 1 second
  const debouncedSearchCategories = useDebouncedValue(
    workflowSearch.categories,
    800,
  );

  // Use the debounced value of searchTag, it will update the state after 1 second
  const debouncedSearchInput = useDebouncedValue(searchInput, 500);

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

        if (debouncedInstance.trim() === '') {
          return api.getInstanceList().then(dataVal => {
            setInstance(dataVal[0].name);
            setInstanceList(dataVal);
            setData([]);
            setLoading(false);
          });
        }

        const result = await api.getWorkflowCatalog(
          page,
          rowsPerPage,
          debouncedSearchInput,
          debouncedSearchCategories,
          debouncedSearchAuthor,
          debouncedInstance,
          { signal: abortController.signal },
        );

        // Only proceed if the request was not aborted
        if (!abortController.signal.aborted) {
          // setLoading(false);
          if (result?.workflows?.length < rowsPerPage) {
            setHasMore(false);
          }
          setData((prevData: any) => [
            ...prevData,
            ...result?.workflows.filter(
              (wf: any) => !prevData.some((p: any) => p.id === wf.id),
            ),
          ]);
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
    [
      api,
      rowsPerPage,
      debouncedInstance,
      debouncedSearchCategories,
      debouncedSearchAuthor,
      debouncedSearchInput,
    ],
  );
  return {
    loading,
    hasMore,
    setLoading,
    data,
    error,
    instance,
    instanceList,
    searchInput,
    setSearchInput,
    workflowSearch,
    setWorkflowSearch,
    setPage,
    setRowsPerPage,
    setInstance,
    setHasMore,
    setData,
  };
}
