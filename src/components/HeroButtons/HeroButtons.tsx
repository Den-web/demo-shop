import useDeviceDetection from "@/context/useDeviceDetection";
import Button from "../Button/Button";
import styles from "./HeroButtons.module.scss";
import Link from "next/link";

const HeroButtons = () => {
  const { isMobile, isTablet } = useDeviceDetection();

  const getButtonSize = () => {
    if (isMobile) return "s";
    if (isTablet) return "m";
    return "l";
  };

  return (
    <div className={styles.buttonBar}>
      <Link href="/catalog">
        <Button
          className={styles.button}
          size={getButtonSize()}
          variant="primary"
        >
          <div className={styles.iconContainer}>
            <img
              className={styles.ButtonIcon}
              src="/icon/arrow-up-right.svg?v=2"
              alt="Go to catalog"
              width={40}
              height={40}
            />
          </div>
          <span className={styles.button__text}>SHOP NOW</span>
        </Button>
      </Link>
      <Link href="/about">
        <Button size={getButtonSize()} variant="transparent">
          <span className={styles.moreInfoText}>LEARN MORE</span>
        </Button>
      </Link>
    </div>
  );
};

export default HeroButtons;
