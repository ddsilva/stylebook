import addons, { makeDecorator } from '@storybook/addons';

const withManager = makeDecorator({
  name: 'withManager',

  wrapper: (getStory: Function, context, { options: component }) => {
    console.log(context);
    const channel = addons.getChannel();
    channel.emit('styled-story-preview', null);

    return getStory(context);
  }
});

export { withManager };

