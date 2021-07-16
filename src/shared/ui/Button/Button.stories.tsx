import { Meta } from '@storybook/react';
import React from 'react';
import { Button } from './Button';

export default {
  component: Button,
  title: 'Components/Button',
} as Meta;

export const Primary: React.VFC<any> = () => <Button>Button</Button>;
