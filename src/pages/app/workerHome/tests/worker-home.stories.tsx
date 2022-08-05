import React from "react";

import WorkerHome from "../workerHomePage";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import MockAppRoot from "../../../../utils/mockAppRoot";

export default {
  title: "Worker Home",
  component: WorkerHome,
} as ComponentMeta<typeof WorkerHome>;

export const Primary: ComponentStory<typeof WorkerHome> = () => (
  <MockAppRoot>
    <WorkerHome />
  </MockAppRoot>
);