import React, { useRef } from 'react'
import { toPng } from 'html-to-image';

import Box from "@mui/material/Box";
import MediumButton from "../../mediumButton";

import { pictureFile } from '../../../deliveryCompletion' 
import { SignatureFileList } from '../../FileLists';

type SignFileUploadProps = {
    signFiles: pictureFile[];
    setSignFiles: React.Dispatch<React.SetStateAction<pictureFile[]>>;
    removeFile: removeFileFn;
    name: string;
    imageSrc: string;
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type removeFileFn = (filename: string) => void

export const FileUpload = (props: SignFileUploadProps) => {
    const {signFiles, setSignFiles, removeFile, name, imageSrc, modal, setModal} = props

    //const imageSrc = useRef<string>('');
    
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
        console.log(imageSrc)

        // html-png
        

            const file: pictureFile =  {
                name: signFileName,
                imgSrc: imageSrc
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
