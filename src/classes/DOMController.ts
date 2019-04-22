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

  private root: Element

  private stories: object[]

  private isFullScreen: boolean = false

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
    this.handleDraggables()

    const manager = this.root.querySelector(MANAGER_SELECTOR)
    const preview = this.root.querySelector(PREVIEW_SELECTOR)
    const container = this.root.querySelector(CONTAINER_SELECTOR) as HTMLElement


    if (manager && preview && container) {
      manager.setAttribute('style', 'position: relative; width: auto')
      preview.setAttribute('style', 'position: relative')

      const iframe = preview && preview.querySelector('#storybook-preview-iframe') as any
      const iframeHead = iframe.contentWindow.document
      const styledTag = iframeHead.querySelector('style[data-styled]')

      document.head.appendChild(styledTag)

      container.style.transition = ''
      container.style.display = 'flex'
      container.style.visibility = 'visible'
    }
  }

  private handleDraggables = () => {
    const draggables = Array.from(
      this.root.querySelectorAll('.react-draggable')
    )

    draggables &&
      draggables.map((draggable: HTMLElement) =>
        draggable.setAttribute('style', 'display: none')
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
          defaultManager.innerHTML = ''
          defaultManager.setAttribute('id', NEW_MANAGER_ID)

          ReactDOM.render(
            newManager(stories) as ReactElement,
            document.getElementById(NEW_MANAGER_ID)
          )
        }
        this.setContainerProperties(true)
        this.setObserver(container, () => this.hydrate(content, true))

      }
    }
  }
}

export default DOMController
