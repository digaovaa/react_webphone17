import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useWebphone } from "../../contexts/Webphone";

export const Draggable = ({ children }) => {
  const { config, screenState, screensState, phoneInfos } =
    useWebphone();

  const [position, setPosition] = useState({ 
    x: config.button.position_x === "left" ? 75 : (window.innerWidth - 295) ,
    y: config.button.position_y === "top" ? 125 : (window.innerHeight - 525) 
  }); // Posição inicial
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
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
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
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

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getHeight = () => {
    if (screenState === screensState.INCOMING_CALL_SCREEN) return Object.keys(phoneInfos).length > 1 ? "310px" : "310px";
    else if (screenState === screensState.CALL_SCREEN) return Object.keys(phoneInfos).length > 1 ? "360px" : "360px";
    else return Object.keys(phoneInfos).length > 1 ? "480px" : "430px";
  }

  const getBackground = () => {

    const background = config.background.gradient_color
      ? `linear-gradient(${config.background.gradient_direction
      }, ${config.background.gradient_color.join(", ")})`
      : config.background.color

      return background
  }

  useEffect(() => {
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

  useEffect(() => {
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
        setPosition({ x: newX, y: newY });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [position]);

  return (
    <div
      id="webphone_draggable"
      className={styles.draggable}
      style={{ left: `${position.x}px`, top: `${position.y}px`, height: getHeight(), background: getBackground() }}
      onMouseDown={handleMouseDown}
      canDrag={1}
    >
      {children}
    </div>
  );
};

export default Draggable;
