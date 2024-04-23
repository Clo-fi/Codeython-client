import LevelIcon from "../../../components/common/LevelIcon";
import Avatar from "./Avatar";
import styles from "./UserBox.module.scss";

interface Props {
  nickname?: string;
  level?: number;
  message?: string;
}

const UserBox = ({ nickname, level }: Props) => {
  // TODO 채팅 메세지 띄우기
  return (
    <div className={styles.box}>
      {nickname && level && (
        <>
          <div className={styles.avatar}>
            <Avatar />
          </div>
          <div className={styles.user_info}>
            <LevelIcon level={level} className={styles.level} />
            <div className={styles.nickname}>{nickname}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserBox;
