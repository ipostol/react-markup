import React from 'react';

const styles = {
  skin: {
    position: 'relative',
    width: 600,
    minHeight: 200,
    margin: '50px auto',
    padding: 50,
    backgroundColor: '#ededed',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
  },
};

export default ({ style, children }) => (
  <div style={{ ...styles.skin, ...style }}>{children}</div>
);
