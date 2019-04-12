import { configure, addDecorator, addParameters } from '@storybook/react';
import { withManager } from '../src/decorators';
import styled from 'styled-components';

const NewManager =

const req = require.context('../stories', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
addDecorator(withManager());


