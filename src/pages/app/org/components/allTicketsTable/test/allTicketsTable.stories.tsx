import { AllTicketsTable } from "..";
import StorybookThemeProvider from "../../../../../../utils/storybookThemeProvider";

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "AllTicketsTable",
  component: AllTicketsTable,
} as ComponentMeta<typeof AllTicketsTable>;

export const Primary: ComponentStory<typeof AllTicketsTable> = () => (
  <StorybookThemeProvider>
    <AllTicketsTable />
  </StorybookThemeProvider>
);
