import React, { useState } from "react";
import SearchBarBaseBase from "./materialUISearchBar";
import { styled } from "@mui/material/styles";


const SearchBarBase: any = SearchBarBaseBase;
interface TicketSearchProps {
  handleSearchRequest: (query: string) => void;
}

export const TicketSearch = ({ handleSearchRequest }: TicketSearchProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <SearchBar
      value={searchValue}
      onChange={(query: string) => setSearchValue(query)}
      onRequestSearch={() => handleSearchRequest(searchValue)}
      searchIcon={<SearchIcon>Go</SearchIcon>}
    />
  );
};

const SearchIcon = styled("p")`
  color: #0A3977;
`;

const SearchBar = styled(SearchBarBase)`
  .MuiIconButton-root {
    height: 32px;
    width: 44px;
    margin: auto -16px auto 0;

    :hover {
      background-color: #c5dcfa80;
      border-radius: 5px;
    }
  }
`;
