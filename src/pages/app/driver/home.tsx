import React, { useCallback, useState } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import OuterBlueDivBox from "./components/outerBlueDivBox";
import InnerBlueDivBox from "./components/innerBlueDivBox";
import InnerWhiteDivBox from "./components/innerWhiteDivBox";
import ModalContainer from "./components/modalContainer";
import { LargeButton } from "./components/largeButton";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import {
  changeTicketStatus,
  fetchTicketsForStatus,
} from "../../../services/ticketServices";

import { Ticket, TicketMilestone, TicketStatus } from "../../../services/types";

import useLoadable from "../../../utils/useLoadable";

import { styled } from "@mui/material/styles";
import { CompletionPopUp } from "./components/completionPopUp";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { DeliveryCompletionTicketAtom } from "../../../state/deliveryCompletion";

type ChangeStatusModalButtonProps = {
  title: string;
  changeStatusFn: (
    ticketId: number,
    assignedToUserId: number,
    oldStatus: TicketMilestone
  ) => void;
};

export const CurrentDelivery = ({
  currentTicket,
}: {
  currentTicket: Ticket | null;
}) => {
  const [closeDelivery, setCloseDelivery] = useState<boolean>(false);
  const setCompletionDelivery = useSetRecoilState(DeliveryCompletionTicketAtom);
  const navigate = useNavigate();

  const handleCloseDeliveryOpen = () => setCloseDelivery(true);

  const handleSubmit = async (deliveryMarkedCompleted: boolean) => {
    if (currentTicket != null) {
      if (deliveryMarkedCompleted) {
        setCompletionDelivery(currentTicket);
        navigate("complete-delivery");
      } else {
        navigate("incomplete-delivery");
      }
    } else {
      alert("no ticket to be submitted");
    }
  };

  const timestamp = Number(currentTicket && currentTicket.timestamp);
  const date = new Date(timestamp);

  return currentTicket != null ? (
    <OuterBlueDivBox>
      <Typography variant="h3" color="#000" align="center" padding="10px">
        Current Delivery
      </Typography>
      <InnerWhiteDivBox style={{ padding: 25 }}>
        <Typography marginBottom="5px">
          {currentTicket.consigneeAddress}
        </Typography>
        <Typography color="#00000099">
          Weight: {String(currentTicket.weight)}
        </Typography>
        <Typography color="#00000099">
          REF#: {String(currentTicket.houseReferenceNumber)}
        </Typography>
        <Typography color="#00000099">
          First Party: {currentTicket.customer.name}
        </Typography>
        <Typography color="#00000099">
          Date/Time Assigned:{" "}
          {date.toLocaleString("en-CA", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          {date.toLocaleTimeString("en-CA", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </Typography>
        <LargeButton label="Close Delivery" action={handleCloseDeliveryOpen} />
        <CompletionPopUp
          isShown={closeDelivery}
          setIsShown={setCloseDelivery}
          onSubmit={handleSubmit}
        />
      </InnerWhiteDivBox>
    </OuterBlueDivBox>
  ) : null;
};

const PickupModalContent = ({
  ticket,
  onClose,
}: {
  ticket: Ticket;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const timestamp = Number(ticket.timestamp);
  const date = new Date(timestamp);
  return (
    <>
      <Typography variant="h2" align="center" padding="40px">
        Accept Pickup?
      </Typography>

      <InnerWhiteDivBox style={{ padding: 25, marginBottom: 30 }}>
        <Typography variant="h4" marginBottom="5px">
          <b>{ticket.consigneeAddress}</b>
        </Typography>
        <Typography color="#00000099">
          Weight: {String(ticket.weight)}
        </Typography>
        <Typography color="#00000099">
          REF#: {String(ticket.houseReferenceNumber)}
        </Typography>
        <Typography color="#00000099">
          First Party: {ticket.customer}
        </Typography>
        <Typography color="#00000099">
          Date/Time Assigned:{" "}
          {date.toLocaleString("en-CA", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          {date.toLocaleTimeString("en-CA", {
            hour: "numeric",
            minute: "2-digit",
          })}
          <Typography color="#00000099">
            Barcode: {String(ticket.barcodeNumber)}
          </Typography>
        </Typography>
      </InnerWhiteDivBox>
      <LargeButton label="Accept" action={() => alert("action")} />
      <LargeButton label="Decline" action={() => navigate("/decline-pickup")} />
      <LargeButton label="Go Back" action={() => onClose()} />
    </>
  );
};

const TicketPopUpContent = ({
  ticket,
  onClose,
  changeStatusButtons,
}: {
  ticket: Ticket;
  onClose: () => void;
  changeStatusButtons?: ChangeStatusModalButtonProps[];
}) => {
  const timestamp = Number(ticket.timestamp);
  const date = new Date(timestamp);
  return (
    <>
      <Typography variant="h3" align="center">
        <b>{ticket.consigneeAddress}</b>
      </Typography>
      <Typography variant="h3" align="center">
        REF#: {String(ticket.houseReferenceNumber)}
      </Typography>
      <InnerBlueDivBox>
        <Typography color="#00000099">
          Weight: {String(ticket.weight)}
        </Typography>
        <Typography color="#00000099">
          First Party: {ticket.customer.name}
        </Typography>
        <Typography color="#00000099">
          Date/Time Assigned:{" "}
          {date.toLocaleString("en-CA", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          {date.toLocaleTimeString("en-CA", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </Typography>
      </InnerBlueDivBox>
      {changeStatusButtons &&
        changeStatusButtons.map((buttonProps: ChangeStatusModalButtonProps) => (
          <Button
            variant="contained"
            onClick={() => {
              buttonProps.changeStatusFn(
                ticket.ticketId,
                ticket.ticketStatus.assignedTo,
                ticket.ticketStatus.currentStatus ??
                  "Creation_Milestone_Status.ticket_created"
              );
              onClose();
            }}
          >
            {buttonProps.title}
          </Button>
        ))}
    </>
  );
};

export const Tickets = ({
  viewAllTickets,
  tickets,
  status,
  setViewAllTickets,
  title,
  items,
  changeStatusButtons,
}: {
  viewAllTickets: boolean;
  tickets: Ticket[] | null;
  status: TicketStatus;
  setViewAllTickets: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  items: number;
  changeStatusButtons?: ChangeStatusModalButtonProps[];
}) => {
  const navigate = useNavigate();
  const [openTicketModal, setOpenTicketModal] = useState<boolean>(false);

  const handleTicketModalOpen = () => setOpenTicketModal(true);
  const handleTicketModalClose = () => setOpenTicketModal(false);

  const handleViewAllOpen = () => setViewAllTickets(true);
  const handleViewAllClose = () => setViewAllTickets(false);

  const isPickupStatus =
    status === "unassigned_pickup" ||
    status === "requested_pickup" ||
    status === "accepted_pickup" ||
    status === "declined_pickup" ||
    status === "complete_pickup" ||
    status === "incomplete_pickup";

  var tempTickets = [];
  if (tickets != null) {
    if (tickets.length < 2) {
      tempTickets = tickets;
    } else {
      tempTickets[0] = tickets[0];
      tempTickets[1] = tickets[1];
    }

    const reducedTicketsInfo = tempTickets.map((ticket) => (
      <>
        <TicketCard onClick={handleTicketModalOpen}>
          <Typography variant="h4" marginBottom="5px">
            <b>{ticket.consigneeAddress}</b>
          </Typography>
          <Typography>REF#: {String(ticket.houseReferenceNumber)}</Typography>
        </TicketCard>
        {isPickupStatus ? (
          <Modal open={openTicketModal} onClose={handleTicketModalClose}>
            <ModalContainer style={{ paddingBottom: 10 }}>
              <PickupModalContent
                ticket={ticket}
                onClose={handleTicketModalClose}
              />
            </ModalContainer>
          </Modal>
        ) : (
          <Modal open={openTicketModal} onClose={handleTicketModalClose}>
            <Fade in={openTicketModal}>
              <ModalContainer>
                <TicketPopUpContent
                  ticket={ticket}
                  onClose={handleTicketModalClose}
                  changeStatusButtons={changeStatusButtons}
                />
              </ModalContainer>
            </Fade>
          </Modal>
        )}
      </>
    ));

    return (
      <>
        {reducedTicketsInfo}
        <Button
          variant="text"
          sx={{ padding: 0, marginLeft: 1, fontSize: "15px" }}
          onClick={handleViewAllOpen}
        >
          View All
        </Button>
        <Modal open={viewAllTickets} onClose={handleViewAllClose}>
          <ModalContainer style={{ maxHeight: "90vh" }}>
            <Grid container justifyContent="space-between">
              <Typography variant="h2" alignContent="left">
                {title}
              </Typography>
              <Typography variant="h2" alignContent="right">
                {String(items)}
              </Typography>
            </Grid>
            <InnerBlueDivBox>
              {tickets.map((ticket) => (
                <TicketCard onClick={handleTicketModalOpen}>
                  <Typography variant="h5">
                    <b>{ticket.consigneeAddress}</b>
                  </Typography>
                  <Typography>
                    REF#: {String(ticket.houseReferenceNumber)}
                  </Typography>
                </TicketCard>
              ))}
            </InnerBlueDivBox>
          </ModalContainer>
        </Modal>
      </>
    );
  } else {
    return null;
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [viewAllAssigned, setViewAllAssigned] = useState<boolean>(false);

  const [viewAllCompleted, setViewAllCompleted] = useState<boolean>(false);

  const [viewAllPickup, setViewAllPickup] = useState<boolean>(false);

  const { val: currentDeliveries, triggerRefetch: triggerRefetchInTransit } =
    useLoadable(fetchTicketsForStatus, "in_transit");
  const { val: assignedInfo, triggerRefetch: triggerRefetchAssigned } =
    useLoadable(fetchTicketsForStatus, "assigned");
  const { val: completedInfo, triggerRefetch: triggerRefetchCompleted } =
    useLoadable(fetchTicketsForStatus, "completed_delivery");
  const { val: pickupInfo, triggerRefetch: triggerRefetchPickup } = useLoadable(
    fetchTicketsForStatus,
    "requested_pickup"
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

  return currentTicket == null &&
    assigned == null &&
    completed == null &&
    pickup == null ? (
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
  ) : (
    <div>
      <CurrentDelivery currentTicket={currentTicket} />
      {(assigned != null || completed != null || pickup != null) && (
        <>
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
            {assigned && (
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
            )}
            {completed && (
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
            )}
            {pickup && (
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
            )}
          </OuterBlueDivBox>
        </>
      )}
      <LargeButton
        label="Complete Shift"
        action={() => handleCompleteShift()}
      />
    </div>
  );
};

export default Home;

const TicketCard = styled(Card)({
  padding: 10,
  margin: 10,
});
