import React, { useCallback, useState } from "react";

import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";

import OuterBlueDivBox from "../components/outerBlueDivBox";
import InnerBlueDivBox from "../components/innerBlueDivBox";
import { LargeButton } from "../components/largeButton";
import { Tickets } from "./tickets";
import { TicketPopUpContent } from "./ticketPopUpContent";
import { PickupModalContent } from "./pickupModalContent";
import { CurrentDelivery } from "./currentDelivery";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  changeTicketStatus,
  fetchTicketsForStatus,
} from "../../../services/ticketServices";

import { TicketMilestone } from "../../../services/types";

import useLoadable from "../../../utils/useLoadable";
import { useGetUserInfo } from "../../../state/authentication";

export const Home = () => {
  const navigate = useNavigate();
  const user = useGetUserInfo();
  const [viewAllAssigned, setViewAllAssigned] = useState<boolean>(false);

  const [viewAllCompleted, setViewAllCompleted] = useState<boolean>(false);

  const [viewAllPickup, setViewAllPickup] = useState<boolean>(false);

  const { val: currentDeliveries, triggerRefetch: triggerRefetchInTransit } =
    useLoadable(fetchTicketsForStatus, "in_transit", "AssignmentMilestones");
  const { val: assignedInfo, triggerRefetch: triggerRefetchAssigned } =
    useLoadable(fetchTicketsForStatus, "assigned", "AssignmentMilestones");
  const { val: completedInfo, triggerRefetch: triggerRefetchCompleted } =
    useLoadable(fetchTicketsForStatus, "completed_delivery", "DeliveryMilestones");
  const { val: pickupInfo, triggerRefetch: triggerRefetchPickup } = useLoadable(
    fetchTicketsForStatus,
    "requested_pickup",
    "PickupMilestones"
  );

  const refetchFunctions = [
    triggerRefetchInTransit,
    triggerRefetchAssigned,
    triggerRefetchCompleted,
    triggerRefetchPickup,
  ];

  const currentTicket =
    currentDeliveries?.tickets.length ?? -1 > 0
      ? currentDeliveries?.tickets[0] ?? null
      : null;

  const assigned = assignedInfo?.tickets;
  const completed = completedInfo?.tickets;
  const pickup = pickupInfo?.tickets;

  const assignedCount = assignedInfo?.count;
  const completedCount = completedInfo?.count;
  const pickupCount = pickupInfo?.count;

  const handleCompleteShift = () => {
    if (assigned != null) {
      if (assignedCount ?? 0 > 0) {
        navigate("shift-complete");
      } else {
        alert("No outstanding deliveries left to mark");
      }
    }
  };

  const markTicketAsCompleted = useCallback(
    async (
      ticketId: number,
      assignedToUserId: number,
      oldStatus: TicketMilestone
    ) => {
      const { error } = await changeTicketStatus(
        ticketId,
        assignedToUserId,
        oldStatus,
        "Delivery_Milestone_Status.in_transit"
      );
      if (error != null) {
        alert(error);
      } else {
        refetchFunctions.forEach((fn) => fn());
      }
    },
    []
  );

  if (!currentTicket && !assigned && !completed && !pickup) {
    return (
      <InnerBlueDivBox>
        <Typography
          variant="h1"
          color="red"
          sx={{
            marginBottom: "calc(var(--ss-brand-spacing)*2)",
          }}
        >
          Sorry! We couldn't find any tickets assigned to you
        </Typography>
        <Typography variant="h4" color="red">
          Please ask your organization manager to assign some tickets to you
        </Typography>
      </InnerBlueDivBox>
    );
  }

  return (
    <div>
      <CurrentDelivery currentTicket={currentTicket} />

      <Typography
        variant="h2"
        color="primary"
        align="center"
        sx={{
          margin: "calc(var(--ss-brand-spacing)*2)",
        }}
      >
        Your Deliveries:
      </Typography>
      <OuterBlueDivBox>
        {assigned ? (
          <InnerBlueDivBox style={{ maxHeight: "90vh" }}>
            <Grid container justifyContent="space-between">
              <Typography variant="h2" alignContent="left">
                Assigned
              </Typography>
              <Typography variant="h2" alignContent="right">
                {String(assignedCount ?? 0)}
              </Typography>
            </Grid>
            <Tickets
              viewAllTickets={viewAllAssigned}
              tickets={assigned}
              status="assigned"
              setViewAllTickets={setViewAllAssigned}
              title="Assigned"
              items={assignedCount ?? 0}
              changeStatusButtons={[
                {
                  title: "Mark ticket as in transit",
                  changeStatusFn: markTicketAsCompleted,
                },
              ]}
            ></Tickets>
          </InnerBlueDivBox>
        ) : null}
        {completed ? (
          <InnerBlueDivBox style={{ maxHeight: "90vh" }}>
            <Grid container justifyContent="space-between">
              <Typography variant="h2" color="#000" alignContent="left">
                Completed
              </Typography>
              <Typography variant="h2" color="#000" alignContent="right">
                {String(completedCount ?? 0)}
              </Typography>
            </Grid>
            <Tickets
              viewAllTickets={viewAllCompleted}
              tickets={completed}
              status="completed_delivery"
              setViewAllTickets={setViewAllCompleted}
              title="Completed"
              items={completedCount ?? 0}
            ></Tickets>
          </InnerBlueDivBox>
        ) : null}
        {pickup ? (
          <InnerBlueDivBox style={{ maxHeight: "90vh" }}>
            <Grid container justifyContent="space-between">
              <Typography variant="h2" color="#000" alignContent="left">
                Requested Pickups
              </Typography>
              <Typography variant="h2" color="#000" alignContent="right">
                {String(pickupCount ?? 0)}
              </Typography>
            </Grid>
            <Tickets
              viewAllTickets={viewAllPickup}
              tickets={pickup}
              status="requested_pickup"
              setViewAllTickets={setViewAllPickup}
              title="Requested Pickups"
              items={pickupCount ?? 0}
            ></Tickets>
          </InnerBlueDivBox>
        ) : null}
      </OuterBlueDivBox>
      <LargeButton
        label="Complete Shift"
        action={() => handleCompleteShift()}
      />
    </div>
  );
};
