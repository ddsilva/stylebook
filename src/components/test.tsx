import React from 'react';
const Component = ({children, ...rest}: {children: any}) => <div {...rest}>{children}</div>;
export default Component;
