import { AllTicketsTable } from "..";
import MockAppRoot from "../../../../../../utils/mockAppRoot";

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RecoilRoot } from "recoil";

export default {
  title: "AllTicketsTable",
  component: AllTicketsTable,
} as ComponentMeta<typeof AllTicketsTable>;

export const Primary: ComponentStory<typeof AllTicketsTable> = () => (
  <MockAppRoot>
    <RecoilRoot>
      <AllTicketsTable />
    </RecoilRoot>
  </MockAppRoot>
);
