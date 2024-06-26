import React, { useState, useEffect } from "react";
import useLoadable from "../../../../../../utils/useLoadable";
import { fetchAllTickets } from "../../../../../../services/ticketServices";
import { KEYS_BASE, Keys, HeaderRowType } from "../../types";
import { buildHeaderCells } from "../allTicketTableHeaders";
import { useSetRecoilState } from "recoil";

export function useTicketData() {
  const {
    val: rows,
    loading,
    error,
    triggerRefetch,
  } = useLoadable(fetchAllTickets);

  const [headers, setHeaders] = useState<null | HeaderRowType>(null);

  useEffect(() => {
    if (rows) {
      const sets: { [key in Keys]: Set<string> } = KEYS_BASE.reduce(
        (prev, val) => ({ ...prev, [val]: new Set<string>() }),
        {} as { [key in Keys]: Set<string> } // TS issue
      );

      rows.forEach((row) => {
        Object.entries(row).forEach(([key, val]) =>
          sets[key as Keys]?.add(val as string)
        );
      });

      setHeaders(buildHeaderCells(sets));
    }
  }, [rows]);

  return {
    rows,
    loading,
    error,
    triggerRefetch,
    headers,
  };
}
