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
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/UserStore";
import { getProblemList } from "../../api/problem/problem";
import MoreIcon from "../../assets/icons/more.svg?react";

const HomePage = () => {
  const navigate = useNavigate();
  const nickname = useUserStore((state) => state.nickname);
  const myLevel = useUserStore((state) => state.level);
  const {
    data: rankInfo,
    isLoading: rankIsLoading,
    isError: rankIsError,
    refresh: refreshRank,
  } = useFetching(getRanks);

  const { data: problemList, isLoading: problemListIsLoading } =
    useFetching(getProblemList);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.welcome}>
          <div> {nickname} 님,</div>
          <div> 오늘도 happy coding ^^</div>
        </div>
        <ProfileSection />
      </div>
      <div className={styles.contents}>
        <ListBallon title="공지사항" width="100%" className={styles.notice}>
          {/* <CustomSkeleton height={41} className={styles.skeleton} />
          <CustomSkeleton height={41} className={styles.skeleton} /> */}
          {["✨신규 문제 업데이트 완료", "📍코디톤 version 1.0 출시"].map(
            (notice) => (
              <NoticeBlock notice={notice} key={notice} />
            )
          )}
        </ListBallon>
        <ListBallon
          title="New Arrivals"
          width="100%"
          className={styles.arrival}
        >
          <div className={styles.wrapper}>
            {problemListIsLoading && (
              <>
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
              </>
            )}
            {problemList?.map((problem) => (
              <ArrivalBlock
                key={problem.problemId}
                title={problem.title}
                difficulty={problem.difficulty}
                isPlayed={problem.isPlayed}
              />
            ))}
          </div>
        </ListBallon>
        <ListBallon title="랭킹" width="160%" className={styles.ranking}>
          {rankIsLoading && (
            <>
              <CustomSkeleton height={41} className={styles.skeleton} />
              <CustomSkeleton height={41} className={styles.skeleton} />
              <CustomSkeleton height={41} className={styles.skeleton} />
            </>
          )}
          {rankIsError && <RetryIcon onClick={refreshRank} />}
          {rankInfo?.ranker.map((ranker) => (
            <RankBlock
              key={ranker.nickname}
              level={ranker.level}
              nickname={ranker.nickname}
              rank={ranker.rank}
            />
          ))}
          {rankInfo?.myRank && (
            <>
              <div className={styles.more_icon_wrapper}>
                <MoreIcon
                  width={200}
                  height={200}
                  className={styles.more_icon}
                />
              </div>
              <RankBlock
                level={myLevel}
                nickname={nickname}
                rank={rankInfo.myRank}
              />
            </>
          )}
        </ListBallon>
      </div>
      <div className={styles.buttons}>
        <Button
          value="혼자 놀기"
          className={styles.button}
          onClick={() => navigate("/problemlist")}
        />
        <Button
          value="같이 놀기"
          className={styles.button}
          onClick={() => navigate("/roomList")}
        />
      </div>
    </div>
  );
};

export default HomePage;
