import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Kit from './Kit';

injectTapEventPlugin();

export const styles = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'absolute',
};

export default ({ location, route, children }) => (
  <MuiThemeProvider>
    <div style={styles}>
      <Kit
        path={location.pathname}
        componentsList={route.componentsList}
      />
      <div style={{ height: '100%' }}>{children}</div>
    </div>
  </MuiThemeProvider>
);
