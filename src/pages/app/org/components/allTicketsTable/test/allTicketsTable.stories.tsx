import { AllTicketsTable } from "..";
import StorybookThemeProvider from "../../../../../../tests/storybookThemeProvider";

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RecoilRoot } from "recoil";
import StoryBookThemeProvider from "../../../../tests/storybookThemeProvider";

export default {
  title: "AllTicketsTable",
  component: AllTicketsTable,
} as ComponentMeta<typeof AllTicketsTable>;

export const Primary: ComponentStory<typeof AllTicketsTable> = () => (
  <StorybookThemeProvider>
    <RecoilRoot>
      <AllTicketsTable />
    </RecoilRoot>
  </StorybookThemeProvider>
);
