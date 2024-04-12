import styles from "./RecordBlock.module.scss";

const RecordBlock = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>2020.12.13</span>
        <span>|</span>
        <span>주사위 굴리기</span>
      </div>
      <div className={styles.rank}>
        <span>50%</span>
        <span></span>
        <span>3등(3/7)</span>
      </div>
    </div>
  );
};

export default RecordBlock;
