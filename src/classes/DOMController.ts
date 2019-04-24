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

interface Overseer {
  name: string
  observer: MutationObserver
}

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
    const MutationOverseer: Overseer = {
      name,
      observer: new MutationObserver(callback)
    }
    MutationOverseer.observer.observe(node, options)
    this.observers.push(MutationOverseer)
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

    const manager: HTMLElement = this.root.querySelector(
      MANAGER_SELECTOR
    ) as HTMLElement

    const preview: HTMLElement = this.root.querySelector(
      PREVIEW_SELECTOR
    ) as HTMLElement

    const container: HTMLElement = this.root.querySelector(
      CONTAINER_SELECTOR
    ) as HTMLElement

    const toggleFs: Element = document.querySelector(
      'button[title="Go full screen"], button[title="Exit full screen"]'
    ) as Element

    if (manager && preview && container) {
      toggleFs && toggleFs.addEventListener('click', this.toggleFullscreen)

      // manager.setAttribute('style', 'position: relative; width: auto')
      // preview.setAttribute('style', 'position: relative')

      const styles = Object.values(document.styleSheets)
      const managerStyles: CSSStyleSheet = styles.find(
        (stylesheet: CSSStyleSheet) => {
          const rule: CSSStyleRule = stylesheet.rules[0] as CSSStyleRule
          return rule.selectorText === '.css-1q7pov5'
        }
      ) as CSSStyleSheet

      managerStyles.insertRule('.css-1q7pov5 { background-color: #fff }', 1)

      // styles.map((stylesheet: CSSStyleSheet) => {
      //   stylesheet.insertRule('header { background-color: red }', 1)
      //   console.log(stylesheet)
      // })

      // this.setObserver(
      //   'preview',
      //   preview,
      //   mutation =>
      //     this.avoidMutation(mutation, 'attributes', () => {
      //       // remove automatically injected attribute
      //     }),
      //   { childList: true, attributes: true }
      // )

      container.style.transition = ''
      container.style.display = 'flex'
      container.style.visibility = 'visible'
    }
  }

  private avoidMutation = (
    mutations: MutationRecord[],
    type: string,
    callback: any
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
      console.log('hydrate')
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
