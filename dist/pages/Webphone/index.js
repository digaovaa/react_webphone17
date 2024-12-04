"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Webphone = void 0;
var _react = _interopRequireDefault(require("react"));
var _stylesModule = _interopRequireDefault(require("./styles.module.scss"));
var _Webphone = require("../../contexts/Webphone");
var _ArrowsLeftRight = require("../../assets/icons/ArrowsLeftRight.svg");
var _Phone = require("../../assets/icons/Phone.svg");
var _X = require("../../assets/icons/X.svg");
var _InProgress = require("../../layouts/Webphone/InProgress");
var _Available = require("../../layouts/Webphone/Available");
var _IncomingCall = require("../../layouts/Webphone/IncomingCall");
var _QRCode = require("../../layouts/Webphone/QRCode");
var _Button = require("../../components/Button");
var _Draggable = require("../../components/Draggable");
var _DotsSix = require("../../assets/icons/DotsSix.svg");
var _libphonenumberJs = _interopRequireDefault(require("libphonenumber-js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import { Button, HStack, VStack } from "@chakra-ui/react";
// import Draggable from "react-draggable";
// import { DotsNine, DotsSix, X } from "@phosphor-icons/react";

// import { IncomingCallLayout } from "../../layouts/Webphone/IncomingCall";
// import { ConnectionLayout } from "../../layouts/Webphone/NoConnection";
// import { DeviceNotFound } from "../../layouts/Webphone/DeviceNotFound";
// import { ChannelsList } from "../../layouts/Webphone/ChannelsList";

const Webphone = () => {
  var _parsePhoneNumber, _phoneInfos$selectedT, _phoneInfos$selectedT2;
  const {
    config,
    isOpen,
    setIsOpen,
    screenState,
    screensState,
    changeSelectedToken,
    selectedToken,
    phoneInfos
  } = (0, _Webphone.useWebphone)();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.webphone_wrapper
  }, isOpen && /*#__PURE__*/_react.default.createElement(_Draggable.Draggable, null, /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.draggable,
    canDrag: 1
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.header,
    canDrag: 1
  }, /*#__PURE__*/_react.default.createElement(_DotsSix.ReactComponent, {
    size: 24,
    color: "white",
    className: "handle",
    cursor: "move",
    canDrag: 1
  })), [screensState.AVAILABLE_SCREEN, screensState.QRCODE_SCREEN].includes(screenState) && Object.keys(phoneInfos).length > 1 && /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.header_phone_selector,
    canDrag: 1,
    onClick: () => {
      changeSelectedToken();
    }
  }, /*#__PURE__*/_react.default.createElement(_ArrowsLeftRight.ReactComponent, {
    height: 17,
    width: 17,
    canDrag: 1
  }), /*#__PURE__*/_react.default.createElement("p", null, ((_parsePhoneNumber = (0, _libphonenumberJs.default)(`+${(_phoneInfos$selectedT = phoneInfos[selectedToken]) === null || _phoneInfos$selectedT === void 0 ? void 0 : _phoneInfos$selectedT.phone}`)) === null || _parsePhoneNumber === void 0 ? void 0 : _parsePhoneNumber.formatInternational()) || ((_phoneInfos$selectedT2 = phoneInfos[selectedToken]) === null || _phoneInfos$selectedT2 === void 0 ? void 0 : _phoneInfos$selectedT2.phone) || selectedToken)), screenState === screensState.AVAILABLE_SCREEN && /*#__PURE__*/_react.default.createElement(_Available.AvailableLayout, null), screenState === screensState.CALL_SCREEN && /*#__PURE__*/_react.default.createElement(_InProgress.InProgressLayout, null), screenState === screensState.INCOMING_CALL_SCREEN && /*#__PURE__*/_react.default.createElement(_IncomingCall.IncomingCallLayout, null), screenState === screensState.QRCODE_SCREEN && /*#__PURE__*/_react.default.createElement(_QRCode.QRCodeLayout, null)))), /*#__PURE__*/_react.default.createElement("div", {
    className: `${_stylesModule.default.button_float} ${_stylesModule.default[`button_float--${config.button.position_y === "top" ? "top" : "bottom"}`]} ${_stylesModule.default[`button_float--${config.button.position_x === "left" ? "left" : "right"}`]}`
  }, config.button.visible && /*#__PURE__*/_react.default.createElement(_Button.Button, {
    bgColor: config.button.color,
    height: "60px",
    width: "60px",
    borderRadius: "100%",
    onClick: () => {
      setIsOpen(!isOpen);
    }
  }, isOpen ? /*#__PURE__*/_react.default.createElement(_X.ReactComponent, {
    height: 20,
    width: 20,
    color: "white"
  }) : /*#__PURE__*/_react.default.createElement(_Phone.ReactComponent, {
    height: 20,
    width: 20,
    color: "white"
  }))));
};
exports.Webphone = Webphone;