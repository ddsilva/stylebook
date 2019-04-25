const ADDON_NAME = 'StyleBook'
const NEW_MANAGER_ID = 'sb-1q7pov5-manager'

const ROOT_NODE_SELECTOR = '#root'
const CONTAINER_SELECTOR = 'div:nth-child(2)'
const PREVIEW_SELECTOR = `${CONTAINER_SELECTOR}>div:nth-last-child(1)`
const MANAGER_SELECTOR = `${CONTAINER_SELECTOR}>div:nth-last-child(2)`
const PREVIEW_FRAME_SELECTOR = '#storybook-preview-iframe'
const TOGGLE_FS_SELECTOR =
  'button[title="Go full screen"], button[title="Exit full screen"]'
const STYLE_TAGS_SELECTOR =
  'style[data-styled], style[type="text/css"], style[data-emotion]'

const CONTAINER_NORMALIZE =
  '{ display: flex; transition: none; visibility: visible }'
const MANAGER_NORMALIZE = '{ position: relative; width: auto }'
const PREVIEW_NORMALIZE = '{ position: relative }'

export {
  ADDON_NAME,
  CONTAINER_NORMALIZE,
  CONTAINER_SELECTOR,
  MANAGER_NORMALIZE,
  MANAGER_SELECTOR,
  NEW_MANAGER_ID,
  PREVIEW_FRAME_SELECTOR,
  PREVIEW_NORMALIZE,
  PREVIEW_SELECTOR,
  ROOT_NODE_SELECTOR,
  STYLE_TAGS_SELECTOR,
  TOGGLE_FS_SELECTOR
}
