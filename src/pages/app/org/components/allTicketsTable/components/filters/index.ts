import { Keys } from "../allTicketTableHeaders";

export * from "./dateRangeFilter";
export * from "./checkboxFilter";

export type ValueType = string | Date[];

export type HandleFilterType = (key: Keys, value: ValueType) => void;

export interface FilterProps {
  handleFilter: HandleFilterType;
  handleClose?: (args: ValueType) => void;
  savedFilterState?: string | string[];
}
