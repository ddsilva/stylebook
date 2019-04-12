import addons from '@storybook/addons';
import { DOMController } from './classes';

addons.register('MYADDON', api => {
  new DOMController('#root');

  const channel = addons.getChannel();
  channel.on('styled-story-preview', stories => null); // get stories list here
});
