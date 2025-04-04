import { ReleaseInstanceConfig } from '@digital-ai/plugin-dai-release-common';
import { daiReleaseApiRef } from '../api';
import dayjs from 'dayjs';
import { useApi } from '@backstage/core-plugin-api';
import useAsyncRetryWithSelectiveDeps from './stateSelectiveDeps';
import { useDebouncedValue } from '../utils/helpers';
import { useState } from 'react';

export function useReleases(): {
  loading: boolean;
  error: Error | undefined;
  items: any;
  retry: () => void;
  page: number;
  rowsPerPage: number;
  searchTitle: string;
  fromDate: dayjs.Dayjs | null;
  toDate: dayjs.Dayjs | null;
  orderBy: string;
  statusTags: string[] | undefined;
  instance: string;
  instanceList: ReleaseInstanceConfig[] | undefined;
  openModal: boolean;
  modalPopupInputId: string;
  modalTitle: string;
  modalPopupData: any;
  setPage: (page: number) => void;
  setRowsPerPage: (pageSize: number) => void;
  setSearchTitle: (title: string) => void;
  setFromDate: (fromDate: dayjs.Dayjs | null) => void;
  setToDate: (toDate: dayjs.Dayjs | null) => void;
  setOrderBy: (orderBy: string) => void;
  setStatusTags: (statusTags: string[] | undefined) => void;
  setInstance: (instance: string) => void;
  setOpenModal: (openModal: boolean) => void;
  setModalPopupInputId: (modalPopupInputId: string) => void;
  setModalTitle: (modalTitle: string) => void;
  setModalPopupData: (modalPopupData: any) => void;
} {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('start_date');
  const [searchTitle, setSearchTitle] = useState('');
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(null);
  const [toDate, setToDate] = useState<dayjs.Dayjs | null>(null);
  const [statusTags, setStatusTags] = useState<string[] | undefined>([]);
  const [instance, setInstance] = useState('');
  const [instanceList, setInstanceList] = useState<
    ReleaseInstanceConfig[] | undefined
  >([]);

  const [openModal, setOpenModal] = useState(false);
  const [modalPopupInputId, setModalPopupInputId] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalPopupData, setModalPopupData] = useState<any>(undefined);

  const api = useApi(daiReleaseApiRef);

  // Use the debounced value of searchTitle, it will update the state in one second
  const debouncedSearchTitle = useDebouncedValue(searchTitle, 1000);

  const { value, loading, error, retry } = useAsyncRetryWithSelectiveDeps(
    async () => {
      if (instance.trim() === '') {
        return api.getInstanceList().then(data => {
          setInstance(data[0].name);
          setInstanceList(data);
        });
      }
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
    },
    page,
    setPage,
    [
      api,
      rowsPerPage,
      orderBy,
      debouncedSearchTitle,
      fromDate,
      toDate,
      statusTags,
      instance,
    ],
  );

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
    instanceList,
    openModal,
    modalPopupInputId,
    modalTitle,
    modalPopupData,
    setPage,
    setRowsPerPage,
    setSearchTitle,
    setFromDate,
    setToDate,
    setOrderBy,
    setStatusTags,
    setInstance,
    setOpenModal,
    setModalPopupInputId,
    setModalTitle,
    setModalPopupData,
  };
}
