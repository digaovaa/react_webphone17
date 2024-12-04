"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomingCallLayout = void 0;
var _react = _interopRequireDefault(require("react"));
var _Webphone = require("../../../contexts/Webphone");
var _stylesModule = _interopRequireDefault(require("./styles.module.scss"));
var _Avatar = _interopRequireDefault(require("../../../components/Avatar"));
var _PhoneDisconnect = require("../../../assets/icons/PhoneDisconnect.svg");
var _Phone = require("../../../assets/icons/Phone.svg");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const IncomingCallLayout = () => {
  const {
    name,
    callStatus,
    callState,
    profilePictureURL,
    acceptCall,
    rejectCall
  } = (0, _Webphone.useWebphone)();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.container,
    canDrag: 1
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.profileContainer,
    canDrag: 1
  }, /*#__PURE__*/_react.default.createElement(_Avatar.default, {
    size: "large",
    alt: "Avatar",
    src: profilePictureURL || "default-avatar.png",
    name: name,
    canDrag: 1
  }), /*#__PURE__*/_react.default.createElement("p", {
    className: _stylesModule.default.name,
    canDrag: 1
  }, name), /*#__PURE__*/_react.default.createElement("p", {
    className: _stylesModule.default.status,
    canDrag: 1
  }, callStatus)), /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.buttonContainer,
    canDrag: 1
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: `${_stylesModule.default.button} ${_stylesModule.default.accept}`,
    disabled: callState !== "offer",
    onClick: acceptCall
  }, /*#__PURE__*/_react.default.createElement(_Phone.ReactComponent, {
    height: 15,
    width: 15,
    color: "white"
  })), /*#__PURE__*/_react.default.createElement("button", {
    className: `${_stylesModule.default.button} ${_stylesModule.default.reject}`,
    disabled: callState !== "offer",
    onClick: rejectCall
  }, /*#__PURE__*/_react.default.createElement(_PhoneDisconnect.ReactComponent, {
    height: 15,
    width: 15,
    color: "white"
  }))));
};
exports.IncomingCallLayout = IncomingCallLayout;