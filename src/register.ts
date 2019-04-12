import addons from '@storybook/addons';
import { DOMController } from './classes';
import { ADDON_NAME } from './constants';
import { ManagerData } from 'interfaces';

addons.register(ADDON_NAME, api => {
  const channel = addons.getChannel();

  const DocumentManager = new DOMController();
  channel.on('styled-story-preview', (content: ManagerData) => DocumentManager.hydrate(content));
});
