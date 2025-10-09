import FeedbackSection from "@/components/FeedbackSection/FeedbackSection";
import styles from "./ContactsPage.module.scss";

export default function ContactsPage() {
  return (
    <div className="container">
      <div className={styles.contactsContainer}>
        <FeedbackSection />
      </div>
    </div>
  );
}
