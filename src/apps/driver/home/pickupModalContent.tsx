import React from "react";

import Typography from "@mui/material/Typography";
import InnerWhiteDivBox from "../components/innerWhiteDivBox";
import { LargeButton } from "../components/largeButton";

import { Ticket } from "../../../services/types";

import { useNavigate } from "react-router-dom";

export const PickupModalContent = ({
  ticket,
  onClose,
}: {
  ticket: Ticket;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const timestamp = Number(ticket.timestamp);
  const date = new Date(timestamp);
  return (
    <>
      <Typography variant="h2" align="center" padding="40px">
        Accept Pickup?
      </Typography>

      <InnerWhiteDivBox style={{ padding: 25, marginBottom: 30 }}>
        <Typography variant="h4" marginBottom="5px">
          <b>{ticket.consigneeAddress}</b>
        </Typography>
        <Typography color="#00000099">
          Weight: {String(ticket.weight)}
        </Typography>
        <Typography color="#00000099">
          REF#: {String(ticket.houseReferenceNumber)}
        </Typography>
        <Typography color="#00000099">
          First Party: {ticket.customer.name}
        </Typography>
        <Typography color="#00000099">
          Date/Time Assigned:{" "}
          {date.toLocaleString("en-CA", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          {date.toLocaleTimeString("en-CA", {
            hour: "numeric",
            minute: "2-digit",
          })}
          <Typography color="#00000099">
            Barcode: {String(ticket.barcodeNumber)}
          </Typography>
        </Typography>
      </InnerWhiteDivBox>
      <LargeButton label="Accept" action={() => alert("action")} />
      <LargeButton label="Decline" action={() => navigate("/decline-pickup")} />
      <LargeButton label="Go Back" action={() => onClose()} />
    </>
  );
};
