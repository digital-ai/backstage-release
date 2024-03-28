import { Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';

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
    filterFont: {
      height: '120px',
      width: '100px',
    },
  }));
  const classes = useStyles();

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
      },
    },
  };
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
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        wrap="nowrap"
        lg={12}
      >
        <Grid item lg={2}>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              console.log(event);
            }}
            size={'small'}
          />
        </Grid>
        <Grid item lg={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              slotProps={{ textField: { size: 'small' } }}
              label="Start"
              ampm={true}
              value={start}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item lg={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              slotProps={{ textField: { size: 'small' } }}
              label="To"
              ampm={true}
              value={end}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item lg={3}>
          <FormControl sx={{ my: 1, width: 250 }} size="small">
            <InputLabel id="status-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="status-multiple-checkbox-label"
              id="status-multiple-checkbox"
              multiple
              value={statusList}
              onChange={onStatusChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
              inputProps={{ size: 'small' }}
            >
              {statuses.map(data => (
                <MenuItem key={data.status} value={data.status}>
                  <Checkbox checked={statusList.indexOf(data.status) > -1} />
                  <i
                    className={classes.statusIcon}
                    style={{ backgroundColor: data.color }}
                  />
                  <ListItemText primary={data.status} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ mx: 1, minWidth: 120 }} size="small">
            <InputLabel id="orderby-select-label-id">Order by</InputLabel>
            <Select
              labelId="orderby-select-label-id"
              id="orderby-select-label"
              value={orderBy}
              label="Order by"
              onChange={orderByChange}
            >
              <MenuItem value={'start_date'}>Start Date</MenuItem>
              <MenuItem value={'end_date'}>End Date</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};
