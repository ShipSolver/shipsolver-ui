import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Spacer } from "../../../../components/spacer";
import { styled } from "@mui/material/styles";
import ShipSolverBrand from "../../../../../ShipSolverBrand";
import { TicketSearch } from "../allTicketsTable/components/ticketSearch";
import { DRIVER_LABELS } from "./labels";
export type DriverLabelType = {
  label: string;
};

export type DriverRowType = {
  name: string;
  assigned: string | number;
  completed: string | number;
  totalCompleted: string | number;
  daysActive: string | number;
  locationOfLastDelivery: string;
  timeOfLastDelivery: string;
};

interface DriverSummaryProps {
  rows: DriverRowType[];
}

const DriverSummaryBase = ({ rows }: DriverSummaryProps) => {
  const driverLabels = DRIVER_LABELS.map(({ label }, i) => (
    <TableCell key={i} align="left" sx={{ fontWeight: "bold" }}>
      {label as string}
    </TableCell>
  ));

  const driverRows = rows.map((row, i) => (
    <TableRow key={i} hover>
      {Object.entries(row).map(([key, val], i) =>
        key === "locationOfLastDelivery" ? (
          <TableCell>
            <a href={val as string} target="_blank">
              Link to Location
            </a>
          </TableCell>
        ) : (
          <TableCell key={i} align="left">
            {val as any}
          </TableCell>
        )
      )}
    </TableRow>
  ));

  return (
    <Wrapper>
      <TicketSearch handleSearchRequest={() => null} />
      <Spacer height="24px" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>{driverLabels}</TableRow>
          </TableHead>
          <TableBody>{driverRows}</TableBody>
        </Table>
      </TableContainer>
      <Spacer height="24px" />
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  background-color: ${ShipSolverBrand.palette.secondary.main};
  padding: 8px;
`;

export const DriverSummary = React.memo(DriverSummaryBase);
