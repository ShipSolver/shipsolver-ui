import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import useLoadable from "../../../../../utils/useLoadable";
import { FormWrap } from "../";
import {
  POD,
  CustomerSignature,
  Pictures,
} from "../../ticketDetails/components";
import { fetchCompletedDeliveryFiles } from "../../../../../services/ticketServices";

export function CompletedDeliveryFiles({ ticketId }: { ticketId: number }) {
  const { val, loading: loading } = useLoadable(
    fetchCompletedDeliveryFiles,
    ticketId
  );

  const [podUrl, setPodUrl] = useState<string>();
  const [signatureUrl, setSignatureUrl] = useState<string>();
  const [picturesUrl, setPicturesUrl] = useState<string[]>();
  
  useEffect(() => {
    if (val) {
      setPodUrl(val["POD.jpeg"]);
      setSignatureUrl(val["Picture3.jpeg"]);
      let pictures = [val["Picture1.jpeg"], val["Picture2.jpeg"]].filter(
        (val) => val
      );
      if (pictures.length) {
        setPicturesUrl(pictures);
      }
    }
  }, [val]);

  return (
    <>
      <Grid item xs={3}>
        <FormWrap>
          <POD loading={loading} url={podUrl} />
        </FormWrap>
      </Grid>
      <Grid item xs={3}>
        <FormWrap>
          <CustomerSignature loading={loading} url={signatureUrl} />
        </FormWrap>
      </Grid>
      <Grid item xs={3}>
        <FormWrap>
          <Pictures loading={loading} urls={picturesUrl} />
        </FormWrap>
      </Grid>
    </>
  );
}
