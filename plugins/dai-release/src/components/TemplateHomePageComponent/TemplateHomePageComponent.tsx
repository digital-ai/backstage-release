import {
  Content,
  Header,
  Link,
  LinkButton,
  Page,
} from '@backstage/core-components';
import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FilterComponent } from '../FilterComponent';
import { ModalComponent } from '../ModalComponent';
import { PlusIcon } from '../../icon/icon';
import { ReleasePopOverComponent } from '../ReleasePopOverComponent';
import { ReleaseResponseErrorPanel } from '../ReleaseResponseErrorPanel';
import { ScrollableTable } from '../DenseScrollableTable/ScrollableTable';
import { SearchHeaderComponent } from '../SearchHeaderComponent';
import Typography from '@mui/material/Typography';
import capitalize from 'lodash/capitalize';
import releaseLogoWhite from '../../assets/releaseLogoWhite.png';
import { useTemplates } from '../../hooks';

const useStyles = makeStyles(() => ({
  logoStyle: {
    width: '300px',
  },
  layoutSec: {
    paddingTop: '0',
  },
}));

const useEmptyStyles = makeStyles(theme => ({
  empty: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}));

export const TemplateHomePageComponent = () => {
  const classes = useStyles();
  const emptyClasses = useEmptyStyles();

  const {
    loading,
    error,
    data,
    tags,
    hasMore,
    searchTitle,
    instance,
    instanceList,
    openModal,
    modalPopupInputId,
    modalTitle,
    modalPopupData,
    setTags,
    setPage,
    setSearchTitle,
    setInstance,
    setLoading,
    setHasMore,
    setData,
    setOpenModal,
    setModalPopupInputId,
    setModalTitle,
    setModalPopupData,
  } = useTemplates();

  const loadMoreData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setPage((prevPage: number) => prevPage + 1);
  };

  const onClosePopupModal = () => {
    setOpenModal(false);
  };

  const [showDrawer, onShowDrawer] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const resetState = () => {
    setData([]);
    setHasMore(true);
    setLoading(true);
  };
  useEffect(() => {
    // Calculate the number of applied filters
    const count =
      (tags.length > 0 ? tags.length : 0) + (searchTitle.length > 0 ? 1 : 0);
    setFilterCount(count);
  }, [tags, searchTitle]);

  const [customSearchQuery, setCustomSearchQuery] = useState('');

  const filteredData = customSearchQuery
    ? data.filter((row: { [x: string]: { toString: () => string } }) =>
        ['title', 'folder'].some(key =>
          row[key]
            ?.toString()
            .toLowerCase()
            .includes(customSearchQuery?.toLowerCase()),
        ),
      )
    : data;
  const handleCustomSearchChange = (customSearchStr: string) => {
    setCustomSearchQuery(customSearchStr);
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
              displayFilter={false}
              tableSearchFilter
              searchTitleTextField="Search by name"
              titleName="Templates"
              searchTitle={searchTitle}
              instance={instance}
              instanceList={instanceList}
              error={error}
              filterCount={filterCount}
              customSearch={customSearchQuery}
              onCustomSearch={handleCustomSearchChange}
              onSearchByTitle={setSearchTitle}
              onShowDrawer={onShowDrawer}
              onSetInstance={setInstance}
              resetState={resetState}
            />
            <FilterComponent
              showDrawer={showDrawer}
              onShowDrawer={onShowDrawer}
              tags={tags}
              searchTitle={searchTitle}
              onSetTags={setTags}
              onSearchByTitle={setSearchTitle}
              resetState={resetState}
            />
            {error && !loading ? (
              <ReleaseResponseErrorPanel error={error} />
            ) : (
              <>
                <ScrollableTable
                  loading={loading}
                  loadMoreData={loadMoreData}
                  data={filteredData}
                  emptyContent={
                    <Typography
                      color="textSecondary"
                      className={emptyClasses.empty}
                    >
                      No templates available
                    </Typography>
                  }
                  columns={[
                    {
                      label: 'Name',
                      headerStyle: { width: '850px', lineHeight: '14px' },
                      render: row => (
                        <Link to={row.titleRedirectUri}>{row.title}</Link>
                      ),
                      cellStyle: { width: '850px', lineHeight: '14px' },
                    },
                    {
                      label: 'Folder',
                      headerStyle: { width: '450px', lineHeight: '14px' },
                      render: row => capitalize(row.folder),
                      cellStyle: { width: '450px', lineHeight: '14px' },
                    },
                    {
                      label: 'Action',
                      headerStyle: { width: '180px', lineHeight: '14px' },
                      render: row => (
                        <div style={{ width: '150px', height: '40px' }}>
                          <LinkButton
                            to={row.newReleaseRedirectUri}
                            color="default"
                            variant="outlined"
                            style={{
                              width: '150px',
                              height: '40px',
                              textTransform: 'none',
                            }}
                            startIcon={<PlusIcon />}
                          >
                            New Releases
                          </LinkButton>
                        </div>
                      ),
                      cellStyle: { width: '180px', lineHeight: '14px' },
                    },
                    {
                      label: '',
                      headerStyle: { width: 'auto', whiteSpace: 'nowrap' },
                      render: row => (
                        <ReleasePopOverComponent
                          folderId={row.folderId}
                          modalTitle={row.title}
                          setOpenModal={setOpenModal}
                          setFolderId={setModalPopupInputId}
                          setModalTitle={setModalTitle}
                        />
                      ),
                      cellStyle: { width: 'auto', whiteSpace: 'nowrap' },
                    },
                  ]}
                />
                {openModal && (
                  <ModalComponent
                    onClose={onClosePopupModal}
                    instance={instance}
                    modalPopupInputId={modalPopupInputId}
                    modalTitle={`Meta information - ${modalTitle}`}
                    openModal={openModal}
                    modalPopupData={modalPopupData}
                    sourcePage="template"
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
