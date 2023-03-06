import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spacer } from "../../../../components/spacer";
import {
  fetchTicket,
  fetchTicketEdits,
} from "../../../../services/ticketServices";
import Brand from "../../../../ShipSolverBrand";
import {
  EventHistory,
  Milestones,
  TicketInformation,
  TitlePaper,
} from "./components";

import { useSetRecoilState } from "recoil";
import useLoadable from "../../../../utils/useLoadable";
import { commoditiesAtom } from "./state/commodityState";

import Loading from "../../../../components/loading";
import { TestCommodities, TestTicketInformation } from "./test/testData";

export const TicketDetails = () => {
  const setCommodities = useSetRecoilState(commoditiesAtom);
  const { ticketId } = useParams();

  const {
    val: ticketInfo = [TestTicketInformation, TestCommodities],
    loading,
    error,
  } = useLoadable(fetchTicket, +(ticketId ?? -1));

  const {
    val: ticketEdits,
    loading: loadingTicketEdits,
    error: ticketEditsError,
    triggerRefetch: refetchTicketEdits,
  } = useLoadable(fetchTicketEdits, ticketId);

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
            <TicketInformation
              data={ticketInfo[0]}
              refetchTicketEdits={refetchTicketEdits}
            />
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
          <EventHistory
            ticketEdits={ticketEdits}
            loading={loadingTicketEdits}
            error={ticketEditsError}
          />
          <Spacer height="24px" />
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
