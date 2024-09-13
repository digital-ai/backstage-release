import { ReleaseInstanceConfig } from '@digital-ai/plugin-dai-release-common';
import { daiReleaseApiRef } from '../api';
import { useApi } from '@backstage/core-plugin-api';
import useAsyncRetryWithSelectiveDeps from './stateSelectiveDeps';
import { useDebouncedValue } from '../utils/helpers';
import { useState } from 'react';

export function useTemplates(): {
    loading: boolean;
    error: Error | undefined;
    items: any;
    retry: () => void;
    page: number;
    rowsPerPage: number;
    searchTitle: string;
    instance: string;
    instanceList: ReleaseInstanceConfig[] | undefined;
    setPage: (page: number) => void;
    setRowsPerPage: (pageSize: number) => void;
    setSearchTitle: (title: string) => void;
    setInstance: (instance: string) => void;
} {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTitle, setSearchTitle] = useState('');
    const [instance, setInstance] = useState('');
    const [instanceList, setInstanceList] = useState<
        ReleaseInstanceConfig[] | undefined
    >([]);

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
            return api.getTemplates(
                page,
                rowsPerPage,
                debouncedSearchTitle,
                instance,
            );
        },
        page,
        setPage,
        [
            api,
            rowsPerPage,
            debouncedSearchTitle,
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
        instance,
        instanceList,
        setPage,
        setRowsPerPage,
        setSearchTitle,
        setInstance,
    };
}