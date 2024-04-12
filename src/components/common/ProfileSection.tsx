import styles from "./ProfileSection.module.scss";

const ProfileSection = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.badge}>
        <span className={styles.level}>LV 3</span>
        <span className={styles.nickname}>닉네임</span>
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
