import React from "react";

import Typography from "@mui/material/Typography";
import Paper from "../../../../../../../components/roundedPaper";

import useLoadable from "../../../../../../../utils/useLoadable";
import { fetchDriver } from "../../../../../../../services/driverServices";

import { Ticket } from "../../../../../../../services/types";
import { toggleSelectionFn } from '../index';

export default function EntryRenderer(props :{entry: Ticket, toggleSelection: toggleSelectionFn, selected: boolean}): JSX.Element {
  const {entry, toggleSelection, selected} = props

  const {val: driver, loading, error} = useLoadable(fetchDriver, String(entry.userId))

  const handleEntryClick = () => {
    toggleSelection()
  }

  return (
    <Paper variant="outlined" className={`entry-renderer${selected ? "-selected" : ""}`}
    onClick={handleEntryClick}
    >
      <Typography variant="h6">{entry.consigneeAddress}</Typography>
      <Typography color="gray">{driver ? 
        `Request sent to ${driver.NAME}` : loading ? "loading..." :
        error ?? "Error fetching driver name"
      }</Typography>
    </Paper>
  );
}
