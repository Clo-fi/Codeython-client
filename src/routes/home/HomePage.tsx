import styles from "./HomePage.module.scss";
import Button from "../../components/common/Button";
import ListBallon from "../../components/common/ListBallon";
import ProfileSection from "../../components/common/ProfileSection";
import NoticeBlock from "./components/NoticeBlock";
import ArrivalBlock from "./components/ArrivalBlock";
import RankBlock from "./components/RankBlock";

const HomePage = () => {
  return (
    <div className={styles.main}>
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
        >
          {["공지사항입니다공지사항입니당", "공지사항입니다공지사항입니당"].map(
            (notice) => (
              <NoticeBlock notice={notice} />
            )
          )}
        </ListBallon>
        <ListBallon
          title="New Arrivals"
          width="100%"
          height={250}
          className={styles.arrival}
        >
          <div className={styles.wrapper}>
            {[
              "미로 찾기",
              "bfs와 dfs",
              "문제 이름임",
              "미로 찾기",
              "bfs와 dfs",
              "문제 이름임",
            ].map((problem) => (
              <ArrivalBlock
                title={problem}
                difficulty={20}
                isPlayed={problem === "미로 찾기"}
              />
            ))}
          </div>
        </ListBallon>
        <ListBallon
          title="랭킹"
          width="160%"
          height={220}
          className={styles.ranking}
        >
          {["d", "d"].map(() => (
            <RankBlock level={13} nickname="킹왕짱어쩌고" />
          ))}
        </ListBallon>
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
    </div>
  );
};

export default HomePage;
