import React, { useMemo, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { PDFViewAtom, surveyViewAtom, pageNumAtom } from "./state/viewState";
import Loading from "../../../../../components/loading";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { commoditiesAtom } from "../../ticketDetails/state/commodityState";
import { useSetRecoilState } from "recoil";
import { styled } from "@mui/material/styles";
import { CommodityType } from "../../ticketDetails/components";
import axios from "axios";

interface PDFViewerProps {
  action?: () => void;
  maxLength: number;
  urls: string[];
  commodities: CommodityType[][];
}

export const PDFViewer = ({
  action,
  maxLength,
  urls: downloadURLs,
  commodities,
}: PDFViewerProps) => {
  const [PDFView, setPDFView] = useRecoilState(PDFViewAtom);
  const [surveyView, setSurveyView] = useRecoilState(surveyViewAtom);
  const [pageNum, setPageNum] = useRecoilState(pageNumAtom);
  const setCommodities = useSetRecoilState(commoditiesAtom);
  const [urls, setUrls] = useState<Blob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum((pageNum) => pageNum - 1);
      setCommodities(commodities[pageNum - 1]);
    }
  };

  const handleNextPage = () => {
    if (pageNum < maxLength) {
      setPageNum((pageNum) => pageNum + 1);
      setCommodities(commodities[pageNum + 1]);
    }
  };

  const handleZoomClick = () => {
    if (PDFView == 4 && surveyView == 8) {
      setPDFView(6);
      setSurveyView(6);
    } else if (PDFView == 6 && surveyView == 6) {
      setPDFView(4);
      setSurveyView(8);
    }
  };

  console.log("urls", urls);
  useEffect(() => {
    if (downloadURLs) {
      setLoading(true);
      Promise.all([
        downloadURLs.map((url, index) =>
          fetch(url).then(async (r: any) => {
            const blob: Blob = await r.blob();
            // const fileName: string = `pdf${index}.pdf`;
            // const file = new File([blob], fileName, { lastModified: new Date().getTime() });
            setUrls((urls) => [...urls, blob]);
          })
        ),
      ]).then((res) => {
        setLoading(false);
      });
    }
  }, [downloadURLs]);

  const PDF = () => {
    return (
      <>
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
          <CustomButton onClick={handleZoomClick}>
            <Typography variant="body1" color="#FFF">
              ZOOM
            </Typography>
            {PDFView == 4 && (
              <Typography variant="body1" color="#FFF" textAlign="center">
                IN
              </Typography>
            )}
            {PDFView == 6 && (
              <Typography variant="body1" color="#FFF" textAlign="center">
                OUT
              </Typography>
            )}
          </CustomButton>
        </div>
        <div
          style={{
            height: "100%",
            overflow: "hidden",
            pointerEvents: "none",
            userSelect: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            verticalAlign: "center",
          }}
        >
          <Loading />
          {/* {loading || urls.length < 1 ? (
            <Loading />
          ) : (
            <iframe
              src={URL.createObjectURL(urls[pageNum])}
              key={`pdf_${pageNum}`}
              height="95%"
              width="92%"
              scrolling="no"
            />
          )} */}
        </div>
      </>
    );
  };

  return (
    <>
      <OuterBlueDivBox>{PDF()}</OuterBlueDivBox>
    </>
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
