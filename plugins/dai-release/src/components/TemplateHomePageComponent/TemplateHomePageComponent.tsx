import { Content, Header, Link, LinkButton } from '@backstage/core-components';
import { Grid, makeStyles } from '@material-ui/core';
import {
  ScrollableTable,
  ScrollableTableColumn,
} from '../DenseScrollableTable/ScrollableTable';
import React from 'react';
import { ReleasePopOverComponent } from '../ReleasePopOverComponent';
import { ReleaseResponseErrorPanel } from '../ReleaseResponseErrorPanel';
import { SearchHeaderComponent } from '../SearchHeaderComponent';
import Typography from '@mui/material/Typography';
import capitalize from 'lodash/capitalize';
import { createSvgIcon } from '@mui/material/utils';
import releaseLogoWhite from '../../assets/releaseLogoWhite.png';
import { useTemplates } from '../../hooks';

const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  'Plus',
);
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

const defaultColumns: ScrollableTableColumn[] = [
  {
    label: 'Name',
    headerStyle: { width: '1000px', lineHeight: '14px' },
    render: row => <Link to={row.titleRedirectUri}>{row.title}</Link>,
    cellStyle: { width: '1000px', lineHeight: '14px' },
  },
  {
    label: 'Folder',
    headerStyle: { width: 'auto', whiteSpace: 'nowrap' },
    render: row => capitalize(row.folder),
    cellStyle: { width: 'auto', whiteSpace: 'nowrap' },
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
          style={{ width: '150px', height: '40px', textTransform: 'none' }}
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
    render: () => <ReleasePopOverComponent />,
    cellStyle: { width: 'auto', whiteSpace: 'nowrap' },
  },
];

export const TemplateHomePageComponent = () => {
  const classes = useStyles();
  const emptyClasses = useEmptyStyles();

  const {
    loading,
    error,
    data,
    hasMore,
    searchTitle,
    instance,
    instanceList,
    setPage,
    setSearchTitle,
    setInstance,
    setLoading,
    setHasMore,
    setData,
  } = useTemplates();

  const loadMoreData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setPage((prevPage: number) => prevPage + 1);
  };
  return (
    <div>
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
              searchTitleTextField="Search by name"
              titleName="Templates"
              searchTitle={searchTitle}
              instance={instance}
              instanceList={instanceList}
              error={error}
              onSearchByTitle={setSearchTitle}
              onSetInstance={setInstance}
              onSetData={setData}
              onSetHasMore={setHasMore}
              onSetLoading={setLoading}
            />
            {error && !loading ? (
              <ReleaseResponseErrorPanel error={error} />
            ) : (
              <ScrollableTable
                loading={loading}
                loadMoreData={loadMoreData}
                data={data}
                emptyContent={
                  <Typography
                    color="textSecondary"
                    className={emptyClasses.empty}
                  >
                    No templates available
                  </Typography>
                }
                columns={defaultColumns}
              />
            )}
          </Grid>
        </Grid>
      </Content>
    </div>
  );
};
