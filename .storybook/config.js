import { configure, addDecorator, addParameters } from '@storybook/react';
import { withStyle } from '../src/decorators';

const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
addDecorator(withStyle());


