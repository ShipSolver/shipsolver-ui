import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { files, pictureFile } from "../index";

import "./FileItem.css";

type deleteFileFn = (filename: string) => void;

export function FileItem({
  file,
  deleteFile,
}: {
  file: files;
  deleteFile: deleteFileFn;
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
  file: pictureFile;
  deleteFile: deleteFileFn;
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
