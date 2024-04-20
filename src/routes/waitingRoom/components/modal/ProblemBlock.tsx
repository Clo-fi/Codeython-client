import styles from "./ProblemBlock.module.scss";

interface Props {
  problemId: number;
  title: string;
  difficulty: number;
  onClick: (problemId: number) => void;
  isSelected: boolean;
}

const ProblemBlock = ({
  problemId,
  title,
  difficulty,
  onClick,
  isSelected,
}: Props) => {
  return (
    <div
      onClick={() => onClick(problemId)}
      className={`${styles.container} ${isSelected ? styles.selected : ""}`}
    >
      <div className={styles.difficulty}>{difficulty}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default ProblemBlock;
