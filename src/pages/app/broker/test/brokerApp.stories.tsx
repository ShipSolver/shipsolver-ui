import BrokerApp from "../index";

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import StoryBookThemeProvider from "../../../../tests/storybookThemeProvider";

import StorybookThemeProvider from "../../../../tests/storybookThemeProvider";

export default {
  title: "BrokerApp",
  component: BrokerApp,
} as ComponentMeta<typeof BrokerApp>;

export const Primary: ComponentStory<typeof BrokerApp> = () => (
  <StoryBookThemeProvider>
    <BrokerApp />
  </StoryBookThemeProvider>
);
