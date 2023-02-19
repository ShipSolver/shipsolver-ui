import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

import { Ticket } from "../../../../../../../services/types";
import { AssignToDriverModal } from "../../../../allTicketsTable/components/assignToDriverModal";
import { EntryID } from "../index";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./menu.css";

interface IMenu {
  selectedListEntries: EntryID[];
  isMultiSelected: boolean;
  entries: Ticket[];
  triggerRefetch?: () => void
}
export default function Menu({
  selectedListEntries,
  isMultiSelected,
  entries,
  triggerRefetch

}: IMenu): JSX.Element {
  const navigate = useNavigate();

  return (
    <Box className="menu-container">
      <List>
        <ListItemButton
          onClick={() => navigate(`/ticket-details/${selectedListEntries[0]}`)}
          disabled={isMultiSelected}
        >
          <Typography className="menu-text-typography">Edit ticket</Typography>
        </ListItemButton>
        <Divider sx={{ borderBottomWidth: 2 }} />
        <AssignToDriverModal
          buttonText="Assign to driver"
          listItem
          getTicketIDs={() => selectedListEntries}
          triggerRefetch={triggerRefetch}
        />
        <Divider sx={{ borderBottomWidth: 2 }} />
        <ListItemButton>
          <Typography className="menu-text-typography">
            Mark as incomplete
          </Typography>
        </ListItemButton>
        <Divider sx={{ borderBottomWidth: 2 }} />
        <ListItemButton>
          <Typography className="menu-text-typography">Delete</Typography>
        </ListItemButton>
      </List>
    </Box>
  );
}
