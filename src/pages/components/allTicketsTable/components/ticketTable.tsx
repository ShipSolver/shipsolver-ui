import React, { useMemo } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import { DropdownButton } from "./dropdownButton";
import Checkbox from "@mui/material/Checkbox";

interface HeaderRowDataType {
  label: string;
  filterLabel?: string;
  filterContent?: React.ReactNode;
}

export type HeaderRowType<T extends string> = {
  [key in T]: HeaderRowDataType;
};

export type RowType<T extends string> = {
  [key in T | "ticketID"]: string;
};

interface TicketTableProps<T extends string> {
  headerRow: HeaderRowType<T>;
  rows: RowType<T>[];
}

export const TicketTable = <T extends string>({
  headerRow,
  rows,
}: TicketTableProps<T>) => {
  const [selected, setSelected] = React.useState<{ [key: string]: boolean }>(
    Object.values(rows).reduce(
      (selected, row) => ({ ...selected, [row.ticketID]: false }),
      {}
    )
  );

  const [allSelected, setAllSelected] = React.useState<boolean>(false);

  console.log(selected);
  console.log(rows);

  const handleSingleClick = (ticketID: string) => {
    console.log(ticketID, typeof ticketID);
    setSelected((prev) => ({
      ...prev,
      [ticketID]: !prev[ticketID],
    }));
  };

  const handleSelectAllClick = (rows: RowType<T>[]) => {
    setAllSelected(!allSelected);
    setSelected(
      Object.values(rows).reduce(
        (selected, row) => ({ ...selected, [row.ticketID]: !allSelected }),
        {}
      )
    );
  };

  const headerRowData: HeaderRowDataType[] = Object.values(headerRow);
  const headerFilters = headerRowData.map(
    ({ filterLabel, filterContent }, i) => {
      if (filterLabel && filterContent) {
        return (
          <TableCell key={i} align="left">
            <DropdownButton buttonText={filterLabel} content={filterContent} />
          </TableCell>
        );
      }
      return <TableCell></TableCell>;
    }
  );
  const headerLabels = headerRowData.map(({ label }) => (
    <TableCell align="left" sx={{ fontWeight: "bold" }}>
      {label as string}{" "}
    </TableCell>
  ));

  const tableRows = useMemo(
    () =>
      rows.map((row, i) => {
        return (
          <TableRow key={i} hover selected={selected[row.ticketID]}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selected[row.ticketID]}
                onClick={(event) => handleSingleClick(row.ticketID)}
              />
            </TableCell>
            {Object.entries(row).map(([key, val]) => {
              if (key === "ticketID") return null;
              return <TableCell align="left">{val as any}</TableCell>;
            })}
          </TableRow>
        );
      }),
    [rows, selected]
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {headerFilters}
          </TableRow>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={allSelected}
                onClick={(event) => handleSelectAllClick(rows)}
              />
            </TableCell>
            {headerLabels}
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
};
