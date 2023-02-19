import React from "react";
import Typography from "@mui/material/Typography";
import { Ticket } from "../../../../../../services/types";
import { ListType } from ".";

interface ITicketSubtitle {
  assignedTo: string;
  listType: ListType;
}

export function TicketSubtitle({ assignedTo, listType }: ITicketSubtitle) {
  switch (listType) {
    case "delivered":
      return (
        <Typography color="gray">{`Completed by ${assignedTo}`}</Typography>
      );
    case "incomplete":
      return (
        <Typography color="gray">{`Reported by ${assignedTo}`}</Typography>
      );
    case "inProgress":
    case "assigned":
      return (
        <Typography color="gray">{`Assigned to ${assignedTo}`}</Typography>
      );
    case "inventory":
      return <Typography color="gray">Unassigned</Typography>;
  }
}
