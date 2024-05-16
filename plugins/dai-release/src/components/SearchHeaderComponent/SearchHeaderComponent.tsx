import { Grid, makeStyles, TextField } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import SyncIcon from '@material-ui/icons/Sync';
import { SvgIcon } from '@mui/material';
import { ReleaseInstanceConfig } from '@digital-ai/plugin-dai-release-common';

type FilterComponentProps = {
  searchTitle: string;
  instance: string;
  instanceList: ReleaseInstanceConfig[] | undefined;
  retry: () => void;
  onSearchByTitle: (title: string) => void;
  onSetInstance: (instanceKey: string) => void;
  onShowDrawer: (showDrawer: boolean) => void;
};

export const SearchHeaderComponent = ({
  searchTitle,
  instance,
  instanceList,
  retry,
  onSearchByTitle,
  onSetInstance,
  onShowDrawer,
}: FilterComponentProps) => {
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

  return (
    <FormControl fullWidth sx={{ my: 3 }}>
      <Grid container spacing={3} direction="row" alignItems={'center'}>
        <Grid item lg={4} md={4} sm={4}>
          <Typography
            variant="h5"
            style={{ display: 'inline', marginRight: '10px' }}
          >
            Active releases
          </Typography>
          <SyncIcon
            fontSize="small"
            style={{ cursor: 'pointer' }}
            onClick={retry}
          />
        </Grid>
        <Grid
          container
          lg={8}
          md={8}
          sm={8}
          spacing={3}
          direction="row"
          justifyContent="flex-end"
          alignItems={'center'}
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
                    value={data.displayName}
                    className={classes.inputRoot}
                  >
                    {data.displayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item className={classes.inputItem}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={searchTitle}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onSearchByTitle(event.target.value);
              }}
              size="small"
              InputProps={{
                classes: {
                  root: classes.inputRoot,
                },
              }}
              InputLabelProps={{ classes: { root: classes.inputLabelRoot } }}
              fullWidth
            />
          </Grid>
          <Grid item style={{ display: 'flex' }}>
            <SvgIcon onClick={() => onShowDrawer(true)}>
              <svg
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              >
                <path
                  d="M2.08666 3.54034C2.23952 3.21089 2.56969 3.0001 2.93287 3.0001H17.0671C17.4303 3.0001 17.7605 3.21089 17.9133 3.54034C18.0662 3.86979 18.014 4.25801 17.7794 4.53533L12.3463 10.96V16.6538C12.3463 16.9771 12.1789 17.2774 11.9039 17.4473C11.6288 17.6173 11.2854 17.6328 10.9962 17.4882L8.16939 16.0747C7.85335 15.9167 7.65371 15.5937 7.65371 15.2404V10.96L2.22057 4.53533C1.98605 4.25801 1.9338 3.86979 2.08666 3.54034ZM4.94347 4.86582L9.29888 10.0161C9.44129 10.1845 9.51944 10.3979 9.51944 10.6185V14.6638L10.4806 15.1444V10.6185C10.4806 10.3979 10.5587 10.1845 10.7011 10.0161L15.0565 4.86582H4.94347Z"
                  fill="#3B485C"
                />
              </svg>
            </SvgIcon>
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
};
