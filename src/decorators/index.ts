import addons, { makeDecorator } from '@storybook/addons';

const withManager = makeDecorator({
  name: 'withManager',

  wrapper: (getStory: Function, context: object, { options: component }) => {
    const channel = addons.getChannel();
    channel.emit('styled-story-preview', null);

    return getStory(context);
  }
});

export { withManager };

