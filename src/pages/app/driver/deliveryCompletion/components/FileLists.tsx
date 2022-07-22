import React from "react";
import { Files, PictureFile } from "../index";
import { FileItem, PictureFileItem } from "./FileItem";

type removeFileFn = (filename: string) => void;

export const PODFileList = ({
  files,
  removeFile,
}: {
  files: Files[];
  removeFile: removeFileFn;
}) => {
  const deleteFileHandler = (_name: string) => {
    removeFile(_name);
    // remove from backend as well
  };
  return (
    <ul className="file-list">
      {files &&
        files.map((f) => (
          <FileItem key={f.name} file={f} deleteFile={deleteFileHandler} />
        ))}
    </ul>
  );
};

export const PictureFileList = ({
  files,
  removeFile,
}: {
  files: PictureFile[];
  removeFile: removeFileFn;
}) => {
  const deleteFileHandler = (_name: string) => {
    removeFile(_name);
    // remove from backend as well
  };
  return (
    <ul className="file-list">
      {files &&
        files.map((f) => (
          <PictureFileItem
            key={f.name}
            file={f}
            deleteFile={deleteFileHandler}
          />
        ))}
    </ul>
  );
};
