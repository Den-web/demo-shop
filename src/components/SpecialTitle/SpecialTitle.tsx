import { MonteCarlo } from "next/font/google";
import styles from "./SpecialTitle.module.scss";

const monteCarlo = MonteCarlo({
  weight: "400",
  subsets: ["latin"],
});

interface SpecialTitleProps {
  children: React.ReactNode;
  color?: string;
  size?: string | number;       // размер для десктопа
  mobileSize?: string | number; // размер для мобильных
  className?: string;
}

export default function SpecialTitle({ children, color, size, mobileSize, className = "" }: SpecialTitleProps) {
  const style: React.CSSProperties = {
    color,
    // передаём размеры через CSS-переменные, чтобы медиа-правила могли их переопределять
    '--desktop-font-size': (size as string) || '80px',
    '--mobile-font-size': (mobileSize as string) || '44px',
  } as React.CSSProperties;

  return (
    <span
      className={`${monteCarlo.className} ${styles.specialTitle} ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
