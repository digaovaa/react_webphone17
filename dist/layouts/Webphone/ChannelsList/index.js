"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChannelsList = void 0;
var _react = require("@chakra-ui/react");
var _react2 = require("@phosphor-icons/react");
// import { useWebphone } from "../../../contexts/Webphone";

const ChannelsList = () => {
  // const { token } = useWebphone();

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_react.VStack, {
    gap: 2,
    width: "95%",
    maxHeight: "300px",
    overflow: "auto",
    css: {
      "&::-webkit-scrollbar": {
        width: "4px"
      },
      "&::-webkit-scrollbar-track": {
        width: "6px",
        background: "#00000015"
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#00000050",
        borderRadius: "24px"
      }
    }
  }, [1, 2, 3, 4, 5, 6, 7].map(() => /*#__PURE__*/React.createElement(_react.HStack, {
    w: "full",
    px: 5,
    py: 2,
    cursor: "pointer",
    _hover: {
      backgroundColor: "#00000010"
    }
  }, /*#__PURE__*/React.createElement(_react.Avatar, {
    size: "md",
    name: "Christian Nwamba",
    src: "https://bit.ly/code-beast"
  }), " ", /*#__PURE__*/React.createElement(_react.VStack, {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexGrow: 1
  }, /*#__PURE__*/React.createElement(_react.Text, {
    textAlign: "start",
    color: "white"
  }, "teste"), /*#__PURE__*/React.createElement(_react.Text, {
    color: "white",
    as: "small"
  }, "+55 11 973951769")), /*#__PURE__*/React.createElement(_react.HStack, null, true && /*#__PURE__*/React.createElement(_react2.QrCode, {
    size: 15,
    weight: "fill",
    color: "white"
  }), false && /*#__PURE__*/React.createElement(_react2.Circle, {
    size: 15,
    weight: "fill",
    color: "#43c414"
  }), false && /*#__PURE__*/React.createElement(_react2.Circle, {
    size: 15,
    weight: "fill",
    color: "#980101"
  }))))));
};
exports.ChannelsList = ChannelsList;