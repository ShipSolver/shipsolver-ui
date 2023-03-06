import React, { useState, useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import { Ticket, TicketStatus } from "../../../../../../services/types";
import Paper from "../../../../../../components/roundedPaper";
import { TicketSubtitle } from "./ticketSubtitle";
import useLoadable from "../../../../../../utils/useLoadable";
import { Loading } from "../../../../../../components/loading";
import { TicketMenu } from "./ticketMenu";
import { TicketForStatusRes } from "../../../../../../services/ticketServices";
import "./list.css";
import { useSetRecoilState } from "recoil";
import { refetchAtom } from "../../state/refetchAtom";

export type ListType =
  | "delivered"
  | "incomplete"
  | "inProgress"
  | "assigned"
  | "inventory";

interface IList {
  listTitle: string;
  listType: ListType;
  fetch: (status: TicketStatus) => Promise<TicketForStatusRes>;
  args: TicketStatus;
}

export function List({ listTitle, listType, fetch, args }: IList) {
  const {
    val: response,
    loading,
    error,
    triggerRefetch,
  } = useLoadable(fetch, args);

  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
  const [numSelected, setNumSelected] = useState<number>(0);

  const setRefetch = useSetRecoilState(refetchAtom);

  useEffect(() => {
    setRefetch((prev) => ({ ...prev, [listType]: triggerRefetch }));
  }, [triggerRefetch]);

  const handleClick = (ticketID: string) => {
    setNumSelected((prev) => prev + (selected[ticketID] ? -1 : 1));
    setSelected((prev) => ({
      ...prev,
      [ticketID]: !(prev[ticketID] ?? false),
    }));
  };

  const renderedTickets = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return (
        <Typography
          style={{ margin: 8 }}
          color="error"
        >{`There was an error fetching your ${listType} tickets`}</Typography>
      );
    }

    return response?.tickets.map((ticket: Ticket) => {
      /* This is so that we can easily grab the driver name inside of TicketMenu */
      const key = [
        ticket.ticketId.toString(),
        ticket.ticketStatus.user
          ? ticket.ticketStatus.user.firstName +
            " " +
            ticket.ticketStatus.user.lastName
          : "",
        ticket.ticketStatus.assignedTo ? "pendingApproval" : "approved",
      ].join("_");

      return (
        <Paper
          variant="outlined"
          className={`entry-renderer${selected[key] ? "-selected" : ""}`}
          onClick={() => handleClick(key)}
        >
          <Typography variant="h6">{ticket.consigneeAddress}</Typography>
          <TicketSubtitle
            assignedTo={ticket.ticketStatus.user?.firstName ?? ""}
            listType={listType}
          />
        </Paper>
      );
    });
  }, [loading, error, response, selected]);

  return (
    <div style={{ position: "relative" }}>
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
      <div className="list-column">{renderedTickets}</div>
      <TicketMenu
        selected={selected}
        numSelected={numSelected}
        listType={listType}
        refetchSelf={() => {
          setNumSelected(0);
          setSelected({});
          triggerRefetch();
        }}
      />
    </div>
  );
}
