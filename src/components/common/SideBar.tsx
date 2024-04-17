import React from "react";

import styles from "./SideBar.module.scss";
import { useNavigate } from "react-router-dom";
import CustomProgressBar from "./CustomProgressBar";

interface Props {
  nickname: string;
  exp: number;
  level: number;
}

const SideBar = ({ nickname, exp, level }: Props) => {
  const navigate = useNavigate();
  const pageRouteHandler = (path: string) => {
    navigate(`/${path}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.user_info_block}>
        <div className={styles.user_info}>
          <img className={styles.user_img} src="/Imgs/CodeythonLogo.png" />
          <div className={styles.user_nickname}>{nickname}</div>
        </div>
        <div className={styles.level_block}>
          <div>LV {level}</div>
          <CustomProgressBar exp={exp} width={"80%"} />
        </div>
      </div>

      <div className={styles.action_container}>
        <button
          className={styles.action_button}
          onClick={() => pageRouteHandler("home")}
        >
          홈
        </button>
        <button
          className={styles.action_button}
          onClick={() => pageRouteHandler("profile")}
        >
          프로필
        </button>
        <button className={styles.action_button}>알고리즘 연습하기</button>
        <button className={styles.action_button}>코디톤 방 만들기</button>
        <button className={styles.action_button}>초대 코드 입력하기</button>
        <img src="Imgs/CodeythonLogo.png" alt="GithubLogo" />
      </div>

      <div className={styles.exit_codeython_menu}>
        <button className={styles.action_button}>로그아웃</button>
        <span>탈퇴하기</span>
      </div>
    </div>
  );
};

export default SideBar;
