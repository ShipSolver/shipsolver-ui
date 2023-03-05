import React from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/styles";

const SelectorButton = ({
  selected,
  label,
  handleClick,
}: {
  selected: boolean;
  label: string;
  handleClick?: () => void;
}) => {
  return (
    <Button
      onClick={() => {
        handleClick?.();
      }}
      variant={selected ? "contained" : "outlined"}
      color="primary"
      size="large"
      style={{
        borderRadius: "8px",
        marginBottom: "10px",
        fontSize: "1.4rem",
        lineHeight: "1.5",
        fontWeight: "bold",
      }}
    >
      {label}
    </Button>
  );
};

export default SelectorButton;
