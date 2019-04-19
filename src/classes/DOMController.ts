import ReactDOM from 'react-dom'
import { ReactElement } from 'react'
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
    this.root = document.querySelector(ROOT_NODE_SELECTOR) as Element
    this.setObserver(this.root, () => this.setContainerVisible(false))
  }

  private setObserver = (
    node: Element,
    callback: MutationCallback,
    options: object = { childList: true }
  ): void => {
    this.observer && this.observer.disconnect()
    this.observer = new MutationObserver(callback)
    this.observer.observe(node, options)
  }

  private setContainerVisible = (visibility: boolean) => {
    const container = this.root && this.root.querySelector(CONTAINER_SELECTOR)
    container &&
      container.setAttribute(
        'style',
        `visibility: ${visibility ? 'visible' : 'hidden'};`
      )
  }

  public hydrate = (content: ManagerData, reRender: boolean = false) => {
    if (!this.stories || reRender) {
      const {
        stories,
        component
      }: { stories: object[]; component: ManagerComponent } = content

      const {
        props: { children: newManager }
      } = component

      this.stories = stories

      if (this.root) {
        const defaultManager = this.root.querySelector(MANAGER_SELECTOR)
        const container = this.root.querySelector(CONTAINER_SELECTOR) as Element

        if (defaultManager) {
          while (defaultManager.firstChild) defaultManager.firstChild.remove()
          defaultManager.setAttribute('id', NEW_MANAGER_ID)

          ReactDOM.render(
            newManager(stories) as ReactElement,
            document.getElementById(NEW_MANAGER_ID)
          )
          this.setObserver(container, () => this.hydrate(content, true))
        }
        this.setContainerVisible(true)
      }
    }
  }
}

export default DOMController
