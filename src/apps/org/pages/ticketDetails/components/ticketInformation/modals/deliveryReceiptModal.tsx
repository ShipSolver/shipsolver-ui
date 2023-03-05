import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
//@ts-ignore
import { Document, Page } from "react-pdf/dist/esm/entry.vite";

export function DeliveryReceiptModal({
  buttonText,
  url,
}: {
  buttonText: string;
  url: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        type="button"
        variant="contained"
        size="small"
        onClick={() => setOpen(true)}
      >
        {buttonText}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Document file={url}>
          <Page pageNumber={1} />
        </Document>
      </Modal>
    </>
  );
}
