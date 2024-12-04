"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _stylesModule = _interopRequireDefault(require("./styles.module.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Avatar = _ref => {
  let {
    src,
    alt,
    name,
    size = "medium",
    canDrag
  } = _ref;
  const [imageError, setImageError] = _react.default.useState(false);
  const handleError = () => {
    setImageError(true);
  };
  const getInitials = () => {
    if (!name) return "?";
    const nameParts = name.trim().split(" ");
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).slice(0, 2).join("");
    return initials;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: `${_stylesModule.default.avatar} ${_stylesModule.default[`avatar--${size}`]}`
  }, src && !imageError ? /*#__PURE__*/_react.default.createElement("img", {
    src: src,
    alt: alt || name || "Avatar",
    onError: handleError,
    className: _stylesModule.default.avatar__image,
    canDrag: canDrag
  }) : /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.avatar__fallback
  }, getInitials()));
};
var _default = exports.default = Avatar;