import React, { useState, useCallback } from "react";
import {
  PODFileList,
  SignatureFileList,
  PictureFileList,
} from "./components/FileLists";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import OuterBlueDivBox from "../components/outerBlueDivBox";
import InnerWhiteDivBox from "../components/innerWhiteDivBox";
import MediumButton from "./components/mediumButton";
import Divider from "@mui/material/Divider";

import { SignaturePopUp } from "./components/signaturePage/signaturePopUp";
import { CameraCapture } from "./components/cameraAccess/webcamAccess";

export type pictureFile = {
  name: string;
  imgSrc: string;
};

export type signatureFile = {
  name: string;
  imgSrc: string;
  blobData: ImageData
}

export function DeliveryCompletion() {
  const [podFiles, setPoDFiles] = useState<Array<pictureFile>>([]);
  const [signFiles, setSignFiles] = useState<Array<signatureFile>>([]);
  const [pictureFiles, setPictureFiles] = useState<Array<pictureFile>>([]);

  const removePoDFile = useCallback(
    (filename: string) => {
      setPoDFiles(podFiles.filter((file) => file.name !== filename));
    },
    [podFiles, setPoDFiles]
  );
  const removeSignFile = useCallback(
    (filename: string) => {
      setSignFiles(signFiles.filter((file) => file.name !== filename));
    },
    [signFiles, setSignFiles]
  );
  const removePictureFile = useCallback(
    (filename: string) => {
      setPictureFiles(pictureFiles.filter((file) => file.name !== filename));
    },
    [pictureFiles, setPictureFiles]
  );

  const [closeSignature, setCloseSignature] = useState<boolean>(false);

  const handleCloseSignatureOpen = () => setCloseSignature(true);
  const handleCloseSignatureClose = () => setCloseSignature(false);

  const [closeCamera, setCloseCamera] = useState<boolean>(false);

  const handleCloseCameraOpen = () => setCloseCamera(true);
  const handleCloseCameraClose = () => setCloseCamera(false);

  const [closePODCamera, setClosePODCamera] = useState<boolean>(false);

  const handleClosePODCameraOpen = () => setClosePODCamera(true);
  const handleClosePODCameraClose = () => setClosePODCamera(false);

  return (
    <div>
      <OuterBlueDivBox>
        <Typography variant="h2" color="#000" align="center" padding="0px">
          Delivery Completion
        </Typography>

        <InnerWhiteDivBox style={{ padding: 25 }}>
          <Typography variant="h4" align="center" padding="10px">
            Proof of Delivery (Required)
          </Typography>
          <Divider sx={{ borderBottomWidth: 2, bgcolor: "black" }} />
          <Box minHeight={"200px"}>
            <PODFileList files={podFiles} removeFile={removePoDFile} />
          </Box>
          <Grid container justifyContent="center">
            <MediumButton
              onClick={handleClosePODCameraOpen}
              variant="contained"
            >
              Add
            </MediumButton>
          </Grid>
          <Modal open={closePODCamera} onClose={handleClosePODCameraClose}>
            <CameraCapture
              modal={closePODCamera}
              setModal={setClosePODCamera}
              files={podFiles}
              removeFiles={removePoDFile}
              setFiles={setPoDFiles}
            ></CameraCapture>
          </Modal>
        </InnerWhiteDivBox>
        <InnerWhiteDivBox style={{ padding: 25 }}>
          <Typography variant="h4" align="center" padding="10px">
            Customer Signature
          </Typography>
          <Divider sx={{ borderBottomWidth: 2, bgcolor: "black" }} />
          <Box minHeight={"200px"}>
            <SignatureFileList files={signFiles} removeFile={removeSignFile} />
          </Box>
          <Grid container justifyContent="center">
            <MediumButton
              onClick={handleCloseSignatureOpen}
              variant="contained"
            >
              Add
            </MediumButton>
          </Grid>
          <Modal open={closeSignature} onClose={handleCloseSignatureClose}>
            <SignaturePopUp
              modal={closeSignature}
              setModal={setCloseSignature}
              files={signFiles}
              removeFiles={removeSignFile}
              setFiles={setSignFiles}
            ></SignaturePopUp>
          </Modal>
        </InnerWhiteDivBox>
        <InnerWhiteDivBox style={{ padding: 25 }}>
          <Typography variant="h4" align="center" padding="10px">
            Pictures (Required)
          </Typography>
          <Divider sx={{ borderBottomWidth: 2, bgcolor: "black" }} />
          <Box minHeight={"200px"}>
            <PictureFileList
              files={pictureFiles}
              removeFile={removePictureFile}
            />
          </Box>
          <Grid container justifyContent="center">
            <MediumButton onClick={handleCloseCameraOpen} variant="contained">
              Add
            </MediumButton>
          </Grid>
          <Modal open={closeCamera} onClose={handleCloseCameraClose}>
            <CameraCapture
              modal={closeCamera}
              setModal={setCloseCamera}
              files={pictureFiles}
              removeFiles={removePictureFile}
              setFiles={setPictureFiles}
            ></CameraCapture>
          </Modal>
        </InnerWhiteDivBox>
      </OuterBlueDivBox>
      <Box textAlign="center">
        <MediumButton variant="contained">Submit</MediumButton>
        <MediumButton variant="contained">Cancel</MediumButton>
      </Box>
    </div>
  );
}
