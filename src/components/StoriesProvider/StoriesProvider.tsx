const StoriesProvider = (props: object) => {
  const { children }: { children?: Function } = props
  return children && children()
}

export default StoriesProvider
