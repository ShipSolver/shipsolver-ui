import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { Spacer } from "../../../../components/spacer";
import Loading from "../../../../components/loading";
import { TicketSearch } from "./components/ticketSearch";
import { FooterButtons } from "./components/footerButtons";
import { TicketTable } from "./components/ticketTable";
import moment from "moment";
import Brand from "../../../../ShipSolverBrand";
import { Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { useTicketData } from "./components/hooks/useTicketData";
import { filterAtom, searchAtom } from "./components/state/tableState";
import { Keys } from "./types";
import { DateFormat } from "./components/filters/dateRangeFilter";

export const AllTicketsTable = () => {
  const {
    rows: fetchedRows,
    loading,
    error,
    triggerRefetch,
    headers,
  } = useTicketData();

  const filter = useRecoilValue(filterAtom);
  const search = useRecoilValue(searchAtom);

  const rows = useMemo(() => {
    if (!fetchedRows) {
      return null;
    }

    let rowData = fetchedRows;
    if (search) {
      rowData = rowData.filter((row) => {
        return JSON.stringify(Object.values(row))
          .toUpperCase()
          .includes(search.toUpperCase());
      });
    }

    if (Object.entries(filter).length) {
      rowData = rowData.filter((row) => {
        for (const [key, val] of Object.entries(filter)) {
          if (!val) {
            continue;
          }

          if (key === "date") {
            const date: Date = moment(row.date, DateFormat).toDate();

            if (date < (val[0] as Date) || date > (val[1] as Date)) {
              return false;
            }
          } else if (row[key as Keys] != val) {
            return false;
          }
        }
        return true;
      });
    }

    return rowData;
  }, [filter, search, fetchedRows]);

  return (
    <Wrapper>
      <TicketSearch />
      <Spacer height="24px" />
      {error ? (
        <Typography color="red" align="center">
          Error fetching ticket information!
        </Typography>
      ) : loading || !rows || !headers ? (
        <Loading />
      ) : (
        <TicketTable headers={headers} rows={rows} />
      )}
      <Spacer height="24px" />
      <FooterButtons triggerRefetch={triggerRefetch} />
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  background-color: ${Brand.palette.secondary.main};
  padding: 24px;
  margin: 24px;
  border-radius: 19px;
`;
