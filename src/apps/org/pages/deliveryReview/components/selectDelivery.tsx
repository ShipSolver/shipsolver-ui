import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Paper from "../../../../../components/roundedPaper";
import { CardColumn } from "../../ticketDetails/components";

import { Ticket } from "../../../../../services/types";
import "./selectDelivery.css";

interface SelectDeliveryProps {
  onSelectTicket: (ticket: Ticket) => void;
  completeDelivery?: boolean;
  defaultTicketId?: string;
  tickets?: Ticket[];
  loading: boolean;
  error: boolean;
}

const SelectDeliveryBase = ({
  onSelectTicket,
  defaultTicketId,
  tickets,
  loading,
  error,
}: SelectDeliveryProps) => {
  useEffect(() => {
    if (defaultTicketId && tickets) {
      onSelectTicket(
        tickets.filter(({ ticketId }) => ticketId === +defaultTicketId)[0]
      );
    }
  }, [tickets]);

  const [selected, setSelected] = useState<number>(+(defaultTicketId ?? -1));

  const selectDeliveryCards = tickets?.map((ticket) => (
    <Paper
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
    </Paper>
  ));

  return (
    <CardColumn
      title="Select Delivery"
      cardContents={selectDeliveryCards}
      loading={loading}
      error={
        error ? "There was an error fetching completed deliveries" : undefined
      }
      $height="696px"
    />
  );
};

export const SelectDelivery = React.memo(SelectDeliveryBase);
