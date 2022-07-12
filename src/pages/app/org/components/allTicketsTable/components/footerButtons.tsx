import React, { useState } from "react";
import { useRecoilValue } from "recoil";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  singleRowSelectedAtom,
  multiRowSelectedAtom,
} from "./state/tableState";

 import { selectedTicketIdAtom,
} from "./state/tableState";

const ButtonLabels = {
  ticketDetails: "View Ticket Details",
  pod: "Review PODs",
  enterIntoInventory: "Re-enter into inventory",
  assignToBroker: "Assign to broker",
  delete: "Delete ticket(s)",
  export: "Export",
};

interface FooterButtonsProps {}

export const FooterButtons = (props: FooterButtonsProps) => {
  const navigate = useNavigate();
  const singleRowSelected = useRecoilValue(singleRowSelectedAtom);

  const multiRowSelected = useRecoilValue(multiRowSelectedAtom);

  const ticketID = useRecoilValue(selectedTicketIdAtom);

  return (
    <ButtonWrapper>
      <Button variant="contained" disabled={!singleRowSelected} onClick={() => navigate(`/ticket-details/${ticketID}`)}>
        {ButtonLabels.ticketDetails}
      </Button>
      <Button variant="contained" disabled={!singleRowSelected}>
        {ButtonLabels.pod}
      </Button>
      <Button variant="contained" disabled={!multiRowSelected}>
        {ButtonLabels.enterIntoInventory}
      </Button>
      <Button variant="contained" disabled={!multiRowSelected}>
        {ButtonLabels.assignToBroker}
      </Button>
      <Button variant="contained" disabled={!multiRowSelected}>
        {ButtonLabels.delete}
      </Button>
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
