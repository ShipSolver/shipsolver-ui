import React, { useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Paper from "../../roundedPaper";
import { styled } from "@mui/material/styles";

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
  const eventHistoryCards = () =>
    events.map(({ user, userRole, action, dateAndTime }) => (
      <EventHistoryCard>
        <Typography>
          <b>User:</b> {user}
        </Typography>
        <Typography>
          <b>User Role:</b> {userRole}
        </Typography>
        <Typography>
          <b>Action:</b> {action}
        </Typography>
        <Typography display="inline" marginRight="5px">
          <b>Date:</b> {dateAndTime.toLocaleDateString("en-CA")}
        </Typography>
        {/* prettier-ignore */}
        <Typography display="inline">
            <b>Time:</b> {dateAndTime.toLocaleTimeString("en-CA", { hour12: false })}
        </Typography>
      </EventHistoryCard>
    ));

  return (
    <EventHistoryContainer>
      <TitlePaper>
        <Typography variant="h2" fontWeight="bold">
          Event History
        </Typography>
      </TitlePaper>

      <CardContainerPaper
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {eventHistoryCards()}
      </CardContainerPaper>
    </EventHistoryContainer>
  );
};

const EventHistoryContainer = styled("div")(({ theme }) => ({
  borderRadius: "var(--ss-brand-border-radius)",
  backgroundColor: theme.palette.secondary.main,
  flexGrow: 1,
  padding: 5,
}));

const TitlePaper = styled(Paper)({
  display: "inline-block",
  position: "relative",
  left: "50%",
  transform: "translateX(-50%)",
  padding: 15,
  paddingLeft: 25,
  paddingRight: 25,
  marginTop: 15,
});

const CardContainerPaper = styled(Paper)(({ theme }) => ({
  height: "80vh",
  backgroundColor: theme.palette.secondary.light,
  margin: 20,
  padding: 10,
  overflowY: "scroll",
}));

const EventHistoryCard = styled(Card)({
  padding: 10,
  margin: 15,
});
