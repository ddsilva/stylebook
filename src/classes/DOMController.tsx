import React from 'react';

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

  createStoryList = (stories: any) => {
    console.log(stories);
  };

  createNewManager = (managerData: any) => {
    const { stories, manager }: { stories: any; manager: any } = managerData;
    this.createNewManager(stories)
    // const Component = managerData.manager;
    // if (this.rootElement) {
    //   const oldLook = this.rootElement.querySelector('div:nth-child(2)');
    //   if (oldLook) {
    //     // oldLook.appendChild(React.Re);
    //   }
    // }
  };
}

export default DOMController;
