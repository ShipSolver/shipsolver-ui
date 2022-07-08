import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CommodityType } from "./commodities";
import { InputField, InputContainer } from "./ticketInformation";
import InputLabel from "@mui/material/InputLabel";
import { Spacer } from "../../../../../components/spacer";

interface CreateCommodityModalProps {
  open: boolean;
  handleClose: () => void;
}

export const CreateCommodityModal = ({
  open,
  handleClose,
}: CreateCommodityModalProps) => {
  const [commodity, setCommodity] = useState<CommodityType>({
    description: "",
    weight: "",
    dimensions: "",
  });

  const handleCreateCommodity = () => {
    console.log(commodity);
    handleClose();
  };

  const handleChange = (field: string, value: string) => {
    setCommodity((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          padding: "16px",
          borderRadius: "var(--ss-brand-border-radius)",
        }}
      >
        <Typography variant="h3">New Commodity</Typography>
        <Spacer height="24px" />
        <InputContainer>
          <InputLabel>Description</InputLabel>
          <InputField
            size="small"
            value={commodity.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Weight</InputLabel>
          <InputField
            size="small"
            value={commodity.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Dimensions</InputLabel>
          <InputField
            size="small"
            value={commodity.dimensions}
            onChange={(e) => handleChange("dimensions", e.target.value)}
          />
        </InputContainer>
        <Spacer height="32px" />

        <Button
          onClick={() => handleCreateCommodity()}
          sx={{ width: "100%" }}
          variant="outlined"
        >
          Create Commodity
        </Button>
      </Box>
    </Modal>
  );
};
