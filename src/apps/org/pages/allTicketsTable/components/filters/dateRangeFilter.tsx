import React, { useState, useTransition } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { FormHelperText } from "@mui/material";
import { Spacer } from "../../../../../../components/spacer";
import MenuItem from "@mui/material/MenuItem";
import { Keys } from "../../types";
import MenuBase from "@mui/material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography, Chip } from "@mui/material";
import Brand from "../../../../../../ShipSolverBrand";
import { useRecoilState } from "recoil";
import { filterAtom } from "../state/tableState";
// export const DateFormat = "DD-MMM-YYYY";
export const DateFormat = "YYYY/MM/DD";

export const DateRangeFilter = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [anyDate, setAnyDate] = useState<boolean>(true);
  const [_, startTransition] = useTransition();

  const [filter, setFilter] = useRecoilState(filterAtom);

  const missingInput = !endDate || !startDate;

  const invalidDateRange = !missingInput && endDate < startDate;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
        fullWidth
        sx={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <div>
          <Typography variant="subtitle1">Filter</Typography>

          {filter.date ? (
            <Chip
              label={
                moment(filter.date[0]).format(DateFormat) +
                " - " +
                moment(filter.date[1]).format(DateFormat)
              }
              sx={{ backgroundColor: Brand.palette.secondary.main }}
            />
          ) : null}
        </div>
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Container>
          <CheckboxWrapper>
            <Checkbox
              checked={anyDate}
              onClick={() => {
                startTransition(() => {
                  if (!anyDate) {
                    setFilter((prev) => ({ ...prev, ["date"]: null }));
                  }
                  setAnyDate((prev) => !prev);
                });
              }}
            />
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
            disabled={missingInput || invalidDateRange || anyDate}
            sx={{ fontSize: 12 }}
            onClick={() => {
              startTransition(() => {
                if (startDate && endDate) {
                  setFilter((prev) => ({
                    ...prev,
                    ["date"]: [startDate, endDate],
                  }));
                }
              });
            }}
          >
            Apply filter
          </Button>
        </Container>
      </Menu>
    </div>
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

const Menu = styled(MenuBase)`
  padding: 16px;
`;
