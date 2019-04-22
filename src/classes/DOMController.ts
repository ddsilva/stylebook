import ReactDOM from 'react-dom'
import { ReactElement } from 'react'
import { ManagerData } from '../interfaces'
import { ManagerComponent } from '../types'
import {
  ROOT_NODE_SELECTOR,
  CONTAINER_SELECTOR,
  MANAGER_SELECTOR,
  PREVIEW_SELECTOR
} from '../constants'

class DOMController {
  private observer: MutationObserver

  private root: Element

  private fullscreen: boolean = false

  public constructor() {
    this.root = document.querySelector(ROOT_NODE_SELECTOR) as Element
    this.setObserver(this.root, () => this.setContainerProperties(false))
  }

  private toggleFullscreen = () => {
    this.fullscreen = !this.fullscreen
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
      const container = this.root.querySelector(
        CONTAINER_SELECTOR
      ) as HTMLElement

      container && (container.style.visibility = 'hidden')
    }
  }

  private containerPositioning = () => {
    this.handleDraggables()

    const manager = this.root.querySelector(MANAGER_SELECTOR)
    const preview = this.root.querySelector(PREVIEW_SELECTOR)
    const container = this.root.querySelector(CONTAINER_SELECTOR) as HTMLElement
    const toggleFs = document.querySelector(
      'button[title="Go full screen"], button[title="Exit full screen"]'
    ) as Element

    if (manager && preview && container) {
      toggleFs.addEventListener('click', this.toggleFullscreen)
      manager.setAttribute('style', 'position: relative; width: auto')
      preview.setAttribute('style', 'position: relative')
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

  public hydrate = (content: ManagerData) => {
    if (!this.fullscreen) {
      console.log('hydrate')

      const {
        stories,
        component
      }: { stories: object[]; component: ManagerComponent } = content

      const {
        props: { children: newManager }
      } = component

      if (this.root) {
        const defaultManager = this.root.querySelector(
          MANAGER_SELECTOR
        ) as Element

        const container = this.root.querySelector(CONTAINER_SELECTOR) as Element
        let managerPlaceHolder = defaultManager.querySelector(
          '#new-root'
        ) as Element

        if (!managerPlaceHolder) {
          defaultManager.innerHTML = '<div id="new-root"></div>'

          managerPlaceHolder = defaultManager.querySelector(
            '#new-root'
          ) as Element
          ReactDOM.render(
            newManager(stories) as ReactElement,
            managerPlaceHolder
          )
        }

        this.setContainerProperties(true)
        this.setObserver(container, () => this.hydrate(content))
      }
    }
  }
}

export default DOMController
