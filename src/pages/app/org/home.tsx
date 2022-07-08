import React, { useMemo } from "react";

import Button from "@mui/material/Button";
import Lists from "./components/multiList";

import { fetchTicketsForStatus } from "../../../services/ticketServices";
import {
  unassignedPickupEntryRenderer,
  requestedPickupEntryRenderer,
  inventoryEntryRenderer,
  assignedEntryRenderer,
  inProgressEntryRenderer
} from "./components/multiList/entryRenderers";
import { 
  unassignedPickupMenu,
  requestedPickupMenu,
  inventoryMenu,
  assignedMenu,
  inProgressMenu
 } from './components/multiList/menus'
import useLoadable from "../../../utils/useLoadable";
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const {
    val: unassignedPickupTickets,
    loading: unassignedPickupTicketsLoading,
    error: unassignedPickupTicketsError,
  } = useLoadable(fetchTicketsForStatus, "UNASSIGNED_PICKUP");

  const {
    val: pickupRequestTickets,
    loading: pickupRequestTicketsLoading,
    error: pickupRequestTicketsError,
  } = useLoadable(fetchTicketsForStatus, "REQUESTED_PICKUP");

  const {
    val: inventoryTickets,
    loading: inventoryTicketsLoading,
    error: inventoryTicketsError,
  } = useLoadable(fetchTicketsForStatus, "CHECKED_INTO_INVENTORY");

  const {
    val: assignedTickets,
    loading: assignedTicketsLoading,
    error: assignedTicketsError,
  } = useLoadable(fetchTicketsForStatus, "ASSIGNED");

  const {
    val: inProgressTickets,
    loading: inProgressTicketsLoading,
    error: inProgressTicketsError,
  } = useLoadable(fetchTicketsForStatus, "IN_TRANSIT");

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
            entries: unassignedPickupTickets ?? [],
            entryRenderer: unassignedPickupEntryRenderer,
            menuRenderer: unassignedPickupMenu,
          },
          {
            title: "Requested Pickups",
            entries: pickupRequestTickets ?? [],
            entryRenderer: requestedPickupEntryRenderer,
            menuRenderer: requestedPickupMenu,
          },
          {
            title: "Inventory",
            entries: inventoryTickets ?? [],
            entryRenderer: inventoryEntryRenderer,
            menuRenderer: inventoryMenu,
          },
          {
            title: "Unassigned Pickups",
            entries: assignedTickets ?? [],
            entryRenderer: assignedEntryRenderer,
            menuRenderer: assignedMenu,
          },
          {
            title: "Unassigned Pickups",
            entries: inProgressTickets ?? [],
            entryRenderer: inProgressEntryRenderer,
            menuRenderer: inProgressMenu,
          },
        ]}
      />
      <FlexDiv>
      <Button variant="contained" onClick={() => navigate("/pod-review")}>
          Review PODs
        </Button>
        <Button variant="contained" onClick={() => {}}>
          Inventory Re-entry
        </Button>
        <Button variant="contained" onClick={() => navigate("/all-tickets")}>
          View All Tickets
        </Button>
        <Button variant="contained" onClick={() => navigate("/ticket-factory")}>
          Create Tickets
        </Button>

      </FlexDiv>
    </div>
  );
}

export default Home;

const FlexDiv = styled("div")`
  display: flex;
  justify-content: space-between;
`