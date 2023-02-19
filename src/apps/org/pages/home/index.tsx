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
  args: [TicketStatus, string];
  listType: ListType;
}[] = [
  {
    listTitle: "Delivered",
    args: ["unassigned_pickup", "Creation_Milestone_Status"],
    listType: "delivered",
  },
  {
    listTitle: "Incomplete",
    args: ["requested_pickup", "Pickup_Milestone_Status"],
    listType: "incomplete",
  },
  {
    listTitle: "In Progress",
    args: ["in_transit", "Assignment_Milestone_Status"],
    listType: "inProgress",
  },
  {
    listTitle: "Assigned",
    args: ["assigned", "Assignment_Milestone_Status"],
    listType: "assigned",
  },
  {
    listTitle: "Inventory",
    args: ["checked_into_inventory", "Inventory_Milestone_Status"],
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
        <Button variant="contained" onClick={() => {}}>
          Inventory Re-entry
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
