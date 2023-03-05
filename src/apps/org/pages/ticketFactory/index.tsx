import React from "react";
import { Tab, Tabs } from "@mui/material";
import { UploadTicket } from "./components";
import { TicketInformation } from "../ticketDetails/components";
import Brand from "../../../../ShipSolverBrand";
import { styled } from "@mui/material/styles";
import Paper from "../../../../components/roundedPaper";

export const TicketFactory = () => {
  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={(_, value) => setSelectedTab(value)}
        centered
      >
        <Tab label="Create Manually" />
        <Tab label="Create from Delivery Receipts" />
      </Tabs>
      {selectedTab ? (
        <UploadTicket />
      ) : (
        <TealBackground>
          <TicketInformation newTicketManual/>
        </TealBackground>
      )}
    </>
  );
};

const TealBackground = styled(Paper)`
  margin-top: 8px;
  background-color: ${Brand.palette.secondary.main};
`;
