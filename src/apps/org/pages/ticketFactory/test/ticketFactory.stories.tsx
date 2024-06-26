import { TicketFactory } from "..";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import StorybookThemeProvider from "../../../../../utils/mockAppRoot";

export default {
  title: "Ticket Factory",
  component: TicketFactory,
} as ComponentMeta<typeof TicketFactory>;

export const Primary: ComponentStory<typeof TicketFactory> = () => (
  <StorybookThemeProvider>
    <TicketFactory />
  </StorybookThemeProvider>
);

// export const PDFViewerStory: ComponentStory<typeof PDFViewer> = () => (
//   <StorybookThemeProvider>
//     <PDFViewer maxLength={3} />
//   </StorybookThemeProvider>
// );
