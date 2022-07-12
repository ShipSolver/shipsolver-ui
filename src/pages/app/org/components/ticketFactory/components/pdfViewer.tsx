import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

//import sample from "./sample.pdf";

import { styled } from "@mui/material/styles";

export const PDFViewer = ({ action }: { action?: () => void }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState<number>(1); //setting 1 to show fisrt page

  const url =
    "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf";

  const onDocumentLoadSuccess = () => {
    setPageNumber(1);
  };

  //   function changePage(offset) {
  //     setPageNumber((prevPageNumber) => prevPageNumber + offset);
  //   }

  //   function previousPage() {
  //     changePage(-1);
  //   }

  //   function nextPage() {
  //     changePage(1);
  //   }
  return (
    <OuterBlueDivBox>
      <Document
        file={"/sample.pdf"}
        //options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </OuterBlueDivBox>
  );
};

const OuterBlueDivBox = styled("div")(({ theme }) => ({
  borderRadius: "var(--ss-brand-border-radius)",
  backgroundColor: theme.palette.secondary.main,
  padding: 5,
  margin: 15,
  marginBottom: 10,
}));
