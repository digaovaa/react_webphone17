"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _logo = _interopRequireDefault(require("./logo.svg"));
require("./App.css");
var _Webphone = require("./contexts/Webphone");
var _Webphone2 = require("./pages/Webphone");
var _config = require("./data/config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function App() {
  const [wavoip, setWavoip] = (0, _react.useState)([
  // {
  //   name: "Wavoip",
  //   token: "AF34C92C-2381-4871-B790-14CE8437F645",
  //   canAcceptCall: false
  // },
  {
    name: "Wavoip",
    token: "f8d4d3c1-287b-4fb2-a5b2-05043ca04ae6",
    canAcceptCall: true
  }
  // {
  //   name: "Wavoip",
  //   token: "29cadf6b-b2df-42de-b6e6-916e71f3f71b",
  //   canAcceptCall: true
  // },
  ]);
  return /*#__PURE__*/_react.default.createElement(_Webphone.WebPhoneProvider, {
    defaultConfig: _config.defaultConfig,
    channels: wavoip
  }, /*#__PURE__*/_react.default.createElement(_Webphone2.Webphone, null));
}
var _default = exports.default = App;