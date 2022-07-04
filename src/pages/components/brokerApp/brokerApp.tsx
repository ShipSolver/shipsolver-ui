import React, { useMemo, useState } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "../roundedPaper";
import OuterBlueDivBox from "../outerBlueDivBox";
import InnerBlueDivBox from "../innerBlueDivBox";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { SlideUp } from "../transitions";
import Fade from "@mui/material/Fade";

import {
  fetchOrgTodayTickets,
  fetchOrgCurrentDelivery,
} from "../../../services/ticketServices";

import { Ticket } from "../../../services/types";

import useLoadable from "../../../utils/useLoadable";

import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { Slide } from "@mui/material";

const Tickets = ({
  viewAllTickets,
  tickets,
  setViewAllTickets,
  title,
  items,
}: {
  viewAllTickets: boolean;
  tickets: Ticket[] | null;
  setViewAllTickets: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  items: number;
}) => {
  const [openTicketModal, setOpenTicketModal] = useState<boolean>(false);

  const handleTicketModalOpen = () => setOpenTicketModal(true);
  const handleTicketModalClose = () => setOpenTicketModal(false);

  const handleViewAllOpen = () => setViewAllTickets(true);
  const handleViewAllClose = () => setViewAllTickets(false);

  const TicketPopUpContent = (ticket: Ticket) => {
    const timestamp = Number(ticket.APPOINTMENT_TIME);
    const date = new Date(timestamp);
    return (
      <>
        <Typography variant="h3" align="center">
          <b>{ticket.CONSIGNEE.ADDRESS}</b>
        </Typography>
        <Typography variant="h3" align="center">
          REF#: {ticket.HOUSE_REF}
        </Typography>
        <InnerBlueDivBox>
          <Typography color="#00000099">Weight: {ticket.WEIGHT}</Typography>
          <Typography color="#00000099">
            First Party: {ticket.FIRST_PARTY}
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

  var tempTickets = [];
  if (tickets != null) {
    if (tickets.length < 2) {
      tempTickets = tickets;
    } else {
      tempTickets[0] = tickets[0];
      tempTickets[1] = tickets[1];
    }
    const reducedTicketsInfo = tempTickets.map((tickets) => (
      <>
        <TicketCard onClick={handleTicketModalOpen}>
          <Typography variant="h5">
            <b>{tickets.CONSIGNEE.ADDRESS}</b>
          </Typography>
          <Typography>REF#: {tickets.HOUSE_REF}</Typography>
        </TicketCard>

        <Modal open={openTicketModal} onClose={handleTicketModalClose}>
          <Fade in={openTicketModal}>
            <OuterBlueDivBox
              sx={{
                position: "relative",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "93vw",
                border: "2px solid #000",
                boxShadow: 24,
              }}
            >
              {TicketPopUpContent(tickets)}
            </OuterBlueDivBox>
          </Fade>
        </Modal>
      </>
    ));

    const ticketsInfo = tickets.map((tickets) => (
      <>
        <TicketCard onClick={handleTicketModalOpen}>
          <Typography variant="h5">
            <b>{tickets.CONSIGNEE.ADDRESS}</b>
          </Typography>
          <Typography>REF#: {tickets.HOUSE_REF}</Typography>
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
          <OuterBlueDivBox
            sx={{
              position: "relative",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "95vw",
              border: "2px solid #000",
              boxShadow: 24,
            }}
          >
            <Grid container justifyContent="space-between">
              <Typography variant="h2" alignContent="left">
                {title}
              </Typography>
              <Typography variant="h2" alignContent="right">
                {items}
              </Typography>
            </Grid>
            <InnerBlueDivBox>{ticketsInfo}</InnerBlueDivBox>
          </OuterBlueDivBox>
        </Modal>
      </>
    );
  } else {
    return null;
  }
};

export const BrokerApp = () => {
  const [viewAllAssigned, setViewAllAssigned] = useState<boolean>(false);

  const [viewAllCompleted, setViewAllCompleted] = useState<boolean>(false);

  const [viewAllPickup, setViewAllPickup] = useState<boolean>(false);

  const { val: tickets } = useLoadable(fetchOrgTodayTickets);

  const { val: currentTicket } = useLoadable(fetchOrgCurrentDelivery);

  const assigned = useMemo(
    () => tickets && tickets.filter((ticket) => ticket.STATUS === "ASSIGNED"),
    [tickets]
  );

  const completed = useMemo(
    () => tickets && tickets.filter((ticket) => ticket.STATUS === "DELIVERED"),
    [tickets]
  );

  const pickup = useMemo(
    () => tickets && tickets.filter((ticket) => ticket.STATUS === "PICKUP"),
    [tickets]
  );

  const currentDelivery = () => {
    if (currentTicket != null) {
      const timestamp = Number(currentTicket.APPOINTMENT_TIME);
      const date = new Date(timestamp);
      return (
        <>
          <Typography marginBottom="5px">
            {currentTicket.CONSIGNEE.CITY.toUpperCase()}{" "}
            {currentTicket.CONSIGNEE.PROVINCE.toUpperCase()}{" "}
            {currentTicket.CONSIGNEE.POSTAL_CODE.toUpperCase()}
          </Typography>
          <Typography variant="h4" marginBottom="5px">
            <b>{currentTicket.CONSIGNEE.ADDRESS}</b>
          </Typography>
          <Typography color="#00000099">
            Weight: {currentTicket.WEIGHT}
          </Typography>
          <Typography color="#00000099">
            REF#: {currentTicket.HOUSE_REF}
          </Typography>
          <Typography color="#00000099">
            First Party: {currentTicket.FIRST_PARTY}
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
          <CurrentDeliveryInnerContainer>
            {currentDelivery()}
            <Box textAlign="center">
              <LargeButton variant="contained">Close Delivery</LargeButton>
            </Box>
          </CurrentDeliveryInnerContainer>
        </OuterBlueDivBox>

        <OuterBlueDivBox>
          <InnerBlueDivBox>
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
              setViewAllTickets={setViewAllAssigned}
              title="Assigned"
              items={assigned.length}
            ></Tickets>
          </InnerBlueDivBox>

          <InnerBlueDivBox>
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
              setViewAllTickets={setViewAllCompleted}
              title="Completed"
              items={completed.length}
            ></Tickets>
          </InnerBlueDivBox>

          <InnerBlueDivBox>
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
              setViewAllTickets={setViewAllPickup}
              title="Requested Pickups"
              items={pickup.length}
            ></Tickets>
          </InnerBlueDivBox>
        </OuterBlueDivBox>
        <Box textAlign="center">
          <LargeButton variant="contained">Complete Shift</LargeButton>
        </Box>
      </div>
    );
  } else {
    return null;
  }
};

const CurrentDeliveryContainer = styled("div")(({ theme }) => ({
  borderRadius: "var(--ss-brand-border-radius)",
  backgroundColor: theme.palette.secondary.main,
  padding: 5,
  marginBottom: 10,
}));

const CurrentDeliveryInnerContainer = styled("div")(({ theme }) => ({
  borderRadius: "var(--ss-brand-border-radius)",
  backgroundColor: "#FFF",
  margin: 10,
  padding: 25,
}));

const TicketsContainer = styled("div")(({ theme }) => ({
  borderRadius: "var(--ss-brand-border-radius)",
  backgroundColor: theme.palette.secondary.main,
  padding: 5,
  marginBottom: 10,
}));

const AssignedCompletedContainer = styled("div")(({ theme }) => ({
  borderRadius: "var(--ss-brand-border-radius)",
  backgroundColor: theme.palette.secondary.light,
  margin: 10,
  padding: 10,
  maxHeight: "25vh",
  overflowY: "scroll",
}));

const RequestedPickupContainer = styled("div")(({ theme }) => ({
  borderRadius: "var(--ss-brand-border-radius)",
  backgroundColor: "#FFF",
  margin: 10,
  padding: 10,
}));

const LargeButton = styled(Button)({
  width: "75vw",
  padding: 5,
  marginTop: 5,
});

const TicketCard = styled(Card)({
  padding: 10,
  margin: 10,
});
