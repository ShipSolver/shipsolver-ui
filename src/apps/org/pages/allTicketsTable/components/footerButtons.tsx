import React, { useState } from "react";
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
import Loading from "../../../../../components/loading";

import { selectedTicketsAtom } from "./state/tableState";
import {
  fetchTickets,
  checkIntoInventory,
} from "../../../../../services/ticketServices";
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

  const selectedTickets = useRecoilValue(selectedTicketsAtom);

  const [loading, setLoading] = useState<boolean>(false);

  const handleGetTicketInformation = async () => {

    const ticketIds = getTicketIds(selectedTickets);
    const response = (await fetchTickets(ticketIds)) ?? [];

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

  const handleReenterIntoInventory = async () => {
    setLoading(true);
    const ticketIds = getTicketIds(selectedTickets);
    await checkIntoInventory(ticketIds);
    setLoading(false);
    triggerRefetch();
  };

  return (
    <ButtonWrapper>
      <Button
        variant="contained"
        disabled={!singleRowSelected}
        onClick={() => navigate(`/ticket-details/${getTicketIds(selectedTickets)[0]}`)}
      >
        {ButtonLabels.ticketDetails}
      </Button>
      <Button variant="contained" disabled={!singleRowSelected}>
        {ButtonLabels.pod}
      </Button>
      <Button
        variant="contained"
        disabled={!multiRowSelected}
        onClick={handleReenterIntoInventory}
      >
        {loading ? <Loading /> : ButtonLabels.enterIntoInventory}
      </Button>
      <AssignToDriverModal
        disabled={!singleRowSelected}
        getTicketIDs={() => getTicketIds(selectedTickets)}
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


export function getTicketIds(selectedTickets: {[key: string]: boolean}){
  return Object.entries(selectedTickets).filter(([_, val]) => val).map(([key, _]) => key);
}