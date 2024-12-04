"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Keyboard = void 0;
var _react = _interopRequireDefault(require("react"));
var _stylesModule = _interopRequireDefault(require("./styles.module.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Keyboard = _ref => {
  let {
    title,
    desc,
    onClick,
    highlighted = false,
    disabled = false
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.main,
    onClick: event => {
      onClick(event);
    }
  }, /*#__PURE__*/_react.default.createElement("p", null, title), desc && /*#__PURE__*/_react.default.createElement("small", {
    className: _stylesModule.default.desc
  }, desc));
};
exports.Keyboard = Keyboard;