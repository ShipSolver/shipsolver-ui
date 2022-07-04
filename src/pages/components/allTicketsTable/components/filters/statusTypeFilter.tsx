import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { FilterProps } from './index';

const options = [
  "Inventory",
  "Assigned",
  "In-progress",
  "Incomplete",
  "Delivered",
];



export const StatusTypeFilter = ({ handleFilter }: FilterProps) => {
  const [checked, setChecked] = useState<string>("");
  return (
    <>
      {options.map((option) => (
        <MenuItem
          onClick={() => {
            setChecked(option);
            handleFilter(option);
          }}
        >
          <Checkbox checked={checked === option} />
          {option}
        </MenuItem>
      ))}
    </>
  );
};
