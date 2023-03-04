import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useRecoilState } from "recoil";
import { PDFViewAtom, surveyViewAtom, pageNumAtom } from "./state/viewState";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { commoditiesAtom } from "../../ticketDetails/state/commodityState";
import { useSetRecoilState } from "recoil";
import { styled } from "@mui/material/styles";
import { CommodityType } from "../../ticketDetails/components";
import { DocumentProps, PageProps } from "react-pdf";
//@ts-ignore
import { Document, Page } from "react-pdf/dist/esm/entry.vite";
interface PDFViewerProps {
  maxLength: number;
  urls: string[];
  commodities: CommodityType[][];
}

type PDFDocumentProxy = Parameters<
  NonNullable<DocumentProps["onLoadSuccess"]>
>[0];

export const PDFViewer = ({
  maxLength,
  urls: downloadURLs,
  commodities,
}: PDFViewerProps) => {
  const [PDFView, setPDFView] = useRecoilState(PDFViewAtom);
  const [surveyView, setSurveyView] = useRecoilState(surveyViewAtom);
  const [pageNum, setPageNum] = useRecoilState(pageNumAtom);
  const setCommodities = useSetRecoilState(commoditiesAtom);

  const handlePrevPage = useCallback(() => {
    if (pageNum > 1) {
      setPageNum((pageNum) => pageNum - 1);
      setCommodities(commodities[pageNum - 1]);
    }
  }, [pageNum, commodities, setPageNum, setCommodities]);

  const handleNextPage = useCallback(() => {
    if (pageNum < maxLength) {
      setPageNum((pageNum) => pageNum + 1);
      setCommodities(commodities[pageNum + 1]);
    }
  }, [pageNum, maxLength, commodities, setPageNum, setCommodities]);

  const [pdfWidth, setPdfWidth] = useState<number>();

  const pdfDivRef = useRef<HTMLDivElement>(null);

  const resetPDFWidth = useCallback(() => {
    setPdfWidth(
      pdfDivRef?.current?.clientWidth
        ? pdfDivRef.current.clientWidth * 0.9 ?? 480
        : undefined
    );
  }, [pdfDivRef?.current?.clientWidth]);

  const onDocumentLoadSuccess = useCallback(
    ({}: PDFDocumentProxy) => {
      resetPDFWidth();
    },
    [resetPDFWidth]
  );

  const handleExpandCollapse = useCallback(() => {
    if (PDFView == 4) {
      setPDFView(12);
      setSurveyView(0);
      setPdfWidth((prev) => (prev ? prev * 3 : prev));
    } else {
      setPDFView(4);
      setSurveyView(8);
      setPdfWidth((prev) => (prev ? prev / 3 : prev));
    }
  }, [PDFView, surveyView, setPDFView, setSurveyView]);

  useEffect(() => {
    resetPDFWidth();
  }, [resetPDFWidth]);

  // because the exported page element is not typed this is for intellisense
  const pageProps: PageProps = useMemo(
    () => ({
      pageNumber: pageNum,
      width: pdfWidth,
    }),
    [pdfWidth, pageNum]
  );

  return (
    <OuterBlueDivBox>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <CustomButton onClick={handlePrevPage}>
            <Typography variant="body1" color="#FFF">
              PREV
            </Typography>
            <Typography variant="body1" color="#FFF">
              PAGE
            </Typography>
          </CustomButton>
          <CustomButton>
            <Typography variant="body1" color="#FFF" fontWeight="bold">
              PAGE
            </Typography>
            <Typography variant="body1" color="#FFF" textAlign="center">
              {pageNum}/{maxLength}
            </Typography>
          </CustomButton>
          <CustomButton onClick={handleNextPage}>
            <Typography variant="body1" color="#FFF">
              NEXT
            </Typography>
            <Typography variant="body1" color="#FFF">
              PAGE
            </Typography>
          </CustomButton>
        </div>
        <div style={{ display: "flex" }}>
          <CustomButton onClick={handleExpandCollapse}>
            {PDFView == 4 ? (
              <Typography variant="body1" color="#FFF" textAlign="center">
                EXPAND
              </Typography>
            ) : (
              <Typography variant="body1" color="#FFF" textAlign="center">
                COLLAPSE
              </Typography>
            )}
          </CustomButton>
        </div>
      </div>
      {downloadURLs.length > 0 && pageNum <= downloadURLs.length && (
        <div
          ref={pdfDivRef}
          style={{
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "auto",
          }}
        >
          <Document
            file={downloadURLs[pageNum - 1]}
            //file="https://test-tenant2-bucket.s3.amazonaws.com/documents/2d0a8435-8b36-49b5-a56a-af52e7d1ec09/079ebfeb-893e-4604-83ad-20133c5e1f04.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4TXASK766T5UXIUV%2F20230304%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20230304T070621Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=055e2d79abb08cf53a5a8efcf3d996854216ee6bd1fb29846b8a32ee892cf6bf"
            // ^ for testing
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page {...pageProps} />
          </Document>
        </div>
      )}
    </OuterBlueDivBox>
  );
};

const OuterBlueDivBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  boxShadow: "var(--ss-brand-box-shadow)",
  borderRadius: "var(--ss-brand-border-radius)",
  height: "100%",
  marginTop: 8,
  marginRight: 8,
  minHeight: "500px",
  display: "flex",
  flexDirection: "column",
}));

const CustomButton = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: "var(--ss-brand-border-radius)",
  backgroundColor: theme.palette.primary.main,
  padding: 8,
  margin: 8,
  cursor: "pointer",
  bottom: 0,
}));
