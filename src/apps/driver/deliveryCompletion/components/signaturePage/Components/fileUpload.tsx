import React, { useRef } from "react";
import { toPng } from "html-to-image";

import Box from "@mui/material/Box";
import MediumButton from "../../mediumButton";

import { signatureFile } from "../../..";

type SignFileUploadProps = {
  signFiles: signatureFile[];
  setSignFiles: React.Dispatch<React.SetStateAction<signatureFile[]>>;
  removeFile: removeFileFn;
  name: string;
  imageSrc: string;
  bitData: ImageData | undefined;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type removeFileFn = (filename: string) => void;

export const FileUpload = (props: SignFileUploadProps) => {
  const { signFiles, setSignFiles, bitData, name, imageSrc, modal, setModal } =
    props;

  function uploadHandler() {
    const nameArry: string[] = name.split(" ");
    let signFileName: string = "signature";
    for (let i = 0; i < nameArry.length; i++) {
      signFileName = signFileName + "-" + nameArry[i];
    }
    const current = new Date();
    const date = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}-${current.getHours()}-${current.getMinutes()}-${current.getSeconds()}`;
    signFileName = signFileName + "-" + date;
    signFileName = signFileName + ".jpg";

    if (bitData) {
      const file: signatureFile = {
        name: signFileName,
        imgSrc: imageSrc,
        blobData: bitData,
      };

      setSignFiles([...signFiles, file]);
      setModal(!modal);
      // upload to backend
    } else {
      console.log("Blob data is undefined");
    }
  }

  return (
    <>
      <Box textAlign="center">
        <MediumButton onClick={uploadHandler} variant="contained">
          Submit
        </MediumButton>
      </Box>
    </>
  );
};
