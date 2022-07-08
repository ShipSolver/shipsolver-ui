import React from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Grid
} from "@mui/material";
import Brand from "../../../../../ShipSolverBrand";
import { Spacer } from "../../../../components/spacer";
import { useParams } from 'react-router-dom';

import {
  TitlePaper,
  CommodityType,
  Milestones,
  MilestoneType,
  POD,
  Pictures,
  CustomerSignature,
  EventHistory,
  EventHistoryType,
  TicketInformation,
  TicketInformationStateType,
  FormWrap
} from "./components";

import {
  TestEventHistory,
  TestTicketInformation,
  TestMilestones,
  TestCommodities,
} from "./test/testData";

export const TicketDetails = () => {

  let { ticketId } = useParams();

  console.log("ticketId: ", ticketId);

  return (
    <Container>
      <Grid container spacing={4} columns={24}>
        <Grid item xs={19} spacing={2}>
          <Wrapper>
            <TitlePaper>
              <Typography variant="h2" fontWeight="bold">
                Ticket Information
              </Typography>
            </TitlePaper>
            <TicketInformation data={TestTicketInformation} commodities={TestCommodities} />
            <Spacer height="18px" />
            <Grid container spacing={6}>
              <Grid item xs={4}>
                <FormWrap>
                  <POD />
                </FormWrap>
              </Grid>

              <Grid item xs={4}>
                <FormWrap>
                  <CustomerSignature />
                </FormWrap>
              </Grid>

              <Grid item xs={4}>
                <FormWrap>
                  <Pictures />
                </FormWrap>
              </Grid>
            </Grid>
          </Wrapper>
        </Grid>
        <Grid item xs={5}>
          <EventHistory events={TestEventHistory} />
          <Spacer height="8px" />
          <Milestones milestones={TestMilestones} />
        </Grid>
      </Grid>
    </Container>
  );
};

const Wrapper = styled("div")`
  background-color: ${Brand.palette.secondary.main};
  border-radius: var(--ss-brand-border-radius);
  padding: 16px;
`;

const Container = styled("div")`
  padding: 8px;
`;
