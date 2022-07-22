import React from 'react'

import Box from "@mui/material/Box";
import MediumButton from "../../mediumButton";

import { files } from '../../../deliveryCompletion' 

type removeFileFn = (filename: string) => void

export const FileUpload = ({ signFiles, setSignFiles, removeFile, name, modal, setModal }:
    {signFiles: files[], setSignFiles: React.Dispatch<React.SetStateAction<files[]>>, removeFile: removeFileFn, name: string, modal: boolean, setModal: React.Dispatch<React.SetStateAction<boolean>>}) => {

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
        console.log(signFileName)
        const file: files =  {
            name: signFileName,
        }
        setSignFiles([ ...signFiles, file]);
        setModal(!modal)
        // upload to backend
        };

    return (
        <>
        <Box textAlign="center">
            <MediumButton onClick={uploadHandler} variant="contained">Submit</MediumButton>
        </Box>
        </>
    )
}
