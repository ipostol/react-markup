/* eslint-disable */

import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Frame from './components/Frame';
import NotFound from './components/NotFound';
import { requireAll } from './helpers/utils';

try { // require normalize file if he present, DO IT BY GLOBAL VARIABLE FROM WEBPACK CONFIG|ALIAS have or no normalize
  require('normalize');
} catch (e) {}

const componentsList = [];
const componentsDocs = {};

const req = require.context('root', true, /\.docs\.js$/);
const modules = requireAll(req); // array with all require components
const modulesKeys = req.keys(); // array with components files paths

for (let key = 0; key < modulesKeys.length; key += 1) {

  const name = modulesKeys[key].slice(2).split('.docs')[0];
  const component = modules[key].default;

  componentsList.push(name);
  componentsDocs[name] = component;

}

/**
 * creating markup routing system from list of components
 */
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Frame} componentsList={componentsList}>
      {
        componentsList.map((component, key) => (
          <Route path={`/components/${component}`} component={componentsDocs[component]} key={key} />
        ))
      }
      <IndexRoute component={NotFound} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

ReactDOM.render(
  routes,
  document.getElementById('react-root')
);
