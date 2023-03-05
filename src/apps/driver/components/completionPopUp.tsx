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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <InnerWhiteDivBox style={{ padding: 12, width: "80vw" }}>
            <div>
              <Typography variant="h2" fontWeight="bold" textAlign="center">
                Did you complete the order?
              </Typography>
            </div>
            <OuterBlueDivBox
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
            </OuterBlueDivBox>
            <LargeButton label="Submit" action={handleSubmit} />
            <LargeButton label="Cancel" action={onClose} />
          </InnerWhiteDivBox>
        </div>
      </div>
    </Modal>
  );
};
