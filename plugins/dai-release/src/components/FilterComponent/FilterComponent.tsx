import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Grid,
  Paper,
  TextField,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ClearAllOutlined from '@material-ui/icons/ClearAllOutlined';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import React, { useState } from 'react';
import SelectAll from '@material-ui/icons/SelectAll';
import SyncIcon from '@material-ui/icons/Sync';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import { Close } from '@material-ui/icons';
import { Drawer } from '@mui/material';

type FilterComponentProps = {
  searchTitle: string;
  fromDate: dayjs.Dayjs | null;
  toDate: dayjs.Dayjs | null;
  orderBy: string;
  statusTags: string[];
  retry: () => void;
  onSearchByTitle: (title: string) => void;
  onFromDateChange: (startDate: dayjs.Dayjs | null) => void;
  onToDateChange: (toDate: dayjs.Dayjs | null) => void;
  onOrderByChange: (orderBy: string) => void;
  onStatusTagChange: (statusTags: string[]) => void;
};

export const FilterComponent = ({
  searchTitle,
  fromDate,
  toDate,
  orderBy,
  statusTags,
  retry,
  onSearchByTitle,
  onFromDateChange,
  onToDateChange,
  onOrderByChange,
  onStatusTagChange,
}: FilterComponentProps) => {
  const statuses = [
    { status: 'Aborted', color: 'rgb(102, 115, 133)' },
    { status: 'Completed', color: 'rgb(73, 133, 0)' },
    { status: 'Failed', color: 'rgb(214, 31, 33)' },
    { status: 'Failing', color: 'rgb(255, 158, 73)' },
    { status: 'In progress', color: 'rgb(61, 108, 158)' },
    { status: 'Paused', color: 'rgb(102, 115, 133)' },
    { status: 'Planned', color: 'rgb(102, 115, 133)' },
  ];

  const useStyles = makeStyles(theme => ({
    statusIcon: {
      borderRadius: '50%',
      display: 'inline-block',
      height: theme.spacing(1.5),
      margin: theme.spacing('auto', 1, 'auto', 0),
      width: theme.spacing(1.5),
    },
    inputRoot: {
      fontSize: '12px',
    },
    datePickerInputRoot: {
      fontSize: '12px',
    },
    inputLabelRoot: {
      fontSize: '12px',
    },
    openCalenderPickerIcon: {
      height: '16px',
      width: '16px',
    },
    statusTagLabel: {
      float: 'left',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: '140px',
    },
    selectButton: {
      fontSize: '10px',
      textTransform: 'none',
      color: 'inherit',
    },
    drawerHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    clearGrid: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    fullWidth: {
      width: '100%',
    },
  }));
  const classes = useStyles();
  const [isOpen, toggleDrawer] = useState(true);

  const onStatusChange = (event: SelectChangeEvent<typeof statusTags>) => {
    const {
      target: { value },
    } = event;
    onStatusTagChange(typeof value === 'string' ? value.split(',') : value);
  };

  const clearAllState = () => {
    onSearchByTitle("");
    onFromDateChange(null);
    onToDateChange(null);
    onOrderByChange('start_date');
    onStatusTagChange([])
  }

  return (
    <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
      <Paper elevation={1} style={{ padding: '16px' }}>
        <div className={classes.drawerHeader}>
          <Typography variant="h6">Filters</Typography>
          <IconButton
            key="dismiss"
            title="Close the Filter"
            color="inherit"
            size={'small'}
            onClick={() => toggleDrawer(false)}
          >
            <Close fontSize={'inherit'} />
          </IconButton>
        </div>
      </Paper>
      <FormControl sx={{ mx: 2, my: 3 }}>
        <Grid
          container
          spacing={3}
          direction="column"
          justifyContent="flex-start"
          style={{ width: '300px' }}
        >
          <Grid item className={classes.clearGrid}>
            <span>Applied filters</span>
            <Button variant="outlined" onClick={() => clearAllState()}>Clear all</Button>
          </Grid>
          <Grid item>
            <FormControl fullWidth size="small">
              <InputLabel
                className={classes.inputRoot}
                id="status-multiple-checkbox-label"
              >
                Status
              </InputLabel>
              <Select
                renderValue={selected => (
                  <span className={classes.statusTagLabel}>
                    {selected.join(', ')}
                  </span>
                )}
                labelId="status-multiple-checkbox-label"
                id="status-multiple-checkbox"
                multiple
                value={statusTags}
                onChange={onStatusChange}
                input={
                  <OutlinedInput label="Status" className={classes.inputRoot} />
                }
                inputProps={{ size: 'small' }}
              >
                <MenuItem style={{ gap: '5px' }}>
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<SelectAll />}
                    onClick={event => {
                      event.stopPropagation();
                      const statusValues = statuses.map(item => item.status);
                      onStatusTagChange(statusValues);
                    }}
                    className={classes.selectButton}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<ClearAllOutlined />}
                    onClick={event => {
                      event.stopPropagation();
                      onStatusTagChange([]);
                    }}
                    className={classes.selectButton}
                  >
                    Clear All
                  </Button>
                </MenuItem>
                {statuses.map(data => (
                  <MenuItem key={data.status} value={data.status}>
                    <Checkbox
                      size="small"
                      checked={statusTags.indexOf(data.status) > -1}
                    />
                    <i
                      className={classes.statusIcon}
                      style={{ backgroundColor: data.color }}
                    />
                    <ListItemText
                      primary={data.status}
                      classes={{ primary: classes.inputRoot }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth size="small">
              <InputLabel
                id="orderby-select-label-id"
                className={classes.inputRoot}
              >
                Order by
              </InputLabel>
              <Select
                labelId="orderby-select-label-id"
                id="orderby-select-label"
                value={orderBy}
                label="Order by"
                onChange={(event: SelectChangeEvent) => {
                  onOrderByChange(event.target.value);
                }}
                input={
                  <OutlinedInput
                    label="Order by"
                    className={classes.inputRoot}
                  />
                }
                inputProps={{ size: 'small' }}
                defaultValue="start_date"
              >
                <MenuItem value="start_date" className={classes.inputRoot}>
                  Start Date
                </MenuItem>
                <MenuItem value="end_date" className={classes.inputRoot}>
                  End Date
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
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
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                slotProps={{
                  textField: {
                    size: 'small',
                    InputProps: {
                      classes: {
                        root: classes.datePickerInputRoot,
                      },
                    },
                    InputLabelProps: {
                      classes: { root: classes.inputLabelRoot },
                    },
                  },
                  openPickerIcon: {
                    classes: { root: classes.openCalenderPickerIcon },
                  },
                  digitalClockSectionItem: {
                    classes: { root: classes.inputLabelRoot },
                  },
                  popper: {
                    placement: 'left-start'
                  }
                }}
                label="From"
                ampm
                value={fromDate}
                onAccept={onFromDateChange}
                className={classes.fullWidth}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                slotProps={{
                  textField: {
                    size: 'small',
                    InputProps: {
                      classes: {
                        root: classes.datePickerInputRoot,
                      },
                    },
                    InputLabelProps: {
                      classes: { root: classes.inputLabelRoot },
                    },
                  },
                  openPickerIcon: {
                    classes: { root: classes.openCalenderPickerIcon },
                  },
                  digitalClockSectionItem: {
                    classes: { root: classes.inputLabelRoot },
                  },
                  popper: {
                    placement: 'left-start'
                  }
                }}
                label="To"
                ampm
                value={toDate}
                onAccept={onToDateChange}
                className={classes.fullWidth}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item style={{ display: 'flex', paddingLeft: '15px' }}>
            <SyncIcon
              fontSize="medium"
              onClick={retry}
              style={{ cursor: 'pointer' }}
            />
          </Grid>
        </Grid>
      </FormControl>
    </Drawer>
  );
};
