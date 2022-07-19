import React from 'react'

import Box from "@mui/material/Box";
import { Button } from '@mui/material'
import { pictureFile } from '../../../deliveryCompletion' 

type removeFileFn = (filename: string) => void

export const PODFileUpload = ({ files, setFiles, removeFile, image, modal, setModal }:
    {files: pictureFile[], setFiles: React.Dispatch<React.SetStateAction<pictureFile[]>>, removeFile: removeFileFn, image: string, modal: boolean, setModal: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const name: string = 'Rahul'
     
    function uploadHandler () {   
        const nameArry: string[] = name.split(' ');
        let PodFileName: string = 'POD'
        for (let i = 0; i < nameArry.length;) {
            PodFileName = PodFileName + '-' + nameArry[i]
            i++;
        }
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}-${current.getHours()}-${current.getMinutes()}-${current.getSeconds()}`;
        PodFileName = PodFileName + '-' + date
        PodFileName = PodFileName + '.jpg'
        console.log(PodFileName)
        const file: pictureFile =  {
            name: PodFileName,
            imgSrc: image
        }
        setFiles([ ...files, file]);
        console.log(files)
        setModal(!modal)
        // upload to backend
        };

    return (
        <>
            <Button onClick={uploadHandler} variant="contained">Submit</Button>
        </>
    )
}