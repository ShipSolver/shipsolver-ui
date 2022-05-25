import React from "react";
import { styled } from "@mui/material/styles";

import { TicketSearch } from "./components/ticketSearch";
import { FooterButtons } from "./components/footerButtons";
import { TicketTable } from "./components/ticketTable";
import { TestColumns, TestRows } from "./test/testData";

interface AllTicketsTableProps {}

export const AllTicketsTable = (props: AllTicketsTableProps) => {
  return (
    <Wrapper>
      <TicketSearch handleSearchRequest={() => console.log("search")} />
      <Spacer height="24px" />

      <TicketTable headerRow={TestColumns} rows={TestRows} />
      <Spacer height="24px" />
      <FooterButtons />
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  background-color: #cbdfeb;
  padding: 8px;
`;

const Spacer = styled("div")(
  ({ height = "", width = "" }: { height?: string; width?: string }) => `
  height: ${height};
  height: ${width};
`
);
