import React from 'react';
import ReactDOM from 'react-dom';
import Hot from 'react-hot-loader/lib/AppContainer';
import { Root } from '../src';

const render = () => {
  ReactDOM.render(<Hot><Root /></Hot>, document.getElementById('react-root'));
}

render();

module.hot.accept('../src', render);
