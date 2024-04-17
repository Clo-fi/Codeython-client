import React, { useEffect } from "react";

import styles from "./SideBar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import CustomProgressBar from "./CustomProgressBar";
import useAuthStore from "../../store/AuthStore";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import instance from "../../api/axios";

interface Props {
  nickname: string;
  exp: number;
  level: number;
}

const SideBar = ({ nickname, exp, level }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["accessToken", "refreshToken"]);
  const { setLogout } = useAuthStore();
  const pageRouteHandler = (path: string) => {
    navigate(`/${path}`);
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const container: any = document.querySelector(`.${styles.container}`);
    container.classList.add(styles.slideInFromLeft);
    return () => {
      container.classList.remove(styles.slideInFromLeft);
    };
  }, []);

  const logoutHandler = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    setLogout();
    navigate("/");
  };
  const removeAccountHandler = () => {
    Swal.fire({
      icon: "warning",
      title: "정말로 탈퇴 하시겠습니까?",
      text: "결정을 되돌릴 수 없습니다.",
      showCancelButton: true,
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "돌아가기",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "error",
          title: "정말로 탈퇴하기",
          showCancelButton: true,
          confirmButtonText: "탈퇴하기",
          cancelButtonText: "돌아가기",
        }).then((result) => {
          if (result.isConfirmed) instance.delete("/api/users/delete");
        });
      }
    });
  };
  return (
    <div className={`${styles.container} ${styles.slideInFromLeft}`}>
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
          className={`
          ${styles.action_button}
          ${location.pathname === "/home" && styles.selected}
          `}
          onClick={() => pageRouteHandler("home")}
        >
          홈
        </button>
        <button
          className={`
          ${styles.action_button}
          ${location.pathname === "/profile" && styles.selected}
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
        <button className={styles.action_button} onClick={logoutHandler}>
          로그아웃
        </button>
        <span onClick={removeAccountHandler}>탈퇴하기</span>
      </div>
    </div>
  );
};

export default SideBar;
