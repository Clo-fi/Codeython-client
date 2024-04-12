import Button from "../../components/common/Button";
import Box from "./components/Box";
import styles from "./HomePage.module.scss";

// TODO 사이드바 완성 후 레이아웃 수정, normalize css 적용 후 필요없는 css 제거
const HomePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles["layout-top"]}>
        <div className={styles["layout-left"]}>
          <div className={styles.welcome}>
            <div> 닉네임 님,</div>
            <div> 오늘도 happy coding ^^</div>
          </div>
          <Box title="공지사항" width={360} height={212}></Box>
        </div>
        <div className={styles["layout-right"]}>
          <div className={styles.profile}>
            <div className={styles.badge}>
              <span className={styles.level}>LV 3</span>
              <span className={styles.nickname}>닉네임</span>
            </div>
            <img
              className={styles.logo}
              src="/Imgs/CodeythonLogo_star.png"
              alt="codeythonLogo"
            />
          </div>
          <Box
            title="New Arrivals"
            width={400}
            height={300}
            className={styles.arrival}
          ></Box>
        </div>
      </div>
      <div className={styles["layout-bottom"]}>
        <Box title="랭킹" width={460} height={140}></Box>
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
