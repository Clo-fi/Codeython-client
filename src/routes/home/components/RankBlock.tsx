import styles from "./RankBlock.module.scss";

interface Props {
  level: number;
  nickname: string;
}

const RankBlock = ({ level, nickname }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.level}>LV {level}</div>
      <div className={styles.nickname}>{nickname}</div>
    </div>
  );
};

export default RankBlock;
