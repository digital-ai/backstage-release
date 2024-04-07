import { daiReleaseApiRef } from '../api';
import { useApi } from '@backstage/core-plugin-api';
import { useAsyncRetry } from 'react-use';
import { useState } from 'react';
import dayjs from 'dayjs';

export function useReleases(): {
  loading: boolean | false | true;
  error: undefined | Error;
  items: any | undefined;
  retry: () => void;
  page: any;
  setPage: (page: number) => void;
  rowsPerPage: any;
  setRowsPerPage: (pageSize: number) => void;
  setOrderDirection: (order: string) => void;
  searchTile: string;
  setSearchTitle: (title: string) => void;
  fromDate: dayjs.Dayjs | null;
  setFromDate: (fromDate: dayjs.Dayjs | null) => void;
  toDate: dayjs.Dayjs | null;
  setToDate: (toDate: dayjs.Dayjs | null) => void;
  orderBy: string;
  setOrderBy: (orderBy: string) => void;
} {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('start_date');
  const [orderDirection, setOrderDirection] = useState('desc');
  const [searchTile, setSearchTitle] = useState('');
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(null);
  const [toDate, setToDate] = useState<dayjs.Dayjs | null>(null);

  const api = useApi(daiReleaseApiRef);
  const direction = orderDirection === '' ? 'desc' : orderDirection;

  const { value, loading, error, retry } = useAsyncRetry(async () => {
    return api.getReleases(
      page,
      rowsPerPage,
      orderBy,
      direction,
      searchTile,
      fromDate,
      toDate,
    );
  }, [
    api,
    page,
    rowsPerPage,
    orderBy,
    orderDirection,
    searchTile,
    fromDate,
    toDate,
  ]);

  return {
    items: value?.items,
    loading,
    error,
    retry,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    setOrderDirection,
    searchTile,
    setSearchTitle,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    orderBy,
    setOrderBy,
  };
}
