import addons from '@storybook/addons';
import { DOMController } from './classes';
import { ADDON_NAME } from './constants';

addons.register(ADDON_NAME, api => {
  const channel = addons.getChannel();

  const DocumentManager = new DOMController('#root');
  channel.on('styled-story-preview', (stories) => DocumentManager.managerInjection(stories));
});
