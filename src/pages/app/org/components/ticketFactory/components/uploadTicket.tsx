import React, { useState, useEffect } from "react";
import Paper from "../../../../../components/roundedPaper";
import Brand from "../../../../../../ShipSolverBrand";
import { styled } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";
import { Button, Grid } from "@mui/material";
import { RefetchLoader } from "./refetchLoader";
import { PDFViewer } from "./pdfViewer";
import { TicketInformation } from "../../ticketDetails/components";
import { PDFViewAtom, surveyViewAtom, pageNumAtom } from "./state/viewState";
import { useRecoilValue } from "recoil";
import { TestTicket } from "../test/testData";

export const UploadTicket = () => {
  const [flowStage, setFlowStage] = useState<number>(1);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const PDFView = useRecoilValue(PDFViewAtom);
  const surveyView = useRecoilValue(surveyViewAtom);
  const pageNum = useRecoilValue(pageNumAtom);

  const onDrop = (acceptedFiles: File[]) => setUploadedFile(acceptedFiles[0]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const sendUploadedPDF = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (uploadedFile) {
      var formData = new FormData();
      formData.append("file", uploadedFile);

      // axios.post('upload_file', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      // })
      setFlowStage((prev) => prev + 1);
    }
  };

  const processData = (data: any) => {
    setFlowStage((prev) => prev + 1);
  };

  if (flowStage == 1) {
    return (
      <TealBackground>
        <DropZoneOutter {...getRootProps()}>
          <DropZoneInner>
            <input {...getInputProps()} />
            <Text>Click to browse or drag and drop your files</Text>
            {uploadedFile ? (
              <div>
                <Text>{`File name: ${uploadedFile.name}`}</Text>
                <CenteredButton
                  variant="outlined"
                  size="small"
                  onClick={sendUploadedPDF}
                >
                  Extract data
                </CenteredButton>
              </div>
            ) : null}
          </DropZoneInner>
        </DropZoneOutter>
      </TealBackground>
    );
  }

  if (flowStage == 2) {
    return <RefetchLoader onComplete={processData} />;
  }

  return (
    // <TealBackground>
    //   <DropZoneInner>
    //     <div>Data Extracted</div>
    //     <PDFViewer />
    //   </DropZoneInner>
    // </TealBackground>
    <Grid container xs={12}>
      <Grid item xs={12} md={PDFView}>
        <PDFViewer maxLength={TestTicket.length} />
      </Grid>
      <Grid item xs={12} md={surveyView}>
        <TealBackground>
          <TicketInformation
            data={TestTicket[pageNum - 1]}
            newTicket={false}
            deliveryReceipt
          />
        </TealBackground>
      </Grid>
    </Grid>
  );
};

export const TealBackground = styled(Paper)`
  margin-top: 8px;
  background-color: ${Brand.palette.secondary.main};
  min-height: 200px;
`;

const DropZoneOutter = styled("div")`
  background-color: white;
  border-radius: var(--ss-brand-border-radius);
  padding: 24px;
`;

export const DropZoneInner = styled("div")`
  border: 1px dotted;
  border-radius: var(--ss-brand-border-radius);
  padding: 24px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;

const Text = styled("p")`
  text-align: center;
`;

const CenteredButton = styled(Button)`
  margin: 0 auto;
  display: block;
`;
