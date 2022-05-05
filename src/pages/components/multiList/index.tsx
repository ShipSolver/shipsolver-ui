import React from "react";

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
};

function Lists<T>(props: MultiListProps<T>): JSX.Element {
  const { title, listSpecifications } = props;
  console.log(listSpecifications);

  return (
    <Paper className="multi-list-columns">
      {listSpecifications.map(({ title, entries, entryRenderer }) => {
        console.log(entries);
        return (
          <div className="multi-list-column-container">
            <div className="multi-list-column">
              <div className="multi-list-column-list">
                {entries.map((entry) => entryRenderer(entry))}
              </div>
            </div>
          </div>
        );
      })}
    </Paper>
  );
}

export default Lists;
