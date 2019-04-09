import addons, { makeDecorator } from '@storybook/addons';

const withStyle = makeDecorator({
  name: 'withStyle',

  wrapper: (getStory, context, { options: component }) => {
    const channel = addons.getChannel();
    channel.emit('styled-story-preview', null);

    return getStory(context);
  }
});

export { withStyle };

