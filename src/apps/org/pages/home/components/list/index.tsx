import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Ticket, TicketStatus } from "../../../../../../services/types";
import Paper from "../../../../../../components/roundedPaper";
import { TicketSubtitle } from "./ticketSubtitle";
import useLoadable from "../../../../../../utils/useLoadable";
import { Loading } from "../../../../../../components/loading";
import { TicketMenu } from "./ticketMenu";
import { TicketForStatusRes } from "../../../../../../services/ticketServices";
import "./list.css";
import { Key } from "@mui/icons-material";

export type ListType =
  | "delivered"
  | "incomplete"
  | "inProgress"
  | "assigned"
  | "inventory";

interface IList {
  listTitle: string;
  listType: ListType;
  fetch: (
    status: TicketStatus,
    milestoneType: string
  ) => Promise<TicketForStatusRes>;
  args: [TicketStatus, string];
}

export function List({ listTitle, listType, fetch, args }: IList) {
  const {
    val: response,
    loading,
    error,
    triggerRefetch,
  } = useLoadable(fetch, ...args);

  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
  const [numSelected, setNumSelected] = useState<number>(0);

  const handleClick = (ticketID: string) => {
    setNumSelected((prev) => prev + (selected[ticketID] ? -1 : 1));
    setSelected((prev) => ({
      ...prev,
      [ticketID]: !(prev[ticketID] ?? false),
    }));
  };

  const renderTickets = () => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return (
        <Typography>{`There was an error fetching your ${listType} tickets`}</Typography>
      );
    }

    return response?.tickets.map((ticket: Ticket) => {
      /* This is so that we can easily grab the driver first name inside of TicketMenu */
      const key = [
        ticket.ticketId.toString(),
        ticket.ticketStatus.user.firstName,
      ].join("_");

      return (
        <Paper
          variant="outlined"
          className={`entry-renderer${selected[key] ? "-selected" : ""}`}
          onClick={() => handleClick(key)}
        >
          <Typography variant="h6">{ticket.consigneeAddress}</Typography>
          <TicketSubtitle
            assignedTo={ticket.ticketStatus.user.firstName}
            listType={listType}
          />
        </Paper>
      );
    });
  };

  return (
    <div>
      <div className="ss-flexbox">
        <span className="list-column-header">
          <Typography display="inline" variant="h4" color="black" gutterBottom>
            {listTitle}
          </Typography>
        </span>
        <Typography
          display="inline"
          variant="h4"
          align="right"
          color="black"
          gutterBottom
        >
          <strong>{response?.count ?? 0}</strong>
        </Typography>
      </div>
      <div className="list-column">{renderTickets()}</div>
      <TicketMenu
        selected={selected}
        numSelected={numSelected}
        listType={listType}
        triggerRefetch={triggerRefetch}
      />
    </div>
  );
}
