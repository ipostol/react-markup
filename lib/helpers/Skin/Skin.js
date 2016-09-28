'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  skin: {
    position: 'relative',
    width: 600,
    minHeight: 200,
    margin: '50px auto',
    padding: 50,
    backgroundColor: '#ededed',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)'
  }
};

exports.default = function (_ref) {
  var style = _ref.style;
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { style: _extends({}, styles.skin, style) },
    children
  );
};