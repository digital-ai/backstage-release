import { daiReleaseApiRef } from '../api';
import { useApi } from '@backstage/core-plugin-api';
import { useAsyncRetry } from 'react-use';
import { useState } from 'react';

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
  setOrderBy: (orderBy: number) => void;
} {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState(3);
  const [orderDirection, setOrderDirection] = useState('desc');
  const api = useApi(daiReleaseApiRef);
  const direction = orderDirection === '' ? 'desc' : orderDirection;
  const sortColumn = orderBy !== -1 ? 'start_date' : 'end_date';

  const { value, loading, error, retry } = useAsyncRetry(async () => {
    return api.getReleases(page, rowsPerPage, sortColumn, direction);
  }, [api, page, rowsPerPage, orderBy, orderDirection]);

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
    setOrderBy,
  };
}
