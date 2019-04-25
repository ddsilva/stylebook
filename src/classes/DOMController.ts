import ReactDOM from 'react-dom'
import { ReactElement } from 'react'
import { ManagerData, Overseer } from '../interfaces'
import { ManagerComponent } from '../types'
import StyleSheetController from './StyleSheetController'
import {
  ROOT_NODE_SELECTOR,
  CONTAINER_SELECTOR,
  MANAGER_SELECTOR,
  TOGGLE_FS_SELECTOR,
  PREVIEW_SELECTOR,
  CONTAINER_NORMALIZE,
  MANAGER_NORMALIZE,
  PREVIEW_NORMALIZE
} from '../constants'

class DOMController {
  private observers: Overseer[] = []

  private root: Element

  private fullscreen: boolean = false

  public constructor() {
    this.root = document.querySelector(ROOT_NODE_SELECTOR) as Element

    this.setObserver('root', this.root, () =>
      this.setContainerProperties(false)
    )
  }

  private toggleFullscreen = () => {
    this.fullscreen = !this.fullscreen
  }

  private getObserver = (name: string) =>
    this.observers.find(item => item.name === name)

  private setObserver = (
    name: string,
    node: Element,
    callback: MutationCallback,
    options: object = { childList: true }
  ): void => {
    const exists = this.getObserver(name)
    if (!exists) {
      const MutationOverseer: Overseer = {
        name,
        observer: new MutationObserver(callback)
      }
      MutationOverseer.observer.observe(node, options)
      this.observers.push(MutationOverseer)
    }
  }

  private setContainerProperties = (visibility: boolean) => {
    if (visibility) {
      this.containerPositioning()
    } else {
      const container: HTMLElement = this.root.querySelector(
        CONTAINER_SELECTOR
      ) as HTMLElement

      container.style.visibility = 'hidden'
    }
  }

  private containerPositioning = () => {
    this.hideDraggables()

    const container: HTMLElement = this.root.querySelector(
      CONTAINER_SELECTOR
    ) as HTMLElement

    const manager: HTMLElement = this.root.querySelector(
      MANAGER_SELECTOR
    ) as HTMLElement

    const preview: HTMLElement = this.root.querySelector(
      PREVIEW_SELECTOR
    ) as HTMLElement

    const mainElements: HTMLElement[] = [preview, manager, container]

    const toggleFs: Element = document.querySelector(
      TOGGLE_FS_SELECTOR
    ) as Element

    if (manager && preview && container) {
      toggleFs && toggleFs.addEventListener('click', this.toggleFullscreen)

      mainElements.forEach(element => {
        element.removeAttribute('style')

        this.setObserver(
          element.className,
          element,
          mutation =>
            this.avoidMutation(mutation, 'attributes', () => {
              element.removeAttribute('style')
            }),
          { childList: true, attributes: true }
        )
      })

      const stylesController = new StyleSheetController(document)
      const managerClass = `.${manager.className}`
      const previewClass = `.${preview.className}`
      const containerClass = `.${container.className}`

      stylesController
        .injectStyleAtSelector(containerClass, CONTAINER_NORMALIZE)
        .injectStyleAtSelector(managerClass, MANAGER_NORMALIZE)
        .injectStyleAtSelector(previewClass, PREVIEW_NORMALIZE)
    }
  }

  private avoidMutation = (
    mutations: MutationRecord[],
    type: string,
    callback: Function
  ) => {
    const attributeChanged = mutations.some(mutation => mutation.type === type)

    if (attributeChanged) {
      callback()
    }
  }

  private hideDraggables = () => {
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
      const {
        stories,
        component
      }: { stories: object[]; component: ManagerComponent } = content

      const {
        props: { children: newManager }
      } = component

      if (this.root) {
        const defaultManager: Element = this.root.querySelector(
          MANAGER_SELECTOR
        ) as Element

        const container: Element = this.root.querySelector(
          CONTAINER_SELECTOR
        ) as Element

        let managerPlaceHolder: Element = defaultManager.querySelector(
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
        !this.getObserver('container') &&
          this.setObserver('container', container, () => this.hydrate(content))
      }
    }
  }
}

export default DOMController
