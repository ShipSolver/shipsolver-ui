import React, { useState, useCallback, useMemo } from "react";

import Typography from "@mui/material/Typography";

import Paper from "../../../components/roundedPaper";

import useLoadable from "../../../../utils/useLoadable";
import { fetchBroker } from "../../../../services/brokerServices";
import { Ticket } from "../../../../services/types";

import "./multiList.css";

export type toggleSelectionFn = () => void;

type entryRendererFn<T> = (props: {
  entry: T, 
  toggleSelection: toggleSelectionFn,
  selected: boolean
}) => JSX.Element;



type menuRendererFn<T> = (props: {
  selectedListEntries: EntryID[],
  isMultiSelected: boolean,
  brokerName: string,
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
  entry: T,
  ID: string,
  listID : string
}

type IndexedList<T> = {
  title: string;
  listID: string;
  entries: IndexedEntry<T>[];
  entryRenderer: entryRendererFn<T>;
  menuRenderer: menuRendererFn<T>;
};

type ID = string;

export type EntryID = string; // this string will look like ListID_EntryIndexInList

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

  const allSelectedItemState : AllSelectedItemsState = {}

  for(const indexedListSpecification of indexedListSpecifications){
    for(const indexedEntry of indexedListSpecification.entries){
      if(indexedListSpecification.listID in allSelectedItemState){
        allSelectedItemState[
          indexedListSpecification.listID
        ][indexedEntry.ID] = false
      } else {
        allSelectedItemState[indexedListSpecification.listID] = {
          [indexedEntry.ID]: false
        }
      }
    }
  }
  console.log(allSelectedItemState)
  return allSelectedItemState
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
          })),
        listID: "_"+indexOuter
      }))
    },[listSpecifications])

  

  const [selectedItems, setSelectedItems] = useState<AllSelectedItemsState>(
    {}
  ) 

  const toggleSelection = useCallback((listID: string ,ID: string) =>{
    setSelectedItems(currentSelectedItems => ({
      ...currentSelectedItems, [listID]: {...currentSelectedItems[listID], [ID]: !currentSelectedItems[listID]?.[ID]}
    }))
  }, [setSelectedItems]) 

  console.log(selectedItems)

  const pullSelectedEntries = function(selectedItems: AllSelectedItemsState, listID: ListID) {
    let array: EntryID[] = [];

    for (let key in selectedItems) {
      if (key.includes(listID)) {
        for (let entryID in selectedItems[listID]) {
          if (selectedItems[listID][entryID] = true) {
            array.push(entryID)
          }
        }
      }
    }
    return array;
  }

  const GetBrokerName = function(selectedEntries: EntryID[], entries: IndexedEntry<Ticket>[])  {
    let brokerID = entries.find(entry => entry.ID == selectedEntries[0])?.entry.CURRENT_ASSIGNED_USER_ID ?? ''
          const {
            val: broker,
            loading,
            error,
          } = useLoadable(fetchBroker, brokerID);

          return (loading
          ? "loading..."
          : broker
          ? broker.NAME
          : error || "Error fetching broker")
  }

  return (
    <Paper className="multi-list-all-lists-container">
      {indexedListSpecifications.map(({ title, listID, entries, entryRenderer, menuRenderer }, indexOuterLoop) => {
         const EntryRenderer = entryRenderer
         const MenuRenderer = menuRenderer
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
                    entry= {indexedEntry.entry} toggleSelection={() => toggleSelection(indexedEntry?.listID ,indexedEntry?.ID)} selected={selectedItems[indexedEntry?.listID]?.[indexedEntry?.ID] ?? false}
                  />
            )}
          </div>
          <div>
            {pullSelectedEntries(selectedItems, listID).length > 0 && <MenuRenderer
                  selectedListEntries= {pullSelectedEntries(selectedItems, listID)} isMultiSelected= {pullSelectedEntries(selectedItems, listID).length > 1} brokerName = 'dog' entries={entries} />
            }
          </div>
        </div>
      })}
    </Paper>
 
  );
}

export default Lists;