import { ReleaseInstanceConfig } from '@digital-ai/plugin-dai-release-common';
import { daiReleaseApiRef } from '../api';
import { useApi } from '@backstage/core-plugin-api';
import useAsyncRetryWithSelectiveDeps from './stateSelectiveDeps';
import { useDebouncedValue } from '../utils/helpers';
import { useState } from 'react';

export function useTemplates(): {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  data: any;
  error: Error | undefined;
  hasMore: Boolean;
  searchTitle: string;
  instance: string;
  instanceList: ReleaseInstanceConfig[] | undefined;
  setPage: (page: (prevPage: number) => number) => void;
  setRowsPerPage: (pageSize: number) => void;
  setSearchTitle: (title: string) => void;
  setInstance: (instance: string) => void;
  setHasMore: (hasMore: boolean) => void;
  setData: (data: any) => void;
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
  const api = useApi(daiReleaseApiRef);

  // Use the debounced value of searchTitle, it will update the state in one second
  const debouncedSearchTitle = useDebouncedValue(searchTitle, 1000);

  const { error } = useAsyncRetryWithSelectiveDeps(
    async () => {
      try {
        if (instance.trim() === '') {
          return api.getInstanceList().then(dataVal => {
            setInstance(dataVal[0].name);
            setInstanceList(dataVal);
            setLoading(false);
          });
        }
        const result = await api.getTemplates(page, rowsPerPage, debouncedSearchTitle, instance);
        setLoading(false);
        if (result.items?.templates?.length < rowsPerPage) {
          setHasMore(false)
        }
        setData((prevData: any) => [...prevData, ...result.items?.templates]);
        return result;
      } catch (err) {
        setData([]);
        throw err;
      }finally {
        setLoading(false)
      }
    },
    page,
    setPage,
    [api, rowsPerPage, debouncedSearchTitle, instance],
  );
  return {
    loading,
    hasMore,
    setLoading,
    data,
    error,
    searchTitle: searchTitle,
    instance,
    instanceList,
    setPage,
    setRowsPerPage,
    setSearchTitle,
    setInstance,
    setHasMore,
    setData
  };
}
