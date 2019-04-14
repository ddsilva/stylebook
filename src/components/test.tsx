import React from 'react'

const Component = ({ children, ...rest }: { children: JSX.Element }) => (
  <div {...rest}>{children}</div>
)
export default Component
