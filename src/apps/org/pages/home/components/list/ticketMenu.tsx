import React from "react";
import { ListType } from "./index";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { getTicketIds } from "../../../allTicketsTable/components/footerButtons";
import { AssignToDriverModal } from "../../../allTicketsTable/components/assignToDriverModal";
import { DeleteTicketModal } from "../deleteTicketModal";
import { filterAtom } from "../../../allTicketsTable/components/state/tableState";
import { useSetRecoilState } from "recoil";
import "./menu.css";

interface ITicketMenu {
  listType: ListType;
  numSelected: number;
  selected: { [key: string]: boolean };
  deleteTicketRefetch: () => void;
  assignToDriverRefetch?: () => void;
}
export function TicketMenu({
  listType,
  selected,
  numSelected,
  assignToDriverRefetch,
  deleteTicketRefetch,
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
            getTicketIDs={() =>
              getTicketIds(selected).map((id) => id.split("_")[0])
            }
            triggerRefetch={assignToDriverRefetch}
          />
        );
      }
      case "inProgress":
      case "assigned": {
        return <GoToDriver selected={selected} numSelected={numSelected} />;
      }
      case "incomplete": {
        return (
          <>
            <GoToDriver selected={selected} numSelected={numSelected} />
            <Divider sx={{ borderBottomWidth: 2 }} />
            <ListItemButton>
              <Typography className="menu-text-typography">
                Move to Inventory
              </Typography>
            </ListItemButton>
            <Divider sx={{ borderBottomWidth: 2 }} />
            <ListItemButton>
              <Typography className="menu-text-typography">
                Review incomplete delivery
              </Typography>
            </ListItemButton>
          </>
        );
      }
      case "delivered": {
        return (
          <>
            <GoToDriver selected={selected} numSelected={numSelected} />
            <Divider sx={{ borderBottomWidth: 2 }} />
            <ListItemButton>
              <Typography className="menu-text-typography">
                Approve POD
              </Typography>
            </ListItemButton>
            <Divider sx={{ borderBottomWidth: 2 }} />
            <ListItemButton>
              <Typography className="menu-text-typography">
                Review completed delivery
              </Typography>
            </ListItemButton>
          </>
        );
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
            navigate(
              `/ticket-details/${getTicketIds(selected)[0].split("_")[0]}`
            )
          }
          disabled={numSelected != 1}
        >
          <Typography className="menu-text-typography">Edit ticket</Typography>
        </ListItemButton>
        <Divider sx={{ borderBottomWidth: 2 }} />
        <DeleteTicketModal
          getTicketIDs={() =>
            getTicketIds(selected).map((id) => id.split("_")[0])
          }
          triggerRefetch={deleteTicketRefetch}
        />
      </List>
    </Box>
  );
}

interface IGoToDriver {
  numSelected: number;
  selected: { [key: string]: boolean };
}

function GoToDriver({ selected, numSelected }: IGoToDriver) {
  const navigate = useNavigate();

  const setFilter = useSetRecoilState(filterAtom);

  const driverName = getTicketIds(selected)[0].split("_")[1];

  return (
    <ListItemButton
      disabled={numSelected !== 1}
      onClick={() => {
        setFilter((prev) => ({ ...prev, lastAssigned: driverName }));
        navigate("/all-tickets");
      }}
    >
      <Typography className="menu-text-typography">
        {`Go to ${driverName}'s Tickets`}
      </Typography>
    </ListItemButton>
  );
}
