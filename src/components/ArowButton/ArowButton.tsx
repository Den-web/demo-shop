import styles from "./ArowButton.module.scss";
import React from "react";
import type { ButtonArrowProps } from "./types/ArowButton";

const ButtonArrow: React.FC<ButtonArrowProps> = ({
  className,
  icon,
  onClick,
  onTouchEnd
}) => {
  return (
    <button
      className={`${styles.buttonArrow} ${className}`}
      onClick={onClick}
      onTouchStart={onTouchEnd}
    >
      {icon === "left" ? (
        <img
          className={styles.arrowLeft}
          src="/icon/chevron-left.svg"
          alt="Previous"
          width={24}
          height={24}
        />
      ) : (
        <img
          className={styles.arrowRight}
          src="/icon/chevron-right.svg"
          alt="Next"
          width={24}
          height={24}
        />
      )}
    </button>
  );
};

export default ButtonArrow;
