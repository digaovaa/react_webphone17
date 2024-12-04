
import React from "react";
import styles from "./styles.module.scss";

export const Keyboard = ({ title, desc, onClick, highlighted = false, disabled = false }) => {
  return (
    <div
      className={styles.main}
      onClick={(event) => {
        onClick(event);
      }}
    >
      <p>{title}</p>
      {desc && (<small className={styles.desc}>{desc}</small>)}
    </div>
  )
}