import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.title}>404</div>
      <div className={styles.description}>페이지를 찾을 수 없어요!</div>
    </main>
  );
};

export default NotFoundPage;
