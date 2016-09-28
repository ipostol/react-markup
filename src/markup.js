/* eslint-disable */

import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Frame from './helpers/Frame/Frame';
import NotFound from './helpers/NotFound/NotFound';
import { requireAll } from './helpers/utils';
import './normalize.scss';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const componentsList = [];
const componentsDocs = {};

const req = require.context('components', true, /\.docs\.js$/);
const modules = requireAll(req); // array with all require components
const modulesKeys = req.keys(); // array with components files paths

for (let key = 0; key < modulesKeys.length; key += 1) {

  const name = modulesKeys[key].slice(2);
  const component = modules[key].default || modules[key];

  if (Component.isPrototypeOf(component)) {
    componentsList.push(name);
    componentsDocs[name] = component;
  }

}

/**
 * creating markup routing system from list of components
 */
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Frame} componentsList={componentsList}>
      {
        componentsList.map((component, key) => {
          return (
            <Route path={`/components/${component}`} component={componentsDocs[component]} key={key} />
          );
        })
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
