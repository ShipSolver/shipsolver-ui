import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Spacer } from "../../../../../components/spacer";
import { useNavigate } from "react-router-dom";

interface IDeliveryReceiptModal {
  url?: string;
  handleClose: () => void;
}

export function DeliveryReceiptModal({
  url,
  handleClose
}: IDeliveryReceiptModal) {
  const navigate = useNavigate();
  return (
    <Modal open={!!url} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          bgcolor: "background.paper",
          padding: "16px",
          borderRadius: "var(--ss-brand-border-radius)",
        }}
      >
        <iframe src={url} width="700px" height="700px"/>
      </Box>
    </Modal>
  );
}
