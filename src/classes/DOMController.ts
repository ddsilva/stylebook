import * as ReactDOM from 'react-dom'
import { ManagerData } from '../interfaces'
import { ManagerComponent } from '../types'
import {
  ROOT_NODE_SELECTOR,
  CONTAINER_SELECTOR,
  MANAGER_SELECTOR,
  NEW_MANAGER_ID
} from '../constants'

class DOMController {
  private observer: MutationObserver

  private root: Element | null

  private stories: object[]

  public constructor() {
    this.root = document.querySelector(ROOT_NODE_SELECTOR)
    this.observer = new MutationObserver(() => this.setContainerVisible(false))
    this.root && this.observer.observe(this.root, { childList: true })
  }

  private setContainerVisible = (visibility: boolean) => {
    const container = this.root && this.root.querySelector(CONTAINER_SELECTOR)
    container &&
      container.setAttribute(
        'style',
        `visibility: ${visibility ? 'visible' : 'hidden'};`
      )
  }

  public hydrate = (content: ManagerData) => {
    if (!this.stories) {
      const {
        stories,
        component
      }: { stories: object[]; component: ManagerComponent } = content

      this.stories = stories

      if (this.root) {
        const defaultManager = this.root.querySelector(MANAGER_SELECTOR)
        const {
          props: { children: newManager }
        } = component

        if (defaultManager) {
          while (defaultManager.firstChild) defaultManager.firstChild.remove()

          defaultManager.setAttribute('id', NEW_MANAGER_ID)
        }

        ReactDOM.render(
          newManager(stories) as React.ReactElement<object>,
          document.getElementById(NEW_MANAGER_ID)
        )
        this.setContainerVisible(true)
      }
    }
  }
}

export default DOMController
