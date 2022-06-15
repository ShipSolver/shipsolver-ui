import React, { useState, useCallback, useMemo } from "react";

import Typography from "@mui/material/Typography";

import Paper from "../../../components/roundedPaper";


import "./multiList.css";

export type toggleSelectionFn = () => void;

type entryRendererFn<T> = (props: {
  entry: T, 
  toggleSelection: toggleSelectionFn,
  selected: boolean
}) => JSX.Element;

type List<T> = {
  title: string;
  entries: T[];
  entryRenderer: entryRendererFn<T>;
};

type MultiListProps<T> = {
  title?: string;
  listSpecifications: List<T>[];
  loading: boolean;
  error: string | null;
};

export type IndexedEntry<T> = {
  entry: T,
  ID: string,
  listID : string
}

type IndexedList<T> = {
  title: string;
  entries: IndexedEntry<T>[];
  entryRenderer:entryRendererFn<T>;
};

type ID = string;

type EntryID = string; // this string will look like ListID_EntryIndexInList

type ListID = string; // this string will be the index of the list in our list specifications

type ListSelectedItemsState = {
	[key: EntryID]: boolean
}

type AllSelectedItemsState = {
	[key: ListID]: ListSelectedItemsState
}

function initializeSelectedEntries<T> (
  indexedListSpecifications : IndexedList<T>[]
) : AllSelectedItemsState {

  const listOne: ListSelectedItemsState = {};
  const listTwo: ListSelectedItemsState = {};
  const listThree: ListSelectedItemsState = {};
  const listFour: ListSelectedItemsState = {};
  const listFive: ListSelectedItemsState = {};
  const ListIDs: AllSelectedItemsState = {
    _0: listOne,
    _1: listTwo,
    _2: listThree,
    _3: listFour,
    _4: listFive
  };
  console.log(indexedListSpecifications)
  let index = 0;
  let index2 =0;
  for(var i = 0; i < indexedListSpecifications.length; i++){
    for (var i2 = 0; i2 < indexedListSpecifications[i].entries.length; i2++){
      console.log(indexedListSpecifications[index]?.entries[index]?.listID)
      ListIDs[indexedListSpecifications[index]?.entries[index]?.listID][indexedListSpecifications[index]?.entries[index2]?.ID] = false
      index2++;
    }
    index++;
  }
  return ListIDs
}

function Lists<T>(props: MultiListProps<T>): JSX.Element {
  const { title, listSpecifications, loading, error } = props;
  
  const indexedListSpecifications : IndexedList<T>[] = 
    useMemo(() => {
      return listSpecifications.map((listSpecification, indexOuter) => ({
        ...listSpecification, 
        entries: listSpecification.entries.map(
          (entry, indexInner) => ({
            entry, listID: "_"+indexOuter, ID: indexInner + "_" + indexOuter
          }))
      }))
    },[listSpecifications])

  

  const [selectedItems, setSelectedItems] = useState<AllSelectedItemsState>(
    initializeSelectedEntries(indexedListSpecifications)
  ) 

  const toggleSelection = useCallback((listID: string ,ID: string) =>{
    setSelectedItems(currentSelectedItems => ({
      ...currentSelectedItems, [listID]: {...currentSelectedItems[listID], [ID]: !currentSelectedItems[listID][ID]}
    }))
  }, [setSelectedItems]) 

  return (
    <Paper className="multi-list-all-lists-container">
      {indexedListSpecifications.map(({ title, entries, entryRenderer }, indexOuterLoop) => {
         const EntryRenderer = entryRenderer
        return <div className="multi-list-list-container">
          <div className="ss-flexbox">
            <span className="multi-list-header">
              <Typography display="inline" variant="h4" color="black" gutterBottom>
                {title}
              </Typography>
            </span>
            <Typography display="inline" variant="h4" align="right" color="black" gutterBottom>
              <strong>{entries.length}</strong>
            </Typography>
          </div>
          <div className="multi-list-list">
            {entries.map((indexedEntry, indexInnerLoop) => <EntryRenderer
                    entry= {indexedEntry.entry} toggleSelection={() => toggleSelection(indexedEntry.listID ,indexedEntry?.ID)} selected={selectedItems[indexedEntry.listID][indexedEntry?.ID]}
                  />
                )}
          </div>
        </div>
      })}
    </Paper>
 
  );
}

export default Lists;
