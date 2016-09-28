'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */

var panelWidth = 400;

var styles = {
  kit: {
    width: panelWidth,
    zIndex: 100000000,
    position: 'fixed',
    left: 0,
    top: 0,
    background: '#E6E6EA',
    boxShadow: '2px 2px 13px -1px rgba(0,0,0,0.15)',
    height: '100%',
    fontFamily: 'Roboto',
    overflow: 'hidden',
    transition: '.5s ease'
  },
  sections: {
    width: panelWidth,
    backgroundColor: '#8D99AE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    overflow: 'auto',
    height: 'calc(100% - 44px)'
  },
  section: {
    height: '25px',
    paddingBottom: '10px',
    paddingLeft: '27px',
    paddingRight: '27px',
    paddingTop: '15px',
    cursor: 'pointer',
    color: '#ffffff'
  },
  sectionActive: {
    backgroundColor: '#2B2D42',
    color: '#ffffff'
  },
  active: {
    backgroundColor: '#F4F4F8',
    color: '#261b24'
  },
  link: {
    display: 'block',
    padding: 19,
    textDecoration: 'none',
    textAlign: 'left',
    color: '#544952',
    borderBottom: '#e9e9e9 solid 1px'
  }
};

var sections = ['Components'];

var Kit = function (_Component) {
  _inherits(Kit, _Component);

  function Kit() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Kit);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Kit.__proto__ || Object.getPrototypeOf(Kit)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      close: !false,
      section: 'Components'
    }, _this.changeSection = function (section) {

      _this.setState({
        section: section
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Kit, [{
    key: 'componentWillMount',
    value: function componentWillMount() {

      this.setState({
        section: this.state.section
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      document.addEventListener('keydown', function (e) {
        if (e.keyCode === 72) {
          _this2.setState({
            close: !_this2.state.close
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { style: _extends({}, styles.kit, { width: !this.state.close ? panelWidth : 0 }) },
        _react2.default.createElement(
          'div',
          { style: styles.sections },
          sections.map(function (section, key) {
            return _react2.default.createElement(
              'div',
              { key: key, style: _extends({}, styles.section, styles[_this3.state.section === section ? 'sectionActive' : '']), onClick: _this3.changeSection.bind(null, section) },
              section
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { style: styles.content },
          this.props[this.state.section.toLowerCase() + 'List'].map(function (item, key) {
            return _react2.default.createElement(
              _reactRouter.Link,
              { key: key, style: _extends({}, styles.link, styles[_this3.props.path === '/' + _this3.state.section.toLowerCase() + '/' + item ? 'active' : '']), to: '/' + _this3.state.section.toLowerCase() + '/' + item },
              item
            );
          })
        )
      );
    }
  }]);

  return Kit;
}(_react.Component);

Kit.propTypes = {
  path: _react.PropTypes.string
};
exports.default = Kit;