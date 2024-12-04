"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectionLayout = void 0;
var _react = require("@chakra-ui/react");
var _react2 = require("@phosphor-icons/react");
const ConnectionLayout = () => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_react.VStack, {
    gap: 2,
    paddingX: 2,
    paddingBottom: 20
  }, /*#__PURE__*/React.createElement(_react.Box, {
    paddingTop: 10
  }, /*#__PURE__*/React.createElement(_react2.WifiSlash, {
    size: 64,
    color: "white"
  })), /*#__PURE__*/React.createElement(_react.Text, {
    color: "white",
    size: "xl"
  }, "Sem conex\xE3o"), /*#__PURE__*/React.createElement(_react.Text, {
    as: "small",
    color: "whitesmoke",
    size: "xs",
    textAlign: "center"
  }, "Por favor verifique sua conex\xE3o com a internet, ou entre em contato com suporte.")));
};
exports.ConnectionLayout = ConnectionLayout;