import { AllTicketsTable } from '../allTicketsTable';


import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'AllTicketsTable',
  component: AllTicketsTable,
} as ComponentMeta<typeof AllTicketsTable>;

export const Primary: ComponentStory<typeof AllTicketsTable> = () => <AllTicketsTable />;