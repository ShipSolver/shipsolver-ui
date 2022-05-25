import React, { useMemo } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import { DropdownButton } from './dropdownButton';

interface HeaderRowDataType {
  label: string;
  filterLabel?: string;
  filterContent?: React.ReactNode;
}

export type HeaderRowType<T extends string> = {
  [key in T]: HeaderRowDataType;
};

export type RowType<T extends string> = {
  [key in T]: any;
};

interface TicketTableProps<T extends string> {
  headerRow: HeaderRowType<T>;
  rows: RowType<T>[];
}

export const TicketTable = <T extends string>({
  headerRow,
  rows,
}: TicketTableProps<T>) => {

  const headerRowData: HeaderRowDataType[] = Object.values(headerRow);
  const headerFilters = headerRowData.map(
    ({ filterLabel, filterContent }, i) => {
      if (filterLabel && filterContent) {
        return (
          <TableCell key={i} align="left">
            <DropdownButton buttonText={filterLabel} content={filterContent}/>
          </TableCell>
        );
      }
      return <TableCell></TableCell>;
    }
  );
  const headerLabels = headerRowData.map(({ label }) => (
    <TableCell align="left">{label as string}</TableCell>
  ));

  const tableRows = useMemo(
    () =>
      rows.map((row, i) => (
        <TableRow key={i}>
          {Object.values(row).map((val) => (
            <TableCell align="left">{val as any}</TableCell>
          ))}
        </TableRow>
      )),
    [rows]
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>{headerFilters}</TableRow>
          <TableRow>{headerLabels}</TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
};
