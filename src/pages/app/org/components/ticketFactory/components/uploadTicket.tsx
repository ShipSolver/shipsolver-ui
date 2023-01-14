import React, { useState, useEffect } from "react";
import Paper from "../../../../../components/roundedPaper";
import Brand from "../../../../../../ShipSolverBrand";
import { styled } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";
import { Button, Grid } from "@mui/material";
import { RefetchLoader } from "./refetchLoader";
import { PDFViewer } from "./pdfViewer";
// import FormData from "form-data";
import {
  CommodityType,
  TicketInformation,
} from "../../ticketDetails/components";
import { PDFViewAtom, surveyViewAtom, pageNumAtom } from "./state/viewState";
import { useRecoilValue } from "recoil";
import {
  sendDocument,
} from "../../../../../../services/documentServices";
import { Loading } from "../../../../../components/loading";
import { TicketInformationStateType } from "../../ticketDetails/components";

export const UploadTicket = () => {
  const [flowStage, setFlowStage] = useState<number>(1);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [urls, setUrls] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [documentID, setDocumentID] = useState<number>();
  const [ticketInformation, setTicketInformation] = useState<
    TicketInformationStateType[]
  >([]);

  const [commodities, setCommodities] = useState<CommodityType[][]>([[]]);

  const PDFView = useRecoilValue(PDFViewAtom);
  const surveyView = useRecoilValue(surveyViewAtom);
  const pageNum = useRecoilValue(pageNumAtom);

  const onDrop = (acceptedFiles: File[]) => {
    setUploadedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const sendUploadedPDF = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (uploadedFile) {
      var formData = new FormData();
      formData.append("file", uploadedFile);
      setLoading(true);
      let response = await sendDocument(formData);
      if (response) {
        setDocumentID(response);
        setFlowStage((prev) => prev + 1);
      }
    }
  };

  const handleComplete = (
    data: [TicketInformationStateType, CommodityType[], { url: string }][]
  ) => {
    setTicketInformation(
      data.map(([ticketInfo, commodities, obj]) => ticketInfo)
    );
    setCommodities(data.map(([ticketInfo, commodities, obj]) => commodities));
    setUrls(data.map(([ticketInfo, commodities, obj]) => obj.url));
    setLoading(false);
    setFlowStage((prev) => prev + 1);
  };

  if (loading && flowStage == 1) {
    return (
      <TealBackground>
        <DropZoneInner>
          <Loading text="Uploading pdf.." />
        </DropZoneInner>
      </TealBackground>
    );
  }

  if (loading && flowStage == 2 && documentID) {
    return (
      <RefetchLoader onComplete={handleComplete} documentID={documentID} />
    );
  }

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

  return (
    <Grid container xs={12}>
      <Grid item xs={12} md={PDFView}>
        <PDFViewer
          maxLength={ticketInformation.length}
          urls={urls}
          commodities={commodities}
        />
      </Grid>
      <Grid item xs={12} md={surveyView}>
        <TealBackground>
          <TicketInformation
            data={ticketInformation[pageNum - 1]}
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
