import { EventHistory } from '../components/eventHistory';
import { TicketDetails } from '../ticketDetails';

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'TicketDetails',
  component: TicketDetails,
} as ComponentMeta<typeof TicketDetails>;

export const Primary: ComponentStory<typeof TicketDetails> = () => <TicketDetails />;


export const EventHistoryStory: ComponentStory<typeof EventHistory> = () => <EventHistory />;

