import React from "react";

import Typography from "@mui/material/Typography";
import Paper from "../../../components/roundedPaper";

import { Ticket } from "../../../../services/types";
import { fetchBroker } from "../../../../services/brokerServices";
import useLoadable from "../../../../utils/useLoadable";

import { toggleSelectionFn, IndexedEntry } from './index';

import "./homeEntryRender.css"

function pickEntrySubtitle (status: Ticket["STATUS"]) {
  switch(status){
    case "DELIVERED":
      return 'Completed by: '
      break;

    case "INCOMPLETE":
      return 'Reported by: '
      break;

    case "IN-PROGRESS":
      return 'Assigned to: '
      break;

    case "ASSIGNED":
      return 'Reported by: '
      break;

    case "INVENTORY":
      return 'Unassigned'
      break;
  }
}

export default function EntryRenderer({entry: IndexedEntry, toggleSelection: toggleSelectionFn, selected: boolean}): JSX.Element {
  const {
    val: broker,
    loading,
    error,
  } = useLoadable(fetchBroker, entry.CURRENT_ASSIGNED_USER_ID);

  const handleEntryClick = () => {
    toggleSelection(entry.ID, !selected)
  }

  return (
    <Paper variant="outlined" className={`${selected ? "home-entry-renderer-paper-with-border" : "ss-ticket-renderer"}`}
    onClick={handleEntryClick}
    >
      <Typography variant="h6">{entry.CONSIGNEE.ADDRESS}</Typography>
      <Typography color="gray">
        {pickEntrySubtitle(entry.STATUS)}
        {entry.STATUS === "INVENTORY"
          ? ""
          : loading
          ? "loading..."
          : broker
          ? broker.NAME
          : error || "Error fetching broker" }
      </Typography>
    </Paper>
  );
}
