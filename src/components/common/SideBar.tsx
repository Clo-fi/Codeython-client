import React, { useEffect } from "react";

import styles from "./SideBar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import CustomProgressBar from "./CustomProgressBar";

interface Props {
  nickname: string;
  exp: number;
}

const SideBar = ({ nickname, exp }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageRouteHandler = (path: string) => {
    navigate(`/${path}`);
  };
  useEffect(() => {
    const container = document.querySelector(`.${styles.container}`);
    container.classList.add(styles.slideInFromLeft);
    return () => {
      container.classList.remove(styles.slideInFromLeft);
    };
  }, []);

  return (
    <div className={`${styles.container} ${styles.slideInFromLeft}`}>
      <div className={styles.user_info_block}>
        <div className={styles.user_info}>
          <img className={styles.user_img} src="/Imgs/CodeythonLogo.png" />
          <div className={styles.user_nickname}>{nickname}</div>
        </div>
        <div className={styles.level_block}>
          <div>LV</div>
          <CustomProgressBar exp={exp} width={"80%"} />
        </div>
      </div>

      <div className={styles.action_container}>
        <button
          className={`
          ${styles.action_button}
          ${location.pathname === '/home' && styles.selected}
          `}
          onClick={() => pageRouteHandler("home")}
        >
          홈
        </button>
        <button
          className={`
          ${styles.action_button}
          ${location.pathname === '/profile' && styles.selected}
          `}
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