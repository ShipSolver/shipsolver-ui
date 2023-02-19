import React, { useMemo } from "react";

import Button from "@mui/material/Button";
import Lists from "./components/multiList";

import { fetchTicketsForStatus } from "../../../../services/ticketServices";
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
import useLoadable from "../../../../utils/useLoadable";
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../../../state/authentication";

function Home() {
  const navigate = useNavigate();
  const user = useGetUserInfo();

  const {
    val: unassignedPickupTickets,
    loading: unassignedPickupTicketsLoading,
    error: unassignedPickupTicketsError,
  } = useLoadable(
    fetchTicketsForStatus,
    "unassigned_pickup",
    "Creation_Milestone_Status"
  );

  const {
    val: pickupRequestTickets,
    loading: pickupRequestTicketsLoading,
    error: pickupRequestTicketsError,
  } = useLoadable(
    fetchTicketsForStatus,
    "requested_pickup",
    "Pickup_Milestone_Status"
  );

  const {
    val: inventoryTickets,
    loading: inventoryTicketsLoading,
    error: inventoryTicketsError,
  } = useLoadable(
    fetchTicketsForStatus,
    "checked_into_inventory",
    "Inventory_Milestone_Status"
  );

  const {
    val: assignedTickets,
    loading: assignedTicketsLoading,
    error: assignedTicketsError,
    triggerRefetch
  } = useLoadable(
    fetchTicketsForStatus,
    "assigned",
    "Assignment_Milestone_Status"
  );

  const {
    val: inProgressTickets,
    loading: inProgressTicketsLoading,
    error: inProgressTicketsError,
  } = useLoadable(
    fetchTicketsForStatus,
    "in_transit",
    "Assignment_Milestone_Status"
  );

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
            triggerRefetch: triggerRefetch
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
`;
