import React, { useCallback, useState } from "react";

import Typography from "@mui/material/Typography";

import OuterBlueDivBox from "../components/outerBlueDivBox";
import InnerWhiteDivBox from "../components/innerWhiteDivBox";
import { LargeButton } from "../components/largeButton";

import { Ticket } from "../../../services/types";
import { CompletionPopUp } from "../components/completionPopUp";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { DeliveryCompletionTicketAtom } from "../../../state/deliveryCompletion";

export const CurrentDelivery = ({
  currentTicket,
}: {
  currentTicket: Ticket | null;
}) => {
  const [closeDelivery, setCloseDelivery] = useState<boolean>(false);
  const setCompletionDelivery = useSetRecoilState(DeliveryCompletionTicketAtom);
  const navigate = useNavigate();

  const handleCloseDeliveryOpen = () => setCloseDelivery(true);

  const handleSubmit = async (deliveryMarkedCompleted: boolean) => {
    if (currentTicket != null) {
      if (deliveryMarkedCompleted) {
        setCompletionDelivery(currentTicket);
        navigate("complete-delivery");
      } else {
        navigate("incomplete-delivery");
      }
    } else {
      alert("no ticket to be submitted");
    }
  };

  const timestamp = Number(currentTicket && currentTicket.timestamp);
  const date = new Date(timestamp);

  return currentTicket != null ? (
    <OuterBlueDivBox>
      <Typography variant="h3" color="#000" align="center" padding="10px">
        Current Delivery
      </Typography>
      <InnerWhiteDivBox style={{ padding: 25 }}>
        <Typography marginBottom="5px">
          {currentTicket.consigneeAddress}
        </Typography>
        <Typography color="#00000099">
          Weight: {String(currentTicket.weight)}
        </Typography>
        <Typography color="#00000099">
          REF#: {String(currentTicket.houseReferenceNumber)}
        </Typography>
        <Typography color="#00000099">
          First Party: {currentTicket.customerName}
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
        </Typography>
        <LargeButton label="Close Delivery" action={handleCloseDeliveryOpen} />
        <CompletionPopUp
          isShown={closeDelivery}
          setIsShown={setCloseDelivery}
          onSubmit={handleSubmit}
        />
      </InnerWhiteDivBox>
    </OuterBlueDivBox>
  ) : null;
};
