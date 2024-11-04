import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Grid,
  IconButton,
  MenuItem,
  Paper,
  makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import ClearAllOutlined from '@material-ui/icons/ClearAllOutlined';
import Close from '@material-ui/icons/Close';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import OutlinedInput from '@mui/material/OutlinedInput';
import SelectAll from '@material-ui/icons/SelectAll';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

type FilterComponentProps = {
  fromDate?: dayjs.Dayjs | null;
  toDate?: dayjs.Dayjs | null;
  orderBy?: string;
  searchTitle?: string;
  statusTags?: string[] | undefined;
  tags?: string[];
  error?: Error;
  showDrawer: boolean;
  filterCount: number;
  onFromDateChange?: (startDate: dayjs.Dayjs | null) => void;
  onToDateChange?: (toDate: dayjs.Dayjs | null) => void;
  onOrderByChange?: (orderBy: string) => void;
  onSearchByTitle?: (title: string) => void;
  onStatusTagChange?: (statusTags: string[] | undefined) => void;
  onSetTags?: (tags: string[]) => void;
  onShowDrawer: (showDrawer: boolean) => void;
  onSetData?: (data: any) => void;
  resetState?: () => void;
};

export const FilterComponent = ({
  fromDate,
  toDate,
  orderBy,
  searchTitle,
  statusTags,
  tags,
  error,
  showDrawer,
  filterCount,
  onFromDateChange,
  onToDateChange,
  onOrderByChange,
  onSearchByTitle,
  onStatusTagChange,
  onShowDrawer,
  onSetTags,
  resetState,
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
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    fullWidth: {
      width: '100%',
    },
    root: {
      width: 500,
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
    inputItem: {
      width: '100%',
      fontSize: '0.875rem',
    },
  }));
  const classes = useStyles();

  const onStatusChange = (event: SelectChangeEvent<typeof statusTags>) => {
    const {
      target: { value },
    } = event;
    onStatusTagChange?.(typeof value === 'string' ? value.split(',') : value);
  };

  const [customValues, setCustomValues] = useState<string[]>([]); // State to store custom values
  const [inputValue, setInputValue] = useState<string>(''); // Input state to track user typing

  // Handle change for selected custom values
  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string[]) => {
    setCustomValues(newValue);
    onSetTags?.(newValue);
    resetState?.();
  };

  // Handle key down event to add a custom value when 'Enter' is pressed
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      if (!customValues.includes(inputValue.trim())) {
        const newCustomValues = [...customValues, inputValue.trim()];
        onSetTags?.(newCustomValues);
        setCustomValues(newCustomValues);
        setInputValue(''); // Clear the input field
      }
    }
  };

  const clearAllState = () => {
    onSetTags?.([]);
    onSearchByTitle?.('');
    resetState?.();
    onFromDateChange?.(null);
    onToDateChange?.(null);
    onOrderByChange?.('start_date');
    onStatusTagChange?.([]);
    setCustomValues?.([]);
    setInputValue?.('');
  };

  return (
    <Drawer
      anchor="right"
      open={showDrawer}
      onClose={() => onShowDrawer(false)}
    >
      <Paper elevation={1} style={{ padding: '16px' }}>
        <div className={classes.drawerHeader}>
          <Typography variant="h6">Filters</Typography>
          <IconButton
            key="dismiss"
            title="Close the Filter"
            color="inherit"
            size="small"
            onClick={() => onShowDrawer(false)}
          >
            <Close fontSize="inherit" />
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
            <span data-testid='appliedFilterid'>Applied filters ({filterCount})</span>
            <Button
              variant="outlined"
              onClick={() => clearAllState()}
              size="small"
              className={classes.inputLabelRoot}
              style={{
                textTransform: 'none',
              }}
            >
              Clear all
            </Button>
          </Grid>
          {onStatusTagChange && (
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
                    <OutlinedInput
                      label="Status"
                      className={classes.inputRoot}
                    />
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
                        checked={
                          statusTags && statusTags.indexOf(data.status) > -1
                        }
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
          )}
          {onOrderByChange && (
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
                </Select>
              </FormControl>
            </Grid>
          )}
          {onFromDateChange && (
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
                      placement: 'left-start',
                    },
                  }}
                  label="From"
                  ampm
                  value={fromDate}
                  onAccept={onFromDateChange}
                  className={classes.fullWidth}
                />
              </LocalizationProvider>
            </Grid>
          )}
          {onToDateChange && (
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
                      placement: 'left-start',
                    },
                  }}
                  label="To"
                  ampm
                  value={toDate}
                  onAccept={onToDateChange}
                  className={classes.fullWidth}
                />
              </LocalizationProvider>
            </Grid>
          )}
          {onSearchByTitle && (
            <Grid item className={classes.inputItem}>
              <TextField
                id="outlined-basic"
                label="Search by name"
                variant="outlined"
                value={searchTitle}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  onSearchByTitle(event.target.value);
                  if (resetState) {
                    resetState();
                  }
                }}
                size="small"
                disabled={!!error}
                fullWidth
                InputLabelProps={{
                  style: {
                    fontSize: '0.875rem', // Custom font size
                  },
                }}
              />
            </Grid>
          )}
          {onSetTags && (
            <Grid item className={classes.inputItem}>
              <Autocomplete
                multiple
                freeSolo // Allows user to enter custom values
                id="tags-outlined"
                options={[]} // No predefined options
                value={tags} // Controlled value
                onChange={handleChange} // Update the selected custom values
                inputValue={inputValue}
                filterSelectedOptions // Bind input field value
                onInputChange={(_event, newValue) => setInputValue(newValue)} // Update input value when typing
                renderTags={(value: string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      icon={
                        <LocalOfferIcon
                          data-testid={`chip-icon-${index}`}
                          style={{ color: 'green' }}
                        />
                      }
                      label={option}
                      {...getTagProps({ index })}
                      onDelete={getTagProps({ index }).onDelete} // Chip delete functionality
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Search by tags"
                    placeholder="Type and press Enter"
                    onKeyDown={handleKeyDown} // Add custom values on Enter key press
                    size="small"
                    id="outlined-basic"
                    InputLabelProps={{
                      style: {
                        fontSize: '0.875rem', // Custom font size
                      },
                    }}
                  />
                )}
              />
            </Grid>
          )}
        </Grid>
      </FormControl>
    </Drawer>
  );
};
