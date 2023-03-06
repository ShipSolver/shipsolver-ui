import React, { useState, useMemo} from "react";
import {
  fetchTicket,
  approveDelivery,
  rejectDelivery,
} from "../../../../services/ticketServices";
import { styled } from "@mui/material/styles";
import Brand from "../../../../ShipSolverBrand";

import { Grid, Box, Button, Snackbar, Alert } from "@mui/material";
import { POD, CustomerSignature, Pictures } from "../ticketDetails/components";
import { IncompleteDelivery } from "./components/incompleteDelivery";
import { Spacer } from "../../../../components/spacer";
import { TicketInformation } from "../ticketDetails/components";

import { SelectDelivery } from "./components/selectDelivery";
import { ColoredButton } from "../../../../components/coloredButton";
import { TicketInformationStateType } from "../ticketDetails/components/ticketInformation/types";
import { convertTicketToTicketInformation } from "../../../../services/ticketServices";
import { Ticket } from "../../../../services/types";
import { CompletedDeliveryFiles } from "./components/completedDeliveryFiles";
import { useRecoilValue } from "recoil";
import { completedTicketsRefetchAtom } from "./state/refetchAtom";
interface IDeliveryReview {
  completeDelivery?: boolean;
}
export const DeliveryReview = ({ completeDelivery }: IDeliveryReview) => {
  const [selectedTicket, setSelectedTicket] =
    useState<TicketInformationStateType | undefined>();

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const refetch = useRecoilValue(completedTicketsRefetchAtom);

  const handleClose = () => {
    if (success) {
      setSuccess(null);
    }

    if (error) {
      setError(null);
    }
  };

  const footerContent = useMemo(() => {
    if (!selectedTicket?.ticketId) {
      return null;
    }

    if (completeDelivery) {
      return (
        <>
          <CompletedDeliveryFiles ticketId={selectedTicket.ticketId} />
          <Grid item xs={3}>
            <ButtonWrapper>
              <Button
                onClick={async () => {
                  const error = await approveDelivery(
                    selectedTicket!.ticketId!
                  );
                  if (!error) {
                    setSelectedTicket(undefined);
                    setSuccess("Successfully approved POD");
                  } else {
                    setError(error);
                  }
                }}
                variant="outlined"
                disabled={!selectedTicket?.ticketId}
              >
                Approve POD
              </Button>
              <Button
                onClick={async () => {
                  const error = await rejectDelivery(selectedTicket!.ticketId!);
                  if (!error) {
                    setSelectedTicket(undefined);
                    refetch();
                    setSuccess("Succesfully rejected POD");
                  } else {
                    setError(error);
                  }
                }}
                variant="outlined"
                disabled={!selectedTicket?.ticketId}
              >
                Reject POD
              </Button>
            </ButtonWrapper>
          </Grid>
        </>
      );
    }

    return (
      <>
        <Grid item xs={8}></Grid>
        <Grid item xs={8}>
          <FormWrap>
            <IncompleteDelivery />
          </FormWrap>
        </Grid>
        <Grid item xs={8}>
          <ButtonWrapper>
            <ColoredButton color="#C5FAD180" label="Re-enter Into Inventory" />
            <ColoredButton color="#FAC5C580" label="Delete Ticket" />
          </ButtonWrapper>
        </Grid>
      </>
    );
  }, [selectedTicket]);

  return (
    <Container>
      <Grid container spacing={6} xs={12}>
          <Grid item xs={4}>
            <SelectDelivery
              onSelectTicket={(ticket: Ticket) => {
                setSelectedTicket(convertTicketToTicketInformation(ticket));
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <Wrapper>
              <TicketInformation
                data={selectedTicket}
                deliveryReviewComplete={completeDelivery}
                key={selectedTicket?.ticketId}
              />
            </Wrapper>
            <Spacer height="18px" />
          </Grid>
          {footerContent}

      </Grid>
      <Snackbar
        open={!!success || !!error}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {success ? (
          <Alert
            severity="success"
            onClose={handleClose}
            sx={{ width: "100%" }}
          >
            {success}
          </Alert>
        ) : (
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}
      </Snackbar>
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

export const FormWrap = styled(Box)`
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
