import React, { useState, useCallback, useMemo } from "react";

import Typography from "@mui/material/Typography";

import Paper from "../../../../components/roundedPaper";

import "./multiList.css";
import Loading from "../../../../components/loading";

export type toggleSelectionFn = () => void;

type entryRendererFn<T> = (props: {
  entry: T;
  toggleSelection: toggleSelectionFn;
  selected: boolean;
}) => JSX.Element;

type menuRendererFn<T> = (props: {
  selectedListEntries: EntryID[];
  entries: IndexedEntry<T>[];
}) => JSX.Element;

type List<T> = {
  title: string;
  entries: T[];
  entryRenderer: entryRendererFn<T>;
  menuRenderer: menuRendererFn<T>;
};

type MultiListProps<T> = {
  title?: string;
  listSpecifications: List<T>[];
  loading: boolean;
  error: string | null;
};

export type IndexedEntry<T> = {
  entry: T;
  ID: string;
  listID: string;
};

type IndexedList<T> = {
  title: string;
  listID: string;
  entries: IndexedEntry<T>[];
  entryRenderer: entryRendererFn<T>;
  menuRenderer: menuRendererFn<T>;
};

export type EntryID = string; // this string will look like ListID_EntryIndexInList

type ListID = string; // this string will be the index of the list in our list specifications

type ListSelectedItemsState = {
  [key: EntryID]: boolean;
};

type AllSelectedItemsState = {
  [key: ListID]: ListSelectedItemsState;
};

function Lists<T>(props: MultiListProps<T>): JSX.Element {
  const { title, listSpecifications, loading, error } = props;

  const indexedListSpecifications: IndexedList<T>[] = useMemo(() => {
    return listSpecifications.map((listSpecification, indexOuter) => ({
      ...listSpecification,
      entries: listSpecification.entries.map((entry, indexInner) => ({
        entry,
        listID: "_" + indexOuter,
        ID: indexInner + "_" + indexOuter,
      })),
      listID: "_" + indexOuter,
    }));
  }, [listSpecifications]);

  const [selectedItems, setSelectedItems] = useState<AllSelectedItemsState>({});

  const toggleSelection = useCallback(
    (listID: string, ID: string) => {
      setSelectedItems((currentSelectedItems) => ({
        ...currentSelectedItems,
        [listID]: {
          ...currentSelectedItems[listID],
          [ID]: !currentSelectedItems[listID]?.[ID],
        },
      }));
    },
    [setSelectedItems]
  );

  const pullSelectedEntries = function (
    selectedItems: AllSelectedItemsState,
    listID: ListID
  ) {
    let array: EntryID[] = [];

    for (let key in selectedItems) {
      if (key.includes(listID)) {
        for (let entryID in selectedItems[listID]) {
          if (selectedItems[listID][entryID] == true) {
            array.push(entryID);
          }
        }
      }
    }
    return array;
  };

  return (
    <div className="ss-flexbox-column" style={{ width: "100%" }}>
      {title && (
        <Typography
          variant="h2"
          color="primary"
          align="center"
          sx={{
            marginBottom: "calc(var(--ss-brand-spacing)*3)",
            paddingInlineStart: "calc(var(--ss-brand-spacing)*4)",
          }}
        >
          {title}
        </Typography>
      )}
      <Paper className="multi-list-all-lists-container">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="ss-flexbox-column">
            <Typography
              variant="h1"
              color="red"
              sx={{
                marginBottom: "calc(var(--ss-brand-spacing)*2)",
              }}
            >
              Error loading Today's tickets:
            </Typography>
            <Typography variant="h4" color="red">
              {error}
            </Typography>
          </div>
        ) : (
          indexedListSpecifications.map(
            ({ title, listID, entries, entryRenderer, menuRenderer }) => {
              const EntryRenderer = entryRenderer;
              const MenuRenderer = menuRenderer;
              const selectedPulledEntries = pullSelectedEntries(
                selectedItems,
                listID
              );
              return (
                <div className="multi-list-list-container">
                  <div className="ss-flexbox-row">
                    <span className="multi-list-header">
                      <Typography
                        display="inline"
                        variant="h4"
                        color="black"
                        gutterBottom
                      >
                        {title}
                      </Typography>
                    </span>
                    <Typography
                      display="inline"
                      variant="h4"
                      align="right"
                      color="black"
                      gutterBottom
                    >
                      <strong>{entries.length}</strong>
                    </Typography>
                  </div>
                  <div className="multi-list-list">
                    {entries.map((indexedEntry) => (
                      <EntryRenderer
                        entry={indexedEntry.entry}
                        toggleSelection={() =>
                          toggleSelection(
                            indexedEntry?.listID,
                            indexedEntry?.ID
                          )
                        }
                        selected={
                          selectedItems[indexedEntry?.listID]?.[
                            indexedEntry?.ID
                          ] ?? false
                        }
                      />
                    ))}
                  </div>
                  <div>
                    {pullSelectedEntries(selectedItems, listID).length > 0 && (
                      <MenuRenderer
                        selectedListEntries={selectedPulledEntries}
                        entries={entries}
                      />
                    )}
                  </div>
                </div>
              );
            }
          )
        )}
      </Paper>
    </div>
  );
}

export default Lists;
