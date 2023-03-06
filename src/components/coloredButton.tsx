import React from "react";
import { Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ColoredButton = ({
  color,
  label,
  action,
}: {
  color: string;
  label: string;

  action?: () => void;
}) => {
  return (
    <PaperButton
      style={{
        backgroundColor: color,
        margin: 5,
        marginTop: 0,
      }}
      onClick={() => action?.()}
    >
      <Typography variant="h5" textAlign="center">
        {label}
      </Typography>
    </PaperButton>
  );
};

const PaperButton = styled(Paper)`
  display: inline-block;
  border-radius: 8px;
  cursor: pointer;
  padding: 13px 15px;
`;
