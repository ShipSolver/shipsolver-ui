import React from "react";
import { ListType } from "./index";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { getTicketIds } from "../../../allTicketsTable/components/footerButtons";
import { AssignToDriverModal } from "../../../allTicketsTable/components/assignToDriverModal";
import { DeleteTicketModal } from "../deleteTicketModal";
import { refetchAtom } from "../../state/refetchAtom";
import { useRecoilValue } from "recoil";
import { checkIntoInventory } from "../../../../../../services/ticketServices";
import { GoToDriver } from "../goToDriver";
import "./menu.css";

interface ITicketMenu {
  listType: ListType;
  numSelected: number;
  selected: { [key: string]: boolean };
  refetchSelf: () => void;
}
export function TicketMenu({
  listType,
  selected,
  numSelected,
  refetchSelf,
}: ITicketMenu) {
  const navigate = useNavigate();

  const refetch = useRecoilValue(refetchAtom);

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
            triggerRefetch={() => {
              refetch.assigned?.();
              refetchSelf();
            }}
            disabled={numSelected > 1}
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
              <Typography
                className="menu-text-typography"
                onClick={() => {
                  checkIntoInventory(
                    getTicketIds(selected).map((id) => id.split("_")[0])
                  );
                  refetch.inventory?.();
                  refetchSelf();
                }}
              >
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
    <div className="menu-container">
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
          triggerRefetch={refetchSelf}
        />
      </List>
    </div>
  );
}
