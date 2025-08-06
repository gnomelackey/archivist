import { UploadForm } from "./form";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <UploadForm />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
