import { Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import OuterBlueDivBox from "./outerBlueDivBox";
import InnerWhiteDivBox from "./innerWhiteDivBox";
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
import { LargeButton } from "./largeButton";
import SelectorButton from "./selectorButton";
import { useTheme } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const CompletionPopUp = ({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [yesSelected, setYesSelected] = useState<boolean>(false);
  const [noSelected, setNoSelected] = useState<boolean>(false);

  const handleSubmit = () => {
    if (yesSelected === true && noSelected === true) {
      alert("Error! Cannot select more than one option");
    } else if (noSelected === true) {
      navigate("/incomplete-delivery");
    }
  };

  return (
    <OuterBlueDivBox
      sx={{
        position: "relative",
        top: "50%",
        left: "30%",
        transform: "translate(-30%, -50%)",
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
      </div>
      <InnerWhiteDivBox
        style={{
          marginTop: 30,
          margin: 20,
          padding: 35,
          paddingBottom: 25,
          paddingLeft: 50,
          paddingRight: 50,
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
            handleClick={() => setYesSelected((yesSelected) => !yesSelected)}
            label="YES"
          />

          <SelectorButton
            selected={noSelected}
            handleClick={() => setNoSelected((noSelected) => !noSelected)}
            label="NO"
          />
        </Box>
      </InnerWhiteDivBox>
      <LargeButton label="Submit" action={() => handleSubmit()} />
      <LargeButton label="Cancel" action={() => setModal((modal) => !modal)} />
    </OuterBlueDivBox>
  );
};
