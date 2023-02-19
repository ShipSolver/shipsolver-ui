import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

import { Ticket } from "../../../../../../../services/types";

import { EntryID } from "../index";
import { Typography } from "@mui/material";

import "./menu.css";

export default function Menu({
  selectedListEntries,
  isMultiSelected,
  entries,
}: {
  selectedListEntries: EntryID[];
  isMultiSelected: boolean;
  entries: Ticket[];
}): JSX.Element {
  return (
    <Box className="menu-container">
      <List>
        <ListItemButton>
          <Typography className="menu-text-typography">
            Request pickup from driver
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
