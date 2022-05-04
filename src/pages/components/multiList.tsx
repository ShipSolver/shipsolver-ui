import React from "react";

import Button from "@mui/material/Button";
import Paper from "./roundedPaper";

type List<T> = {
  title: string;
  entries: T[];
  entryRenderer: (entry: T) => JSX.Element;
};

type MultiListProps<T> = {
  listSpecifications: List<T>[];
};

function Lists<T>(props: MultiListProps<T>): JSX.Element {
  return <Paper></Paper>;
}

export default Lists;
