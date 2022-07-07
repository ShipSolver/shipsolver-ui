import React, { useMemo } from "react";

import Button from "@mui/material/Button";
import Lists from "./components/multiList";

import { fetchOrgTodayTickets } from "../../../services/ticketServices";
import EntryRenderer from "./components/multiList/homeEntryRenderer";
import { DeliveredMenu, IncompleteMenu, InProgressMenu, AssignedMenu, InventoryMenu } from './components/multiList/menu'
import useLoadable from "../../../utils/useLoadable";

import { useNavigate } from "react-router-dom";

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
            entryRenderer: EntryRenderer,
            menuRenderer: DeliveredMenu,
          },
          {
            title: "Incomplete",
            entries: incomplete ? incomplete : [],
            entryRenderer: EntryRenderer,
            menuRenderer: IncompleteMenu,
          },
          {
            title: "In Progress",
            entries: inProgress ? inProgress : [],
            entryRenderer: EntryRenderer,
            menuRenderer: InProgressMenu,
          },
          {
            title: "Assigned",
            entries: assigned ? assigned : [],
            entryRenderer: EntryRenderer,
            menuRenderer: AssignedMenu,
          },
          {
            title: "Inventory",
            entries: inventory ? inventory : [],
            entryRenderer: EntryRenderer,
            menuRenderer: InventoryMenu,
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