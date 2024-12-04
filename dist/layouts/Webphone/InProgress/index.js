"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InProgressLayout = void 0;
var _react = _interopRequireDefault(require("react"));
var _SpeakerHigh = require("../../../assets/icons/SpeakerHigh.svg");
var _Microphone = require("../../../assets/icons/Microphone.svg");
var _MicrophoneSlash = require("../../../assets/icons/MicrophoneSlash.svg");
var _PhoneDisconnect = require("../../../assets/icons/PhoneDisconnect.svg");
var _DotsNine = require("../../../assets/icons/DotsNine.svg");
var _Webphone = require("../../../contexts/Webphone");
var _stylesModule = _interopRequireDefault(require("./styles.module.scss"));
var _Avatar = _interopRequireDefault(require("../../../components/Avatar"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import { 
//   DotsNine, 
//   Microphone, 
//   MicrophoneSlash, 
//   PhoneDisconnect, 
//   SpeakerHigh 
// } from "@phosphor-icons/react";

const InProgressLayout = () => {
  const {
    callStatus,
    name,
    endCall,
    mute,
    unMute,
    isMuted,
    profilePictureURL
  } = (0, _Webphone.useWebphone)();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.in_progress_layout,
    canDrag: 1
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.avatar_section,
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
    className: _stylesModule.default.call_status,
    canDrag: 1
  }, callStatus)), /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.controls,
    canDrag: 1
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.grid
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: _stylesModule.default.keyboard,
    disabled: true
  }, /*#__PURE__*/_react.default.createElement(_SpeakerHigh.ReactComponent, {
    size: 18
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: _stylesModule.default.desc
  }, "sound")), /*#__PURE__*/_react.default.createElement("button", {
    className: _stylesModule.default.keyboard,
    disabled: true
  }, /*#__PURE__*/_react.default.createElement(_DotsNine.ReactComponent, {
    width: 18,
    height: 18,
    stroke: "currentColor",
    color: "currentColor"
  })), isMuted ? /*#__PURE__*/_react.default.createElement("button", {
    className: _stylesModule.default.keyboard,
    highlighted: true,
    onClick: unMute
  }, /*#__PURE__*/_react.default.createElement(_MicrophoneSlash.ReactComponent, {
    width: 18,
    height: 18
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: _stylesModule.default.desc
  }, "unmute")) : /*#__PURE__*/_react.default.createElement("button", {
    className: _stylesModule.default.keyboard,
    onClick: mute
  }, /*#__PURE__*/_react.default.createElement(_Microphone.ReactComponent, {
    width: 18,
    height: 18
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: _stylesModule.default.desc
  }, "mute")))), /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.end_call,
    canDrag: 1
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: _stylesModule.default.end_call_button,
    onClick: endCall
  }, /*#__PURE__*/_react.default.createElement(_PhoneDisconnect.ReactComponent, {
    width: 15,
    height: 15,
    color: "white"
  }))));
};
exports.InProgressLayout = InProgressLayout;