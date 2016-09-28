'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Frame = require('./components/Frame');

var _Frame2 = _interopRequireDefault(_Frame);

var _NotFound = require('./components/NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

var _utils = require('./helpers/utils');

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactTapEventPlugin2.default)(); /* eslint-disable */

var componentsList = [];
var componentsDocs = {};

var req = require.context('docsPath', true, /\.docs\.js$/);
var modules = (0, _utils.requireAll)(req); // array with all require components
var modulesKeys = req.keys(); // array with components files paths

console.log(modulesKeys, '?????????');

for (var key = 0; key < modulesKeys.length; key += 1) {

  var name = modulesKeys[key].slice(2).split('.docs')[0];
  var component = modules[key].default;

  componentsList.push(name);
  componentsDocs[name] = component;
}

/**
 * creating markup routing system from list of components
 */
var routes = _react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _Frame2.default, componentsList: componentsList },
    componentsList.map(function (component, key) {
      return _react2.default.createElement(_reactRouter.Route, { path: '/components/' + component, component: componentsDocs[component], key: key });
    }),
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _NotFound2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '*', component: _NotFound2.default })
  )
);

_reactDom2.default.render(routes, document.getElementById('react-root'));