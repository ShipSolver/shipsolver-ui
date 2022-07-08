import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { FilterProps } from "./index";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import Typography from "@mui/material/Typography";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { FormHelperText } from "@mui/material";
import { Spacer } from "../../../../../../components/spacer";

// export const DateFormat = "DD-MMM-YYYY";
export const DateFormat = "YYYY/MM/DD";

export const DateRangeFilter = ({
  handleFilter,
  handleClose,
  savedFilterState,
}: FilterProps) => {
  const [startDate, setStartDate] = useState<Date>(
    savedFilterState
      ? moment(savedFilterState[0], DateFormat).toDate()
      : new Date()
  );
  const [endDate, setEndDate] = useState<Date>(
    savedFilterState
      ? moment(savedFilterState[2], DateFormat).toDate()
      : new Date()
  );

  const [anyDate, setAnyDate] = useState<boolean>(
    savedFilterState ? false : true
  );

  const invalidDateRange = endDate < startDate;

  return (
    <Container>
      <CheckboxWrapper onClick={() => setAnyDate((prev) => !prev)}>
        <Checkbox checked={anyDate} />
        <Typography sx={{ lineHeight: "48px" }}>All tickets</Typography>
      </CheckboxWrapper>

      <DateWrapper>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disabled={anyDate}
            value={startDate}
            onChange={(newDate) => setStartDate(newDate ?? startDate)}
            renderInput={(props) => <TextField {...props} />}
          />
          <Spacer width="16px" />
          <p>to</p>
          <Spacer width="16px" />
          <DatePicker
            disabled={anyDate}
            value={endDate}
            onChange={(newDate) => setEndDate(newDate ?? endDate)}
            renderInput={(props) => <TextField {...props} />}
          />
        </LocalizationProvider>
      </DateWrapper>
      <Spacer height="16px" />
      {invalidDateRange && (
        <ErrorMessage error>
          Invalid range - start date should be before end date
        </ErrorMessage>
      )}

      <Button
        variant="contained"
        color="primary"
        size="small"
        disabled={invalidDateRange}
        sx={{ fontSize: 12 }}
        onClick={() => {
          handleFilter("date", anyDate ? [] : [startDate, endDate]);
          handleClose?.(anyDate ? [] : [startDate, endDate]);
        }}
      >
        Apply filter
      </Button>
    </Container>
  );
};

const DateWrapper = styled("div")`
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled(FormHelperText)`
  text-align: center;
`;

const Container = styled("div")`
  min-width: 500px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CheckboxWrapper = styled("div")`
  display: flex;
`;
