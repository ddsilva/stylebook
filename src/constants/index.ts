const ADDON_NAME = 'StyleBook'
const NEW_MANAGER_ID = 'sb-1q7pov5-manager'

const ROOT_NODE_SELECTOR = '#root'
const CONTAINER_SELECTOR = 'div:nth-child(2)'
const PREVIEW_SELECTOR = `${CONTAINER_SELECTOR}>div:nth-last-child(1)`
const MANAGER_SELECTOR = `${CONTAINER_SELECTOR}>div:nth-last-child(2)`
const TOGGLE_FS_SELECTOR =
  'button[title="Go full screen"], button[title="Exit full screen"]'

const CONTAINER_NORMALIZE =
  '{ display: flex; transition: none; visibility: visible }'
const MANAGER_NORMALIZE = '{ position: relative; width: auto }'
const PREVIEW_NORMALIZE = '{ position: relative }'

const STYLE_TAGS_SELECTOR =
  'style[data-styled], style[type="text/css"], style[data-emotion]'

export {
  ADDON_NAME,
  ROOT_NODE_SELECTOR,
  CONTAINER_SELECTOR,
  MANAGER_SELECTOR,
  TOGGLE_FS_SELECTOR,
  PREVIEW_SELECTOR,
  NEW_MANAGER_ID,
  CONTAINER_NORMALIZE,
  PREVIEW_NORMALIZE,
  MANAGER_NORMALIZE,
  STYLE_TAGS_SELECTOR
}
