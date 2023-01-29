import React, { useState, useTransition } from "react";
import SearchBarBaseBase from "./materialUISearchBar";
import { styled } from "@mui/material/styles";
import Brand from "../../../../../ShipSolverBrand";
import { searchAtom } from "./state/tableState";
import { useSetRecoilState } from "recoil";
const SearchBarBase: any = SearchBarBaseBase;

export const TicketSearch = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const setSearch = useSetRecoilState(searchAtom);
  const [_, startTransition] = useTransition();

  return (
    <SearchBar
      value={searchValue}
      onChange={(query: string) => setSearchValue(query)}
      onRequestSearch={() => {
        startTransition(() => {
          setSearch(searchValue);
        });
      }}
      searchIcon={<SearchIcon>GO</SearchIcon>}
      onCancelSearch={() => {
        startTransition(() => {
          setSearch("");
          setSearchValue("");
        });
      }}
    />
  );
};

const SearchIcon = styled("p")`
  color: ${Brand.palette.primary.main};
`;

const SearchBar = styled(SearchBarBase)`
  .MuiIconButton-root {
    height: 32px;
    width: 44px;
    margin-top: 8px;

    :hover {
      background-color: ${Brand.palette.secondary.main};
      border-radius: 5px;
    }
  }
`;
