import useUserStore from "../../store/UserStore";
import CustomProgressBar from "./CustomProgressBar";
import styles from "./ProfileSection.module.scss";

const ProfileSection = () => {
  const { nickname, exp, level } = useUserStore();

  return (
    <div className={styles.profile}>
      <div className={styles.info}>
        <div className={styles.badge}>
          <span className={styles.level}>LV {level}</span>
          <span className={styles.nickname}>{nickname}</span>
        </div>
        <CustomProgressBar exp={exp} width="160px" />
      </div>
      <img
        className={styles.logo}
        src="/Imgs/CodeythonLogo_star.png"
        alt="codeythonLogo"
      />
    </div>
  );
};

export default ProfileSection;
