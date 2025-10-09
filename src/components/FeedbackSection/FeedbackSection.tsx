import FeedbackForm from "../FeedbackForm/FeedbackForm";
import "@/styles/index.scss";
import styles from "./FeedbackSection.module.scss";
import Image from "next/image";

const FeedbackSection = () => {
  return (
    <section className="container">
      <h2 className={styles.feedbackTitle}>CONTACT US</h2>
      <p className={styles.feedbackSubtitle}>
        Questions? Comments? Contact us or let’s get in touch with you by filling out
        the email form below
      </p>
      <div className={styles.feedbackSection}>
        <div className={styles.formCirclesContainer}>
          <div className={styles.formCircles} />
        </div>
        <h3 className={styles.formTitle}>LEAVE YOUR DETAILS AND WE WILL CONTACT YOU</h3>
        <div className={styles.feedbackContent}>
          <FeedbackForm />
          <div className={styles.feedbackImgContainer}>
            <Image
              alt="candle"
              className={styles.feedbackImg}
              fill={true}
              src="/images/sections/features/feature.png"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
