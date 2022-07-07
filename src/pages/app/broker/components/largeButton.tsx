import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const LargeButton = ({
  label,
  action,
}: {
  label: string;
  action: () => void;
}) => {
  return (
    <LargeButtonWrapper>
      <StyledButton variant="contained" onClick={() => action()}>
        {label}
      </StyledButton>
    </LargeButtonWrapper>
  );
};

const LargeButtonWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  paddingBottom: 5,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "70vw",
  padding: 5,
  marginTop: 5,
  fontSize: "1.25rem",
  //backgroundColor: "#C5DCFA",
}));
