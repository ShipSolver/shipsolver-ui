import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
//@ts-ignore
import { Document, Page } from "react-pdf/dist/esm/entry.vite";
import { Paper } from "@mui/material";

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
        style={{ fontSize: "16px" }}
        onClick={() => setOpen(true)}
      >
        {buttonText}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper sx={{ width: "50vw", height: "100%", margin: 12, padding: 4 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
            <div
              style={{
                overflow: "auto",
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
              }}
            >
              <Document file={url}>
                <Page pageNumber={1} />
              </Document>
            </div>
          </Paper>
        </div>
      </Modal>
    </>
  );
}
