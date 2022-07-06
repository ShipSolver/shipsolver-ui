import React from 'react'

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import OuterBlueDivBox from "./components/outerBlueDivBox";
import InnerBlueDivBox from "./components/innerBlueDivBox";
import InnerWhiteDivBox from "./components/innerWhiteDivBox";
import LargeButton from "./components/largeButton";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

function DeliveryCompletion() {
  return (
    <div>
        <OuterBlueDivBox>
          <Typography variant="h1" color="#000" align="center" padding="10px">
            Delivery Completion
          </Typography>
          <InnerWhiteDivBox style={{ padding: 25 }}>
            Some stuff
          </InnerWhiteDivBox>
          <InnerWhiteDivBox style={{ padding: 25 }}>
            Some stuff
          </InnerWhiteDivBox>
          <InnerWhiteDivBox style={{ padding: 25 }}>
            Some stuff
          </InnerWhiteDivBox>
        </OuterBlueDivBox>
        <Box textAlign="center">
          <LargeButton variant="contained">Submit</LargeButton>
          <LargeButton variant="contained">Cancel</LargeButton>
        </Box>
      </div>
  )
}

export default DeliveryCompletion
