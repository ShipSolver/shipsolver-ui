import React from "react";

import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Lists from "./components/multiList";

import { fetchTicketsForStatus } from "../../../services/ticketServices";
import {
  unassignedPickupEntryRenderer,
  requestedPickupEntryRenderer,
  inventoryEntryRenderer,
  assignedEntryRenderer,
  inProgressEntryRenderer,
} from "./components/multiList/entryRenderers";
import {
  unassignedPickupMenu,
  requestedPickupMenu,
  inventoryMenu,
  assignedMenu,
  inProgressMenu,
} from "./components/multiList/menus";

import useLoadable from "../../../utils/useLoadable";

function Home() {
  const navigate = useNavigate();

  const {
    val: unassignedPickupTickets,
    loading: unassignedPickupTicketsLoading,
    error: unassignedPickupTicketsError,
  } = useLoadable(fetchTicketsForStatus, "unassigned_pickup");

  const {
    val: pickupRequestTickets,
    loading: pickupRequestTicketsLoading,
    error: pickupRequestTicketsError,
  } = useLoadable(fetchTicketsForStatus, "requested_pickup");

  const {
    val: inventoryTickets,
    loading: inventoryTicketsLoading,
    error: inventoryTicketsError,
  } = useLoadable(fetchTicketsForStatus, "checked_into_inventory");

  const {
    val: assignedTickets,
    loading: assignedTicketsLoading,
    error: assignedTicketsError,
  } = useLoadable(fetchTicketsForStatus, "assigned");

  const {
    val: inProgressTickets,
    loading: inProgressTicketsLoading,
    error: inProgressTicketsError,
  } = useLoadable(fetchTicketsForStatus, "in_transit");

  const ticketsLoading =
    unassignedPickupTicketsLoading ||
    pickupRequestTicketsLoading ||
    inventoryTicketsLoading ||
    assignedTicketsLoading ||
    inProgressTicketsLoading;

  const ticketsError =
    unassignedPickupTicketsError ||
    pickupRequestTicketsError ||
    inventoryTicketsError ||
    assignedTicketsError ||
    inProgressTicketsError;

  return (
    <div className="ss-space-children-vertically">
      <Lists
        loading={ticketsLoading}
        error={ticketsError}
        listSpecifications={[
          {
            title: "Unassigned Pickups",
            entries: unassignedPickupTickets?.tickets ?? [],
            entryRenderer: unassignedPickupEntryRenderer,
            menuRenderer: unassignedPickupMenu,
          },
          {
            title: "Requested Pickups",
            entries: pickupRequestTickets?.tickets ?? [],
            entryRenderer: requestedPickupEntryRenderer,
            menuRenderer: requestedPickupMenu,
          },
          {
            title: "Inventory",
            entries: inventoryTickets?.tickets ?? [],
            entryRenderer: inventoryEntryRenderer,
            menuRenderer: inventoryMenu,
          },
          {
            title: "Assigned",
            entries: assignedTickets?.tickets ?? [],
            entryRenderer: assignedEntryRenderer,
            menuRenderer: assignedMenu,
          },
          {
            title: "In Progress",
            entries: inProgressTickets?.tickets ?? [],
            entryRenderer: inProgressEntryRenderer,
            menuRenderer: inProgressMenu,
          },
        ]}
      />
      <Grid
        container
        xs={12}
        spacing={2}
        sx={{
          marginLeft: 0,
        }}
      >
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/pod-review")}
          >
            Review PODs
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth variant="contained" onClick={() => {}}>
            Inventory Re-entry
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/all-tickets")}
          >
            View All Tickets
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/ticket-factory")}
          >
            Create Tickets
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
