import React, { useState, useEffect, useTransition } from "react";
import { RowType } from "../../types";
import { useSetRecoilState, useRecoilState } from "recoil";

import {
  singleRowSelectedAtom,
  multiRowSelectedAtom,
  selectedTicketsAtom,
} from "../state/tableState";

export function useRowSelection(
  rows: RowType[],
  page: number,
  rowsPerPage: number
) {
  const [selected, setSelected] = useRecoilState(selectedTicketsAtom);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [numSelected, setNumSelected] = useState<number>(0);
  const setSingleRowSelected = useSetRecoilState(singleRowSelectedAtom);

  const [_, startTransition] = useTransition();

  const setMultiRowSelected = useSetRecoilState(multiRowSelectedAtom);

  useEffect(() => {
    // Initialize atom data
    setSelected(
      rows.reduce((prev, row) => ({ ...prev, [row.ticketId]: false }), {})
    );
  }, [rows]);

  useEffect(() => {
    switch (numSelected) {
      case 0: {
        setSingleRowSelected(false);
        setMultiRowSelected(false);
        setAllSelected(false);
        return;
      }

      case 1: {
        setSingleRowSelected(true);
        setMultiRowSelected(false);
        return;
      }

      default: {
        setSingleRowSelected(false);
        setMultiRowSelected(true);
      }
    }
  }, [numSelected]);

  useEffect(() => {
    if (numSelected === rowsPerPage) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [numSelected]);

  const handleSingleClick = (ticketID: string) => {
    setNumSelected((prev) => prev + (selected[ticketID] ? -1 : 1));
    setSelected((prev) => ({
      ...prev,
      [ticketID]: !prev[ticketID],
    }));
  };

  const handleSelectAllClick = (rows: RowType[]) => {
    startTransition(() => {
      setNumSelected(allSelected ? 0 : rowsPerPage);
      setSelected(
        Object.values(rows)
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .reduce(
            (selected, row) => ({ ...selected, [row.ticketId]: !allSelected }),
            {}
          )
      );
      setAllSelected((prev) => !prev);
    });
  };

  return {
    selected,
    allSelected,
    handleSingleClick,
    handleSelectAllClick,
  };
}
