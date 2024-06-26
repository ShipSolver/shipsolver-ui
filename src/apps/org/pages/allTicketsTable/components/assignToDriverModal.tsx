import React, { useState } from "react";
import { Checkbox, Button, Box, Modal, Typography } from "@mui/material";
import {
  assignToDriver,
  fetchAllDrivers,
} from "../../../../../services/driverServices";
import { styled } from "@mui/material/styles";
import { Spacer } from "../../../../../components/spacer";
import Loading from "../../../../../components/loading";
import { useGetUserInfo } from "../../../../../state/authentication";
import useLoadable from "../../../../../utils/useLoadable";
import ListItemButton from "@mui/material/ListItemButton";
import { LargeNumberLike } from "crypto";

interface AssignToDriverModalProps {
  disabled?: boolean;
  buttonText: string;
  getTicketIDs: () => number[];
  triggerRefetch?: () => void;
  listItem?: boolean;
}

export const AssignToDriverModal = ({
  disabled,
  buttonText,
  getTicketIDs,
  triggerRefetch,
  listItem,
}: AssignToDriverModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const { val: drivers } = useLoadable(fetchAllDrivers);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useGetUserInfo();

  const handleSubmit = async () => {
    setLoading(true);
    if (selectedDriver && drivers) {
      const driverId = drivers.filter(({ name }) => name === selectedDriver)[0]
        .userId;
      const { error } = await assignToDriver(
        getTicketIDs(),
        driverId,
        user?.userID
      );
      setLoading(false);
      if (error) {
        alert(error);
      } else {
        triggerRefetch?.();
      }
    } else {
      setLoading(false);
      alert("there was an error");
    }
    setSelectedDriver(null);
    setOpen(false);
  };

  return (
    <>
      {listItem ? (
        <ListItemButton disabled={disabled} onClick={() => setOpen(true)}>
          <Typography className="menu-text-typography">{buttonText}</Typography>
        </ListItemButton>
      ) : (
        <Button
          variant="contained"
          disabled={disabled}
          onClick={() => setOpen(true)}
        >
          {buttonText}
        </Button>
      )}

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
          <Typography variant="h3">Select a Driver</Typography>
          <Spacer height="24px" />
          {loading ? (
            <Loading />
          ) : (
            <>
              <Container>
                {drivers?.map(({ name: driver }) => (
                  <FlexDiv key={driver}>
                    <Checkbox
                      checked={driver === selectedDriver}
                      onClick={() => setSelectedDriver(driver)}
                    />
                    {driver}
                  </FlexDiv>
                ))}
              </Container>

              <Button
                onClick={handleSubmit}
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
