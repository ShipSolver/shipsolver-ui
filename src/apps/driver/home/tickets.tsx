import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { markAsInTransit } from "../../../services/ticketServices";
import { Ticket } from "../../../services/types";
import Paper from "../../../components/roundedPaper";
import "./ticket.css";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

export const Tickets = ({
  tickets,
  status,
}: {
  tickets: Ticket[] | null;
  status: string;
}) => {
  const [selected, setSelected] = useState<number>(-1);

  const [displayTickets, setDisplayTickets] = useState<"show" | "hide">("hide");

  if (!tickets) {
    return null;
  }

  return (
    <>
      {tickets
        ?.slice(0, displayTickets === "hide" ? 2 : undefined)
        .map((ticket) => {
          if (status === "assigned") {
            return (
              <Paper
                className={`ticket${
                  selected === ticket.ticketId ? "-selected" : ""
                }`}
                variant="outlined"
                onClick={() => {
                  setSelected((prev) =>
                    prev === ticket.ticketId ? -1 : ticket.ticketId
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
            <Paper variant="outlined">
              <Typography variant="h4" marginBottom="5px">
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
      {status === "assigned" && selected !== -1 ? (
        <Box className="menu-container-driver">
          <List>
            <ListItemButton onClick={() => markAsInTransit(selected)}>
              <Typography>Move to in transit</Typography>
            </ListItemButton>
          </List>
        </Box>
      ) : null}
    </>
  );
};
