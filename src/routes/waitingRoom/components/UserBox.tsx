import LevelIcon from "../../../components/common/LevelIcon";
import Avatar from "./Avatar";
import styles from "./UserBox.module.scss";
import XIcon from "../../../assets/icons/x.svg?react";
import OwnerIcon from "../../../assets/icons/owner.svg?react";

interface Props {
  nickname?: string;
  level?: number;
  message?: string | undefined;
  isClosed?: boolean;
  isOwner?: boolean;
}

const UserBox = ({ nickname, level, message, isClosed, isOwner }: Props) => {
  return (
    <div className={styles.box}>
      {nickname && level && (
        <>
          {isOwner && <OwnerIcon className={styles.owner_icon} />}
          <div className={styles.avatar}>
            {message && (
              <div className={styles.chat} key={message}>
                <div className={styles.message}>{message}</div>
              </div>
            )}
            <Avatar />
          </div>
          <div className={styles.user_info}>
            <LevelIcon level={level} className={styles.level} />
            <div className={styles.nickname}>{nickname}</div>
          </div>
        </>
      )}
      {isClosed && (
        <div className={styles.closed}>
          <XIcon />
        </div>
      )}
    </div>
  );
};

export default UserBox;
