"use client";

import Image from "next/image";
import type { HeroSectionProps } from "./types/HeroSection.types";
import styles from "./HeroSection.module.scss";
import HeroButtons from "../HeroButtons/HeroButtons";
import SpecialTitle from "../SpecialTitle/SpecialTitle";

const HeroSection = ({ className }: HeroSectionProps) => {
  const combinedClass = className
    ? `${styles.hero_section} ${className}`
    : styles.hero_section;

  return (
    <section className="container">
      <div className={combinedClass} data-testid="hero-section">
        <Image
          src="/images/sections/hero/hero.png"
          alt="Hero"
          fill
          className={styles.imageBg}
          priority
        />
        <div className={styles.hero_content}>
          <div className={styles.textField}>
            <h1 className={styles.slogan}>
              CREATE A
              <SpecialTitle color="#907272" size="80px" mobileSize="44px">
                COZY
              </SpecialTitle>
              ATMOSPHERE
            </h1>
            <h1 className={styles.text}>
              DISCOVER THE ART OF RELAXATION WITH OUR HANDCRAFTED CANDLES. EACH
              SCENT IS DESIGNED TO TRANSFORM YOUR ENVIRONMENT AND ELEVATE YOUR
              MOOD.
            </h1>
            <HeroButtons />
            <div className={styles.imageCardWrapper}>
              <Image
                src="/images/sections/hero/hero.png"
                alt="Hero"
                width={700}
                height={400}
                className={styles.imageCard}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
