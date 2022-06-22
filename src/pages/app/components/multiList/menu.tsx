import React, { useState, useCallback, useMemo } from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import useLoadable from "../../../../utils/useLoadable";
import { fetchBroker } from "../../../../services/brokerServices";
import { Ticket } from "../../../../services/types";

import { EntryID, IndexedEntry } from './index'
import { Typography } from "@mui/material";

import "./menu.css"

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

export function DeliveredMenu({selectedListEntries, isMultiSelected, brokerName, entries}:{selectedListEntries: EntryID[], isMultiSelected: boolean, brokerName: string, entries: IndexedEntry<Ticket>[]}): JSX.Element {
  return (
    <Box className="menu-container">
        <List>
            {!isMultiSelected && (
            <List>
              <ListItemButton>
                 <Typography className="menu-text-typography">Go to {GetBrokerName(selectedListEntries, entries)}'s Tickets</Typography>
              </ListItemButton>
            <Divider sx={{ borderBottomWidth: 2 }}/>
            </List>
            )}
            <ListItemButton>
                 <Typography className="menu-text-typography">Approve POD</Typography>
              </ListItemButton>
            <Divider sx={{ borderBottomWidth: 2 }}/>
            {!isMultiSelected && (
            <List>
              <ListItemButton>
                  <Typography className="menu-text-typography">Review</Typography>
              </ListItemButton>
            <Divider sx={{ borderBottomWidth: 2 }}/>
            </List>
            )}
              <ListItemButton>
                <Typography className="menu-text-typography">Delete</Typography>
              </ListItemButton>
        </List>
    </Box>
  )
}

export function IncompleteMenu({selectedListEntries, isMultiSelected, brokerName, entries}:{selectedListEntries: EntryID[], isMultiSelected: boolean, brokerName: string, entries: IndexedEntry<Ticket>[]}): JSX.Element {
  return (
    <Box className="menu-container">
        <List>
            {!isMultiSelected && (
            <List>
              <ListItemButton>
                 <Typography className="menu-text-typography">Go to {GetBrokerName(selectedListEntries, entries)}'s Tickets</Typography>
              </ListItemButton>
            <Divider sx={{ borderBottomWidth: 2 }}/>
            </List>
            )}
            <ListItemButton>
                 <Typography className="menu-text-typography">Move to Inventory</Typography>
              </ListItemButton>
            <Divider sx={{ borderBottomWidth: 2 }}/>
            {!isMultiSelected && (
            <List>
              <ListItemButton>
                  <Typography className="menu-text-typography">Review</Typography>
              </ListItemButton>
            <Divider sx={{ borderBottomWidth: 2 }}/>
            </List>
            )}
              <ListItemButton>
                  <Typography className="menu-text-typography">Delete</Typography>
              </ListItemButton>
        </List>
    </Box>
  )
}

export function InProgressMenu({selectedListEntries, isMultiSelected, brokerName, entries}:{selectedListEntries: EntryID[], isMultiSelected: boolean, brokerName: string, entries: IndexedEntry<Ticket>[]}): JSX.Element {
  return (
    <Box className="menu-container">
        <List>
            {!isMultiSelected && (
            <List>
              <ListItemButton>
                 <Typography className="menu-text-typography">Go to {GetBrokerName(selectedListEntries, entries)}'s Tickets</Typography>
              </ListItemButton>
            <Divider sx={{ borderBottomWidth: 2 }}/>
              <ListItemButton>
                  <Typography className="menu-text-typography">View Details</Typography>
              </ListItemButton>
            <Divider sx={{ borderBottomWidth: 2 }}/>
            </List>
            )}
              <ListItemButton>
                <Typography className="menu-text-typography">Delete</Typography>
              </ListItemButton>
        </List>
    </Box>
  )
}

export function AssignedMenu({selectedListEntries, isMultiSelected, brokerName, entries}:{selectedListEntries: EntryID[], isMultiSelected: boolean, brokerName: string, entries: IndexedEntry<Ticket>[]}): JSX.Element {
    return (
      <Box className="menu-container">
            <List>
                {!isMultiSelected && (
                <List>
                <ListItemButton>
                    <Typography className="menu-text-typography">Go to {GetBrokerName(selectedListEntries, entries)}'s Tickets</Typography>
                </ListItemButton>
                <Divider sx={{ borderBottomWidth: 2 }}/>
                <ListItemButton>
                    <Typography className="menu-text-typography">View Details</Typography>
                </ListItemButton>
                <Divider sx={{ borderBottomWidth: 2 }}/>
                </List>
                )}
                <ListItemButton>
                    <Typography className="menu-text-typography">Delete</Typography>
                </ListItemButton>
            </List>
        </Box>
    )
}

export function InventoryMenu({selectedListEntries, isMultiSelected, brokerName, entries}:{selectedListEntries: EntryID[], isMultiSelected: boolean, brokerName: string, entries: IndexedEntry<Ticket>[]}): JSX.Element {
    return(
      <Box className="menu-container">
            <List>
                <ListItemButton>
                    <Typography className="menu-text-typography">Assign to Brocker</Typography>
                </ListItemButton>
                <Divider sx={{ borderBottomWidth: 2 }}/>
                <ListItemButton>
                    <Typography className="menu-text-typography">Mark Incomplete</Typography>
                </ListItemButton>
                <Divider sx={{ borderBottomWidth: 2 }}/>
                {!isMultiSelected && (
                <List>
                <ListItemButton>
                    <Typography className="menu-text-typography">View Details</Typography>
                </ListItemButton>
                <Divider sx={{ borderBottomWidth: 2 }}/>
                </List>
                )}
                <ListItemButton>
                    <Typography className="menu-text-typography">Delete</Typography>
                </ListItemButton>
            </List>
        </Box>
    )
}