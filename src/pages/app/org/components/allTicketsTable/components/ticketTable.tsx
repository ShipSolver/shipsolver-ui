import React, { useEffect, useMemo, useState, useRef } from "react";
import { useSetRecoilState } from "recoil";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
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
  selectedTicketIdsAtom,
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
  rows?: RowType<T>[];
}

export const TicketTable = <T extends string>({
  headerRow,
  rows,
}: TicketTableProps<T>) => {
  const setSingleRowSelected = useSetRecoilState(singleRowSelectedAtom);
  const setSelectedTicketIds = useSetRecoilState(selectedTicketIdsAtom);

  const setMultiRowSelected = useSetRecoilState(multiRowSelectedAtom);

  const [selected, setSelected] = useState<{ [key: string]: boolean }>(
    rows
      ? Object.values(rows).reduce(
          (selected, row) => ({ ...selected, [row.ticketId]: false }),
          {}
        )
      : {}
  );

  const filterButton = useRef<HTMLElement>(null);
  const [topStyle, setTopStyle] = useState<number | undefined>();

  useEffect(() => {
    setTopStyle(filterButton.current?.clientHeight);
  }, [filterButton.current]);

  const [allSelected, setAllSelected] = useState<boolean>(false);

  const [numSelected, setNumSelected] = useState<number>(0);

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

  const handleSelectAllClick = (rows?: RowType<T>[]) => {
    if (rows) {
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
    }
  };

  const headerRowData: HeaderRowDataType[] = Object.values(headerRow ?? {});

  const headerFilters = headerRowData.map(
    ({ filterLabel, filterContent }, i) => {
      if (filterLabel && filterContent) {
        return (
          <TableCell key={i} align="left" ref={filterButton}>
            <DropdownButton buttonText={filterLabel} content={filterContent} />
          </TableCell>
        );
      }
      return <TableCell></TableCell>;
    }
  );

  const headerLabels = headerRowData.map(({ label }, i) => (
    <TableCell
      key={i}
      align="left"
      sx={{ fontWeight: "bold" }}
      style={{ top: topStyle }}
    >
      {label as string}
    </TableCell>
  ));

  const tableRows = useMemo(
    () =>
      rows?.map((row, i) => (
        <TableRow key={i} hover selected={selected[row.ticketId]}>
          <TableCell padding="checkbox">
            <Checkbox
              checked={selected[row.ticketId]}
              onClick={() => handleSingleClick(row.ticketId)}
            />
          </TableCell>
          {Object.entries(row).map(([key, val], i) => {
            if (key === "ticketId") return null;
            if (key === "pickup")
              return (
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


    } else if (numSelected > 1) {
      setSingleRowSelected(false);
      setMultiRowSelected(true);
    }

          // Figure out which tickets were selected
          const rowIds = Object.entries(selected)
          .filter(([key, val]) => val === true)
          .map(([key, val]) => key);
        setSelectedTicketIds(rowIds);


    //Checks off select all if all rows are selected individually
    if (rows && numSelected === rows.length) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [selected]);

  // #TODO sticky header
  return (
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
            <TableCell padding="checkbox" style={{ top: topStyle }}>
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
