import ReactDOM from 'react-dom'
import { ReactElement } from 'react'
import { ManagerData } from '../interfaces'
import { ManagerComponent } from '../types'
import {
  ROOT_NODE_SELECTOR,
  CONTAINER_SELECTOR,
  MANAGER_SELECTOR,
  PREVIEW_SELECTOR,
  NEW_MANAGER_ID
} from '../constants'

class DOMController {
  private observer: MutationObserver

  private root: Element | null

  private stories: object[]

  public constructor() {
    this.root = document.querySelector(ROOT_NODE_SELECTOR) as Element
    this.setObserver(this.root, () => this.setContainerProperties(false))
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

  private setContainerProperties = (visibility: boolean) => {
    if (visibility) {
      this.containerPositioning()
    } else {
      const container =
        this.root &&
        (this.root.querySelector(CONTAINER_SELECTOR) as HTMLElement)

      container && (container.style.visibility = 'hidden')
    }
  }

  private containerPositioning = () => {
    const manager = this.root && this.root.querySelector(MANAGER_SELECTOR)
    manager && manager.setAttribute('style', 'position: relative; width: auto')

    const preview = this.root && this.root.querySelector(PREVIEW_SELECTOR)
    preview && preview.setAttribute('style', 'position: relative')

    const container =
      this.root && (this.root.querySelector(CONTAINER_SELECTOR) as HTMLElement)
    if (container) {
      container.style.transition = ''
      container.style.display = 'flex'
      container.style.visibility = 'visible'
    }
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
        this.setContainerProperties(true)
      }
    }
  }
}

export default DOMController
