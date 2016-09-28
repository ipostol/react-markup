import React from 'react';
import Kit from './Kit';

const styles = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'absolute',
};

export default ({ location, route, children }) => (
  <div style={styles}>
    <Kit
      path={location.pathname}
      componentsList={route.componentsList}
    />
    <div style={{ height: '100%' }}>{children}</div>
  </div>
);
