import styles from "./ChatBalloon.module.scss";
interface Props {
  nickname: string;
  message: string;
  isMine: boolean;
}

const ChatBalloon = ({ nickname, message, isMine }: Props) => {
  return (
    <div className={`${styles.container} ${isMine ? styles.my_container : ""}`}>
      <div className={styles.nickname}>{isMine ? "me" : nickname}:</div>
      <div className={styles.message}> {message}</div>
    </div>
  );
};

export default ChatBalloon;
