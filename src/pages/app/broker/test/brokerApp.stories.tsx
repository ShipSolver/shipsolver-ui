import Home from "../home";

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import StoryBookThemeProvider from "../../../../tests/storybookThemeProvider";

export default {
  title: "Home",
  component: Home,
} as ComponentMeta<typeof Home>;

export const Primary: ComponentStory<typeof Home> = () => (
  <StoryBookThemeProvider>
    <Home />
  </StoryBookThemeProvider>
);
