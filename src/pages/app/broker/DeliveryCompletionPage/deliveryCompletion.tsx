import React, { useState, useCallback } from 'react'
import {PODFileList, PictureFileList} from './components/FileLists';

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';

import OuterBlueDivBox from "../components/outerBlueDivBox";
import InnerWhiteDivBox from "../components/innerWhiteDivBox";
import MediumButton from "./components/mediumButton";
import Divider from '@mui/material/Divider';

import { SignaturePopUp } from "./components/signaturePage/signaturePopUp";

export type files = {
  name: string
}

export type pictureFile = {
  name: string
  imgSrc: string
}

export function DeliveryCompletion() {
  const [podFiles, setPoDFiles] = useState<Array<files>>([
    {
      name: 'POD-Rahul-2022-02-18-15-41-54.jpg'
    }
  ])
  const [signFiles, setSignFiles] = useState<Array<files>>([
    {
      name: 'signature-Am-Sith-2022-02-18-15-41-54.jpg'
    }
  ])
  const [pictureFiles, setPictureFiles] = useState<Array<pictureFile>>([
    {
      name: 'placeholder',
      imgSrc: 'https://via.placeholder.com/170x120'
    }
  ])

  const removePoDFile = useCallback((filename: string) => {
    setPoDFiles(podFiles.filter(file => file.name !== filename))
  }, [setPoDFiles])
  const removeSignFile = useCallback((filename: string) => {
    setSignFiles(signFiles.filter(file => file.name !== filename))
  }, [setSignFiles])
  const removePictureFile = useCallback((filename: string) => {
    setPictureFiles(pictureFiles.filter(file => file.name !== filename))
  }, [setPictureFiles])

  const [closeSignature, setCloseSignature] = useState<boolean>(false);

  const handleCloseSignatureOpen = () => setCloseSignature(true);
  const handleCloseSignatureClose = () => setCloseSignature(false);

  return (
    <div>
        <OuterBlueDivBox>
          <Typography variant="h2" color="#000" align="center" padding="0px">
            Delivery Completion
          </Typography>
          
          <InnerWhiteDivBox style={{ padding: 25 }}>
            <Typography variant="h4" align="center" padding="10px">Proof of Delivery (Required)</Typography>
            <Divider sx={{ borderBottomWidth: 2, bgcolor: 'black' }}/>
            <Box minHeight={'200px'}>
              <PODFileList files={podFiles} removeFile={removePoDFile} />
            </Box>
            <Grid container justifyContent="center">
                <MediumButton variant="contained" >Add</MediumButton>
            </Grid>
          </InnerWhiteDivBox>
          <InnerWhiteDivBox style={{ padding: 25 }}>
            <Typography variant="h4" align="center" padding="10px">Customer Signature</Typography>
            <Divider sx={{ borderBottomWidth: 2, bgcolor: 'black' }}/>
            <Box minHeight={'200px'}>
              <PODFileList files={signFiles} removeFile={removeSignFile} />
            </Box>
            <Grid container justifyContent="center">
                <MediumButton onClick={handleCloseSignatureOpen} variant="contained" >Add</MediumButton>
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
            <Typography variant="h4" align="center" padding="10px">Pictures (Required)</Typography>
            <Divider sx={{ borderBottomWidth: 2, bgcolor: 'black' }}/>
            <Box minHeight={'200px'}>
              <PictureFileList files={pictureFiles} removeFile={removePictureFile} />
            </Box>
            <Grid container justifyContent="center">
                <MediumButton variant="contained" >Add</MediumButton>
            </Grid>
          </InnerWhiteDivBox>
        </OuterBlueDivBox>
        <Box textAlign="center">
          <MediumButton variant="contained">Submit</MediumButton>
          <MediumButton variant="contained">Cancel</MediumButton>
        </Box>
      </div>
  )
}

