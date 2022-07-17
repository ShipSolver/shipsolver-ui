import MultiList from "../components/multiList";

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import StoryBookThemeProvider from "../../../../utils/storybookThemeProvider";

import tickets from "../../../../mockData/todaysTickets.json";
import {
  assignedEntryRenderer,
  inProgressEntryRenderer,
  inventoryEntryRenderer,
  requestedPickupEntryRenderer,
  unassignedPickupEntryRenderer,
} from "../components/multiList/entryRenderers";
import {
  assignedMenu,
  inProgressMenu,
  inventoryMenu,
  requestedPickupMenu,
  unassignedPickupMenu,
} from "../components/multiList/menus";

export default {
  title: "MultiList",
  component: MultiList,
} as ComponentMeta<typeof MultiList>;

export const Primary: ComponentStory<typeof MultiList> = () => (
  <StoryBookThemeProvider>
    <MultiList
      title="Today's Tickets"
      loading={false}
      error={null}
      listSpecifications={[
        {
          title: "Unassigned Pickups",
          entries: tickets.unassignedPickups.tickets,
          entryRenderer: unassignedPickupEntryRenderer,
          menuRenderer: unassignedPickupMenu,
        },
        {
          title: "Requested Pickups",
          entries: tickets.requestedPickups.tickets,
          entryRenderer: requestedPickupEntryRenderer,
          menuRenderer: requestedPickupMenu,
        },
        {
          title: "Inventory",
          entries: tickets.inventory.tickets,
          entryRenderer: inventoryEntryRenderer,
          menuRenderer: inventoryMenu,
        },
        {
          title: "Assigned",
          entries: tickets.assigned.tickets,
          entryRenderer: assignedEntryRenderer,
          menuRenderer: assignedMenu,
        },
        {
          title: "In Progress",
          entries: tickets.inProgress.tickets,
          entryRenderer: inProgressEntryRenderer,
          menuRenderer: inProgressMenu,
        },
      ]}
    />
  </StoryBookThemeProvider>
);
