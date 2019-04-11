import addons from '@storybook/addons';
import { DOMController } from './classes/index';

addons.register('MYADDON', api => {
  const DocumentManager = new DOMController();

  const channel = addons.getChannel();
  channel.on('styled-story-preview', stories => null); // get stories list here
});
