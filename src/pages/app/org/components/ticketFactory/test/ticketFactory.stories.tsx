import { TicketFactory } from "../ticketFactory";
import { PDFViewer } from "../components/pdfViewer";

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import StorybookThemeProvider from "../../../../../../utils/storybookThemeProvider";

export default {
  title: "Ticket Factory",
  component: TicketFactory,
} as ComponentMeta<typeof TicketFactory>;

export const Primary: ComponentStory<typeof TicketFactory> = () => (
  <StorybookThemeProvider>
    <TicketFactory />
  </StorybookThemeProvider>
);

export const PDFViewerStory: ComponentStory<typeof PDFViewer> = () => (
  <StorybookThemeProvider>
    <PDFViewer />
  </StorybookThemeProvider>
);
