import Home from "../home";

import { DeliveryCompletion } from "../../broker/DeliveryCompletionPage/deliveryCompletion";
import { IncompleteDelivery } from "../incompleteDelivery";

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import StoryBookThemeProvider from "../../../../utils/storybookThemeProvider";
import { IncompleteDeliveryReasons } from "../incompleteDelivery";

export default {
  title: "Home",
  component: Home,
} as ComponentMeta<typeof Home>;

export const Primary: ComponentStory<typeof Home> = () => (
  <StoryBookThemeProvider>
    <Home />
  </StoryBookThemeProvider>
);

export const DeliveryCompletionStory: ComponentStory<
  typeof DeliveryCompletion
> = () => (
  <StoryBookThemeProvider>
    <DeliveryCompletion />
  </StoryBookThemeProvider>
);

export const IncompleteDeliveryStory: ComponentStory<
  typeof IncompleteDelivery
> = () => (
  <StoryBookThemeProvider>
    <IncompleteDelivery reasons={IncompleteDeliveryReasons} />
  </StoryBookThemeProvider>
);
