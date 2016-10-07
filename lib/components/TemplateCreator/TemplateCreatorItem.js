'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Skin = require('../Skin');

var _Skin2 = _interopRequireDefault(_Skin);

var _materialUi = require('material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */

var TemplateCreatorItem = function (_React$Component) {
  _inherits(TemplateCreatorItem, _React$Component);

  function TemplateCreatorItem(props) {
    _classCallCheck(this, TemplateCreatorItem);

    var _this = _possibleConstructorReturn(this, (TemplateCreatorItem.__proto__ || Object.getPrototypeOf(TemplateCreatorItem)).call(this, props));

    _this.state = {
      fields: props.props
    };
    return _this;
  }

  _createClass(TemplateCreatorItem, [{
    key: 'changeField',
    value: function changeField(field, e) {

      var value = (typeof e === 'undefined' ? 'undefined' : _typeof(e)) !== 'object' ? e : e.target.value;

      if (value === 'undefined') {
        value = undefined;
      } else if (value !== '') {

        try {

          switch (_typeof(this.props.props[field])) {

            case 'function':
              value = new Function(value);
              break;
            case 'object':
              value = JSON.parse(value);
              break;
            case 'number':
              value = isNaN(parseFloat(value)) ? '' : parseFloat(value);
              break;

          }
        } catch (_) {}
      }

      this.setState({
        fields: _extends({}, this.state.fields, _defineProperty({}, field, value))
      });
    }
  }, {
    key: 'checkField',
    value: function checkField(field) {

      if (typeof field === 'function') {
        return field.toString().split('\n').slice(1).slice(0, -1).join('\n');
      }

      if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
        return JSON.stringify(field);
      }

      return field;
    }
  }, {
    key: 'checkFields',
    value: function checkFields() {
      var _this2 = this;

      var fields = [];

      var _loop = function _loop(field) {
        // eslint-disable-line guard-for-in
        fields.push(typeof _this2.props.props[field] === 'boolean' ? _react2.default.createElement(_materialUi.Toggle, {
          key: field,
          label: field + ': ',
          toggled: _this2.state.fields[field],
          onToggle: function onToggle(_, value) {
            return _this2.changeField(field, value);
          }
        }) : _react2.default.createElement(_materialUi.TextField, {
          key: field,
          hintText: field,
          multiLine: true,
          rows: 1,
          floatingLabelText: field,
          value: _this2.checkField(_this2.state.fields[field]) + '',
          onChange: _this2.changeField.bind(_this2, field)
        }));
        fields.push(_react2.default.createElement('br', { key: field + 1 }));
      };

      for (var field in this.state.fields) {
        _loop(field);
      }

      return fields;
    }
  }, {
    key: 'checkChildrenHTML',
    value: function checkChildrenHTML() {

      if (/^(?:<(\w+)(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>[^<>]*<\/\1+\s*>|<\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/>|<!--.*?-->|[^<>]+)*$/.test(this.state.fields.children)) {
        return _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: this.state.fields.children } });
      }

      return this.state.fields.children;
    }
  }, {
    key: 'render',
    value: function render() {

      var Component = this.props.component;

      return _react2.default.createElement(
        _Skin2.default,
        { style: _extends({ width: 500 }, this.props.style) },
        this.checkFields(),
        _react2.default.createElement('br', null),
        _react2.default.createElement(Component, _extends({}, this.state.fields, { children: this.checkChildrenHTML() })),
        _react2.default.createElement('br', null),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(_materialUi.RaisedButton, { label: 'Delete', secondary: true, onClick: this.props.remove })
      );
    }
  }]);

  return TemplateCreatorItem;
}(_react2.default.Component);

TemplateCreatorItem.propTypes = {
  component: _react.PropTypes.any,
  props: _react.PropTypes.object,
  remove: _react.PropTypes.func,
  style: _react.PropTypes.object
};
exports.default = TemplateCreatorItem;