import React from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';

import useLoadable from "../../../../../../utils/useLoadable";
import { fetchBroker } from "../../../../../../services/brokerServices";
import { Ticket } from "../../../../../../services/types";

import { EntryID, IndexedEntry } from '../index'
import { Typography } from "@mui/material";

import "./menu.css"

export default function Menu({
    selectedListEntries,
    entries
}:{
    selectedListEntries: EntryID[], 
    entries: IndexedEntry<Ticket>[]
}): JSX.Element {
    const isMultiSelected = selectedListEntries.length > 1


    let brokerID = String(entries.find(entry => entry.ID == selectedListEntries[0])?.entry.userId) ?? ''
    const {
      val: broker,
      loading,
      error,
    } = useLoadable(fetchBroker, brokerID);
    
    const goToBrokerText = (loading
        ? "loading..."
        : broker
        ? `Go to ${broker.NAME}'s tickets`
        : error || "Error fetching broker")

    return (
    <Box className="menu-container">
        <List>
            {!isMultiSelected && (<>
                <ListItemButton>
                    <Typography className="menu-text-typography">{goToBrokerText}</Typography>
                </ListItemButton>
                <Divider sx={{ borderBottomWidth: 2 }}/>
                </>)}
            <ListItemButton>
                 <Typography className="menu-text-typography">View details</Typography>
              </ListItemButton>
            <Divider sx={{ borderBottomWidth: 2 }}/>
            {!isMultiSelected && (<>
                <ListItemButton>
                    <Typography className="menu-text-typography">Delete</Typography>
                </ListItemButton>
                <Divider sx={{ borderBottomWidth: 2 }}/>
            </>)}
        </List>
    </Box>
  )
}