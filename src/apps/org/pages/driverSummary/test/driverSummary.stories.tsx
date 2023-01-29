import { DriverSummary } from "..";
import { DriverRows } from "./testData";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import StorybookThemeProvider from "../../../../../utils/mockAppRoot";

export default {
  title: "Driver Summary",
  component: DriverSummary,
} as ComponentMeta<typeof DriverSummary>;

export const Primary: ComponentStory<typeof DriverSummary> = () => (
  <StorybookThemeProvider>
    <DriverSummary rows={DriverRows} />
  </StorybookThemeProvider>
);
