import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { Files, PictureFile } from "../index";

import "./FileItem.css";

type DeleteFileFn = (filename: string) => void;

export function FileItem({
  file,
  deleteFile,
}: {
  file: Files;
  deleteFile: DeleteFileFn;
}) {
  return (
    <>
      <div className="file-item" key={file.name}>
        <Typography sx={{ textDecoration: "underline" }}>
          {file.name}
        </Typography>
        <IconButton onClick={() => deleteFile(file.name)} aria-label="delete">
          <ClearIcon style={{ color: "black" }} />
        </IconButton>
      </div>
    </>
  );
}

export function PictureFileItem({
  file,
  deleteFile,
}: {
  file: PictureFile;
  deleteFile: DeleteFileFn;
}) {
  return (
    <>
      <div className="picture-item" key={file.name}>
        <img src={file.imgSrc} alt="random pic" />
        <IconButton
          className="pictureBtn"
          onClick={() => deleteFile(file.name)}
          aria-label="delete"
        >
          <ClearIcon style={{ color: "black" }} />
        </IconButton>
      </div>
    </>
  );
}
