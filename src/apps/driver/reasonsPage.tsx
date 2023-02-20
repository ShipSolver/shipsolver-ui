import React, { useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import OuterBlueDivBox from "./components/outerBlueDivBox";
import InnerWhiteDivBox from "./components/innerWhiteDivBox";
import Box from "@mui/material/Box";
import { LargeButton } from "./components/largeButton";
import SelectorButton from "./components/selectorButton";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { moveToIncomplete } from "../../services/ticketServices";

export type ReasonsType = {
  reason: string;
  id: string;
};

export interface ReasonsProps {
  reasons: ReasonsType[];
}

interface ReasonsPageProps {
  title: string;
  reasons: ReasonsType[];
  textfieldLabel: string;
  action?: () => void;
}

export const ReasonsPage = ({
  title,
  reasons,
  action,
  textfieldLabel,
}: ReasonsPageProps) => {
  const [selected, setSelected] = useState<{ [key: string]: boolean }>(
    Object.values(reasons).reduce(
      (selected, reason) => ({ ...selected, [reason.id]: false }),
      {}
    )
  );

  const [numSelected, setNumSelected] = useState<number>(0);

  const handleSelectedClick = (id: string) => {
    if (selected[id] === false) {
      setNumSelected((numSelected) => numSelected + 1);
    } else if (selected[id] === true) {
      setNumSelected((numSelected) => numSelected - 1);
    }
    setSelected((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmitClick = () => {
    if (numSelected == 1) {
      for (const id in selected) {
        if (selected[id] === true) {
          // moveToIncomplete();
        }
      }
    } else {
      alert("Please Select ONE Option");
    }
  };

  const reasonsList = useMemo(
    () =>
      reasons.map((reason) => (
        <SelectorButton
          selected={selected[reason.id]}
          label={reason.reason}
          handleClick={() => handleSelectedClick(reason.id)}
        />
      )),
    [selected]
  );

  return (
    <StyledOuterBlueDivBox>
      <TitleContainer>
        <Title variant="h1">{title}</Title>
      </TitleContainer>
      <StyledInnerWhiteDivBox>
        <SelectorButtonWrapper>
          {reasonsList}
          <Typography variant="h3">{textfieldLabel} </Typography>
          <TextField id="outlined-multiline-static" multiline rows={3} />
        </SelectorButtonWrapper>
      </StyledInnerWhiteDivBox>
      <LargeButton label="Submit" action={() => handleSubmitClick()} />
      <LargeButton label="Cancel" action={() => action?.()} />
    </StyledOuterBlueDivBox>
  );
};

const StyledOuterBlueDivBox = styled(OuterBlueDivBox)(({ theme }) => ({
  marginTop: 20,
  paddingTop: 20,
  paddingBottom: 20,
}));

const TitleContainer = styled("div")(({ theme }) => ({
  display: "inline-block",
  position: "relative",
  left: "50%",
  transform: "translateX(-50%)",
}));

const Title = styled(Typography)(({ theme }) => ({
  variant: "h1",
  fontWeight: "bold",
  textAlign: "center",
  padding: "5px",
}));

const StyledInnerWhiteDivBox = styled(InnerWhiteDivBox)(({ theme }) => ({
  marginTop: 50,
  margin: 20,
  padding: 35,
  paddingTop: 30,
  paddingBottom: 25,
  paddingLeft: 50,
  paddingRight: 50,
}));

const SelectorButtonWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const LargeButtonWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  paddingBottom: 3,
}));
