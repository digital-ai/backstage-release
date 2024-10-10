/* eslint-disable consistent-return */
import { useRef, useState } from 'react';
import { ReleaseInstanceConfig } from '@digital-ai/plugin-dai-release-common';
import { daiReleaseApiRef } from '../api';
import { useApi } from '@backstage/core-plugin-api';
import useAsyncRetryWithSelectiveDeps from './stateSelectiveDeps';
import { useDebouncedValue } from '../utils/helpers';

export function useTemplates(): {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  data: any;
  error: Error | undefined;
  hasMore: Boolean;
  searchTitle: string;
  instance: string;
  instanceList: ReleaseInstanceConfig[] | undefined;
  openModal: boolean;
  modalPopupInputId: string;
  modalTitle: string;
  modalPopupData: any;
  setPage: (page: (prevPage: number) => number) => void;
  setRowsPerPage: (pageSize: number) => void;
  setSearchTitle: (title: string) => void;
  setInstance: (instance: string) => void;
  setHasMore: (hasMore: boolean) => void;
  setData: (data: any) => void;
  setOpenModal: (openModal: boolean) => void;
  setModalPopupInputId: (modalPopupInputId: string) => void;
  setModalTitle: (modalTitle: string) => void;
  setModalPopupData: (modalPopupData: any) => void;
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

  const [openModal, setOpenModal] = useState(false);
  const [modalPopupInputId, setModalPopupInputId] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalPopupData, setModalPopupData] = useState<any>(undefined);
  const api = useApi(daiReleaseApiRef);

  // AbortController reference to cancel the ongoing request
  const abortControllerRef = useRef<AbortController | null>(null);

  // Use the debounced value of searchTitle, it will update the state after 1 second
  const debouncedSearchTitle = useDebouncedValue(searchTitle, 1000);

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
    openModal,
    modalPopupInputId,
    modalTitle,
    modalPopupData,
    setPage,
    setRowsPerPage,
    setSearchTitle,
    setInstance,
    setHasMore,
    setData,
    setOpenModal,
    setModalPopupInputId,
    setModalTitle,
    setModalPopupData,
  };
}
