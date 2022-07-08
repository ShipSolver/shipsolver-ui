import React, { useState } from "react";
import Button from "@mui/material/Button";
import MenuBase from "@mui/material/Menu";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography, Chip } from "@mui/material";
import { ValueType, DateFormat } from "./filters";
import moment from "moment";
import Brand from "../../../../../../ShipSolverBrand";

interface DropdownButtonProps {
  buttonText: string;
  content: React.ReactElement;
}

export const DropdownButton = ({
  buttonText,
  content,
}: DropdownButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [savedFilterState, setSavedFilterState] =
    useState<string | string[] | null>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleClose = (args: ValueType) => {
    if (Array.isArray(args)) {
      if (args.length > 0) {
        setSavedFilterState([
          moment(args[0]).format(DateFormat),
          " - ",
          moment(args[1]).format(DateFormat),
        ]);
      } else {
        setSavedFilterState(null);
      }
    } else {
      setSavedFilterState(args);
    }

    closeMenu();
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
      >
        <div>
          <Typography variant="subtitle1">{buttonText}</Typography>

          {savedFilterState ? (
            <Chip label={savedFilterState} sx={{ backgroundColor: Brand.palette.secondary.main }} />
          ) : null}

          {/* <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            
          </Typography> */}
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
        {React.cloneElement(content, { handleClose, savedFilterState })}
      </Menu>
    </div>
  );
};

const Menu = styled(MenuBase)`
  padding: 16px;
`;
