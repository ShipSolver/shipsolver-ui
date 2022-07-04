import { Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import OuterBlueDivBox from "../../outerBlueDivBox";
import DoneIcon from "@mui/icons-material/Done";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturb";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import LargeButton from "../../largeButton";
import SelectorButton from "../../selectorButton";
import { useTheme } from "@mui/material/styles";

export const CompletionPopUp = ({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useTheme();
  const [yesSelected, setYesSelected] = useState<boolean>(false);
  const [noSelected, setNoSelected] = useState<boolean>(false);

  return (
    <OuterBlueDivBox
      sx={{
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90vw",
        border: "2px solid #000",
        boxShadow: 24,
        paddingBottom: 10,
        paddingTop: 5,
      }}
    >
      <div
        style={{
          display: "inline-block",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Typography variant="h1" fontWeight="bold" textAlign="center">
          Did you complete the order?
        </Typography>
        {/* <Typography variant="h1" fontWeight="bold" textAlign="center">
          complete
        </Typography>
        <Typography variant="h1" fontWeight="bold" textAlign="center">
          the order?
        </Typography> */}
      </div>
      <div
        style={{
          backgroundColor: "#FFF",
          marginTop: 30,
          margin: 20,
          padding: 35,
          paddingBottom: 25,
          paddingLeft: 50,
          paddingRight: 50,
          borderRadius: 8,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SelectorButton
            selected={yesSelected}
            setSelected={setYesSelected}
            label="YES"
          />

          <SelectorButton
            selected={noSelected}
            setSelected={setNoSelected}
            label="NO"
          />
        </Box>
      </div>
      <Box textAlign="center" sx={{ paddingBottom: 1 }}>
        <LargeButton variant="contained">Submit</LargeButton>
      </Box>
      <Box textAlign="center">
        <LargeButton variant="contained" onClick={() => setModal(!modal)}>
          Cancel
        </LargeButton>
      </Box>
    </OuterBlueDivBox>
  );
};
