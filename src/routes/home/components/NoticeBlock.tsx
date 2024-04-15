import styles from "./NoticeBlock.module.scss";
interface Props {
  notice: string;
}

const NoticeBlock = ({ notice }: Props) => {
  return <div className={styles.container}>{notice}</div>;
};

export default NoticeBlock;
