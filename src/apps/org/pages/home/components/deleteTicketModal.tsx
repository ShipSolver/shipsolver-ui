import React, { useState } from "react";
import { Button, Box, Modal, Typography } from "@mui/material";
import { deleteTickets } from "../../../../../services/ticketServices";
import { styled } from "@mui/material/styles";
import { Spacer } from "../../../../../components/spacer";
import Loading from "../../../../../components/loading";
import ListItemButton from "@mui/material/ListItemButton";

interface DeleteTicketModalProps {
  getTicketIDs: () => string[];
  triggerRefetch: () => void;
}

export const DeleteTicketModal = ({ getTicketIDs, triggerRefetch }: DeleteTicketModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteTickets(getTicketIDs().map(ticket => +ticket));
    if (res) {
      setSuccess(true);
      triggerRefetch();
    } else {
      setError(true);
      setTimeout(() => setOpen(false), 3000);
    }
    setLoading(false);
  };

  return (
    <>
      <ListItemButton onClick={() => setOpen(true)}>
        <Typography className="menu-text-typography">Delete</Typography>
      </ListItemButton>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            padding: "16px",
            borderRadius: "var(--ss-brand-border-radius)",
          }}
        >
          <Typography variant="h3">
            Are you sure you want to delete these tickets?
          </Typography>
          <Spacer height="24px" />
          {loading ? <Loading /> : null}
          {success ? <Typography>Successfully deleted</Typography> : null}
          {error ? (
            <Typography>
              There was an error deleting the ticket please try again later
            </Typography>
          ) : null}
          <Button
            onClick={handleDelete}
            sx={{ width: "100%" }}
            variant="outlined"
            disabled={loading || success || error}
          >
            Yes
          </Button>
          <Button
            onClick={() => setOpen(false)}
            sx={{ width: "100%" }}
            variant="outlined"
            disabled={loading || success || error}
          >
            No
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const FlexDiv = styled("div")`
  display: "flex";
`;
const Container = styled("div")`
  max-height: 500px;
`;
