import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Spacer } from "../../../../components/spacer";
import useLoadable from "../../../../../utils/useLoadable";
import Loading from "../../../../components/loading";
import { TicketSearch } from "./components/ticketSearch";
import { FooterButtons } from "./components/footerButtons";
import { TicketTable } from "./components/ticketTable";
import { useSetRecoilState } from "recoil";
import { allDriversAtom } from "./components/state/tableState";
import moment from "moment";
import { DateFormat } from "./components/filters/dateRangeFilter";
import {
  createAllTicketTableHeaders,
  Keys,
} from "./components/allTicketTableHeaders";
import Brand from "../../../../../ShipSolverBrand";
import { HeaderRowType } from "./components/ticketTable";
import { fetchAllTickets } from "../../../../../services/ticketServices";

import { RowType } from "./components/ticketTable";
import { Typography } from "@mui/material";

export type AllTicketsTableRows = RowType<Keys>;

export const AllTicketsTable = () => {
  const { val, loading, error, triggerRefetch } = useLoadable(fetchAllTickets);
  const setAllDrivers = useSetRecoilState(allDriversAtom);
  const [headerRows, setHeaderRows] = useState<HeaderRowType<Keys>>();

  const [searchedRows, setSearchedRows] = useState<AllTicketsTableRows[]>();
  const [filteredRows, setFilteredRows] = useState<AllTicketsTableRows[]>();
  const [rowsToDisplay, setRowsToDisplay] = useState<AllTicketsTableRows[]>();

  const filterData = (key: Keys, value?: string | Date[]) => {
    if (val) {
      let filterData = searchedRows;

      if (value && filterData && filterData.length > 0) {
        if (typeof value === "string") {
          filterData = filterData.filter((row) => row[key] === value);
        } else {
          filterData = filterData.filter((row) => {
            const date = moment(row[key], DateFormat).toDate();
            return date > value[0] && date < value[1];
          });
        }
      }

      setFilteredRows(filterData);
      setRowsToDisplay(filterData);
    }
  };

  const search = (query?: string) => {
    if (val) {
      let searchData = filteredRows ?? val;

      if (query && searchData && searchData.length > 0) {
        searchData = searchData.filter((row) =>
          Object.values(row).includes(query)
        );
      }

      setSearchedRows(searchData);
      setRowsToDisplay(searchData);
    }
  };

  useEffect(() => {
    if (val != null) {
      createAllTicketTableHeaders(filterData, val).then((data) => {
        setAllDrivers(data[0]);
        setHeaderRows(data[1]);
        setFilteredRows(val);
        setSearchedRows(val);
        setRowsToDisplay(val);
      });
    }
  }, [val]);

  return (
    <Wrapper>
      <TicketSearch handleSearchRequest={search} />
      <Spacer height="24px" />
      {loading || headerRows == null ? (
        <Loading />
      ) : error != null ? (
        <Typography>{error || "Error fetching ticket information"}</Typography>
      ) : (
        <TicketTable headerRow={headerRows} rows={rowsToDisplay} />
      )}
      <Spacer height="24px" />
      <FooterButtons triggerRefetch={triggerRefetch}/>
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  background-color: ${Brand.palette.secondary.main};
  padding: 8px;
`;
