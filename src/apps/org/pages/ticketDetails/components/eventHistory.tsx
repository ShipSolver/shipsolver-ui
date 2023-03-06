import React from "react";
import Typography from "@mui/material/Typography";
import { CardColumn } from "./cardColumn";
import { Paper } from "@mui/material";

export type EventHistoryType = {
  user?: string;
  userRole?: string;
  actions: string[];
  dateAndTime?: Date;
};
interface EventHistoryProps {
  ticketEdits: EventHistoryType[] | null;
  loading: boolean;
  error: string | null;
}

export const EventHistory = ({
  ticketEdits,
  loading,
  error,
}: EventHistoryProps) => {
  const eventHistoryCards = ticketEdits?.map(
    ({ user, userRole, actions, dateAndTime }) => (
      <Paper sx={{ marginBottom: "8px", padding: "8px"}}>
        <Typography>
          <b>User:</b> {user}
        </Typography>
        {/* <Typography>
          <b>User Role:</b> {userRole}
        </Typography> */}
        {actions.map((action) => (
          <Typography key={action}>
            <b>Action:</b> {action}
          </Typography>
        ))}
        <Typography>
          <b>Date:</b> {dateAndTime?.toLocaleDateString("en-CA")}
        </Typography>
        {/* prettier-ignore */}
        <Typography>
            <b>Time:</b> {dateAndTime?.toLocaleTimeString("en-CA", { hour12: false })}
        </Typography>
      </Paper>
    )
  );

  return (
    <CardColumn
      title="Edits"
      $height="350px"
      cardContents={eventHistoryCards}
      loading={loading}
      error={error ? "There was an error fecthing ticket edits!" : undefined}
    />
  );
};
