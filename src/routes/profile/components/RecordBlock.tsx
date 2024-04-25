import { RecentRecord } from "../../../types/user";
import styles from "./RecordBlock.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  record: RecentRecord;
}

const RecordBlock = ({
  record: { date, grade, title, accuracy, memberCnt },
  className,
  ...props
}: Props) => {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      <div className={styles.title}>
        <span>{date}</span>
        <span>|</span>
        <span>{title}</span>
      </div>
      <div className={styles.rank}>
        <span>{accuracy}%</span>
        {grade && (
          <span>
            {grade}등 ({grade}/{memberCnt})
          </span>
        )}
        {!grade && <span>(혼자놀기)</span>}
      </div>
    </div>
  );
};

export default RecordBlock;
