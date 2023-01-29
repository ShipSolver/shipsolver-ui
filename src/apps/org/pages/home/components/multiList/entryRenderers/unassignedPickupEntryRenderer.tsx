import React from "react";

import Typography from "@mui/material/Typography";
import Paper from "../../../../../../../components/roundedPaper";

import { Ticket } from "../../../../../../../services/types";

import { toggleSelectionFn } from '../index';

export default function EntryRenderer(props :{entry: Ticket, toggleSelection: toggleSelectionFn, selected: boolean}): JSX.Element {
  const {entry, toggleSelection, selected} = props

  const handleEntryClick = () => {
    toggleSelection()
  }

  return (
    <Paper variant="outlined" className={`entry-renderer${selected ? "-selected" : ""}`}
    onClick={handleEntryClick}
    >
      <Typography variant="h6">{entry.consigneeAddress}</Typography>
      <Typography color="gray">Unassigned</Typography>
    </Paper>
  );
}
