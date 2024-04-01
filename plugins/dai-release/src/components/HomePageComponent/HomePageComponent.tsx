import { Content, Header, Page } from '@backstage/core-components';
import { DenseTable, defaultColumns } from '../DenseTable';
import { Grid } from '@material-ui/core';
import React from 'react';
import { SearchFilter } from '../SearchFilter';

const data = [
  {
    title: '',
    folder: '',
    status: '',
    startDate: '',
    completionDate: '',
    duration: '',
  },
];

export const HomePageComponent = () => (
  <Page themeId="home">
    <Header title="Digital.ai Release" />
    <Content>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <SearchFilter />
        </Grid>
        <Grid item>
          <DenseTable
            page={0}
            columns={defaultColumns}
            loading={false}
            pageSize={10}
            tableData={data}
            totalCount={10}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
            retry={() => {}}
          />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
