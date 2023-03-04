import React, { useState, useEffect } from "react";
import {
  fetchTicket,
  approveDelivery,
  rejectDelivery,
} from "../../../../services/ticketServices";
import { useParams } from "react-router-dom";
import useLoadable from "../../../../utils/useLoadable";
import { styled } from "@mui/material/styles";
import Brand from "../../../../ShipSolverBrand";

import { Grid, Typography, Box, Button } from "@mui/material";
import { POD, CustomerSignature, Pictures } from "../ticketDetails/components";
import { IncompleteDelivery } from "./components/incompleteDelivery";
import { Spacer } from "../../../../components/spacer";
import { TicketInformation } from "../ticketDetails/components";

import { useSetRecoilState } from "recoil";
import { commoditiesAtom } from "../ticketDetails/state/commodityState";

import Loading from "../../../../components/loading";
import { TestTicket } from "./test/testData";
import { SelectDelivery } from "./components/selectDelivery";
import { ColoredButton } from "../../../../components/coloredButton";
import { TicketInformationStateType } from "../ticketDetails/components/ticketInformation/types";
import { selectedTicketIDAtom } from "./state/selectedTicketState";
import { useRecoilValue } from "recoil";
import { fetchTicketsForStatus } from "../../../../services/ticketServices";

interface IDeliveryReview {
  completeDelivery?: boolean;
}
export const DeliveryReview = ({ completeDelivery }: IDeliveryReview) => {
  //   const setCommodities = useSetRecoilState(commoditiesAtom);
  //   let { ticketId } = useParams();

  //   const {
  //     val: ticketInfo,
  //     loading,
  //     error,
  //   } = useLoadable(fetchTicket, ticketId ?? "");

  //   if (loading || ticketInfo == null) {
  //     return (
  //       <Container>
  //         <Loading />
  //       </Container>
  //     );
  //   }

  //   setCommodities(ticketInfo[1]);

  const [selectedTicket, setSelectedTicket] =
    useState<TicketInformationStateType | undefined>();
  const selectedTicketID = useRecoilValue(selectedTicketIDAtom);

  useEffect(() => {
    (async () => {
      if (selectedTicketID) {
        const ticket = TestTicket[Number(selectedTicketID) - 1];
        setSelectedTicket(ticket);
      } else {
        setSelectedTicket(undefined);
      }
    })();
  }, [selectedTicket, selectedTicketID, setSelectedTicket]);

  console.log("PODREVIEW" + selectedTicketID);
  console.log(selectedTicket);
  return (
    <Container>
      <Grid container spacing={2} columns={24}>
        <Grid item xs={8}>
          <SelectDelivery onSelectTicket={() => {}} />
        </Grid>
        <Grid item xs={16} spacing={2}>
          <Wrapper>
            <TicketInformation
              data={selectedTicket}
              deliveryReviewComplete={completeDelivery}
            />
          </Wrapper>
          <Spacer height="18px" />
        </Grid>
        {completeDelivery ? (
          <>
            <Grid item xs={6}>
              <FormWrap>
                <POD />
              </FormWrap>
            </Grid>

            <Grid item xs={6}>
              <FormWrap>
                <CustomerSignature />
              </FormWrap>
            </Grid>

            <Grid item xs={6}>
              <FormWrap>
                <Pictures />
              </FormWrap>
            </Grid>
            <Grid item xs={6}>
              <ButtonWrapper>
                <Button
                  onClick={() => {
                    if (selectedTicketID) {
                      approveDelivery(selectedTicketID);
                      setSelectedTicket(undefined);
                    }
                  }}
                  variant="outlined"
                >
                  Approve POD
                </Button>
                <Button
                  onClick={() => {
                    if (selectedTicketID) {
                      rejectDelivery(selectedTicketID);
                      setSelectedTicket(undefined);
                    }
                  }}
                  variant="outlined"
                >
                  Reject POD
                </Button>
              </ButtonWrapper>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={8}></Grid>

            <Grid item xs={8}>
              <FormWrap>
                <IncompleteDelivery />
              </FormWrap>
            </Grid>
            <Grid item xs={8}>
              {/* <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                > */}
              <ButtonWrapper>
                <ColoredButton
                  color="#C5FAD180"
                  label="Re-enter Into Inventory"
                />
                <ColoredButton color="#FAC5C580" label="Delete Ticket" />
              </ButtonWrapper>
              {/* </div> */}
            </Grid>
          </>
        )}
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

const FormWrap = styled(Box)`
  background-color: white;
  padding: 16px;
  border: 1px solid black;
  border-radius: var(--ss-brand-border-radius);
  word-wrap: break-word;
`;

const ButtonWrapper = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
