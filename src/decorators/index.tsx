import addons, { makeDecorator } from '@storybook/addons';
import { getStorybook } from '@storybook/react';
import { ManagerData } from '../interfaces';

const withManager = makeDecorator({
  name: 'withManager',
  parameters: 'component',
  wrapper: (
    getStory: Function,
    context: object,
    { options: { component } }: { options: { component: JSX.Element } }
  ) => {
    const content: ManagerData = {
      stories: getStorybook(),
      component: component
    };

    const channel = addons.getChannel();
    channel.emit('styled-story-preview', content);

    return getStory(context);
  }
});

export { withManager };
