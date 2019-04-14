import { makeDecorator } from '@storybook/addons';
import { getStorybook } from '@storybook/react';
import { ManagerData } from '../interfaces';
import { ManagerComponent } from '../types';
import { EventChannel } from '../classes';

const withManager = makeDecorator({
  name: 'withManager',
  parameters: 'component',
  wrapper: (
    getStory: Function,
    context: object,
    { options: { component } }: { options: { component: ManagerComponent } }
  ) => {
    const content: ManagerData = {
      stories: getStorybook(),
      component: component
    };

    const channel = new EventChannel();
    channel.emmit('stylebook-hydrate', content);

    return getStory(context);
  }
});

export { withManager };
