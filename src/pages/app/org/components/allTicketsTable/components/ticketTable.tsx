import React, { useEffect, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Container from "@mui/material/Container";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import { DropdownButton } from "./dropdownButton";
import Checkbox from "@mui/material/Checkbox";
import {
  singleRowSelectedAtom,
  multiRowSelectedAtom,
  selectedTicketIdAtom,
} from "./state/tableState";

interface HeaderRowDataType {
  label: string;
  filterLabel?: string;
  filterContent?: React.ReactElement;
}

export type HeaderRowType<T extends string> = {
  [key in T]: HeaderRowDataType;
};

export type RowType<T extends string> = {
  [key in T | "ticketId"]: string;
};
interface TicketTableProps<T extends string> {
  headerRow?: HeaderRowType<T>;
  rows: RowType<T>[];
}

export const TicketTable = <T extends string>({
  headerRow,
  rows,
}: TicketTableProps<T>) => {
  const setSingleRowSelected = useSetRecoilState(singleRowSelectedAtom);
  const setSelectedTicketId = useSetRecoilState(selectedTicketIdAtom);

  const setMultiRowSelected = useSetRecoilState(multiRowSelectedAtom);

  const [selected, setSelected] = React.useState<{ [key: string]: boolean }>(
    Object.values(rows).reduce(
      (selected, row) => ({ ...selected, [row.ticketId]: false }),
      {}
    )
  );

  const [allSelected, setAllSelected] = React.useState<boolean>(false);

  const [numSelected, setNumSelected] = React.useState<number>(0);

  const handleSingleClick = (ticketID: string) => {
    if (selected[ticketID] === false) {
      setNumSelected(numSelected + 1);
    } else if (selected[ticketID] === true) {
      setNumSelected(numSelected - 1);
    }
    setSelected((prev) => ({
      ...prev,
      [ticketID]: !prev[ticketID],
    }));
  };

  const handleSelectAllClick = (rows: RowType<T>[]) => {
    if (allSelected === false) {
      setNumSelected(rows.length);
    } else if (allSelected === true) {
      setNumSelected(0);
    }
    setAllSelected(!allSelected);
    setSelected(
      Object.values(rows).reduce(
        (selected, row) => ({ ...selected, [row.ticketId]: !allSelected }),
        {}
      )
    );
  };

  const headerRowData: HeaderRowDataType[] = Object.values(headerRow ?? {});

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

  const headerLabels = headerRowData.map(({ label }, i) => (
    <TableCell key={i} align="left" sx={{ fontWeight: "bold" }}>
      {label as string}
    </TableCell>
  ));

  const tableRows = useMemo(
    () =>
      rows.map((row, i) => (
        <TableRow key={i} hover selected={selected[row.ticketId]}>
          <TableCell padding="checkbox">
            <Checkbox
              checked={selected[row.ticketId]}
              onClick={() => handleSingleClick(row.ticketId)}
            />
          </TableCell>
          {Object.entries(row).map(([key, val], i) => {
            if (key === "ticketId") return null;
            if (key === "pickup") return (
              <TableCell key={i} align="left">
                {val === "1" ? "Yes" : "No"}
              </TableCell>
            );
            return (
              <TableCell key={i} align="left">
                {val as any}
              </TableCell>
            );
          })}
        </TableRow>
      )),
    [rows, selected]
  );

  useEffect(() => {
    //Enable Buttons
    if (numSelected === 0) {
      setSingleRowSelected(false);
      setMultiRowSelected(false);
    } else if (numSelected === 1) {
      setSingleRowSelected(true);
      setMultiRowSelected(true);

      // Figure out which one was selected
      const rowId = Object.entries(selected)
        .filter(([key, val]) => val == true)
        .map(([key, val]) => key);
      setSelectedTicketId(rowId[0]);
    } else if (numSelected > 1) {
      setSingleRowSelected(false);
      setMultiRowSelected(true);
    }

    //Checks off select all if all rows are selected individually
    if (numSelected === rows.length) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [selected]);

  // #TODO sticky header
  return (
    <TableContainer component={Paper}>
      <Table>
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
  );
};
