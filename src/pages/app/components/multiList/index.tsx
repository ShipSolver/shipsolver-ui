import React from "react";

import Typography from "@mui/material/Typography";

import Paper from "../../../components/roundedPaper";

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

  return (
    <Paper className="multi-list-all-lists-container">
      {listSpecifications.map(({ title, entries, entryRenderer }) => (
        <div className="multi-list-list-container">
          <Typography variant="h4" color="black" gutterBottom>
            <strong>{title}</strong>
          </Typography>
          <div className="multi-list-list">
            {entries.map((entry) => entryRenderer(entry))}
          </div>
        </div>
      ))}
    </Paper>
  );
}

export default Lists;
