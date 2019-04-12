import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withManager } from '../src/decorators';

const req = require.context('../stories', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const options = {
  manager: <div>fdsdffsddsf</div>
}

configure(loadStories, module);
addDecorator(withManager(options));
