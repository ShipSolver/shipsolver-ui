import React from "react";
import useLoadable from "../../../../../utils/useLoadable";
import { fetchIncompletedDeliveryReasons } from "../../../../../services/ticketServices";
import Loading from "../../../../../components/loading";
import { FormWrap } from "..";
import { Grid } from "@mui/material";

interface IncompleteDeliveryProps {
  ticketId: number;
}

export const IncompleteDelivery = ({ ticketId }: IncompleteDeliveryProps) => {
  const { val, loading, error } = useLoadable(
    fetchIncompletedDeliveryReasons,
    ticketId
  );

  if (loading) {
    return (
      <Grid item xs={3}>
        <FormWrap>
          <Loading />
        </FormWrap>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid item xs={3}>
        <FormWrap>
          There was an error fetching the reason for incompmlete delivery
        </FormWrap>
      </Grid>
    );
  }
  return (
    <Grid item xs={3}>
      <FormWrap>
        <h3>Reason for incomplete delivery</h3>
        {val?.reasonForIncomplete}
      </FormWrap>
    </Grid>
  );
};
