import addons from '@storybook/addons';

addons.register('MYADDON', api => {
  const rootNode = document.querySelector('#root');
  const observerOptions = {
    childList: true
  };

  // watch through #root mutations and act accordingly
  // var observer = new MutationObserver(//fn here);
  // observer.observe(rootNode, observerOptions);

  const channel = addons.getChannel();
  channel.on('styled-story-preview', stories => null); // get stories list here
});
