import React, { useEffect, useState } from "react";
import { TealBackground, DropZoneInner } from "./uploadTicket";
import { checkStatus } from "../../../../../services/documentServices";
import { CommodityType } from "../../ticketDetails/components";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TicketInformationStateType } from "../../ticketDetails/components/ticketInformation/types";
interface RefetchLoaderProps {
  documentID: number;
  onComplete: (
    data: [TicketInformationStateType, CommodityType[], { url: string }][]
  ) => void;
  onError: (error: string) => void;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export const RefetchLoader = ({
  onComplete,
  documentID,
  onError,
}: RefetchLoaderProps) => {
  const [progress, setProgress] = useState<number>(0);

  console.log({ documentID });

  useEffect(() => {
    const intervalID = setInterval(async () => {
      checkStatus(documentID)
        .then((response) => {
          if (response) {
            const { progress, status, documents } = response;
            setProgress(progress);
            if (status == "COMPLETE") {
              onComplete(documents);
              clearInterval(intervalID);
            }
          } else {
            onError("No ticket details received");
          }
        })
        .catch((error) => {
          onError(error?.toString?.() || "Error processing pdf");
        });
    }, 5000);

    return () => clearInterval(intervalID);
  }, [documentID]);

  return (
    <TealBackground>
      <DropZoneInner>
        <p>Processing pdf...</p>
        <CircularProgressWithLabel value={progress} />
      </DropZoneInner>
    </TealBackground>
  );
};
