'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Kit = require('./Kit');

var _Kit2 = _interopRequireDefault(_Kit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'absolute'
};

exports.default = function (_ref) {
  var location = _ref.location;
  var route = _ref.route;
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { style: styles },
    _react2.default.createElement(_Kit2.default, {
      path: location.pathname,
      componentsList: route.componentsList
    }),
    _react2.default.createElement(
      'div',
      { style: { height: '100%' } },
      children
    )
  );
};