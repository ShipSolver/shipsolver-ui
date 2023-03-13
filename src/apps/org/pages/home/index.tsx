import React from "react";

import Button from "@mui/material/Button";

import { fetchTicketsForStatus } from "../../../../services/ticketServices";
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { List, ListType } from "./components/list";
import { TicketStatus } from "../../../../services/types";
import "./home.css";

const LISTS: {
  listTitle: string;
  args: TicketStatus;
  listType: ListType;
}[] = [
  {
    listTitle: "Delivered",
    args: "completed_delivery",
    listType: "delivered",
  },
  {
    listTitle: "Incomplete",
    args: "incomplete_delivery",
    listType: "incomplete",
  },
  {
    listTitle: "In Progress",
    args: "in_transit",
    listType: "inProgress",
  },
  {
    listTitle: "Assigned",
    args: "assigned",
    listType: "assigned",
  },
  {
    listTitle: "Ready for Dispatch",
    args: "checked_into_inventory",
    listType: "inventory",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="lists-container">
        {LISTS.map(({ listTitle, args, listType }) => (
          <List
            key={listType}
            listTitle={listTitle}
            fetch={fetchTicketsForStatus}
            args={args}
            listType={listType}
          />
        ))}
      </div>
      <FlexDiv>
        <Button variant="contained" onClick={() => navigate("/pod-review")}>
          Review PODs
        </Button>
        <Button variant="contained" onClick={() => navigate("/incomplete-delivery-review")}>
          Review Incomplete Deliveries
        </Button>
        <Button variant="contained" onClick={() => navigate("/all-tickets")}>
          View All Tickets
        </Button>
        <Button variant="contained" onClick={() => navigate("/ticket-factory")}>
          Create Tickets
        </Button>
      </FlexDiv>
    </div>
  );
}

export default Home;

const FlexDiv = styled("div")`
  display: flex;
  justify-content: space-between;
`;
