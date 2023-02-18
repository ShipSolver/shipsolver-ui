import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Paper from "../../../../../components/roundedPaper";
import { styled } from "@mui/material/styles";
import { fetchTicketEdits } from "../../../../../services/ticketServices";
import Loading from "../../../../../components/loading";
import { CardColumn, Container } from "./cardColumn";

export type EventHistoryType = {
  user?: string;
  userRole?: string;
  action?: string;
  dateAndTime?: Date;
};
interface EventHistoryProps {
  ticketEdits: EventHistoryType[] | null,
  loading: boolean,
  error: string | null
}

export const EventHistory = ({ ticketEdits, loading, error }: EventHistoryProps) => {

  if (loading || ticketEdits === null) {
    return (
      <Container $customHeight="350px">
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container $customHeight="350px">
        <Typography color="red" align="center">
          There was an error fecthing ticket edits!
        </Typography>
      </Container>
    );
  }

  const eventHistoryCards = ticketEdits.map(
    ({ user, userRole, action, dateAndTime }) => (
      <div>
        <Typography>
          <b>User:</b> {user}
        </Typography>
        {/* <Typography>
          <b>User Role:</b> {userRole}
        </Typography> */}
        <Typography>
          <b>Action:</b> {action}
        </Typography>
        <Typography>
          <b>Date:</b> {dateAndTime?.toLocaleDateString("en-CA")}
        </Typography>
        {/* prettier-ignore */}
        <Typography>
            <b>Time:</b> {dateAndTime?.toLocaleTimeString("en-CA", { hour12: false })}
        </Typography>
      </div>
    )
  );

  return (
    <CardColumn
      title="Edits"
      $customHeight="325px"
      cardContents={eventHistoryCards}
    />
  );
};
