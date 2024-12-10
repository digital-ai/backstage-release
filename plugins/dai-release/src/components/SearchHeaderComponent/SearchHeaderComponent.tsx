import {
  Badge,
  Grid,
  MenuItem,
  TextField,
  makeStyles,
} from '@material-ui/core';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { appThemeApiRef, useApi } from '@backstage/core-plugin-api';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react';
import { ReleaseInstanceConfig } from '@digital-ai/plugin-dai-release-common';
import SvgIcon from '@mui/material/SvgIcon';
import SyncIcon from '@material-ui/icons/Sync';
import Typography from '@mui/material/Typography';
import { useObservable } from 'react-use';

type SearchHeaderComponentProps = {
  titleName: string;
  searchTitleTextField?: string;
  searchTitle?: string;
  customSearch?: string;
  instance: string;
  instanceList: ReleaseInstanceConfig[] | undefined;
  retry?: () => void;
  onCustomSearch?: (customString: string) => void;
  onSearchByTitle?: (title: string) => void;
  onSetInstance: (instanceKey: string) => void;
  onShowDrawer?: (showDrawer: boolean) => void;
  onSetWorkflowSearch?: (workflowSearch: { categories: string[]; author: string }) => void;
  filterCount?: number;
  resetState?: () => void;
  error: Error | undefined;
  displaySearchFilter?: boolean | true;
  displayTableSearchFilter?: boolean | false;
  displayFilterIcon?: boolean | true;
};

export const SearchHeaderComponent = ({
  displaySearchFilter,
  displayTableSearchFilter,
  displayFilterIcon,
  titleName,
  searchTitleTextField,
  searchTitle,
  customSearch,
  instance,
  instanceList,
  retry,
  error,
  filterCount,
  onCustomSearch,
  onSearchByTitle,
  onSetInstance,
  onShowDrawer,
  resetState,
  onSetWorkflowSearch,
}: SearchHeaderComponentProps) => {
  const useStyles = makeStyles(() => ({
    inputRoot: {
      fontSize: '12px',
    },
    inputLabelRoot: {
      fontSize: '12px',
    },
    inputItem: {
      width: '224px',
    },
  }));
  const classes = useStyles();
  const appThemeApi = useApi(appThemeApiRef);
  const themeId = useObservable(
    appThemeApi.activeThemeId$(),
    appThemeApi.getActiveThemeId(),
  );

  return (
    <FormControl fullWidth sx={{ my: 3 }}>
      <Grid container spacing={3} direction="row" alignItems="center">
        <Grid item lg={4} md={4} sm={4}>
          <Typography
            variant="h5"
            style={{ display: 'inline', marginRight: '10px' }}
          >
            {titleName}
          </Typography>
          {retry && (
            <SyncIcon
              fontSize="small"
              style={{ cursor: error ? 'no-drop' : 'pointer' }}
              onClick={() => !!error || retry()}
            />
          )}
        </Grid>
        <Grid item lg={8} md={8} sm={8}>
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid item className={classes.inputItem}>
              <FormControl fullWidth size="small">
                <InputLabel
                  id="instance-select-label-id"
                  className={classes.inputRoot}
                >
                  Choose Instance
                </InputLabel>
                <Select
                  labelId="instance-select-label-id"
                  id="instance-select-label"
                  value={instance}
                  label="Choose Instance"
                  onChange={(event: SelectChangeEvent) => {
                    onSetInstance(event.target.value);
                    resetState?.();
                    if (onSetWorkflowSearch) {
                      onSetWorkflowSearch({
                        categories: [],
                        author: '',
                      });
                    }
                  }}
                  input={
                    <OutlinedInput
                      label="Choose Instance"
                      className={classes.inputRoot}
                    />
                  }
                  inputProps={{ size: 'small' }}
                >
                  {instanceList?.map(data => (
                    <MenuItem
                      value={data.name}
                      className={classes.inputRoot}
                      key={data.name}
                    >
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {displaySearchFilter && (
              <Grid item className={classes.inputItem}>
                <TextField
                  id="outlined-basic"
                  label={searchTitleTextField}
                  variant="outlined"
                  value={searchTitle}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (onSearchByTitle) {
                      onSearchByTitle(event.target.value);
                    }
                    resetState?.();
                  }}
                  size="small"
                  InputProps={{
                    classes: {
                      root: classes.inputRoot,
                    },
                  }}
                  InputLabelProps={{
                    classes: { root: classes.inputLabelRoot },
                  }}
                  disabled={!!error}
                  fullWidth
                />
              </Grid>
            )}
            {displayTableSearchFilter && (
              <Grid item className={classes.inputItem}>
                <TextField
                  id="outlined-basic"
                  label="Search"
                  value={customSearch}
                  variant="outlined"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onCustomSearch?.(event.target.value);
                  }}
                  size="small"
                  InputProps={{
                    classes: {
                      root: classes.inputRoot,
                    },
                  }}
                  InputLabelProps={{
                    classes: { root: classes.inputLabelRoot },
                  }}
                  disabled={!!error}
                  fullWidth
                />
              </Grid>
            )}
            {displayFilterIcon && (
              <Grid item style={{ display: 'flex' }}>
                <Badge
                  badgeContent={filterCount}
                  color="secondary"
                  data-testid="badge-icon"
                >
                  <SvgIcon onClick={() => !!error || onShowDrawer?.(true)}>
                    <svg
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: error ? 'no-drop' : 'pointer',
                      }}
                    >
                      <path
                        d="M2.08666 3.54034C2.23952 3.21089 2.56969 3.0001 2.93287 3.0001H17.0671C17.4303 3.0001 17.7605 3.21089 17.9133 3.54034C18.0662 3.86979 18.014 4.25801 17.7794 4.53533L12.3463 10.96V16.6538C12.3463 16.9771 12.1789 17.2774 11.9039 17.4473C11.6288 17.6173 11.2854 17.6328 10.9962 17.4882L8.16939 16.0747C7.85335 15.9167 7.65371 15.5937 7.65371 15.2404V10.96L2.22057 4.53533C1.98605 4.25801 1.9338 3.86979 2.08666 3.54034ZM4.94347 4.86582L9.29888 10.0161C9.44129 10.1845 9.51944 10.3979 9.51944 10.6185V14.6638L10.4806 15.1444V10.6185C10.4806 10.3979 10.5587 10.1845 10.7011 10.0161L15.0565 4.86582H4.94347Z"
                        fill={themeId === 'dark' ? '#ffffff' : '#3B485C'}
                      />
                    </svg>
                  </SvgIcon>
                </Badge>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
};
