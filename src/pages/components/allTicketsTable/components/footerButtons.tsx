import React, { useState } from "react";
import { useRecoilState } from "recoil";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import {
  // ticketDetailsDisabledAtom,
  // podDisabledAtom,
  // enterIntoInventoryDisabledAtom,
  // assignToBrokerDisabledAtom,
  // deleteDisabledAtom,
  // exportDisabledAtom,
  singleRowSelectedButtonDisabledAtom,
  multiRowSelectedButtonDisabledAtom,
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
  // const [ticketDetailsDisabled, setTicketDetailsDisabled] = useRecoilState(
  //   ticketDetailsDisabledAtom
  // );

  // const [podDisabled, setPodDisabled] = useRecoilState(podDisabledAtom);

  // const [enterIntoInventoryDisabled, setEnterIntoInvetoryDisabled] =
  //   useRecoilState(enterIntoInventoryDisabledAtom);

  // const [assignToBrokerDisabled, setAssignToBrokerDisabled] = useRecoilState(
  //   assignToBrokerDisabledAtom
  // );

  // const [deleteDisabled, setDeleteDisabled] =
  //   useRecoilState(deleteDisabledAtom);

  // const [exportDisabled, setExportDisabled] =
  //   useRecoilState(exportDisabledAtom);

  const [singleRowSelectedButtonDisabled, setSingleRowSelectedButtonDisabled] =
    useRecoilState(singleRowSelectedButtonDisabledAtom);

  const [multiRowSelectedButtonDisabled, setMultiRowSelectedButtonDisabled] =
    useRecoilState(multiRowSelectedButtonDisabledAtom);

  return (
    <ButtonWrapper>
      <Button variant="contained" disabled={singleRowSelectedButtonDisabled}>
        {ButtonLabels.ticketDetails}
      </Button>
      <Button variant="contained" disabled={singleRowSelectedButtonDisabled}>
        {ButtonLabels.pod}
      </Button>
      <Button variant="contained" disabled={multiRowSelectedButtonDisabled}>
        {ButtonLabels.enterIntoInventory}
      </Button>
      <Button variant="contained" disabled={multiRowSelectedButtonDisabled}>
        {ButtonLabels.assignToBroker}
      </Button>
      <Button variant="contained" disabled={multiRowSelectedButtonDisabled}>
        {ButtonLabels.delete}
      </Button>
      <Button variant="contained" disabled={multiRowSelectedButtonDisabled}>
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
