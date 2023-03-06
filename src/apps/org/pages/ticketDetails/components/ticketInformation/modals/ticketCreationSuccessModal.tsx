import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Spacer } from "../../../../../../../components/spacer";
import { useNavigate } from "react-router-dom";

interface ITicketCreationSuccessModal {
  ticketId: number | undefined;
  handleClose: () => void;
}

export function TicketCreationSuccessModal({
  ticketId,
  handleClose,
}: ITicketCreationSuccessModal) {
  const navigate = useNavigate();
  return (
    <Modal open={!!ticketId} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          bgcolor: "background.paper",
          padding: "16px",
          borderRadius: "var(--ss-brand-border-radius)",
        }}
      >
        <Typography variant="h3" style={{ textAlign: "center" }}>
          Succesfully created ticket and added to inventory!
        </Typography>

        <Spacer height="32px" />
        <div style={{ display: "flex" }}>
          <Button
            onClick={() => {
              handleClose();
              navigate(`/ticket-details/${ticketId}`);
            }}
            sx={{ width: "100%" }}
            variant="outlined"
          >
            View new ticket
          </Button>
          <Button onClick={handleClose} sx={{ width: "100%" }}>
            Create another ticket
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
