
import * as React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withManager } from '../src/decorators';
import Component from '../src/components/test';

const req = require.context('../stories', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
const Test = <Component name="tal">teste</Component>;

const options = {
  component: Test
};

configure(loadStories, module);
addDecorator(withManager(options));
