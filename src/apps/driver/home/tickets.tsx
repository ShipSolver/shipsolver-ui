import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InnerBlueDivBox from "../components/innerBlueDivBox";
import ModalContainer from "../components/modalContainer";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { PickupModalContent } from "./pickupModalContent";
import { Ticket, TicketStatus } from "../../../services/types";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ChangeStatusModalButtonProps } from "./ticketPopUpContent";
import { TicketPopUpContent } from "./ticketPopUpContent";
import Card from "@mui/material/Card";

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

const TicketCard = styled(Card)({
  padding: 10,
  margin: 10,
});
