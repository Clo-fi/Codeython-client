/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./HomePage.module.scss";
import Button from "../../components/common/Button";
import ListBallon from "../../components/common/ListBallon";
import ProfileSection from "../../components/common/ProfileSection";
import NoticeBlock from "./components/NoticeBlock";
import ArrivalBlock from "./components/ArrivalBlock";
import RankBlock from "./components/RankBlock";
import { getRanks } from "../../api/user/user";
import useFetching from "../../hooks/useFetching";
import CustomSkeleton from "../../components/common/CustomSkeleton";
import RetryIcon from "../../assets/icons/retry.svg?react";

const HomePage = () => {
  const {
    data: rankInfo,
    isLoading: rankIsLoading,
    isError: rankIsError,
    refresh: refreshRank,
  } = useFetching(getRanks);

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
          {/* <CustomSkeleton height={41} className={styles.skeleton} />
          <CustomSkeleton height={41} className={styles.skeleton} /> */}
          {["✨신규 문제 업데이트 완료", "📍코디톤 version 1.0 출시"].map(
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
            <CustomSkeleton
              height={150}
              className={styles["arrival-skeleton"]}
            />
            <CustomSkeleton
              height={150}
              className={styles["arrival-skeleton"]}
            />
            <CustomSkeleton
              height={150}
              className={styles["arrival-skeleton"]}
            />
            {/* {[
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
            ))} */}
          </div>
        </ListBallon>
        <ListBallon
          title="랭킹"
          width="160%"
          height={220}
          className={styles.ranking}
        >
          {rankIsLoading && (
            <>
              <CustomSkeleton height={41} className={styles.skeleton} />
              <CustomSkeleton height={41} className={styles.skeleton} />
              <CustomSkeleton height={41} className={styles.skeleton} />
            </>
          )}
          {rankIsError && <RetryIcon onClick={refreshRank} />}
          {rankInfo?.ranker.map(() => (
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
