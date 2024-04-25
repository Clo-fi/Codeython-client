import styles from "./Sidebar.module.scss";
import CustomProgressBar from "../../../components/common/CustomProgressBar";

interface Props {
  nickname: string;
  exp: number;
  level: number;
  onOut: () => void;
}

const SideBar = ({ nickname, exp, level, onOut }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.user_info_block}>
        <div className={styles.user_info}>
          <img className={styles.user_img} src="/Imgs/CodeythonLogo.png" />
          <div className={styles.user_nickname}>{nickname}</div>
        </div>
        <div className={styles.level_block}>
          <div className={styles.level}>LV {level}</div>
          <CustomProgressBar exp={exp} width={"80%"} />
        </div>
      </div>
      <div className={styles.action_container}>
        <button className={styles.action_button} onClick={() => onOut()}>
          방 나가기
        </button>
      </div>
    </div>
  );
};

export default SideBar;
