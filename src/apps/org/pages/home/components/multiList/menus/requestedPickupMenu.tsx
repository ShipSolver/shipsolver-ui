import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

import useLoadable from "../../../../../../../utils/useLoadable";
import { fetchDriver } from "../../../../../../../services/driverServices";
import { Ticket } from "../../../../../../../services/types";

import { EntryID } from "../index";
import { Typography } from "@mui/material";

import "./menu.css";

export default function Menu({
  selectedListEntries,
  isMultiSelected,
  entries,
}: {
  selectedListEntries: EntryID[];
  isMultiSelected: boolean;
  entries: Ticket[];
}): JSX.Element {

    return <div>
        Needs fixing
    </div>
//   let driverID =
//     String(
//       entries.find((entry) => entry.ID == selectedListEntries[0])?.entry.userId
//     ) ?? "";
//   const { val: driver, loading, error } = useLoadable(fetchDriver, driverID);

//   const goToDriverText = loading
//     ? "loading..."
//     : driver
//     ? `Go to ${driver.NAME}'s tickets`
//     : error || "Error fetching driver";

//   return (
//     <Box className="menu-container">
//       <List>
//         {!isMultiSelected && (
//           <>
//             <ListItemButton>
//               <Typography className="menu-text-typography">
//                 {goToDriverText}
//               </Typography>
//             </ListItemButton>
//             <Divider sx={{ borderBottomWidth: 2 }} />
//           </>
//         )}
//         <ListItemButton>
//           <Typography className="menu-text-typography">View details</Typography>
//         </ListItemButton>
//         <Divider sx={{ borderBottomWidth: 2 }} />
//         {!isMultiSelected && (
//           <>
//             <ListItemButton>
//               <Typography className="menu-text-typography">Delete</Typography>
//             </ListItemButton>
//             <Divider sx={{ borderBottomWidth: 2 }} />
//           </>
//         )}
//       </List>
//     </Box>
//   );
}
