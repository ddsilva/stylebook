import addons from '@storybook/addons';
import { EventChannel, DOMController } from './classes';
import { ADDON_NAME } from './constants';
import { ManagerData } from 'interfaces';

addons.register(ADDON_NAME, api => {
  const channel = new EventChannel();
  const documentManager = new DOMController();

  channel.on('stylebook-hydrate', (content: any) => documentManager.hydrate(content));
});
