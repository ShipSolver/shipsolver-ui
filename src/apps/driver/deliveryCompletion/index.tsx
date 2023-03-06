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

import OuterBlueDivBox from "../components/outerBlueDivBox";
import InnerWhiteDivBox from "../components/innerWhiteDivBox";
import MediumButton from "./components/mediumButton";
import Divider from "@mui/material/Divider";

import { SignaturePopUp } from "./components/signaturePage/signaturePopUp";
import { CameraCapture } from "./components/cameraAccess/webcamAccess";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { DeliveryCompletionTicketAtom } from "../../../state/deliveryCompletion";
import {
  markTicketAsDelivered,
  uploadTicketImage,
} from "../../../services/ticketServices";
import { Navigate, useNavigate } from "react-router-dom";

export type pictureFile = {
  name: string;
  imgSrc: string;
};

export type signatureFile = {
  name: string;
  imgSrc: string;
  blobData: ImageData;
};

// const blobToFile: (blob: Blob, fileName: string) => File = (
//   blob: Blob,
//   fileName: string
// ) => {
//   return new File([blob], fileName, { lastModified: new Date().getTime() });
// };

// const imageSrcToFile = async (imageSrc: string, fileName: string) => {
//   try {
//     console.log({ imageSrc, fileName });
//     const blob = await fetch(imageSrc).then((r) => r.blob());
//     return blobToFile(blob, fileName);
//   } catch (e: any) {
//     alert(e?.toString?.() || "Error saving blob image");
//   }

//   return null;
// };

export default function DeliveryCompletion() {
  const navigate = useNavigate();

  const [podFiles, setPoDFiles] = useState<Array<pictureFile>>([]);
  const [signFiles, setSignFiles] = useState<Array<signatureFile>>([]);
  const [pictureFiles, setPictureFiles] = useState<Array<pictureFile>>([]);

  const completionDelivery = useRecoilValue(DeliveryCompletionTicketAtom);
  const resetCompletionDelivery = useResetRecoilState(
    DeliveryCompletionTicketAtom
  );

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

  const handleSubmit = async () => {
    if (
      completionDelivery != null &&
      podFiles.length > 0 &&
      signFiles.length > 0
    ) {
      console.log({ podFiles, signFiles, pictureFiles });
      if (
        pictureFiles.length < 1 ||
        podFiles.length < 1 ||
        signFiles.length < 1
      ) {
        alert("Please take all pictures");
        return;
      }
      const signFileItem = signFiles[0];
      const signFile = await imageSrcToFile(
        signFileItem.imgSrc,
        signFileItem.name
      );
      if (signFile == null) return;
      const { s3Link: s3LinkSignature, error: errorSignature } =
        await uploadTicketImage({
          file: signFile,
        });

      if (errorSignature || s3LinkSignature == null) {
        alert(errorSignature);
        return;
      }
      let s3LinkExtraPicture: string | null = null;
      const s3LinkError: string | null = null;

      if (pictureFiles.length > 0) {
        const extraPictureFileItem = pictureFiles[0];
        const extraPictureFile = await imageSrcToFile(
          extraPictureFileItem.imgSrc,
          extraPictureFileItem.name
        );
        if (extraPictureFile == null) return;
        const { s3Link: s3LinkExtraPictureTemp, error: errorExtraPicture } =
          await uploadTicketImage({
            file: extraPictureFile,
          });
        s3LinkExtraPicture = s3LinkExtraPictureTemp;
        if (errorExtraPicture) {
          alert(errorExtraPicture);
        }
      }

      const { error } = await markTicketAsDelivered({
        userId: String(completionDelivery.ticketStatus.assignedTo),
        ticketId: String(completionDelivery.ticketId),
        picture1: pictureFiles[0].imgSrc,
        picture2: pictureFiles[1]?.imgSrc,
        POD: podFiles[0].imgSrc,
        customerSignature: signFiles[0].imgSrc,
      });
      if (error == null) {
        navigate("/");
      } else {
        alert(error);
      }
      resetCompletionDelivery();
    } else {
      alert("No delivery to be submitted or pictures not taken");
    }
  };

  return completionDelivery == null ? (
    <Navigate to="/" />
  ) : (
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
        <MediumButton variant="contained" onClick={handleSubmit}>
          Submit
        </MediumButton>
        <MediumButton
          onClick={() => {
            resetCompletionDelivery();
            navigate("/");
          }}
          variant="contained"
        >
          Cancel
        </MediumButton>
      </Box>
    </div>
  );
}
