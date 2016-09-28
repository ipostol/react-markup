'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'div',
    { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' } },
    _react2.default.createElement(
      'h1',
      { style: { textAlign: 'center' } },
      'Hey this is react markup ',
      _react2.default.createElement('br', null),
      'Press ctrl+H'
    )
  );
};