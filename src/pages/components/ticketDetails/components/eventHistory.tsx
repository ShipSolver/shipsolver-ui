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
  date: Date;
  time: string;
};
interface EventHistoryProps {
  events: EventHistoryType[];
}

export const EventHistory = ({ events }: EventHistoryProps) => {
  const eventHistoryCards = useMemo(
    () =>
      events.map((event) => (
        <EventHistoryCard>
          <Typography>
            <b>User:</b> {event.user}
          </Typography>
          <Typography>
            <b>User Role:</b> {event.userRole}
          </Typography>
          <Typography>
            <b>Action:</b> {event.action}
          </Typography>
          <Typography>
            <b>Date:</b> {event.date.toLocaleDateString("en-CA")}
            {"  "}
            <b>Time:</b> {event.time}
          </Typography>
        </EventHistoryCard>
      )),
    []
  );

  return (
    <EventHistoryContainer>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <TitlePaper>
            <Typography variant="h2" fontWeight="bold">
              Event History
            </Typography>
          </TitlePaper>
        </Grid>
      </Grid>

      <CardContainerPaper
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {eventHistoryCards}
      </CardContainerPaper>
    </EventHistoryContainer>
  );
};

const EventHistoryContainer = styled("div")(({ theme }) => ({
  borderRadius: "var(--ss-brand-border-radius)",
  backgroundColor: theme.palette.secondary.main,
  flexGrow: 1,
}));

const TitlePaper = styled(Paper)({
  display: "inline-block",
  padding: 15,
  paddingLeft: 25,
  paddingRight: 25,
  marginTop: 20,
  marginBottom: 0,
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
