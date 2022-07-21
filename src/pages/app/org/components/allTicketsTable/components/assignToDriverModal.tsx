import React, { useState } from "react";
import { Checkbox, Button, Box, Modal, Typography } from "@mui/material";
import { assignToDriver } from "../../../../../../services/driverServices";
import { styled } from "@mui/material/styles";
import { Spacer } from "../../../../../components/spacer";
import { allDriversAtom } from "./state/tableState";
import { useRecoilValue } from "recoil";

interface AssignToDriverModalProps {
  disabled: boolean;
  buttonText: string;
  ticketIDs: string[];
}

export const AssignToDriverModal = ({
  disabled,
  buttonText,
  ticketIDs,
}: AssignToDriverModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [driver, setDriver] = useState<string | null>(null);
  const drivers = useRecoilValue(allDriversAtom);

  return (
    <>
      <Button
        variant="contained"
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        {buttonText}
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
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
          <Typography variant="h3">Select a Driver</Typography>
          <Spacer height="24px" />
          <Container>
            {drivers.map((driver) => (
              <FlexDiv>
                <Checkbox onClick={() => setDriver(driver)} />
                {driver}
              </FlexDiv>
            ))}
          </Container>

          <Button
            onClick={() => {
              if (driver) {
                assignToDriver(ticketIDs, driver);
              }
            }}
            sx={{ width: "100%" }}
            variant="outlined"
          >
            {`Assign to ${driver}`}
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
