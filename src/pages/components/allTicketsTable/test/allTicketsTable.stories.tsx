import { AllTicketsTable } from "../allTicketsTable";

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RecoilRoot } from "recoil";
import StoryBookThemeProvider from "../../../../tests/storybookThemeProvider";

export default {
  title: "AllTicketsTable",
  component: AllTicketsTable,
} as ComponentMeta<typeof AllTicketsTable>;

export const Primary: ComponentStory<typeof AllTicketsTable> = () => (
  <StoryBookThemeProvider>
    <AllTicketsTable />
  </StoryBookThemeProvider>
);
