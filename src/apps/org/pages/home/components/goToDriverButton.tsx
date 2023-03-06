import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { getTicketIds } from "../../allTicketsTable/components/footerButtons";
import { filterAtom } from "../../allTicketsTable/components/state/tableState";
import { useSetRecoilState } from "recoil";
import "./list/menu.css";

interface IGoToDriver {
  numSelected: number;
  selected: { [key: string]: boolean };
}

export function GoToDriverButton({ selected, numSelected }: IGoToDriver) {
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
