import {Content, Header, Page} from '@backstage/core-components';
import { DenseTable, defaultColumns } from '../DenseTable';
import { Grid } from '@material-ui/core';
import React from 'react';
import {useReleases} from "../../hooks";
import {ReleaseResponseErrorPanel} from "../ReleaseResponseErrorPanel";

export const HomePageComponent = () => {
  const {
    items,
    loading,
    error,
    retry,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    setOrderBy,
    setOrderDirection,
  } = useReleases();

  if (error) {
    return <ReleaseResponseErrorPanel error={error} />;
  }
  return (
      <Page themeId="home">
        <Header title="Digital.ai Release" />
        <Content>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <DenseTable
                  page={page}
                  pageSize={rowsPerPage}
                  loading={loading}
                  totalCount={items?.total ?? 100}
                  tableData={items?.releases || []}
                  onRowsPerPageChange={setRowsPerPage}
                  onPageChange={setPage}
                  columns={defaultColumns}
                  retry={retry}
                  onOrderDirection={setOrderDirection}
                  onOrderBy={setOrderBy}
              />
            </Grid>
          </Grid>
        </Content>
      </Page>
  );
}
