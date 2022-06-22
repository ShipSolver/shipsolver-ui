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
    <Box sx={{maxWidth: 360, bgcolor: 'gray', zIndex: 2, position: 'relative', top: '70px'}}>
        <List>
            {!isMultiSelected && (
            <List>
              <ListItemButton>
                 <Typography>Go to ${GetBrokerName(selectedListEntries, entries)} tickets</Typography>
              </ListItemButton>
            <Divider />
            </List>
            )}
            <ListItemButton>
                 <Typography>Approve POD</Typography>
              </ListItemButton>
            <Divider />
            {!isMultiSelected && (
            <List>
              <ListItemButton>
                  <Typography>Review</Typography>
              </ListItemButton>
            <Divider />
            </List>
            )}
              <ListItemButton>
                <Typography>Delete</Typography>
              </ListItemButton>
        </List>
    </Box>
  )
}

export function IncompleteMenu({selectedListEntries, isMultiSelected, brokerName, entries}:{selectedListEntries: EntryID[], isMultiSelected: boolean, brokerName: string, entries: IndexedEntry<Ticket>[]}): JSX.Element {
  return (
    <Box>
        <List>
            {!isMultiSelected && (
            <List>
              <ListItemButton>
                 <Typography>Go to ${GetBrokerName(selectedListEntries, entries)} tickets</Typography>
              </ListItemButton>
            <Divider />
            </List>
            )}
            <ListItemButton>
                 <Typography>Move to Inventory</Typography>
              </ListItemButton>
            <Divider />
            {!isMultiSelected && (
            <List>
              <ListItemButton>
                  <Typography>Review</Typography>
              </ListItemButton>
            <Divider />
            </List>
            )}
              <ListItemButton>
                  <Typography>Delete</Typography>
              </ListItemButton>
        </List>
    </Box>
  )
}

export function InProgressMenu({selectedListEntries, isMultiSelected, brokerName, entries}:{selectedListEntries: EntryID[], isMultiSelected: boolean, brokerName: string, entries: IndexedEntry<Ticket>[]}): JSX.Element {
  return (
    <Box>
        <List>
            {!isMultiSelected && (
            <List>
              <ListItemButton>
                 <Typography>Go to ${GetBrokerName(selectedListEntries, entries)} tickets</Typography>
              </ListItemButton>
            <Divider />
              <ListItemButton>
                  <Typography>View Details</Typography>
              </ListItemButton>
            <Divider />
            </List>
            )}
              <ListItemButton>
                <Typography>Delete</Typography>
              </ListItemButton>
        </List>
    </Box>
  )
}

export function AssignedMenu({selectedListEntries, isMultiSelected, brokerName, entries}:{selectedListEntries: EntryID[], isMultiSelected: boolean, brokerName: string, entries: IndexedEntry<Ticket>[]}): JSX.Element {
    return (
        <Box>
            <List>
                {!isMultiSelected && (
                <List>
                <ListItemButton>
                    <Typography>Go to ${GetBrokerName(selectedListEntries, entries)} tickets</Typography>
                </ListItemButton>
                <Divider />
                <ListItemButton>
                    <Typography>View Details</Typography>
                </ListItemButton>
                <Divider />
                </List>
                )}
                <ListItemButton>
                    <Typography>Delete</Typography>
                </ListItemButton>
            </List>
        </Box>
    )
}

export function InventoryMenu({selectedListEntries, isMultiSelected, brokerName, entries}:{selectedListEntries: EntryID[], isMultiSelected: boolean, brokerName: string, entries: IndexedEntry<Ticket>[]}): JSX.Element {
    return(
        <Box>
            <List>
                <ListItemButton>
                    <Typography>Assign to Brocker</Typography>
                </ListItemButton>
                <ListItemButton>
                    <Typography>Mark Incomplete</Typography>
                </ListItemButton>
                {!isMultiSelected && (
                <List>
                <ListItemButton>
                    <Typography>View Details</Typography>
                </ListItemButton>
                <Divider />
                </List>
                )}
                <ListItemButton>
                    <Typography>Delete</Typography>
                </ListItemButton>
            </List>
        </Box>
    )
}