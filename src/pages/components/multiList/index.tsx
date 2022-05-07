import React from "react";

import Typography from "@mui/material/Typography";

import Paper from "../roundedPaper";

import "./multiList.css";

type List<T> = {
  title: string;
  entries: T[];
  entryRenderer: (entry: T) => JSX.Element;
};

type MultiListProps<T> = {
  title?: string;
  listSpecifications: List<T>[];
  loading: boolean;
  error: string | null;
};

function Lists<T>(props: MultiListProps<T>): JSX.Element {
  const { title, listSpecifications, loading, error } = props;
  console.log(listSpecifications);

  return (
    <Paper className="multi-list-columns">
      {listSpecifications.map(({ title, entries, entryRenderer }) => (
        <div className="multi-list-column-container">
          <Typography variant="h4" color="primary">
            <strong>{title}</strong>
          </Typography>
          <div className="multi-list-column">
            <div className="multi-list-column-list">
              {entries.map((entry) => entryRenderer(entry))}
            </div>
          </div>
        </div>
      ))}
    </Paper>
  );
}

export default Lists;
