import addons, { makeDecorator } from '@storybook/addons';
import { getStorybook } from '@storybook/react';

const withManager = makeDecorator({
  name: 'withManager',
  parameters: 'manager',
  wrapper: (getStory: Function, context: object, { options }: { options: any }) => {
    const newManagerData = { stories: getStorybook(), manager: options.manager };
    const channel = addons.getChannel();
    channel.emit('styled-story-preview', newManagerData);

    return getStory(context);
  }
});

export { withManager };

