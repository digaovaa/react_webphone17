import React from "react";
import styles from "./styles.module.scss";

const Avatar = ({ src, alt, name, size = "medium", canDrag }) => {
  const [imageError, setImageError] = React.useState(false);

  const handleError = () => {
    setImageError(true);
  };

  const getInitials = () => {
    if (!name) return "?";
    const nameParts = name.trim().split(" ");
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).slice(0, 2).join("");
    return initials;
  };

  return (
    <div className={`${styles.avatar} ${styles[`avatar--${size}`]}`}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          onError={handleError}
          className={styles.avatar__image}
          canDrag={canDrag}
        />
      ) : (
        <div className={styles.avatar__fallback}>{getInitials()}</div>
      )}
    </div>
  );
};

export default Avatar;
