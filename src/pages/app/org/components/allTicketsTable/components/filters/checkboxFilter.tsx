import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { FilterProps } from "./index";
import { styled } from "@mui/material/styles";
import { Keys } from "../allTicketTableHeaders";

interface CheckboxFilterProps extends FilterProps {
  options: string[];
  filterKey: Keys;
}

export const CheckboxFilter = ({
  handleFilter,
  handleClose,
  savedFilterState,
  options,
  filterKey,
}: CheckboxFilterProps) => {
  const [checked, setChecked] = useState<string>(
    typeof savedFilterState === "string" ? savedFilterState : ""
  );

  console.log(filterKey);
  return (
    <Container>
      {options.map((option) => (
        <MenuItem
          key={option}
          onClick={() => {
            if (checked === option) {
              setChecked("");
              handleFilter(filterKey, "");
              handleClose?.("");
            } else {
              setChecked(option);
              handleFilter(filterKey, option);
              handleClose?.(option);
            }
          }}
        >
          <Checkbox checked={checked === option} />
          {option}
        </MenuItem>
      ))}
    </Container>
  );
};

const Container = styled("div")`
  min-width: 200px;
  padding: 8px;
`;
