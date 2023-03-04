import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Paper from "../../../../../components/roundedPaper";
import { styled } from "@mui/material/styles";
import { CardColumn } from "../../ticketDetails/components";
import { TestTicket } from "../test/testData";
import { TicketInformationStateType } from "../../ticketDetails/components/ticketInformation/types";
import { selectedTicketIDAtom } from "../state/selectedTicketState";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { fetchTicketsForStatus } from "../../../../../services/ticketServices";
import useLoadable from "../../../../../utils/useLoadable";
import { Ticket } from "../../../../../services/types";
import "./selectDelivery.css";

interface SelectDeliveryProps {
  onSelectTicket: (ticket: Ticket) => void;
}

export const SelectDelivery = ({ onSelectTicket }: SelectDeliveryProps) => {
  const {
    val: response,
    loading,
    error,
  } = useLoadable(fetchTicketsForStatus, "completed_delivery");

  const [selected, setSelected] = useState<number>(-1);

  const selectDeliveryCards = response?.tickets.map((ticket) => (
    <div
      onClick={() => {
        setSelected(ticket.ticketId);
        onSelectTicket(ticket);
      }}
      className={`ticket${ticket.ticketId === selected ? "-selected" : ""}`}
    >
      <Typography>
        <b>{ticket.consigneeAddress}</b>
      </Typography>
      <Typography variant="h6" color="#00000099">
        {`Completed by: ${ticket.ticketStatus.user?.firstName} ${ticket.ticketStatus.user?.lastName}`}
      </Typography>
      <Typography variant="h6" color="#00000099">
        {`Date: ${new Date(ticket.ticketStatus?.timestamp).toLocaleTimeString(
          "en-CA"
        )}`}
      </Typography>
      <Typography variant="h6" color="#00000099">
        {`Time: ${new Date(ticket.ticketStatus?.timestamp).toLocaleTimeString(
          "en-CA",
          { hour12: false }
        )}`}
      </Typography>
    </div>
  ));

  return (
    <CardColumn
      title="Select Delivery"
      cardContents={selectDeliveryCards}
      isEditable
      fullHeight
      customPadding="16px 16px 0px 16px"
      loading={loading}
      error={
        error ? "There was an error fetching completed deliveries" : undefined
      }
    />
  );
};
