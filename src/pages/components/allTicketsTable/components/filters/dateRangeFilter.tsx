import * as React from 'react';
import addWeeks from 'date-fns/addWeeks';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import Box from '@mui/material/Box';
import { FilterProps } from './index';

function getWeeksAfter(date: Date | null, amount: number) {
  return date ? addWeeks(date, amount) : undefined;
}

export const DateRangeFilter = ({handleFilter}: FilterProps) => {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        disablePast
        value={value}
        maxDate={getWeeksAfter(value[0], 4)}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
