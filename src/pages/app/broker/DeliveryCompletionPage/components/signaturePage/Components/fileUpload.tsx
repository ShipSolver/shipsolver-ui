<<<<<<< HEAD
import React, { useRef } from 'react'
import { toPng } from 'html-to-image';
=======
import React from 'react'
>>>>>>> main

import Box from "@mui/material/Box";
import MediumButton from "../../mediumButton";

<<<<<<< HEAD
import { signatureFile } from '../../../deliveryCompletion' 
import { SignatureFileList } from '../../FileLists';

type SignFileUploadProps = {
    signFiles: signatureFile[];
    setSignFiles: React.Dispatch<React.SetStateAction<signatureFile[]>>;
    removeFile: removeFileFn;
    name: string;
    imageSrc: string;
    bitData: ImageData | undefined;
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type removeFileFn = (filename: string) => void

export const FileUpload = (props: SignFileUploadProps) => {
    const {signFiles, setSignFiles, bitData, name, imageSrc, modal, setModal} = props
    
=======
import { files } from '../../../deliveryCompletion' 

type removeFileFn = (filename: string) => void

export const FileUpload = ({ signFiles, setSignFiles, removeFile, name, modal, setModal }:
    {signFiles: files[], setSignFiles: React.Dispatch<React.SetStateAction<files[]>>, removeFile: removeFileFn, name: string, modal: boolean, setModal: React.Dispatch<React.SetStateAction<boolean>>}) => {

>>>>>>> main
    function uploadHandler () {   
        const nameArry: string[] = name.split(' ');
        let signFileName: string = 'signature'
        for (let i = 0; i < nameArry.length;) {
            signFileName = signFileName + '-' + nameArry[i]
            i++;
        }
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}-${current.getHours()}-${current.getMinutes()}-${current.getSeconds()}`;
        signFileName = signFileName + '-' + date
        signFileName = signFileName + '.jpg'
<<<<<<< HEAD

        if (bitData){const file: signatureFile =  {
            name: signFileName,
            imgSrc: imageSrc,
            blobData: bitData,
        }

        setSignFiles([ ...signFiles, file]);
        setModal(!modal)
        // upload to backend
        }else{
            console.log('Blob data is undefined')
        }}
=======
        console.log(signFileName)
        const file: files =  {
            name: signFileName,
        }
        setSignFiles([ ...signFiles, file]);
        setModal(!modal)
        // upload to backend
        };
>>>>>>> main

    return (
        <>
        <Box textAlign="center">
            <MediumButton onClick={uploadHandler} variant="contained">Submit</MediumButton>
        </Box>
        </>
    )
}
