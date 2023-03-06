import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  markAsInTransit,
  TicketForStatusRes,
} from "../../../services/ticketServices";
import { Ticket, TicketStatus } from "../../../services/types";
import Paper from "../../../components/roundedPaper";
import "./ticket.css";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

export const Tickets = ({
  tickets,
  status,
  fetch,
  disableButton,
}: {
  tickets: Ticket[] | null;
  status: string;
  fetch?: () => void;
  disableButton?: boolean;
}) => {
  const [selected, setSelected] = useState<Ticket | null>(null);

  const [displayTickets, setDisplayTickets] = useState<"show" | "hide">("hide");

  if (!tickets) {
    return null;
  }

  return (
    <div style={{ position: "relative" }}>
      {tickets
        ?.slice(0, displayTickets === "hide" ? 2 : undefined)
        .map((ticket) => {
          if (status === "assigned") {
            return (
              <Paper
                className={`ticket${
                  selected?.ticketId === ticket.ticketId ? "-selected" : ""
                }`}
                variant="outlined"
                onClick={() => {
                  setSelected((prev) =>
                    prev?.ticketId === ticket.ticketId ? null : ticket
                  );
                }}
              >
                <Typography variant="h4" marginBottom="5px">
                  <b>{ticket.consigneeAddress}</b>
                </Typography>
                <Typography>
                  REF#: {String(ticket.houseReferenceNumber)}
                </Typography>
              </Paper>
            );
          }

          return (
            <Paper className="ticket" variant="outlined">
              <Typography variant="h6" marginBottom="5px">
                <b>{ticket.consigneeAddress}</b>
              </Typography>
              <Typography>
                REF#: {String(ticket.houseReferenceNumber)}
              </Typography>
            </Paper>
          );
        })}
      <Button
        variant="text"
        sx={{ justifyContent: "flex-start", fontSize: "15px", padding: 0 }}
        onClick={() =>
          setDisplayTickets((prev) => (prev === "hide" ? "show" : "hide"))
        }
        disabled={tickets.length <= 2}
      >
        {displayTickets === "hide" ? "View All" : "Hide"}
      </Button>
      {status === "assigned" && selected ? (
        <div className="menu-container-driver">
          <List>
            <ListItemButton
              onClick={() =>
                markAsInTransit(
                  selected.ticketId,
                  selected.ticketStatus.assignedTo.toString()
                ).finally(fetch)
              }
              disabled={disableButton}
            >
              <Typography variant="h3">Move to in transit</Typography>
            </ListItemButton>
          </List>
        </div>
      ) : null}
    </div>
  );
};
