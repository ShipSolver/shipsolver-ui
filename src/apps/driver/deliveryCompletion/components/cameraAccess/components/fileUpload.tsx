import React from "react";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { pictureFile } from "../../..";

type removeFileFn = (filename: string) => void;

export const PODFileUpload = ({
  files,
  setFiles,
  removeFile,
  image,
  modal,
  setModal,
}: {
  files: pictureFile[];
  setFiles: React.Dispatch<React.SetStateAction<pictureFile[]>>;
  removeFile: removeFileFn;
  image: string;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  function uploadHandler() {
    let PodFileName = "POD";
    const current = new Date();
    const date = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}-${current.getHours()}-${current.getMinutes()}-${current.getSeconds()}`;
    PodFileName = PodFileName + "-" + date;
    PodFileName = PodFileName + ".jpg";
    const file: pictureFile = {
      name: PodFileName,
      imgSrc: image,
    };
    setFiles([...files, file]);
    setModal(!modal);
  }

  return (
    <>
      <Button onClick={uploadHandler} variant="contained">
        Submit
      </Button>
    </>
  );
};
