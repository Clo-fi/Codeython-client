import styles from "./HomePage.module.scss";
import Button from "../../components/common/Button";
import ListBallon from "../../components/common/ListBallon";
import ProfileSection from "../../components/common/ProfileSection";

const HomePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.welcome}>
          <div> 닉네임 님,</div>
          <div> 오늘도 happy coding ^^</div>
        </div>
        <ProfileSection />
      </div>
      <div className={styles.contents}>
        <ListBallon
          title="공지사항"
          width="100%"
          height={160}
          className={styles.notice}
        ></ListBallon>
        <ListBallon
          title="New Arrivals"
          width="100%"
          height={240}
          className={styles.arrival}
        ></ListBallon>
        <ListBallon
          title="랭킹"
          width="140%"
          height={140}
          className={styles.ranking}
        ></ListBallon>
      </div>
      <div className={styles.buttons}>
        <Button
          value="혼자 놀기"
          className={styles.button}
          onClick={() => {}}
        />
        <Button
          value="같이 놀기"
          className={styles.button}
          onClick={() => {}}
        />
      </div>
    </main>
  );
};

export default HomePage;
