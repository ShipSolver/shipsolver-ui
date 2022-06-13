import React, { useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Paper from "../../roundedPaper";
import { useTheme } from "@mui/material/styles";

export type EventHistoryType = {
  user: string;
  userRole: string;
  action: string;
  date: string;
  time: string;
};
interface EventHistoryProps {
  events: EventHistoryType[];
}

export const EventHistory = ({ events }: EventHistoryProps) => {
  const theme = useTheme();
  const eventHistoryCards = useMemo(
    () =>
      events.map((event) => (
        <Card
          sx={{
            padding: 1,
            margin: 2,
          }}
        >
          <Typography>
            <b>User:</b> {event.user}
          </Typography>
          <Typography>
            <b> User Role:</b> {event.userRole}
          </Typography>
          <Typography>
            <b>Action:</b> {event.action}
          </Typography>
          <Typography>
            <b>Date:</b> {event.date} <b>Time:</b> {event.time}
          </Typography>
        </Card>
      )),
    []
  );

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          backgroundColor: "#000",
          width: "1150px",
          height: "200px",
          marginRight: 20,
        }}
      >
        <Typography variant="h1" color="#FFF">
          Hello
        </Typography>
      </div>

      <div
        className="event-history-container"
        style={{
          borderRadius: "var(--ss-brand-border-radius)",
          backgroundColor: theme.palette.secondary.main,
          flexGrow: 1,
        }}
      >
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Paper
              style={{
                display: "inline-block",
              }}
              sx={{
                padding: 2,
                paddingLeft: 4,
                paddingRight: 4,
                marginTop: 2,
                marginBottom: 0,
              }}
            >
              <Typography variant="h2" fontWeight="bold">
                Event History
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper
          style={{
            maxHeight: "80vh",
            backgroundColor: theme.palette.secondary.light,
            margin: 20,
            padding: 10,
            overflowY: "scroll",
          }}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {eventHistoryCards}
        </Paper>
      </div>
    </div>
  );
};
