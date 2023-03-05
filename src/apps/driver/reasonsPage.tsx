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
  onSubmit?: (reasonId: ReasonsType["id"]) => void;
  onCancel?: () => void;
}

export const ReasonsPage = ({
  title,
  reasons,
  onSubmit,
  onCancel,
  textfieldLabel,
}: ReasonsPageProps) => {
  const [selected, setSelected] = useState<ReasonsType | null>(null);

  const handleSelect = (id: string) => {
    setSelected(reasons.find((reason) => reason.id === id) || null);
  };

  const handleSubmitClick = () => {
    selected && onSubmit?.(selected.id);
    setSelected(null);
  };

  const reasonsList = useMemo(
    () =>
      reasons.map((reason) => (
        <SelectorButton
          selected={selected?.id === reason.id}
          label={reason.reason}
          handleClick={() => handleSelect(reason.id)}
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
      <LargeButton label="Cancel" action={onCancel} />
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
