"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = Button;
var _react = _interopRequireDefault(require("react"));
var _stylesModule = _interopRequireDefault(require("./styles.module.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Button(_ref) {
  let {
    bgColor,
    height,
    width,
    borderRadius,
    onClick,
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("button", {
    className: _stylesModule.default.button,
    style: {
      backgroundColor: bgColor,
      height,
      width,
      borderRadius
    },
    onClick: onClick
  }, children);
}