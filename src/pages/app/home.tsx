import React, { useMemo, useState } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Paper from "../components/roundedPaper";
import Lists from "../components/multiList";

import { fetchOrgTodayTickets } from "../../services/ticketServices";
import { fetchBroker } from "../../services/brokerServices";

import { Broker, Ticket } from "../../services/types";

import { useNavigate } from "react-router-dom";
import useLoadable from "../../utils/useLoadable";

function entryRenderer(entry: Ticket): JSX.Element {
  const {
    val: broker,
    loading,
    error,
  } = useLoadable(fetchBroker, entry.CURRENT_ASSIGNED_USER_ID);
  return (
    <Paper>
      <Typography>{entry.CONSIGNEE.ADDRESS}</Typography>
      <Typography>
        Assigned to: {broker ? broker.NAME : "loading..."}
      </Typography>
    </Paper>
  );
}

function Home() {
  const navigate = useNavigate();

  const {
    val: tickets,
    loading: ticketsLoading,
    error: ticketsError,
  } = useLoadable(fetchOrgTodayTickets);

  const inventory = useMemo(
    () => tickets && tickets.filter((ticket) => ticket.STATUS === "INVENTORY"),
    [tickets]
  );
  const assigned = useMemo(
    () => tickets && tickets.filter((ticket) => ticket.STATUS === "ASSIGNED"),
    [tickets]
  );
  const inProgress = useMemo(
    () =>
      tickets && tickets.filter((ticket) => ticket.STATUS === "IN-PROGRESS"),
    [tickets]
  );
  const incomplete = useMemo(
    () => tickets && tickets.filter((ticket) => ticket.STATUS === "INCOMPLETE"),
    [tickets]
  );
  const delivered = useMemo(
    () => tickets && tickets.filter((ticket) => ticket.STATUS === "DELIVERED"),
    [tickets]
  );

  return (
    <div className="ss-space-children-vertically">
      <Lists
        loading={ticketsLoading}
        error={ticketsError}
        listSpecifications={[
          {
            title: "Delivered",
            entries: delivered ? delivered : [],
            entryRenderer,
          },
          {
            title: "Incomplete",
            entries: incomplete ? incomplete : [],
            entryRenderer,
          },
          {
            title: "In Progress",
            entries: inProgress ? inProgress : [],
            entryRenderer,
          },
          {
            title: "Assigned",
            entries: assigned ? assigned : [],
            entryRenderer,
          },
          {
            title: "Inventory",
            entries: inventory ? inventory : [],
            entryRenderer,
          },
        ]}
      />
      <Button variant="contained" onClick={() => navigate("/ticket-factory")}>
        Create Tickets
      </Button>
    </div>
  );
}

export default Home;
