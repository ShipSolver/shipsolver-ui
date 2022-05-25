import React from "react";
import Button from "@mui/material/Button";
import MenuBase from "@mui/material/Menu";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


interface DropdownButtonProps {
  buttonText: string;
  content: React.ReactNode;
}

export const DropdownButton = ({
  buttonText,
  content
}: DropdownButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
      >
        {buttonText}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {content}
      </Menu>
    </div>
  );
};


const Menu = styled(MenuBase)`
  padding: 16px;
`