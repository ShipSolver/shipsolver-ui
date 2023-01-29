import React, { useMemo, useState, useCallback } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Checkbox,
  TablePagination,
} from "@mui/material";
import { Loading } from "../../../../../components/loading";
import { RowType, HeaderRowType } from "../types";
import { DropdownButton } from "./dropdownButton";
import { useRowSelection } from "./hooks/useRowSelection";
import { usePage } from "./hooks/usePage";

interface TicketTableProps {
  headers: HeaderRowType;
  rows: RowType[];
}

export const TicketTable = ({ headers, rows }: TicketTableProps) => {
  const { page, rowsPerPage, handleChangeRowsPerPage, handleChangePage } =
    usePage();
  const { selected, allSelected, handleSingleClick, handleSelectAllClick } =
    useRowSelection(rows, page, rowsPerPage);

  const headerFilters = useMemo(
    () =>
      Object.values(headers).map(({ filterContent }, i) => {
        if (filterContent) {
          return (
            <TableCell key={i} align="left">
              {filterContent}
            </TableCell>
          );
        }
        return <TableCell></TableCell>;
      }),
    [headers]
  );

  const headerLabels = useMemo(
    () =>
      Object.values(headers).map(({ label }, i) => (
        <TableCell key={i} align="left" sx={{ fontWeight: "bold" }}>
          {label as string}
        </TableCell>
      )),
    [headers]
  );

  const tableRows = useMemo(
    () =>
      rows
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, i) => (
          <TableRow key={i} hover selected={selected[row.ticketId]}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selected[row.ticketId] ?? false}
                onClick={() => handleSingleClick(row.ticketId)}
              />
            </TableCell>
            {Object.entries(row).map(([key, val], i) => {
              if (key === "ticketId") {
                return null;
              }
              return (
                <TableCell key={i} align="left">
                  {val as string}
                </TableCell>
              );
            })}
          </TableRow>
        )),
    [rows, selected, page, rowsPerPage]
  );

  return (
    <>
      <TableContainer component={Paper} sx={{ height: "550px", top: "32px" }}>
        <Table stickyHeader>
          <colgroup>
            <col width="5%" />
            <col width="10%" />
            {/* <col width="10%" />
          <col width="10%" /> */}
            <col width="10%" />
            <col width="15%" />
            <col width="10%" />
            <col width="15%" />
            <col width="10%" />
            <col width="5%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {headerFilters}
            </TableRow>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={allSelected}
                  onClick={() => handleSelectAllClick(rows)}
                />
              </TableCell>
              {headerLabels}
            </TableRow>
          </TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </TableContainer>
      {rows && (
        <Paper>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{
              disabled: allSelected || (page + 1) * rowsPerPage >= rows.length,
            }}
            backIconButtonProps={{
              disabled: allSelected || !page,
            }}
          />
        </Paper>
      )}
    </>
  );
};
