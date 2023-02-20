import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Ticket, TicketStatus } from "../../../../../../services/types";
import Paper from "../../../../../../components/roundedPaper";
import { TicketSubtitle } from "./ticketSubtitle";
import useLoadable from "../../../../../../utils/useLoadable";
import { Loading } from "../../../../../../components/loading";
import { TicketMenu } from "./ticketMenu";
import { TicketForStatusRes } from "../../../../../../services/ticketServices";
import "./list.css";
import { useRecoilState } from "recoil";
import {
  assignedTicketsRefetchAtom,
  inventoryTicketsRefetchAtom,
} from "../../state/assignedTicketsRefetchAtom";

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

  const [refetchAssigned, setRefetchAssigned] = useRecoilState(
    assignedTicketsRefetchAtom
  );
  const [refetchInventory, setRefetchInventory] = useRecoilState(
    inventoryTicketsRefetchAtom
  );

  ////////////////// This is a little hacky ///////////////////////////

  /* When assigning a ticket to a driver we want to refetch the assigned ticket column as well as the inventory column. 
    This lets us pass in the refetch from the assigned column to the inventory column to be called */
  useEffect(() => {
    if (listType === "assigned") {
      setRefetchAssigned(triggerRefetch);
    }
  }, []);

  const assignToDriverRefetch = () => {
    refetchAssigned(); // This will refetch the assigned column
    triggerRefetch(); // This will refetch the current column (inventory)
  };

  /* When re entering a ticket into inventory we want to refetch the incomplete ticket column as well as the inventory column. 
    This lets us pass in the refetch from the inventory column to the incomplete column to be called */
  useEffect(() => {
    if (listType === "inventory") {
      setRefetchInventory(triggerRefetch);
    }
  }, []);

  const checkIntoInventoryRefetch = () => {
    refetchInventory(); // This will refetch the inventory column
    triggerRefetch(); // This will refetch the current column (incomplete)
  };
  ///////////////////// End of hacky code /////////////////////////////

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
        ticket.ticketStatus.user.firstName +
          " " +
          ticket.ticketStatus.user.lastName,
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
        deleteTicketRefetch={triggerRefetch}
        assignToDriverRefetch={
          listType === "inventory" ? assignToDriverRefetch : undefined
        }
        checkIntoInventoryRefetch={
          listType === "incomplete" ? checkIntoInventoryRefetch : undefined
        }
      />
    </div>
  );
}
