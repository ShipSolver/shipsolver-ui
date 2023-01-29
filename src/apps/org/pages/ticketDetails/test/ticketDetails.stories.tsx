import { EventHistory } from "../components/eventHistory";
import { TicketDetails } from "..";

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import StorybookThemeProvider from "../../../../../utils/mockAppRoot";
import { TestEventHistory } from "./testData";

export default {
  title: "TicketDetails",
  component: TicketDetails,
} as ComponentMeta<typeof TicketDetails>;

export const Primary: ComponentStory<typeof TicketDetails> = () => (
  <StorybookThemeProvider>
    <TicketDetails />
  </StorybookThemeProvider>
);

export const EventHistoryStory: ComponentStory<typeof EventHistory> = () => (
  <StorybookThemeProvider>
    <EventHistory events={TestEventHistory} />
  </StorybookThemeProvider>
);
