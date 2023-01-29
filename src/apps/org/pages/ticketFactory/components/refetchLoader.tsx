import React, { useEffect, useState } from "react";
import Loading from "../../../../../components/loading";
import { TealBackground, DropZoneInner } from "./uploadTicket";
import { checkStatus } from "../../../../../services/documentServices";
import { TicketInformationStateType } from "../../ticketDetails/components";
import { CommodityType } from "../../ticketDetails/components";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
interface RefetchLoaderProps {
  documentID: number;
  onComplete: (
    data: [TicketInformationStateType, CommodityType[], { url: string }][]
  ) => void;
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
}: RefetchLoaderProps) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    var intervalID = setInterval(async () => {
      const response = await checkStatus(documentID);
      if (response) {
        const { progress, status, documents } = response;
        setProgress(progress);
        if (status == "COMPLETE") {
          onComplete(documents);
          clearInterval(intervalID);
        }
      }
    }, 5000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <TealBackground>
      <DropZoneInner>
        <p>Processing pdf...</p>
        <CircularProgressWithLabel value={progress} />
      </DropZoneInner>
    </TealBackground>
  );
};
