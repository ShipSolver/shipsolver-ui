import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import StorybookThemeProvider from "../../../../../utils/mockAppRoot";
import { PODReview } from "..";

export default {
  title: "PODReview",
  component: PODReview,
} as ComponentMeta<typeof PODReview>;

export const Primary: ComponentStory<typeof PODReview> = () => (
  <StorybookThemeProvider>
    <PODReview complete={true} />
  </StorybookThemeProvider>
);
