import React from "react";
import { ListType } from "./index";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { getTicketIds } from "../../../allTicketsTable/components/footerButtons";
import { deleteTicket } from "../../../../../../services/ticketServices";
import { AssignToDriverModal } from "../../../allTicketsTable/components/assignToDriverModal";
import "./menu.css"

interface ITicketMenu {
  listType: ListType;
  numSelected: number;
  selected: { [key: string]: boolean };
  triggerRefetch: () => void;
}
export function TicketMenu({
  listType,
  selected,
  numSelected,
  triggerRefetch,
}: ITicketMenu) {
  const navigate = useNavigate();

  if (!numSelected) {
    return null;
  }

  function getListItems(): React.ReactNode {
    switch (listType) {
      case "inventory": {
        return (
          <AssignToDriverModal
            buttonText="Assign to driver"
            listItem
            getTicketIDs={() => getTicketIds(selected)}
            triggerRefetch={triggerRefetch}
          />
        );
      }
      case "inProgress":
      case "assigned": {
        return (
          <ListItemButton>
            <Typography className="menu-text-typography">
              Go to Driver's Tickets
            </Typography>
          </ListItemButton>
        );
      }
      case "incomplete": {
        return (
          <>
            <ListItemButton>
              <Typography className="menu-text-typography">
                Go to Driver's Tickets
              </Typography>
            </ListItemButton>
            <ListItemButton>
              <Typography className="menu-text-typography">
                Move to Inventory
              </Typography>
            </ListItemButton>
            <ListItemButton>
              <Typography className="menu-text-typography">
                Review incomplete delivery
              </Typography>
            </ListItemButton>
          </>
        );
      }
      case "delivered": {
        <>
          <ListItemButton>
            <Typography className="menu-text-typography">
              Go to Driver's Tickets
            </Typography>
          </ListItemButton>
          <ListItemButton>
            <Typography className="menu-text-typography">
              Approve POD
            </Typography>
          </ListItemButton>
          <ListItemButton>
            <Typography className="menu-text-typography">
              Review completed delivery
            </Typography>
          </ListItemButton>
        </>;
      }
    }
  }

  return (
    <Box className="menu-container">
      <List>
        {getListItems()}
        <Divider sx={{ borderBottomWidth: 2 }} />
        <ListItemButton
          onClick={() =>
            navigate(`/ticket-details/${getTicketIds(selected)[0]}`)
          }
          disabled={numSelected != 1}
        >
          <Typography className="menu-text-typography">Edit ticket</Typography>
        </ListItemButton>
        <Divider sx={{ borderBottomWidth: 2 }} />
        <ListItemButton onClick={() => deleteTicket(getTicketIds(selected))}>
          <Typography className="menu-text-typography">Delete</Typography>
        </ListItemButton>
      </List>
    </Box>
  );
}
