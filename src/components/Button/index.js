import React from 'react';
import styles from './styles.module.scss';

export function Button({ bgColor, height, width, borderRadius, onClick, children }) {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor: bgColor, height, width, borderRadius }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}