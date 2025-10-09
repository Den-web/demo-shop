import classNames from "classnames";
import type { FeaturesSectionProps } from "./types/FeaturesSection.types";
import Image from "next/image";
import SpecialTitle from "@/components/SpecialTitle/SpecialTitle";
import styles from "./FeaturesSection.module.scss";

const FeaturesSection = ({ className }: FeaturesSectionProps) => {
  const classes = classNames(styles.featuresSection, className);

  return (
    <section className="container" data-testid="features-section">
      <h1 className={styles.featuresTitle}>OUR BENEFITS</h1>
      <div className={classNames(classes, styles.featuresGrid)}>
        <ol className={styles.featuresList}>
          <li className={styles.featuresItem}>
            <span className={styles.featuresNum}><SpecialTitle color="#907272" size="48px" mobileSize="30px">1</SpecialTitle></span>
            <div className={styles.featuresItemBody}>
              <h3 className={styles.featuresItemTitle}>INSPIRATION & DESIGN</h3>
              <p className={styles.featuresItemText}>
                From cozy nights to special gatherings, our candles create an inviting
                atmosphere while adding a timeless, handcrafted touch to your space.
              </p>
            </div>
          </li>
          <li className={styles.featuresItem}>
            <span className={styles.featuresNum}><SpecialTitle color="#907272" size="48px" mobileSize="30px">2</SpecialTitle></span>
            <div className={styles.featuresItemBody}>
              <h3 className={styles.featuresItemTitle}>PREMIUM INGREDIENTS</h3>
              <p className={styles.featuresItemText}>
                Our candles are crafted from natural, eco-friendly waxes that burn
                cleanly without releasing harmful toxins. Safer for your home,
                healthier for the air you breathe.
              </p>
            </div>
          </li>
          <li className={styles.featuresItem}>
            <span className={styles.featuresNum}><SpecialTitle color="#907272" size="48px" mobileSize="30px">3</SpecialTitle></span>
            <div className={styles.featuresItemBody}>
              <h3 className={styles.featuresItemTitle}>HAND-POURING WITH CARE</h3>
              <p className={styles.featuresItemText}>
                Designed for hours of enjoyment, each candle provides a steady,
                even burn that lets you savor the warm glow and aroma longer.
              </p>
            </div>
          </li>
        </ol>
        <div className={styles.featuresImageWrap}>
          <Image
            src="/images/sections/features/feature.png"
            alt="candle"
            fill
            className={styles.image}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
