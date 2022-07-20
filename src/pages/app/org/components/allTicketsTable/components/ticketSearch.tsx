import React, { useState } from "react";
import SearchBarBaseBase from "./materialUISearchBar";
import { styled } from "@mui/material/styles";
import Brand from "../../../../../../ShipSolverBrand";


const SearchBarBase: any = SearchBarBaseBase;
interface TicketSearchProps {
  handleSearchRequest: (query?: string) => void;
}

export const TicketSearch = ({ handleSearchRequest }: TicketSearchProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <SearchBar
      value={searchValue}
      onChange={(query: string) => setSearchValue(query)}
      onRequestSearch={() => handleSearchRequest(searchValue)}
      searchIcon={<SearchIcon>GO</SearchIcon>}
      onCancelSearch={() => handleSearchRequest()}
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
