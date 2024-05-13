import { daiReleaseApiRef } from '../api';
import dayjs from 'dayjs';
import { useApi } from '@backstage/core-plugin-api';
import { useAsyncRetry } from 'react-use';
import { useDebouncedValue } from '../utils/helpers';
import { useState } from 'react';

export function useReleases(): {
  loading: boolean | false | true;
  error: undefined | Error;
  items: any | undefined;
  retry: () => void;
  page: any;
  rowsPerPage: any;
  searchTitle: string;
  fromDate: dayjs.Dayjs | null;
  toDate: dayjs.Dayjs | null;
  orderBy: string;
  statusTags: string[];
  instance: string;
  setPage: (page: number) => void;
  setRowsPerPage: (pageSize: number) => void;
  setSearchTitle: (title: string) => void;
  setFromDate: (fromDate: dayjs.Dayjs | null) => void;
  setToDate: (toDate: dayjs.Dayjs | null) => void;
  setOrderBy: (orderBy: string) => void;
  setStatusTags: (statusTags: string[]) => void;
  setInstance: (instance: string) => void;
} {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('start_date');
  const [searchTitle, setSearchTitle] = useState('');
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(null);
  const [toDate, setToDate] = useState<dayjs.Dayjs | null>(null);
  const [statusTags, setStatusTags] = useState<string[]>([]);
  const [instance, setInstance] = useState('');
  const api = useApi(daiReleaseApiRef);

  // Use the debounced value of searchTitle, it will update the state in one second
  const debouncedSearchTitle = useDebouncedValue(searchTitle, 1000);

  const { value, loading, error, retry } = useAsyncRetry(async () => {
    return api.getReleases(
      page,
      rowsPerPage,
      orderBy,
      debouncedSearchTitle,
      fromDate,
      toDate,
      statusTags,
      instance,
    );
  }, [
    api,
    page,
    rowsPerPage,
    orderBy,
    debouncedSearchTitle,
    fromDate,
    toDate,
    statusTags,
    instance,
  ]);

  return {
    items: value?.items,
    loading,
    error,
    retry,
    page,
    rowsPerPage,
    searchTitle: searchTitle,
    fromDate,
    toDate,
    orderBy,
    statusTags,
    instance,
    setPage,
    setRowsPerPage,
    setSearchTitle,
    setFromDate,
    setToDate,
    setOrderBy,
    setStatusTags,
    setInstance,
  };
}

export function getInstanceList() {
  const api = useApi(daiReleaseApiRef);
  const { value } = useAsyncRetry(async () => {
    return api.getInstanceList();
  });
  return value;
}
