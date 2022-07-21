import React from 'react'
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { signatureFile, pictureFile } from '../deliveryCompletion'

import './FileItem.css'

type deleteFileFn = (filename: string) => void


export function FileItem({file, deleteFile}: {file:pictureFile, deleteFile: deleteFileFn}) {
  return (
    <>
        <div
            className="file-item"
            key={file.name}>
            <Typography sx={{textDecoration: 'underline'  }} >{file.name}</Typography>
            <IconButton onClick={() => deleteFile(file.name)} aria-label="delete">
                <ClearIcon style={{ color: 'black' }} />
            </IconButton>
        </div>
    </>
  )
}

export function SignatureFileItem({file, deleteFile}: {file:signatureFile, deleteFile: deleteFileFn}) {
  return (
    <>
        <div
            className="picture-item"
            key={file.name}>
            <div className='signature-container'>
              <img src={file.imgSrc} alt="random pic"/>
            </div>
            <Typography sx={{textDecoration: 'underline'  }} >{file.name}</Typography>
            <IconButton className='pictureBtn' onClick={() => deleteFile(file.name)} aria-label="delete">
                <ClearIcon style={{ color: 'black' }} />
            </IconButton>
        </div>
    </>
  )
}

export function PictureFileItem({file, deleteFile}: {file:pictureFile, deleteFile: deleteFileFn}) {
    return (
      <>
          <div
              className="picture-item"
              key={file.name}>
              <div className='image-container'>
                <img src={file.imgSrc} alt="random pic"/>
              </div>
              <IconButton className='pictureBtn' onClick={() => deleteFile(file.name)} aria-label="delete">
                  <ClearIcon style={{ color: 'black' }} />
              </IconButton>
          </div>
      </>
    )
  }

