import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Paper from "../../../../../components/roundedPaper";
import { styled } from "@mui/material/styles";
import { CardColumn } from "./cardColumn";

export type EventHistoryType = {
  user: string;
  userRole: string;
  action: string;
  dateAndTime: Date;
};
interface EventHistoryProps {
  events: EventHistoryType[];
}

export const EventHistory = ({ events }: EventHistoryProps) => {
  const eventHistoryCards = events.map(
    ({ user, userRole, action, dateAndTime }) => (
      <div>
        <Typography>
          <b>User:</b> {user}
        </Typography>
        <Typography>
          <b>User Role:</b> {userRole}
        </Typography>
        <Typography>
          <b>Action:</b> {action}
        </Typography>
        <Typography>
          <b>Date:</b> {dateAndTime.toLocaleDateString("en-CA")}
        </Typography>
        {/* prettier-ignore */}
        <Typography>
            <b>Time:</b> {dateAndTime.toLocaleTimeString("en-CA", { hour12: false })}
        </Typography>
      </div>
    )
  );

  return <CardColumn title="Edits" cardContents={eventHistoryCards} />;
};
