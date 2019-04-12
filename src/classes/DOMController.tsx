import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ManagerData } from '../interfaces';
import {
  ROOT_NODE_SELECTOR,
  CONTAINER_SELECTOR,
  MANAGER_SELECTOR,
  NEW_MANAGER_ID
} from '../constants';

class DOMController {
  private observer: MutationObserver;
  private root: Element | null;
  private stories: object[];

  constructor() {
    this.root = document.querySelector(ROOT_NODE_SELECTOR);
    this.observer = new MutationObserver(() => this.setContainerVisible(false));
    this.root && this.observer.observe(this.root, { childList: true });
  }

  setContainerVisible = (visibility: boolean) => {
    const container = this.root && this.root.querySelector(CONTAINER_SELECTOR);
    container &&
      container.setAttribute(
        'style',
        `visibility: ${visibility ? 'visible' : 'hidden'};`
      );
  };

  hydrate = (content: ManagerData) => {
    if (!this.stories) {
      const {
        stories,
        component
      }: { stories: object[]; component: JSX.Element } = content;

      this.stories = stories;

      if (this.root) {
        const defaultManager = this.root.querySelector(MANAGER_SELECTOR);
        if (defaultManager) {
          while (defaultManager.firstChild) {
            defaultManager.firstChild.remove();
          }
          defaultManager.setAttribute('id', NEW_MANAGER_ID);

          const newManager = React.createElement(
            component.type,
            component.props
          );
          ReactDOM.render(newManager, document.getElementById(NEW_MANAGER_ID));
          this.setContainerVisible(true);
        }
      }
    }
  };
}

export default DOMController;
