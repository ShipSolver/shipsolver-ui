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
  const theme = useTheme();
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
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: "1.5rem",
        fontWeight: "bold",
      }}
    >
      {label}
    </Button>
  );
};

export default SelectorButton;
