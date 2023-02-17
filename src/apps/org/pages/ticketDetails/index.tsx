import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";
import Brand from "../../../../ShipSolverBrand";
import { Spacer } from "../../../../components/spacer";
import { useParams } from "react-router-dom";
import {
  fetchTicket,
  fetchTicketEdits,
} from "../../../../services/ticketServices";
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
  // FormWrap,
} from "./components";

import { TicketInformationStateType } from "./components/ticketInformation/types";
import useLoadable from "../../../../utils/useLoadable";
import { useSetRecoilState } from "recoil";
import { commoditiesAtom } from "./state/commodityState";

import {
  TestEventHistory,
  TestTicketInformation,
  TestMilestones,
  TestCommodities,
} from "./test/testData";
import Loading from "../../../../components/loading";

export const TicketDetails = () => {
  const setCommodities = useSetRecoilState(commoditiesAtom);
  let { ticketId } = useParams();

  const {
    val: ticketInfo = [TestTicketInformation, TestCommodities],
    loading,
    error,
  } = useLoadable(fetchTicket, ticketId);

  /** Uncomment for storybook testing purposes */
  // const ticketInfo = [TestTicketInformation, TestCommodities]
  // const ticketId = 1;
  // const loading = false;
  // const error = false;

  useEffect(() => {
    if (ticketInfo) {
      setCommodities(ticketInfo[1]);
    }
  }, [ticketInfo]);

  if (loading || ticketInfo == null) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (error) {
    return <Container>Error fetching ticket information</Container>;
  }

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
            <TicketInformation data={ticketInfo[0]} />
            <Spacer height="18px" />
            {/* <Grid container spacing={6}>
              <Grid item xs={4}>
                <FormWrap>
                  <POD urls={ticketInfo[0].podUrls}/>
                </FormWrap>
              </Grid>

              <Grid item xs={4}>
                <FormWrap>
                  <CustomerSignature urls={ticketInfo[0].customerSignatureUrls}/>
                </FormWrap>
              </Grid>

              <Grid item xs={4}>
                <FormWrap>
                  <Pictures urls={ticketInfo[0].pictureUrls}/>
                </FormWrap>
              </Grid>
            </Grid> */}
          </Wrapper>
        </Grid>
        <Grid item xs={5}>
          <EventHistory ticketId={ticketId} />
          <Spacer height="12px" />
          <Milestones ticketId={ticketId} />
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
