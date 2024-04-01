import { Grid, Paper, TextField, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Checkbox from '@mui/material/Checkbox';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import { LocalizationProvider } from '@mui/x-date-pickers';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';

export const SearchFilter = () => {
  const [start] = useState();
  const [end] = useState();
  const [orderBy, setOrderBy] = useState('');
  const [statusList, setStatusList] = React.useState<string[]>([]);

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
      width: '180px',
    },
    inputLabelRoot: {
      fontSize: '12px',
    },
    openCalenderPickerIcon: {
      height: '16px',
      width: '16px',
    },
  }));
  const classes = useStyles();

  const onStatusChange = (event: SelectChangeEvent<typeof statusList>) => {
    const {
      target: { value },
    } = event;
    setStatusList(typeof value === 'string' ? value.split(',') : value);
  };
  const orderByChange = (event: SelectChangeEvent) => {
    setOrderBy(event.target.value);
  };
  return (
    <Paper elevation={1}>
      <FormControl sx={{ mx: 1, my: 1.5 }}>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item lg={2}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                global.console.log(event);
              }}
              size="small"
              InputProps={{
                classes: {
                  root: classes.inputRoot,
                },
              }}
              InputLabelProps={{ classes: { root: classes.inputLabelRoot } }}
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
                }}
                label="Start"
                ampm
                value={start}
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
                }}
                label="To"
                ampm
                value={end}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <FormControl sx={{ width: 204 }} size="small">
              <InputLabel
                className={classes.inputRoot}
                id="status-multiple-checkbox-label"
              >
                Tag
              </InputLabel>
              <Select
                labelId="status-multiple-checkbox-label"
                id="status-multiple-checkbox"
                multiple
                value={statusList}
                onChange={onStatusChange}
                input={
                  <OutlinedInput label="Tag" className={classes.inputRoot} />
                }
                renderValue={selected => selected.join(', ')}
                inputProps={{ size: 'small' }}
              >
                {statuses.map(data => (
                  <MenuItem key={data.status} value={data.status}>
                    <Checkbox
                      size="small"
                      checked={statusList.indexOf(data.status) > -1}
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
            <FormControl sx={{ minWidth: 120 }} size="small">
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
                onChange={orderByChange}
                input={
                  <OutlinedInput
                    label="Order by"
                    className={classes.inputRoot}
                  />
                }
                inputProps={{ size: 'small' }}
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
        </Grid>
      </FormControl>
    </Paper>
  );
};
