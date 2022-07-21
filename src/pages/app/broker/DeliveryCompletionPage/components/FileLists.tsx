import React from 'react'
import { signatureFile, pictureFile } from '../deliveryCompletion'
import { FileItem, PictureFileItem, SignatureFileItem } from './FileItem'

type removeFileFn = (filename: string) => void

export const PODFileList = ({files, removeFile}:{ files: pictureFile[], removeFile: removeFileFn }) => {
    const deleteFileHandler = (_name: string) => {
        removeFile(_name)
        // remove from backend as well
    }
    return (
        <ul className="file-list">
            {
                files &&
                files.map(f => (<FileItem
                    key={f.name}
                    file={f}
                    deleteFile={deleteFileHandler} />))
            }
        </ul>
    )
}

export const SignatureFileList = ({files, removeFile}:{ files: signatureFile[], removeFile: removeFileFn }) => {
    const deleteFileHandler = (_name: string) => {
        removeFile(_name)
        // remove from backend as well
    }
    return (
        <ul className="file-list">
            {
                files &&
                files.map(f => (<SignatureFileItem
                    key={f.name}
                    file={f}
                    deleteFile={deleteFileHandler} />))
            }
        </ul>
    )
}

export const PictureFileList = ({files, removeFile}:{ files: pictureFile[], removeFile: removeFileFn }) => {
    const deleteFileHandler = (_name: string) => {
        removeFile(_name)
        // remove from backend as well
    }
    return (
        <ul className="file-list">
            {
                files &&
                files.map(f => (<PictureFileItem
                    key={f.name}
                    file={f}
                    deleteFile={deleteFileHandler} />))
            }
        </ul>
    )
}