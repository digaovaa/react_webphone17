"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeviceNotFound = void 0;
var _react = require("@chakra-ui/react");
var _react2 = require("@phosphor-icons/react");
var _Webphone = require("../../../contexts/Webphone");
const DeviceNotFound = () => {
  const {
    token
  } = (0, _Webphone.useWebphone)();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_react.VStack, {
    gap: 2,
    paddingX: 2,
    paddingBottom: 20
  }, /*#__PURE__*/React.createElement(_react.Box, {
    paddingTop: 10
  }, /*#__PURE__*/React.createElement(_react2.WarningOctagon, {
    size: 64,
    color: "white"
  })), /*#__PURE__*/React.createElement(_react.Text, {
    color: "white",
    size: "xl"
  }, "Token incorreto"), /*#__PURE__*/React.createElement(_react.Text, {
    as: "small",
    color: "whitesmoke",
    size: "xs",
    textAlign: "center"
  }, "Token do dispositivos ", token, " n\xE3o existe, caso tenha d\xFAvidas entre em contato com o suporte.")));
};
exports.DeviceNotFound = DeviceNotFound;