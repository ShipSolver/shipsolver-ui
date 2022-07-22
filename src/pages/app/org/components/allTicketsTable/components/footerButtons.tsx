import React from "react";
import { useRecoilValue } from "recoil";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AssignToDriverModal } from "./assignToDriverModal";
import CsvDownloader from "react-csv-downloader";
import {
  singleRowSelectedAtom,
  multiRowSelectedAtom,
} from "./state/tableState";

import { selectedTicketIdsAtom } from "./state/tableState";
import { fetchTickets } from "../../../../../../services/ticketServices";
import _ from "lodash";

const ButtonLabels = {
  ticketDetails: "View Ticket Details",
  pod: "Review PODs",
  enterIntoInventory: "Re-enter into inventory",
  assignToDriver: "Assign to driver",
  delete: "Delete ticket(s)",
  export: "Export",
};

interface FooterButtonsProps {
  triggerRefetch: () => void;
}

export const FooterButtons = ({ triggerRefetch }: FooterButtonsProps) => {
  const navigate = useNavigate();
  const singleRowSelected = useRecoilValue(singleRowSelectedAtom);

  const multiRowSelected = useRecoilValue(multiRowSelectedAtom);

  const ticketIDs = useRecoilValue(selectedTicketIdsAtom);

  const handleGetTicketInformation = async () => {
    const response = (await fetchTickets(ticketIDs)) ?? [];
    return response.map((ticket) => {
      let newTicket = ticket;
      _.merge(newTicket, newTicket.customer);
      delete newTicket.customer;

      _.merge(newTicket, newTicket.ticketStatus);
      delete newTicket.ticketStatus;
      delete newTicket.user;

      Object.entries(ticket).forEach(([key, value]) => {
        newTicket[key] = String(value as string | number)
          .replace(/(\r\n|\n|\r)/gm, "")
          .replace(",", "");
      });
      return newTicket;
    });
  };

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
        <CsvDownloader
          datas={handleGetTicketInformation}
          filename="all-tickets.tsx"
        >
          {ButtonLabels.export}
        </CsvDownloader>
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
