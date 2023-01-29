import React, { useState, useTransition } from "react";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { Keys } from "../../types";
import Button from "@mui/material/Button";
import MenuBase from "@mui/material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography, Chip } from "@mui/material";
import Brand from "../../../../../../ShipSolverBrand";
import { filterAtom } from "../state/tableState";
import { useRecoilState } from "recoil";

interface CheckboxFilterProps {
  options: string[];
  filterKey: Keys;
}

const CheckboxFilterBase = ({ options, filterKey }: CheckboxFilterProps) => {
  const [filter, setFilter] = useRecoilState(filterAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [_, startTransition] = useTransition();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
        fullWidth
        sx={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <div>
          <Typography variant="subtitle1">Filter</Typography>

          {filter[filterKey] && typeof filter[filterKey] === "string" ? (
            <Chip
              label={filter[filterKey] as string}
              sx={{ backgroundColor: Brand.palette.secondary.main }}
            />
          ) : null}
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Container>
          {options.map((option) => (
            <MenuItem
              key={option}
              onClick={() => {
                startTransition(() => {
                  if (filter[filterKey] === option) {
                    setFilter((prev) => ({ ...prev, [filterKey]: null }));
                  } else {
                    setFilter((prev) => ({ ...prev, [filterKey]: option }));
                  }
                });
              }}
            >
              <Checkbox checked={filter[filterKey] === option} />
              {option}
            </MenuItem>
          ))}
        </Container>
      </Menu>
    </div>
  );
};

const Container = styled("div")`
  min-width: 200px;
  padding: 8px;
`;

const Menu = styled(MenuBase)`
  padding: 16px;
`;

export const CheckboxFilter = React.memo(CheckboxFilterBase);
