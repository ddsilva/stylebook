import addons from '@storybook/addons'
import { ManagerData } from './interfaces'
import { EventChannel, DOMController } from './classes'
import { ADDON_NAME } from './constants'

addons.register(ADDON_NAME, () => {
  const channel = new EventChannel()
  const documentManager = new DOMController()

  channel.on('stylebook-hydrate', (content: ManagerData) =>
    documentManager.hydrate(content)
  )
})
