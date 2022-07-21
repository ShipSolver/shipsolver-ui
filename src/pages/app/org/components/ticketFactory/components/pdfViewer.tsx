import React, { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { PDFViewAtom, surveyViewAtom, pageNumAtom } from "./state/viewState";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { styled } from "@mui/material/styles";

export const PDFViewer = ({
  action,
  maxLength,
}: {
  action?: () => void;
  maxLength: number;
}) => {
  const [PDFView, setPDFView] = useRecoilState(PDFViewAtom);
  const [surveyView, setSurveyView] = useRecoilState(surveyViewAtom);
  const [pageNum, setPageNum] = useRecoilState(pageNumAtom);

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum((pageNum) => pageNum - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNum < maxLength) {
      setPageNum((pageNum) => pageNum + 1);
    }
  };

  const url = `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf#view=Fit&toolbar=0`;

  const handleZoomClick = () => {
    if (PDFView == 4 && surveyView == 8) {
      setPDFView(6);
      setSurveyView(6);
    } else if (PDFView == 6 && surveyView == 6) {
      setPDFView(4);
      setSurveyView(8);
    }
  };

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
          <iframe src={url} key={url} height="95%" width="92%" scrolling="no" />
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
