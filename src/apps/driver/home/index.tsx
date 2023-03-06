import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import { Loading } from "../../../components/loading";
import OuterBlueDivBox from "../components/outerBlueDivBox";
import InnerBlueDivBox from "../components/innerBlueDivBox";
import { LargeButton } from "../components/largeButton";
import { Tickets } from "./tickets";
import { CurrentDelivery } from "./currentDelivery";
import { useNavigate } from "react-router-dom";
import { fetchTicketsForStatus } from "../../../services/ticketServices";

import useLoadable from "../../../utils/useLoadable";

export const Home = () => {
  const navigate = useNavigate();

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

  const loading = loading1 || loading2 || loading3 || loading5;

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

  const handleCompleteShift = () => {
    if (assigned != null) {
      if (assignedCount ?? 0 > 0) {
        navigate("shift-complete");
      } else {
        alert("No outstanding deliveries left to mark");
      }
    }
  };

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
                InComplete
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
    </div>
  );
};
