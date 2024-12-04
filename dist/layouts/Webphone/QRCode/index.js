"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QRCodeLayout = void 0;
var _react = _interopRequireDefault(require("react"));
var _qrcode = require("qrcode.react");
var _Webphone = require("../../../contexts/Webphone");
var _stylesModule = _interopRequireDefault(require("./styles.module.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const QRCodeLayout = () => {
  const {
    qrCode
  } = (0, _Webphone.useWebphone)();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.container,
    canDrag: 1
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.qrCodeBox,
    canDrag: 1
  }, qrCode ? /*#__PURE__*/_react.default.createElement(_qrcode.QRCodeCanvas, {
    value: qrCode,
    renderAs: "canvas",
    includeMargin: true,
    imageSettings: {
      src: "./whatsapp.png",
      height: 50,
      width: 50,
      excavate: false
    }
  }) : /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.spinnerBox,
    canDrag: 1
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.spinner,
    canDrag: 1
  }))), /*#__PURE__*/_react.default.createElement("p", {
    className: _stylesModule.default.title,
    canDrag: 1
  }, "Conectar Whatsapp"), /*#__PURE__*/_react.default.createElement("ol", {
    className: _stylesModule.default.instructions,
    canDrag: 1
  }, /*#__PURE__*/_react.default.createElement("li", {
    canDrag: 1
  }, "Abra o WhatsApp no seu celular."), /*#__PURE__*/_react.default.createElement("li", {
    canDrag: 1
  }, "Toque em Mais op\xE7\xF5es ou Configura\xE7\xF5es e selecione aparelhos conectados."), /*#__PURE__*/_react.default.createElement("li", {
    canDrag: 1
  }, "Toque em conectar um aparelho."), /*#__PURE__*/_react.default.createElement("li", {
    canDrag: 1
  }, "Aponte o celular para essa tela para capturar o QRcode.")));
};
exports.QRCodeLayout = QRCodeLayout;