import React, { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
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
  ticketDetailsDisabledAtom,
  podDisabledAtom,
  enterIntoInventoryDisabledAtom,
  assignToBrokerDisabledAtom,
  deleteDisabledAtom,
  exportDisabledAtom,
} from "./state/tableState";

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
  const [ticketDetailsDisabled, setTicketDetailsDisabled] = useRecoilState(
    ticketDetailsDisabledAtom
  );
  const [podDisabled, setPodDisabled] = useRecoilState(podDisabledAtom);

  const [enterIntoInventoryDisabled, setEnterIntoInvetoryDisabled] =
    useRecoilState(enterIntoInventoryDisabledAtom);

  const [assignToBrokerDisabled, setAssignToBrokerDisabled] = useRecoilState(
    assignToBrokerDisabledAtom
  );

  const [deleteDisabled, setDeleteDisabled] =
    useRecoilState(deleteDisabledAtom);

  const [exportDisabled, setExportDisabled] =
    useRecoilState(exportDisabledAtom);

  const [selected, setSelected] = React.useState<{ [key: string]: boolean }>(
    Object.values(rows).reduce(
      (selected, row) => ({ ...selected, [row.ticketID]: false }),
      {}
    )
  );

  const [allSelected, setAllSelected] = React.useState<boolean>(false);

  const handleSingleClick = (ticketID: string) => {
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
      {label as string}
    </TableCell>
  ));

  const tableRows = useMemo(
    () =>
      rows.map((row, i) => (
        <TableRow key={i} hover selected={selected[row.ticketID]}>
          <TableCell padding="checkbox">
            <Checkbox
              checked={selected[row.ticketID]}
              onClick={() => handleSingleClick(row.ticketID)}
            />
          </TableCell>
          {Object.entries(row).map(([key, val]) => {
            if (key === "ticketID") return null;
            return <TableCell align="left">{val as any}</TableCell>;
          })}
        </TableRow>
      )),
    [rows, selected]
  );

  useEffect(() => {
    //Compute selected rows
    var numSelected: number = 0;
    for (const row of rows) {
      if (selected[row.ticketID] === true) {
        numSelected += 1;
      }
    }

    //Enable Buttons
    if (numSelected === 0) {
      setTicketDetailsDisabled(true);
      setPodDisabled(true);
      setEnterIntoInvetoryDisabled(true);
      setAssignToBrokerDisabled(true);
      setDeleteDisabled(true);
      setExportDisabled(true);
    } else if (numSelected === 1) {
      setTicketDetailsDisabled(false);
      setPodDisabled(false);
      setEnterIntoInvetoryDisabled(false);
      setAssignToBrokerDisabled(false);
      setDeleteDisabled(false);
      setExportDisabled(false);
    } else if (numSelected > 1) {
      setTicketDetailsDisabled(true);
      setPodDisabled(true);
      setEnterIntoInvetoryDisabled(false);
      setAssignToBrokerDisabled(false);
      setDeleteDisabled(false);
      setExportDisabled(false);
    }

    //Checks off select all if all rows are selected individually
    if (numSelected === rows.length) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [selected]);

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
