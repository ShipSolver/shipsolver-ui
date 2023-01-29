import { Modal, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import OuterBlueDivBox from "./outerBlueDivBox";
import InnerWhiteDivBox from "./innerWhiteDivBox";
import Box from "@mui/material/Box";
import { LargeButton } from "./largeButton";
import SelectorButton from "./selectorButton";

export const CompletionPopUp = ({
  isShown,
  setIsShown,
  onSubmit,
}: {
  isShown: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (actionConfirmed: boolean) => void;
}) => {
  const [actionConfirmed, setActionConfirmed] = useState<boolean>(false);

  const handleSubmit = () => {
    onSubmit(actionConfirmed);
    setIsShown(false);
  };

  const onClose = () => setIsShown(false);

  return (
    <Modal open={isShown} onClose={onClose}>
      <OuterBlueDivBox
        sx={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90vw",
          border: "2px solid #000",
          boxShadow: 24,
          paddingBottom: 10,
          paddingTop: 5,
        }}
      >
        <div
          style={{
            display: "inline-block",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Typography variant="h1" fontWeight="bold" textAlign="center">
            Did you complete the order?
          </Typography>
        </div>
        <InnerWhiteDivBox
          style={{
            marginTop: 30,
            margin: 20,
            padding: 35,
            paddingBottom: 25,
            paddingLeft: 50,
            paddingRight: 50,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SelectorButton
              selected={actionConfirmed}
              handleClick={() => setActionConfirmed(true)}
              label="YES"
            />

            <SelectorButton
              selected={!actionConfirmed}
              handleClick={() => setActionConfirmed(false)}
              label="NO"
            />
          </Box>
        </InnerWhiteDivBox>
        <LargeButton label="Submit" action={handleSubmit} />
        <LargeButton label="Cancel" action={handleSubmit} />
      </OuterBlueDivBox>
    </Modal>
  );
};
