import { Keys } from "../../types";

export * from "./dateRangeFilter";
export * from "./checkboxFilter";

export type ValueType = string | Date[];

export type HandleFilterType = (key: Keys, value: ValueType) => void;
