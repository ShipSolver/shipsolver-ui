import React, { useCallback, useState } from "react";
import Paper from "../../../../../components/roundedPaper";
import Brand from "../../../../../ShipSolverBrand";
import { styled } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";
import { Button, Grid, Typography } from "@mui/material";
import { RefetchLoader } from "./refetchLoader";
import { PDFViewer } from "./pdfViewer";
// import FormData from "form-data";
import {
  CommodityType,
  TicketInformation,
} from "../../ticketDetails/components";
import { PDFViewAtom, surveyViewAtom, pageNumAtom } from "./state/viewState";
import { useRecoilValue } from "recoil";
import { sendDocument } from "../../../../../services/documentServices";
import { Loading } from "../../../../../components/loading";
import { TicketInformationStateType } from "../../ticketDetails/components/ticketInformation/types";

export const UploadTicket = () => {
  const [flowStage, setFlowStage] = useState<number>(1);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [urls, setUrls] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
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
      setError(undefined);
      sendDocument(formData)
        .then((response) => {
          if (response) {
            setDocumentID(response);
            setFlowStage((prev) => prev + 1);
          }
        })
        .catch(() => {
          setError("Error uploading file. Please try again.");
        });
    }
  };

  const handleComplete = useCallback(
    (data: [TicketInformationStateType, CommodityType[]][]) => {
      data.forEach(([ticketInfo, commodity]) => {
        setTicketInformation([...ticketInformation, ticketInfo]);
        setCommodities([...commodities, commodity]);
        setUrls([...urls, ticketInfo.deliveryRecieptLink!]);
      });
      setLoading(false);
      setFlowStage((prev) => prev + 1);
    },
    []
  );

  const handleError = useCallback((error: string) => {
    setError(error);
    setLoading(false);
  }, []);

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
      <RefetchLoader
        onComplete={handleComplete}
        onError={handleError}
        documentID={documentID}
      />
    );
  }

  if (flowStage == 1) {
    return (
      <TealBackground>
        <DropZoneOutter {...getRootProps()}>
          <DropZoneInner>
            <input {...getInputProps()} />
            {error && <Typography color="error">{error}</Typography>}
            <Typography>Click to browse or drag and drop your files</Typography>
            {uploadedFile ? (
              <div>
                <Typography>{`File name: ${uploadedFile.name}`}</Typography>
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
    <Grid container>
      <Grid item xs={12} md={PDFView}>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <PDFViewer
            maxLength={ticketInformation.length}
            urls={urls}
            commodities={commodities}
          />
        )}
      </Grid>
      {surveyView > 0 && (
        <Grid item xs={12} md={surveyView}>
          <TealBackground>
            <Typography color="error">{error}</Typography>
            <TicketInformation
              data={ticketInformation[pageNum - 1]}
              newTicketDeliveryReceipt
            />
          </TealBackground>
        </Grid>
      )}
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

const CenteredButton = styled(Button)`
  margin: 0 auto;
  display: block;
`;
