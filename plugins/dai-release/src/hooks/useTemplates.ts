/* eslint-disable consistent-return */
import { useRef, useState } from 'react';
import { ReleaseInstanceConfig } from '@digital-ai/plugin-dai-release-common';
import { daiReleaseApiRef } from '../api';
import { useApi } from '@backstage/core-plugin-api';
import useAsyncRetryWithSelectiveDeps from './stateSelectiveDeps';
import { useDebouncedValue } from '../utils/helpers';

export function useTemplates(): {
  instance: string;
  data: any;
  tags: string[];
  setData: (value: any) => void;
  hasMore: boolean;
  setHasMore: (value: boolean) => void;
  setRowsPerPage: (value: number) => void;
  loading: boolean;
  error: undefined | Error;
  searchTitle: string;
  setLoading: (value: boolean) => void;
  instanceList: ReleaseInstanceConfig[] | undefined;
  setSearchTitle: (value: string) => void;
  setTags: (value: string[]) => void;
  setInstance: (value: string) => void;
  setPage: (value: (prevPage: number) => number) => void;
} {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTitle, setSearchTitle] = useState('');
  const [instance, setInstance] = useState('');
  const [instanceList, setInstanceList] = useState<
    ReleaseInstanceConfig[] | undefined
  >([]);
  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const api = useApi(daiReleaseApiRef);

  // AbortController reference to cancel the ongoing request
  const abortControllerRef = useRef<AbortController | null>(null);

  // Use the debounced value of searchTitle, it will update the state after 1 second
  const debouncedSearchTitle = useDebouncedValue(searchTitle, 500);

  // Use the debounced value of searchTag, it will update the state after 1 second
  const debouncedSearchTag = useDebouncedValue(tags, 500);

  const { error } = useAsyncRetryWithSelectiveDeps(
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

        const result = await api.getTemplates(
          page,
          rowsPerPage,
          debouncedSearchTitle,
          instance,
          debouncedSearchTag,
          { signal: abortController.signal },
        );

        // Only proceed if the request was not aborted
        if (!abortController.signal.aborted) {
          setLoading(false);
          if (result.items?.templates?.length < rowsPerPage) {
            setHasMore(false);
          }
          setData((prevData: any) => [...prevData, ...result.items?.templates]);
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
    [api, rowsPerPage, debouncedSearchTitle, instance, debouncedSearchTag],
  );

  return {
    data,
    error,
    hasMore,
    instance,
    instanceList,
    loading,
    searchTitle: searchTitle,
    setData,
    setHasMore,
    setInstance,
    setLoading,
    setPage,
    setRowsPerPage,
    setSearchTitle,
    setTags,
    tags,
  };
}
