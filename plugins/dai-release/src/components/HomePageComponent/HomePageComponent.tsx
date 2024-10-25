import { Content, Header, Page } from '@backstage/core-components';
import { DenseTable, defaultColumns } from '../DenseTable';
import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FilterComponent } from '../FilterComponent';
import { ModalComponent } from '../ModalComponent';
import { ReleaseResponseErrorPanel } from '../ReleaseResponseErrorPanel';
import { SearchHeaderComponent } from '../SearchHeaderComponent';
import releaseLogoWhite from '../../assets/releaseLogoWhite.png';
import { useReleases } from '../../hooks';

const useStyles = makeStyles(() => ({
  logoStyle: {
    width: '300px',
  },
  layoutSec: {
    paddingTop: '0',
  },
}));
export const HomePageComponent = () => {
  const classes = useStyles();
  const [showDrawer, onShowDrawer] = useState(false);
  const [filterCount, setFilterCount] = useState(0);

  const {
    items,
    loading,
    error,
    retry,
    page,
    rowsPerPage,
    searchTitle,
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
  } = useReleases();

  useEffect(() => {
    // Calculate the number of applied filters
    const count =
      (fromDate === null ? 0 : 1) +
      (toDate === null ? 0 : 1) +
      (statusTags !== undefined ? statusTags.length : 0);
    setFilterCount(count);
  }, [fromDate, toDate, statusTags]);

  const onClosePopupModal = () => {
    setOpenModal(false);
  };

  return (
    <Page themeId="home">
      <Header
        title={
          <img
            src={releaseLogoWhite}
            alt="Release logo"
            className={classes.logoStyle}
          />
        }
        pageTitleOverride="Digital.ai Release"
      />
      <Content className={classes.layoutSec}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <SearchHeaderComponent
              displayFilter
              titleName="Active Releases"
              searchTitleTextField="Title"
              searchTitle={searchTitle}
              instance={instance}
              instanceList={instanceList}
              filterCount={filterCount}
              retry={retry}
              error={error}
              onSearchByTitle={setSearchTitle}
              onSetInstance={setInstance}
              onShowDrawer={onShowDrawer}
            />
            <FilterComponent
              fromDate={fromDate}
              toDate={toDate}
              orderBy={orderBy}
              statusTags={statusTags}
              showDrawer={showDrawer}
              onFromDateChange={setFromDate}
              onToDateChange={setToDate}
              onOrderByChange={setOrderBy}
              onStatusTagChange={setStatusTags}
              onShowDrawer={onShowDrawer}
            />

            {error && !loading ? (
              <ReleaseResponseErrorPanel error={error} />
            ) : (
              <>
                <DenseTable
                  page={page}
                  pageSize={rowsPerPage}
                  loading={loading}
                  totalCount={items?.total ?? 100}
                  tableData={items?.releases || []}
                  columns={defaultColumns(
                    setOpenModal,
                    setModalPopupInputId,
                    setModalTitle,
                  )}
                  retry={retry}
                  searchTitle={searchTitle}
                  fromDate={fromDate}
                  toDate={toDate}
                  orderBy={orderBy}
                  statusTags={statusTags}
                  onRowsPerPageChange={setRowsPerPage}
                  onPageChange={setPage}
                  setSearchTitle={setSearchTitle}
                  setFromDate={setFromDate}
                  setToDate={setToDate}
                  setOrderBy={setOrderBy}
                  setStatusTags={setStatusTags}
                />
                {openModal && (
                  <ModalComponent
                    onClose={onClosePopupModal}
                    instance={instance}
                    modalPopupInputId={modalPopupInputId}
                    modalTitle={`Meta information - ${modalTitle}`}
                    openModal={openModal}
                    modalPopupData={modalPopupData}
                    sourcePage="release"
                    setModalPopupData={setModalPopupData}
                  />
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
