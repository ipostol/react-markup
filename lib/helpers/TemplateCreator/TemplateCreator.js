'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

var _TemplateCreatorItem = require('./TemplateCreatorItem');

var _TemplateCreatorItem2 = _interopRequireDefault(_TemplateCreatorItem);

var _materialUi = require('material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */

var TemplateCreator = function (_Component) {
  _inherits(TemplateCreator, _Component);

  function TemplateCreator() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TemplateCreator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TemplateCreator.__proto__ || Object.getPrototypeOf(TemplateCreator)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      components: []
    }, _this.add = function () {
      _this.setState({
        components: _this.state.components.concat([_this.props.component.defaultProps])
      });
    }, _this.remove = function (index) {
      _this.setState({
        components: (0, _utils.removeIndexFromArray)(_this.state.components, index)
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TemplateCreator, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var component = _props.component;
      var style = _props.style;


      return _react2.default.createElement(
        'div',
        null,
        this.state.components.map(function (_, key) {
          return _react2.default.createElement(_TemplateCreatorItem2.default, { key: key, props: component.defaultProps, component: component, remove: _this2.remove.bind(_this2, key), style: style });
        }),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(_materialUi.RaisedButton, { label: 'Add component', primary: true, onClick: this.add })
      );
    }
  }]);

  return TemplateCreator;
}(_react.Component);

TemplateCreator.propTypes = {
  component: _react.PropTypes.any,
  style: _react.PropTypes.object
};
exports.default = TemplateCreator;