import React from "react";

import Typography from "@mui/material/Typography";
import InnerBlueDivBox from "../components/innerBlueDivBox";

import Button from "@mui/material/Button";

import { Ticket, TicketMilestone } from "../../../services/types";

export type ChangeStatusModalButtonProps = {
  title: string;
  changeStatusFn: (
    ticketId: number,
    assignedToUserId: number,
    oldStatus: TicketMilestone
  ) => void;
};

export const TicketPopUpContent = ({
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
