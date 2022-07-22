import Home from "../home";

import DeliveryCompletion from "../deliveryCompletion";
import {
  IncompleteDelivery,
  IncompleteDeliveryReasons,
} from "../incompleteDelivery";

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import MockAppRoot from "../../../../utils/mockAppRoot";

export default {
  title: "Home",
  component: Home,
} as ComponentMeta<typeof Home>;

export const Primary: ComponentStory<typeof Home> = () => (
  <MockAppRoot>
    <Home />
  </MockAppRoot>
);

export const DeliveryCompletionStory: ComponentStory<
  typeof DeliveryCompletion
> = () => (
  <MockAppRoot>
    <DeliveryCompletion />
  </MockAppRoot>
);

export const IncompleteDeliveryStory: ComponentStory<
  typeof IncompleteDelivery
> = () => (
  <MockAppRoot>
    <IncompleteDelivery reasons={IncompleteDeliveryReasons} />
  </MockAppRoot>
);
