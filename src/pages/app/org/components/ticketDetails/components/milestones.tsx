import React from "react";
import Typography from "@mui/material/Typography";
import { CardColumn } from "./cardColumn";

export interface MilestoneType {
  description: string;
  dateAndTime: Date;
}

interface MilestonesProps {
  milestones: MilestoneType[];
}

export const Milestones = ({ milestones }: MilestonesProps) => {
  const milestoneCards = milestones.map(({ description, dateAndTime }) => (
    <div>
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
    </div>
  ));

  return <CardColumn title="Milestones" cardContents={milestoneCards} />;
};
