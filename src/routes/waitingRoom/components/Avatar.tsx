import { useEffect, useState } from "react";
import styles from "./Avatar.module.scss";

const Avatar = () => {
  const [avatarRandomNum, setAvatarRandomNum] = useState<number>();
  const [decoRandomNum, setDecoRandomNum] = useState<number>();
  const [decoLocRandomNum, setDecoLocRandomNum] = useState<number>();

  useEffect(() => {
    setAvatarRandomNum(Math.floor(Math.random() * 4) + 1);
    setDecoRandomNum(Math.floor(Math.random() * 5));
    setDecoLocRandomNum(Math.floor(Math.random() * 2));
  }, []);

  return (
    <>
      {avatarRandomNum && (
        <div className={styles.box}>
          <img
            src={`/src/assets/avatar/avatar-${avatarRandomNum}.png`}
            className={styles.avatar}
          />
          {decoRandomNum !== undefined && decoRandomNum > 0 && (
            <img
              src={`/src/assets/avatar/deco-${decoRandomNum}.png`}
              className={decoLocRandomNum === 0 ? styles.decoL : styles.decoR}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Avatar;
