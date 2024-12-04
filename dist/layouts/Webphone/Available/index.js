"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvailableLayout = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Webphone = require("../../../contexts/Webphone");
var _useSound = _interopRequireDefault(require("use-sound"));
var _dtmf = _interopRequireDefault(require("../../../assets/sounds/dtmf-1.mp3"));
var _dtmf2 = _interopRequireDefault(require("../../../assets/sounds/dtmf-2.mp3"));
var _dtmf3 = _interopRequireDefault(require("../../../assets/sounds/dtmf-3.mp3"));
var _dtmf4 = _interopRequireDefault(require("../../../assets/sounds/dtmf-4.mp3"));
var _dtmf5 = _interopRequireDefault(require("../../../assets/sounds/dtmf-5.mp3"));
var _dtmf6 = _interopRequireDefault(require("../../../assets/sounds/dtmf-6.mp3"));
var _dtmf7 = _interopRequireDefault(require("../../../assets/sounds/dtmf-7.mp3"));
var _dtmf8 = _interopRequireDefault(require("../../../assets/sounds/dtmf-8.mp3"));
var _dtmf9 = _interopRequireDefault(require("../../../assets/sounds/dtmf-9.mp3"));
var _dtmf10 = _interopRequireDefault(require("../../../assets/sounds/dtmf-0.mp3"));
var _dtmfHash = _interopRequireDefault(require("../../../assets/sounds/dtmf-hash.mp3"));
var _dtmfStar = _interopRequireDefault(require("../../../assets/sounds/dtmf-star.mp3"));
var _stylesModule = _interopRequireDefault(require("./styles.module.scss"));
var _Keyboard = require("../../../components/Keyboard");
var _Phone = require("../../../assets/icons/Phone.svg");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import { Phone } from "@phosphor-icons/react";

const AvailableLayout = () => {
  const [playDTMF1] = (0, _useSound.default)(_dtmf.default);
  const [playDTMF2] = (0, _useSound.default)(_dtmf2.default);
  const [playDTMF3] = (0, _useSound.default)(_dtmf3.default);
  const [playDTMF4] = (0, _useSound.default)(_dtmf4.default);
  const [playDTMF5] = (0, _useSound.default)(_dtmf5.default);
  const [playDTMF6] = (0, _useSound.default)(_dtmf6.default);
  const [playDTMF7] = (0, _useSound.default)(_dtmf7.default);
  const [playDTMF8] = (0, _useSound.default)(_dtmf8.default);
  const [playDTMF9] = (0, _useSound.default)(_dtmf9.default);
  const [playDTMF0] = (0, _useSound.default)(_dtmf10.default);
  const [playDTMFHash] = (0, _useSound.default)(_dtmfHash.default);
  const [playDTMFStar] = (0, _useSound.default)(_dtmfStar.default);
  const {
    startCall,
    callError,
    selectedToken
  } = (0, _Webphone.useWebphone)();
  const [phone, setPhone] = (0, _react.useState)("");
  const playDTMFSounds = key => {
    switch (key) {
      case "1":
        playDTMF1();
        break;
      case "2":
        playDTMF2();
        break;
      case "3":
        playDTMF3();
        break;
      case "4":
        playDTMF4();
        break;
      case "5":
        playDTMF5();
        break;
      case "6":
        playDTMF6();
        break;
      case "7":
        playDTMF7();
        break;
      case "8":
        playDTMF8();
        break;
      case "9":
        playDTMF9();
        break;
      case "0":
        playDTMF0();
        break;
      case "#":
        playDTMFHash();
        break;
      case "*":
        playDTMFStar();
        break;
    }
  };
  const handleOnClickKeyboard = key => {
    setPhone(phone + key);
    playDTMFSounds(key);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.container,
    canDrag: 1
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.inputContainer
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: _stylesModule.default.inputPhone,
    value: phone,
    placeholder: "Digite o telefone",
    onChange: event => {
      const valueOnlyNumbers = event.target.value.replace(/[^\d]/g, "");
      setPhone(valueOnlyNumbers);
    }
  }), callError && /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.errorText
  }, callError)), /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.grid
  }, /*#__PURE__*/_react.default.createElement(_Keyboard.Keyboard, {
    title: "1",
    desc: "",
    onClick: () => {
      handleOnClickKeyboard("1");
    }
  }), /*#__PURE__*/_react.default.createElement(_Keyboard.Keyboard, {
    title: "2",
    desc: "abc",
    onClick: () => {
      handleOnClickKeyboard("2");
    }
  }), /*#__PURE__*/_react.default.createElement(_Keyboard.Keyboard, {
    title: "3",
    desc: "def",
    onClick: () => {
      handleOnClickKeyboard("3");
    }
  }), /*#__PURE__*/_react.default.createElement(_Keyboard.Keyboard, {
    title: "4",
    desc: "ghi",
    onClick: () => {
      handleOnClickKeyboard("4");
    }
  }), /*#__PURE__*/_react.default.createElement(_Keyboard.Keyboard, {
    title: "5",
    desc: "jkl",
    onClick: () => {
      handleOnClickKeyboard("5");
    }
  }), /*#__PURE__*/_react.default.createElement(_Keyboard.Keyboard, {
    title: "6",
    desc: "mno",
    onClick: () => {
      handleOnClickKeyboard("6");
    }
  }), /*#__PURE__*/_react.default.createElement(_Keyboard.Keyboard, {
    title: "7",
    desc: "pqrs",
    onClick: () => {
      handleOnClickKeyboard("7");
    }
  }), /*#__PURE__*/_react.default.createElement(_Keyboard.Keyboard, {
    title: "8",
    desc: "tuv",
    onClick: () => {
      handleOnClickKeyboard("8");
    }
  }), /*#__PURE__*/_react.default.createElement(_Keyboard.Keyboard, {
    title: "9",
    desc: "wxyz",
    onClick: () => {
      handleOnClickKeyboard("9");
    }
  }), /*#__PURE__*/_react.default.createElement(_Keyboard.Keyboard, {
    title: "*",
    onClick: () => {
      handleOnClickKeyboard("*");
    }
  }), /*#__PURE__*/_react.default.createElement(_Keyboard.Keyboard, {
    title: "0",
    desc: "+",
    onClick: () => {
      handleOnClickKeyboard("0");
    }
  }), /*#__PURE__*/_react.default.createElement(_Keyboard.Keyboard, {
    title: "#",
    onClick: () => {
      handleOnClickKeyboard("#");
    }
  })), /*#__PURE__*/_react.default.createElement("button", {
    className: _stylesModule.default.callButton,
    onClick: () => startCall(phone, selectedToken)
  }, /*#__PURE__*/_react.default.createElement(_Phone.ReactComponent, null)));
};
exports.AvailableLayout = AvailableLayout;