import React, { useState } from "react";
import { Checkbox, Button, Box, Modal, Typography } from "@mui/material";
import { assignToDriver } from "../../../../../../services/driverServices";
import { styled } from "@mui/material/styles";
import { Spacer } from "../../../../../components/spacer";
import { allDriversAtom } from "./state/tableState";
import { useRecoilValue } from "recoil";
import Loading from "../../../../../components/loading";

interface AssignToDriverModalProps {
  disabled: boolean;
  buttonText: string;
  ticketIDs: string[];
  triggerRefetch: () => void;
}

export const AssignToDriverModal = ({
  disabled,
  buttonText,
  ticketIDs,
  triggerRefetch,
}: AssignToDriverModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const drivers = useRecoilValue(allDriversAtom);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    if (selectedDriver) {
      const driverId = drivers.filter(
        ({ username }) => username === selectedDriver
      )[0].userId;
      setLoading(true);
      const { error } = await assignToDriver(ticketIDs, driverId);
      setLoading(false);
      if (error != null) {
        triggerRefetch();
      } else {
        alert(error);
      }
      setOpen(false);
    }
  };

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
          {loading ? (
            <Loading />
          ) : (
            <>
              <Container>
                {drivers.map(({ username: driver }) => (
                  <FlexDiv>
                    <Checkbox
                      checked={driver === selectedDriver}
                      onClick={() => setSelectedDriver(driver)}
                    />
                    {driver}
                  </FlexDiv>
                ))}
              </Container>

              <Button
                onClick={handleClick}
                sx={{ width: "100%" }}
                variant="outlined"
                disabled={!selectedDriver}
              >
                {selectedDriver
                  ? `Assign to ${selectedDriver}`
                  : "Please select a driver"}
              </Button>
            </>
          )}
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
