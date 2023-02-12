import React from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Paper from "../../../../../components/roundedPaper";
import { styled } from "@mui/material/styles";
import { CardColumn } from "../../ticketDetails/components";
import { TestTicket } from "../test/testData";
import { TicketInformationStateType } from "../../ticketDetails/components/ticketInformation/types";
import { selectedTicketIDAtom } from "../state/selectedTicketState";
import { useSetRecoilState, useRecoilValue } from "recoil";

interface SelectDeliveryProps {
  deliveries: TicketInformationStateType[];
}

export const SelectDelivery = ({ deliveries }: SelectDeliveryProps) => {
  const selectedTicketID = useRecoilValue(selectedTicketIDAtom);
  const setSelectedTicketID = useSetRecoilState(selectedTicketIDAtom);

  const handleClick = (delivery: TicketInformationStateType) => {
    if (delivery.id != null) {
      setSelectedTicketID(delivery.id);
    } else {
      setSelectedTicketID(null);
    }
  };
  console.log("SELECTED" + selectedTicketID);

  const selectDeliveryCards = deliveries.map((delivery) => (
    <div onClick={() => handleClick(delivery)}>
      <Typography>
        <b>{delivery.consignee.address}</b>
      </Typography>
      <Typography variant="h6" color="#00000099">
        Completed by:
      </Typography>
      <Typography variant="h6" color="#00000099">
        Date
      </Typography>

      {/* <Typography>
            <b>Time:</b> {dateAndTime.toLocaleTimeString("en-CA", { hour12: false })}
        </Typography> */}
    </div>
  ));

  return (
    <CardColumn
      title="Select Delivery"
      cardContents={selectDeliveryCards}
      isEditable
      fullHeight
      customPadding="16px 16px 0px 16px"
    />
  );
};
