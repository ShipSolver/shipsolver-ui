import React from "react";

import Typography from "@mui/material/Typography";
import Paper from "../../../components/roundedPaper";

import { Ticket } from "../../../../services/types";
import { fetchBroker } from "../../../../services/brokerServices";
import useLoadable from "../../../../utils/useLoadable";

export default function EntryRenderer(entry: Ticket): JSX.Element {
  const {
    val: broker,
    loading,
    error,
  } = useLoadable(fetchBroker, entry.CURRENT_ASSIGNED_USER_ID);
  return (
    <Paper className="ss-ticket-renderer">
      <Typography>{entry.CONSIGNEE.ADDRESS}</Typography>
      <Typography>
        Assigned to:{" "}
        {loading
          ? "loading..."
          : broker
          ? broker.NAME
          : error || "Error fetching broker"}
      </Typography>
    </Paper>
  );
}
