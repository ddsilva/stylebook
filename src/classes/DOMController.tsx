import * as React from 'react';
import * as ReactDOM from 'react-dom';

class DOMController {
  private observer!: MutationObserver;
  private rootElement: Element | null;
  private stories: object[];

  constructor(rootSelector: string) {
    this.rootElement = document.querySelector(rootSelector);

    if (this.rootElement) {
      this.observer = new MutationObserver(() =>
        this.handleRootNode(this.rootElement, false)
      );
      this.observer.observe(this.rootElement, {
        childList: true
      });
    }
  }

  handleRootNode = (element: any, visibility: boolean) => {
    const oldLook = element.querySelector('div:nth-child(2)');
    oldLook.setAttribute(
      'style',
      `visibility: ${visibility ? 'visible' : 'hidden'};`
    );
  };

  managerInjection = (managerData: any) => {
    if (!this.stories) {
      this.stories = managerData.stories;
      this.handleRootNode(this.rootElement, true);
      this.createNewManager(managerData);
    }
  };

  createNewManager = ({
    stories,
    manager: Component
  }: {
    stories: any;
    manager: any;
  }) => {
    // const { stories }: { stories: any } = managerData;
    // this.createStoryList(stories);
    // const Component = managerData.manager;
    if (this.rootElement) {
      const oldLook = this.rootElement.querySelector(
        'div:nth-child(2) div:nth-child(5)'
      );
      if (oldLook) {
        while (oldLook.firstChild) {
          oldLook.firstChild.remove();
        }
        oldLook.setAttribute('id', 'teste');

        const newManager = React.createElement(Component.type, Component.props);
        ReactDOM.render(newManager, document.getElementById('teste'));
      }
    }
  };
}

export default DOMController;
