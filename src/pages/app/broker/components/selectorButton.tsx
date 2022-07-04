import React from "react";
import Button from "@mui/material/Button";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { styled } from "@mui/material/styles";

const SelectorButton = ({
  selected,
  setSelected,
  label,
}: {
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
}) => {
  return (
    <Button
      onClick={() => setSelected(!selected)}
      variant={selected ? "contained" : "outlined"}
      color="primary"
      size="large"
      style={{
        borderRadius: "10px",
        marginBottom: "10px",
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: "1.7rem",
      }}
    >
      {label}
    </Button>
  );
};

export default SelectorButton;
