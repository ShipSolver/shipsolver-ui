import React from "react";
import Typography from "@mui/material/Typography";
import { CardColumn } from "./cardColumn";
import { fetchMilestones } from "../../../../../services/ticketServices";
import useLoadable from "../../../../../utils/useLoadable";
import Loading from "../../../../../components/loading";
export interface MilestoneType {
  description: string;
  dateAndTime: Date;
}

interface MilestonesProps {
  ticketId?: string;
}

export const Milestones = ({ ticketId }: MilestonesProps) => {
  const {
    val: milestone,
    loading,
    error,
  } = useLoadable(fetchMilestones, ticketId ?? "");

  if (loading || milestone == null) {
    return <Loading />;
  }

  const milestoneCards = [
    <div>
      <Typography>
        <b>Description:</b> {milestone.description}
      </Typography>
      <Typography>
        <b>Date:</b> {milestone.dateAndTime.toLocaleDateString("en-CA")}
      </Typography>
      {/* prettier-ignore */}
      <Typography>
            <b>Time:</b> {milestone.dateAndTime.toLocaleTimeString("en-CA", { hour12: false })}
        </Typography>
    </div>,
  ];

  return <CardColumn title="Milestones" cardContents={milestoneCards} />;
};
