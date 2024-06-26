import { Typography, TextField } from "@mui/material";
import React, { useMemo, useState, useRef } from "react";

import OuterBlueDivBox from "../../../components/outerBlueDivBox";
import Box from "@mui/material/Box";
import MediumButton from "../mediumButton";

import Canvas from "./canvasComponents/Canvas";
import { FileUpload } from "./Components/fileUpload";

import { signatureFile } from "../..";

type removeFileFn = (filename: string) => void;

export const SignaturePopUp = ({
  modal,
  setModal,
  files,
  setFiles,
  removeFiles,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  files: signatureFile[];
  setFiles: React.Dispatch<React.SetStateAction<signatureFile[]>>;
  removeFiles: removeFileFn;
}) => {
  const [customerName, setCustomerName] = useState<string>("");
  const [customerSignature, setCustomerSignature] = useState<string>("");
  const [signatureBlobData, setSignatureBlobData] = useState<ImageData>();
  const [clearBoolean, setClearBoolean] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(event.target.value);
  };

  const onSaveImageFn = (image: string) => {
    setCustomerSignature(image);
  };

  const onSaveBitDataFn = (bitData: ImageData | undefined) => {
    setSignatureBlobData(bitData);
  };

  const ref = useRef<HTMLDivElement>(null);

  return (
    <OuterBlueDivBox
      sx={{
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90vw",
        maxHeight: "85vh",
        border: "2px solid #000",
        boxShadow: 24,
        paddingBottom: 10,
        paddingTop: 2,
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
        <Typography variant="h3" fontWeight="bold" textAlign="center">
          Customer Signature
        </Typography>
      </div>
      <div
        style={{
          backgroundColor: "#FFF",
          marginTop: 30,
          margin: 5,
          padding: 35,
          paddingBottom: 25,
          paddingLeft: 50,
          paddingRight: 50,
          borderRadius: 8,
        }}
      >
        <Box ref={ref} sx={{ alignItems: "center" }}>
          <Canvas
            width={"70%"}
            height={"50%"}
            onSaveImage={onSaveImageFn}
            onSaveBitData={onSaveBitDataFn}
            onClearTrigger={clearBoolean}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: 1,
              marginTop: "20px",
            }}
          >
            <Typography sx={{ paddingRight: "5px" }}>Customer Name</Typography>
            <TextField
              onChange={handleChange}
              sx={{ flex: 1 }}
              id="customer-name"
              variant="outlined"
            />
          </Box>
        </Box>
      </div>
      <Box textAlign="center" sx={{ paddingBottom: 1 }}>
        <FileUpload
          signFiles={files}
          setSignFiles={setFiles}
          removeFile={removeFiles}
          name={customerName}
          imageSrc={customerSignature}
          bitData={signatureBlobData}
          modal={modal}
          setModal={setModal}
        />
        <MediumButton
          onClick={() => setClearBoolean(!clearBoolean)}
          variant="contained"
        >
          Clear
        </MediumButton>
        <MediumButton variant="contained" onClick={() => setModal(!modal)}>
          Cancel
        </MediumButton>
      </Box>
    </OuterBlueDivBox>
  );
};

export default SignaturePopUp;
