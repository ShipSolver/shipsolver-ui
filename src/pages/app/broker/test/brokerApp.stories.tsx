import BrokerApp from "../index";

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import StoryBookThemeProvider from "../../../../utils/storybookThemeProvider";

export default {
  title: "BrokerApp",
  component: BrokerApp,
} as ComponentMeta<typeof BrokerApp>;

export const Primary: ComponentStory<typeof BrokerApp> = () => (
  <StoryBookThemeProvider>
    <BrokerApp />
  </StoryBookThemeProvider>
);
