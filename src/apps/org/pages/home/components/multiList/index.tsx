import React, { useState, useCallback, useMemo } from "react";
import Loading from "../../../../../../components/loading";
import Typography from "@mui/material/Typography";
import { Ticket } from "../../../../../../services/types";

import Paper from "../../../../../../components/roundedPaper";

import "./multiList.css";
import { Tickets } from "../../../../../driver/home/tickets";

export type toggleSelectionFn = () => void;

type List = {
  title: string;
  entries: Ticket[];
  entryRenderer: (props: {
    entry: Ticket;
    toggleSelection: toggleSelectionFn;
    selected: boolean;
  }) => JSX.Element;
  menuRenderer: (props: {
    selectedListEntries: EntryID[];
    isMultiSelected: boolean;
    entries: Ticket[];
    triggerRefetch?: () => void;
  }) => JSX.Element;
  triggerRefetch?: () => void;
};

type MultiListProps = {
  title?: string;
  listSpecifications: List[];
  loading: boolean;
  error: string | null;
};

export type EntryID = string; // this string will look like ListID_EntryIndexInList

function Lists(props: MultiListProps): JSX.Element {
  const { listSpecifications, loading, error } = props;

  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSelection = (ticketId: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [ticketId]: !(prev[ticketId] ?? false),
    }));
  };

  function getSelectedTickets(listID: string) {
    return Object.entries(selectedItems)
      .map(([key, val]) => {
        const [listId, ticketID] = key.split("_");
        if (val && listId === listID) {
          return ticketID;
        } else {
          return undefined;
        }
      })
      .filter((ticketId) => ticketId) as string[];
  }

  if (loading) {
    return (
      <Paper className="multi-list-all-lists-container">
        <Loading />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper className="multi-list-all-lists-container">
        <Typography>There was an error!</Typography>
      </Paper>
    );
  }

  return (
    <Paper className="multi-list-all-lists-container">
      {listSpecifications.map(
        ({ title, entries: tickets, entryRenderer, menuRenderer, triggerRefetch }, listIdx) => {
          const EntryRenderer = entryRenderer;
          const MenuRenderer = menuRenderer;
          const selectedPulledEntries = getSelectedTickets(listIdx.toString());
          return (
            <div className="multi-list-list-container">
              <div className="ss-flexbox">
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
                  <strong>{tickets.length}</strong>
                </Typography>
              </div>
              <div className="multi-list-list">
                {tickets.map((ticket) => (
                  <EntryRenderer
                    entry={ticket}
                    toggleSelection={() => {
                      toggleSelection(
                        [listIdx.toString(), ticket.ticketId.toString()].join(
                          "_"
                        )
                      );
                    }}
                    selected={
                      selectedItems[
                        [listIdx.toString(), ticket.ticketId.toString()].join(
                          "_"
                        )
                      ] ?? false
                    }
                  />
                ))}
              </div>
              <div>
                {selectedPulledEntries.length > 0 ? (
                  <MenuRenderer
                    selectedListEntries={selectedPulledEntries}
                    isMultiSelected={selectedPulledEntries.length > 1}
                    entries={tickets}
                    triggerRefetch={triggerRefetch}
                  />
                ) : null}
              </div>
            </div>
          );
        }
      )}
    </Paper>
  );
}

export default Lists;
