import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Loading } from "../../../components/loading";
import OuterBlueDivBox from "../components/outerBlueDivBox";
import InnerBlueDivBox from "../components/innerBlueDivBox";
import { LargeButton } from "../components/largeButton";
import { Tickets } from "./tickets";
import { CurrentDelivery } from "./currentDelivery";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Button, Snackbar, Alert } from "@mui/material";
import {
  fetchTicketsForStatus,
  markAsInTransit,
  moveToIncomplete,
} from "../../../services/ticketServices";

import useLoadable from "../../../utils/useLoadable";

export const Home = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loadingCompleteShift, setLoadingCompleteShift] =
    useState<boolean>(false);

  const {
    val: currentDeliveries,
    loading: loading1,
    triggerRefetch: triggerRefetchInTransit,
  } = useLoadable(fetchTicketsForStatus, "in_transit");
  const {
    val: assignedInfo,
    loading: loading2,
    triggerRefetch: triggerRefetchAssigned,
  } = useLoadable(fetchTicketsForStatus, "assigned");
  const {
    val: completedInfo,
    loading: loading3,
    triggerRefetch: triggerRefetchCompleted,
  } = useLoadable(fetchTicketsForStatus, "completed_delivery");

  const {
    val: incompleteInfo,
    loading: loading5,
    triggerRefetch: triggerRefetchIncompleted,
  } = useLoadable(fetchTicketsForStatus, "incomplete_delivery");

  const currentTicket =
    currentDeliveries?.tickets.length ?? -1 > 0
      ? currentDeliveries?.tickets[0] ?? null
      : null;

  const assigned = assignedInfo?.tickets;
  const completed = completedInfo?.tickets;
  const incomplete = incompleteInfo?.tickets;

  const assignedCount = assignedInfo?.count;
  const completedCount = completedInfo?.count;
  const incompleteCount = incompleteInfo?.count;

  const handleCompleteShift = async () => {
    if (assigned != null) {
      setLoadingCompleteShift(true);
      Promise.all(
        assigned.map((ticket) =>
          markAsInTransit(
            ticket.ticketId,
            ticket.ticketStatus.assignedTo.toString()
          ).then((_) =>
            moveToIncomplete([
              {
                ticketId: ticket.ticketId,
                oldStatus: "in_transit",
                reasonForIncomplete: "Shift ended",
                dueToEndedShift: true,
              },
            ])
          )
        )
      )
        .then((_) => {
          setSuccess("Successfully completed shift");
          triggerRefetchAssigned();
          triggerRefetchInTransit();
          triggerRefetchCompleted();
          triggerRefetchIncompleted();
        })
        .catch((err) => {
          setError(err.toString());
        })
        .finally(() => setLoadingCompleteShift(false));
      // let error = await moveToIncomplete(
      //   assigned.map((ticket) => ({
      //     ticketId: ticket.ticketId,
      //     oldStatus: "assigned",
      //     reasonForIncomplete: "Shift ended",
      //     dueToEndedShift: true,
      //   }))
      // );

      // if (error) {
      //   setError(error);
      // } else {
      //   setSuccess("Successfully completed shift");
      //   triggerRefetchAssigned();
      //   triggerRefetchInTransit();
      //   triggerRefetchCompleted();
      //   triggerRefetchIncompleted();
      // }
    }
  };

  const handleClose = () => {
    if (success) {
      setSuccess(undefined);
    }

    if (error) {
      setError(error);
    }
  };

  const loading =
    loading1 || loading2 || loading3 || loading5 || loadingCompleteShift;

  if (loading) {
    return <Loading />;
  }

  if (!currentTicket && !assigned && !completed && !incomplete) {
    return (
      <InnerBlueDivBox>
        <Typography
          variant="h1"
          color="red"
          sx={{
            marginBottom: "calc(var(--ss-brand-spacing)*2)",
          }}
        >
          Sorry! We couldn't find any tickets assigned to you
        </Typography>
        <Typography variant="h4" color="red">
          Please ask your organization manager to assign some tickets to you
        </Typography>
      </InnerBlueDivBox>
    );
  }

  return (
    <div>
      <CurrentDelivery currentTicket={currentTicket} />

      <Typography
        variant="h2"
        color="primary"
        align="center"
        sx={{
          margin: "calc(var(--ss-brand-spacing)*2)",
        }}
      >
        Your Deliveries:
      </Typography>
      <OuterBlueDivBox>
        {assigned ? (
          <InnerBlueDivBox style={{ maxHeight: "90vh" }}>
            <Grid container justifyContent="space-between">
              <Typography variant="h2" alignContent="left">
                Assigned
              </Typography>
              <Typography variant="h2" alignContent="right">
                {String(assignedCount ?? 0)}
              </Typography>
            </Grid>
            <Tickets
              tickets={assigned}
              status="assigned"
              fetch={() => {
                triggerRefetchAssigned();
                triggerRefetchInTransit();
                triggerRefetchCompleted();
                triggerRefetchIncompleted();
              }}
              disableButton={currentTicket != null}
            />
          </InnerBlueDivBox>
        ) : null}
        {completed ? (
          <InnerBlueDivBox style={{ maxHeight: "90vh", position: "relative" }}>
            <Grid container justifyContent="space-between">
              <Typography variant="h2" color="#000" alignContent="left">
                Completed
              </Typography>
              <Typography variant="h2" color="#000" alignContent="right">
                {String(completedCount ?? 0)}
              </Typography>
            </Grid>
            <Tickets tickets={completed} status="completed" />
          </InnerBlueDivBox>
        ) : null}
        {incomplete ? (
          <InnerBlueDivBox style={{ maxHeight: "90vh" }}>
            <Grid container justifyContent="space-between">
              <Typography variant="h2" color="#000" alignContent="left">
                Incomplete
              </Typography>
              <Typography variant="h2" color="#000" alignContent="right">
                {String(incompleteCount ?? 0)}
              </Typography>
            </Grid>
            <Tickets tickets={incomplete} status="completed" />
          </InnerBlueDivBox>
        ) : null}
      </OuterBlueDivBox>
      <LargeButton
        label="Complete Shift"
        action={() => handleCompleteShift()}
      />
      <Snackbar
        open={!!success || !!error}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {success ? (
          <Alert
            severity="success"
            onClose={handleClose}
            sx={{ width: "100%" }}
          >
            {success}
          </Alert>
        ) : (
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};
