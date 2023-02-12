import React from "react";
import Typography from "@mui/material/Typography";
import { CardColumn, Container } from "./cardColumn";
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
    val: milestones,
    loading,
    error,
  } = useLoadable(fetchMilestones, ticketId ?? "");

  if (loading || milestones == null) {
    return (
      <Container $customHeight="350px">
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container $customHeight="350px">
        <Typography color="red" align="center">
          There was an error fecthing milestones!
        </Typography>
      </Container>
    );
  }

  const milestoneCards = milestones.map(({ description, dateAndTime }) => [
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
    </div>,
  ]);

  return <CardColumn $customHeight="29vh" title="Milestones" cardContents={milestoneCards} />;
};


