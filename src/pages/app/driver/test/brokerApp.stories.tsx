import Home, { Tickets } from "../home";

import { DeliveryCompletion } from "../deliveryCompletion";
import { IncompleteDelivery } from "../incompleteDelivery";

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import MockAppRoot from "../../../../utils/mockAppRoot";
import { IncompleteDeliveryReasons } from "../incompleteDelivery";

import ticketsJSON from "../../../../mockData/tickets.json";

export default {
  title: "Broker App",
  component: Home,
} as ComponentMeta<typeof Home>;

export const TicketsList: ComponentStory<typeof Tickets> = () => (
  <MockAppRoot>
    <Tickets
      viewAllTickets={true}
      tickets={ticketsJSON.tickets}
      status="ticket_created"
      setViewAllTickets={() => {}}
      title="Created Tickets"
      items={ticketsJSON.tickets.length}
    />
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
