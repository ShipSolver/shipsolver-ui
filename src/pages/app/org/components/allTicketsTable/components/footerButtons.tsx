import React from "react";
import { useRecoilValue } from "recoil";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AssignToDriverModal } from "./assignToDriverModal";
import {
  singleRowSelectedAtom,
  multiRowSelectedAtom,
} from "./state/tableState";

import { selectedTicketIdsAtom } from "./state/tableState";

const ButtonLabels = {
  ticketDetails: "View Ticket Details",
  pod: "Review PODs",
  enterIntoInventory: "Re-enter into inventory",
  assignToDriver: "Assign to driver",
  delete: "Delete ticket(s)",
  export: "Export",
};

interface FooterButtonsProps { triggerRefetch: () => void}

export const FooterButtons = ({triggerRefetch}: FooterButtonsProps) => {
  const navigate = useNavigate();
  const singleRowSelected = useRecoilValue(singleRowSelectedAtom);

  const multiRowSelected = useRecoilValue(multiRowSelectedAtom);

  const ticketIDs = useRecoilValue(selectedTicketIdsAtom);

  return (
    <ButtonWrapper>
      <Button
        variant="contained"
        disabled={!singleRowSelected}
        onClick={() => navigate(`/ticket-details/${ticketIDs[0]}`)}
      >
        {ButtonLabels.ticketDetails}
      </Button>
      <Button variant="contained" disabled={!singleRowSelected}>
        {ButtonLabels.pod}
      </Button>
      <Button variant="contained" disabled={!multiRowSelected}>
        {ButtonLabels.enterIntoInventory}
      </Button>
      <AssignToDriverModal
        disabled={!multiRowSelected}
        ticketIDs={ticketIDs}
        buttonText={ButtonLabels.assignToDriver}
        triggerRefetch={triggerRefetch}
      />
      <Button variant="contained" disabled={!multiRowSelected}>
        {ButtonLabels.export}
      </Button>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled("div")`
  height: 60px;
  display: flex;
  padding: 8px;
  justify-content: space-around;
`;
