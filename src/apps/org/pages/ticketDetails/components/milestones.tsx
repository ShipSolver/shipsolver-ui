import React from "react";
import Typography from "@mui/material/Typography";
import { CardColumn, Container } from "./cardColumn";
import { fetchMilestones } from "../../../../../services/ticketServices";
import useLoadable from "../../../../../utils/useLoadable";
import Loading from "../../../../../components/loading";
import { Paper } from "@mui/material";
export interface MilestoneType {
  description: string;
  dateAndTime: Date;
}

interface MilestonesProps {
  ticketId?: string;
}

export const Milestones = ({ ticketId }: MilestonesProps) => {
  const {
    val: milestones,
    loading,
    error,
  } = useLoadable(fetchMilestones, ticketId);

  const milestoneCards = milestones?.map(({ description, dateAndTime }) => (
    <Paper sx={{marginBottom: "8px"}}>
      <Typography>
        <b>Description:</b> {description}
      </Typography>
      <Typography>
        <b>Date:</b> {dateAndTime.toLocaleDateString("en-CA")}
      </Typography>
      {/* prettier-ignore */}
      <Typography>
            <b>Time:</b> {dateAndTime.toLocaleTimeString("en-CA", { hour12: false })}
        </Typography>
    </Paper>
  ));

  return (
    <CardColumn
      $height="370px"
      title="Milestones"
      cardContents={milestoneCards}
      error={error ? "There was an error fecthing milestones!" : undefined}
    />
  );
};
