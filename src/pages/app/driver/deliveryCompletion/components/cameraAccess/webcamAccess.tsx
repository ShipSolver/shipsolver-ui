import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

import OuterBlueDivBox from "../../../components/outerBlueDivBox";
import { Button, Stack, Box } from "@mui/material";
import { pictureFile } from "../..";
import { PODFileUpload } from "./components/fileUpload";

type removeFileFn = (filename: string) => void;

const videoConstraints = {
  width: 300,
  height: 600,
  facingMode: "user",
};

export const CameraCapture = ({
  modal,
  setModal,
  files,
  setFiles,
  removeFiles,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  files: pictureFile[];
  setFiles: React.Dispatch<React.SetStateAction<pictureFile[]>>;
  removeFiles: removeFileFn;
}) => {
  const [isPictureTaken, setIsPictureTaken] = useState(false);

  const webcamRef = useRef<Webcam>(null);
  const webcamPhotoRef = useRef<string>("");
  const capture = React.useCallback(() => {
    webcamPhotoRef.current = webcamRef.current?.getScreenshot() ?? "";
    setIsPictureTaken(true);
  }, [webcamRef]);

  const handleBack = () => {
    if (isPictureTaken === false) {
      setModal(!modal);
    } else {
      setIsPictureTaken(false);
    }
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        marginTop: "50vh",
      }}
    >
      <OuterBlueDivBox
        sx={{
          position: "fixed",
          maxHeight: "85vh",
          border: "2px solid #000",
          boxShadow: 24,
          paddingBottom: 10,
          paddingTop: 2,
          display: "inline-block",
        }}
      >
        {isPictureTaken === false && (
          <Webcam
            audio={false}
            height={600}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            videoConstraints={videoConstraints}
          />
        )}
        {isPictureTaken === true && (
          <img src={webcamPhotoRef.current} alt="POD scan" />
        )}
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Stack spacing={0.5} direction="row">
            <Button variant="contained" onClick={handleBack}>
              Back
            </Button>
            {isPictureTaken === false && (
              <Button variant="contained" onClick={capture}>
                Capture photo
              </Button>
            )}
            {isPictureTaken === true && (
              <PODFileUpload
                files={files}
                setFiles={setFiles}
                removeFile={removeFiles}
                image={webcamPhotoRef.current}
                modal={modal}
                setModal={setModal}
              />
            )}
          </Stack>
        </Box>
      </OuterBlueDivBox>
    </Box>
  );
};
