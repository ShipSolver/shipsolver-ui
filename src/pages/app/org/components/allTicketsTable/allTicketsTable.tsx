import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Spacer } from "../../../../components/spacer";
import useLoadable from "../../../../../utils/useLoadable";
import Loading from "../../../../components/loading";
import { TicketSearch } from "./components/ticketSearch";
import { FooterButtons } from "./components/footerButtons";
import { TicketTable } from "./components/ticketTable";
import { TestRows } from "./test/testData";
import {
  createAllTicketTableHeaders,
  Keys,
} from "./components/allTicketTableHeaders";
import Brand from "../../../../../ShipSolverBrand";
import { HeaderRowType } from "./components/ticketTable";
import { fetchAllTickets } from "../../../../../services/ticketServices";

import { RowType } from "./components/ticketTable";

export type AllTicketsTableRows = RowType<Keys>;

export const AllTicketsTable = () => {
  const [headerRow, setHeaderRow] = useState<HeaderRowType<Keys>>();
  const { val, loading, error } = useLoadable(fetchAllTickets);

  const filterData = (key: Keys, value: string | Date[]) => {
  };

  useEffect(() => {
    createAllTicketTableHeaders(filterData)
      .then((response) => setHeaderRow(response))
      .catch((e) => console.error(e.toString()));
  }, []);

  return (
    <Wrapper>
      <TicketSearch handleSearchRequest={() => null} />
      <Spacer height="24px" />
      {loading || val == null ? (
        <Loading />
      ) : (
        <TicketTable headerRow={headerRow} rows={val} />
      )}
      <Spacer height="24px" />
      <FooterButtons />
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  background-color: ${Brand.palette.secondary.main};
  padding: 8px;
`;
