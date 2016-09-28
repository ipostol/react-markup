import React from 'react';
import Kit from './Kit';

export default ({ location, route, children }) => (
  <div style={{ height: '100%' }}>
    <Kit
      path={location.pathname}
      componentsList={route.componentsList}
    />
    <div style={{ height: '100%' }}>{children}</div>
  </div>
);
