import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { getTicketIds } from "../../allTicketsTable/components/footerButtons";
import { useNavigate } from "react-router-dom";
import "./list/menu.css";

interface IApprovePODButton {
  numSelected: number;
  selected: { [key: string]: boolean };
}

export function ReviewIncompleteDeliveryButton({
  selected,
  numSelected,
}: IApprovePODButton) {
  const navigate = useNavigate();
  const ticket = getTicketIds(selected)[0];
  const [ticketId, driver, status] = ticket.split("_");
  return (
    <ListItemButton
      disabled={numSelected > 1}
      onClick={() => navigate(`/incomplete-delivery-review`)}
    >
      <Typography className="menu-text-typography">
        Review Incomplete Delivery
      </Typography>
    </ListItemButton>
  );
}
