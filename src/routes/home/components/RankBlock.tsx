import LevelIcon from "../../../components/common/LevelIcon";
import styles from "./RankBlock.module.scss";

interface Props {
  level: number;
  nickname: string;
}

const RankBlock = ({ level, nickname }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.level}>
        <LevelIcon level={level} /> LV {level}
      </div>
      <div className={styles.nickname}>{nickname}</div>
    </div>
  );
};

export default RankBlock;
