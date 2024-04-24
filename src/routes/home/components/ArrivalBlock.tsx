import styles from "./ArrivalBlock.module.scss";
interface Props {
  title: string;
  difficulty: number;
  isPlayed: boolean;
}

//TODO 어떻게 보여줄 지 수정
const ArrivalBlock = ({ title, difficulty, isPlayed }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.info_wrapper}>
        <div className={styles.icon}>🖊️</div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.tags}>
        <div className={styles.difficulty}>난이도 {difficulty}</div>
        {isPlayed && <div className={styles.isPlayed}>성공</div>}
      </div>
    </div>
  );
};

export default ArrivalBlock;
