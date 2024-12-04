"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Draggable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _stylesModule = _interopRequireDefault(require("./styles.module.scss"));
var _Webphone = require("../../contexts/Webphone");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Draggable = _ref => {
  let {
    children
  } = _ref;
  const {
    config,
    screenState,
    screensState,
    phoneInfos
  } = (0, _Webphone.useWebphone)();
  const [position, setPosition] = (0, _react.useState)({
    x: config.button.position_x === "left" ? 75 : window.innerWidth - 295,
    y: config.button.position_y === "top" ? 125 : window.innerHeight - 525
  }); // Posição inicial
  const [isDragging, setIsDragging] = (0, _react.useState)(false);
  const [offset, setOffset] = (0, _react.useState)({
    x: 0,
    y: 0
  });
  const handleMouseDown = e => {
    let canDrag = e.target.getAttribute('canDrag');
    if (!canDrag) {
      return;
    }
    let target = document.getElementById("webphone_draggable");
    setIsDragging(true);

    // Captura o offset inicial entre o clique e a posição do elemento
    const rect = target.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  const handleMouseMove = e => {
    if (!isDragging) return;
    let target = document.getElementById("webphone_draggable");
    const body = document.body;
    const maxX = body.clientWidth - target.offsetWidth; // Largura do elemento
    const maxY = body.clientHeight - target.offsetHeight; // Altura do elemento

    let newX = e.clientX - offset.x;
    let newY = e.clientY - offset.y;

    // Restringir dentro dos limites do body
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > maxX) newX = maxX;
    if (newY > maxY) newY = maxY;
    setPosition({
      x: newX,
      y: newY
    });
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const getHeight = () => {
    if (screenState === screensState.INCOMING_CALL_SCREEN) return Object.keys(phoneInfos).length > 1 ? "310px" : "310px";else if (screenState === screensState.CALL_SCREEN) return Object.keys(phoneInfos).length > 1 ? "360px" : "360px";else return Object.keys(phoneInfos).length > 1 ? "480px" : "430px";
  };
  const getDefaultPosition = () => {
    // let y = config.button.position_y === "top" ? 50 : - 
  };
  const getBackground = () => {
    const background = config.background.gradient_color ? `linear-gradient(${config.background.gradient_direction}, ${config.background.gradient_color.join(", ")})` : config.background.color;
    return background;
  };
  (0, _react.useEffect)(() => {
    if (isDragging) {
      // Adicionar listeners no document para garantir que o movimento não seja perdido
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      // Remover listeners quando o arraste terminar
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  (0, _react.useEffect)(() => {
    const handleResize = () => {
      let target = document.getElementById("webphone_draggable");
      const body = document.body;
      const maxX = body.clientWidth - target.offsetWidth; // Largura do elemento
      const maxY = body.clientHeight - target.offsetHeight; // Altura do elemento

      let hasChange = false;
      let newX = position.x;
      let newY = position.y;
      if (newX < 0) {
        newX = 0;
        hasChange = true;
      }
      if (newY < 0) {
        newY = 0;
        hasChange = true;
      }
      if (newX > maxX) {
        newX = maxX;
        hasChange = true;
      }
      if (newY > maxY) {
        newY = maxY;
        hasChange = true;
      }
      if (hasChange) {
        setPosition({
          x: newX,
          y: newY
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [position]);
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "webphone_draggable",
    className: _stylesModule.default.draggable,
    style: {
      left: `${position.x}px`,
      top: `${position.y}px`,
      height: getHeight(),
      background: getBackground()
    },
    onMouseDown: handleMouseDown,
    canDrag: 1
  }, children);
};
exports.Draggable = Draggable;
var _default = exports.default = Draggable;