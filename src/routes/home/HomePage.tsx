import styles from "./HomePage.module.scss";
import Button from "../../components/common/Button";
import ListBallon from "../../components/common/ListBallon";
import ProfileSection from "../../components/common/ProfileSection";

// TODO 사이드바 완성 후 레이아웃 수정
const HomePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles["layout-top"]}>
        <div className={styles["layout-left"]}>
          <div className={styles.welcome}>
            <div> 닉네임 님,</div>
            <div> 오늘도 happy coding ^^</div>
          </div>
          <ListBallon title="공지사항" width={360} height={212}></ListBallon>
        </div>
        <div className={styles["layout-right"]}>
          <ProfileSection />
          <ListBallon
            title="New Arrivals"
            width={400}
            height={300}
            className={styles.arrival}
          ></ListBallon>
        </div>
      </div>
      <div className={styles["layout-bottom"]}>
        <ListBallon title="랭킹" width={460} height={140}></ListBallon>
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
      </div>
    </main>
  );
};

export default HomePage;
