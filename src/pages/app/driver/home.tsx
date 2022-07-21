import React, { useMemo, useState } from "react";

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
  fetchTicketsForStatus,
  fetchOrgCurrentDelivery,
} from "../../../services/ticketServices";

import { Ticket, TicketStatus } from "../../../services/types";

import useLoadable from "../../../utils/useLoadable";

import { styled } from "@mui/material/styles";
import { CompletionPopUp } from "./components/completionPopUp";
import { useNavigate } from "react-router-dom";

const Tickets = ({
  viewAllTickets,
  tickets,
  status,
  setViewAllTickets,
  title,
  items,
}: {
  viewAllTickets: boolean;
  tickets: Ticket[] | null;
  status: TicketStatus;
  setViewAllTickets: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  items: number;
}) => {
  const navigate = useNavigate();
  const [openTicketModal, setOpenTicketModal] = useState<boolean>(false);

  const handleTicketModalOpen = () => setOpenTicketModal(true);
  const handleTicketModalClose = () => setOpenTicketModal(false);

  const handleViewAllOpen = () => setViewAllTickets(true);
  const handleViewAllClose = () => setViewAllTickets(false);

  const TicketPopUpContent = (ticket: Ticket) => {
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
          </Typography>
        </InnerBlueDivBox>
      </>
    );
  };

  const PickupModal = (ticket: Ticket) => {
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
        <LargeButton
          label="Decline"
          action={() => navigate("/decline-pickup")}
        />
        <LargeButton label="Go Back" action={() => handleTicketModalClose()} />
      </>
    );
  };

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
        {isPickupStatus && (
          <Modal open={openTicketModal} onClose={handleTicketModalClose}>
            <ModalContainer style={{ paddingBottom: 10 }}>
              {PickupModal(ticket)}
            </ModalContainer>
          </Modal>
        )}
        {!isPickupStatus && (
          <Modal open={openTicketModal} onClose={handleTicketModalClose}>
            <Fade in={openTicketModal}>
              <ModalContainer>{TicketPopUpContent(ticket)}</ModalContainer>
            </Fade>
          </Modal>
        )}
      </>
    ));

    const ticketsInfo = tickets.map((ticket) => (
      <>
        <TicketCard onClick={handleTicketModalOpen}>
          <Typography variant="h5">
            <b>{ticket.consigneeAddress}</b>
          </Typography>
          <Typography>REF#: {String(ticket.houseReferenceNumber)}</Typography>
        </TicketCard>
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
                {items}
              </Typography>
            </Grid>
            <InnerBlueDivBox>{ticketsInfo}</InnerBlueDivBox>
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

  const { val: assignedInfo } = useLoadable(fetchTicketsForStatus, "assigned");
  const { val: completedInfo } = useLoadable(
    fetchTicketsForStatus,
    "completed_delivery"
  );
  const { val: pickupInfo } = useLoadable(
    fetchTicketsForStatus,
    "requested_pickup"
  );

  const assigned = assignedInfo?.tickets;
  const completed = completedInfo?.tickets;
  const pickup = pickupInfo?.tickets;

  const { val: currentTicket } = useLoadable(fetchOrgCurrentDelivery);

  const [closeDelivery, setCloseDelivery] = useState<boolean>(false);

  const handleCloseDeliveryOpen = () => setCloseDelivery(true);
  const handleCloseDeliveryClose = () => setCloseDelivery(false);

  const handleCompleteShift = () => {
    if (assigned != null) {
      if (assigned.length > 0) {
        navigate("shift-complete");
      } else {
        alert("nice");
      }
    }
  };

  const currentDelivery = () => {
    if (currentTicket != null) {
      const timestamp = Number(currentTicket.timestamp);
      const date = new Date(timestamp);
      return (
        <>
          <Typography marginBottom="5px">
            {currentTicket.consigneeAddress}
          </Typography>
          <Typography color="#00000099">
            Weight: {currentTicket.weight}
          </Typography>
          <Typography color="#00000099">
            REF#: {currentTicket.houseReferenceNumber}
          </Typography>
          <Typography color="#00000099">
            First Party: {currentTicket.customer}
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
          <LargeButton
            label="Close Delivery"
            action={() => handleCloseDeliveryOpen()}
          />
          <Modal open={closeDelivery} onClose={handleCloseDeliveryClose}>
            <CompletionPopUp
              modal={closeDelivery}
              setModal={setCloseDelivery}
            />
          </Modal>
        </>
      );
    }
  };

  if (assigned != null && completed != null && pickup != null) {
    return (
      <div>
        <OuterBlueDivBox>
          <Typography variant="h3" color="#000" align="center" padding="10px">
            Current Delivery
          </Typography>
          <InnerWhiteDivBox style={{ padding: 25 }}>
            {currentDelivery()}
          </InnerWhiteDivBox>
        </OuterBlueDivBox>

        <OuterBlueDivBox>
          <InnerBlueDivBox style={{ maxHeight: "90vh" }}>
            <Grid container justifyContent="space-between">
              <Typography variant="h2" alignContent="left">
                Assigned
              </Typography>
              <Typography variant="h2" alignContent="right">
                {assigned.length}
              </Typography>
            </Grid>
            <Tickets
              viewAllTickets={viewAllAssigned}
              tickets={assigned}
              status="assigned"
              setViewAllTickets={setViewAllAssigned}
              title="Assigned"
              items={assigned.length}
            ></Tickets>
          </InnerBlueDivBox>

          <InnerBlueDivBox style={{ maxHeight: "90vh" }}>
            <Grid container justifyContent="space-between">
              <Typography variant="h2" color="#000" alignContent="left">
                Completed
              </Typography>
              <Typography variant="h2" color="#000" alignContent="right">
                {completed.length}
              </Typography>
            </Grid>
            <Tickets
              viewAllTickets={viewAllCompleted}
              tickets={completed}
              status="completed_delivery"
              setViewAllTickets={setViewAllCompleted}
              title="Completed"
              items={completed.length}
            ></Tickets>
          </InnerBlueDivBox>

          <InnerBlueDivBox style={{ maxHeight: "90vh" }}>
            <Grid container justifyContent="space-between">
              <Typography variant="h2" color="#000" alignContent="left">
                Requested Pickups
              </Typography>
              <Typography variant="h2" color="#000" alignContent="right">
                {pickup.length}
              </Typography>
            </Grid>
            <Tickets
              viewAllTickets={viewAllPickup}
              tickets={pickup}
              status="requested_pickup"
              setViewAllTickets={setViewAllPickup}
              title="Requested Pickups"
              items={pickup.length}
            ></Tickets>
          </InnerBlueDivBox>
        </OuterBlueDivBox>

        <LargeButton
          label="Complete Shift"
          action={() => handleCompleteShift()}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default Home;

const TicketCard = styled(Card)({
  padding: 10,
  margin: 10,
});
