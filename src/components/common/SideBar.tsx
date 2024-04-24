import { useEffect } from "react";

import styles from "./SideBar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import CustomProgressBar from "./CustomProgressBar";
import useAuthStore from "../../store/AuthStore";
import { useCookies } from "react-cookie";
import instance from "../../api/axios";
import { CustomAlert } from "../../libs/sweetAlert/alert";

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
  const submitCode = () => {
    CustomAlert.fire({
      title: "초대 코드 입력하기",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      cancelButtonText: "돌아가기",
      confirmButtonText: "초대코드 입력",
      preConfirm: async (code) => {
        try {
          const response = await instance.post(`/rooms/direct/${code}`);
          console.log(response);
          if (response.status !== 200) {
            throw new Error(JSON.stringify(response.data));
          }
          return response.data; // 요청이 성공한 경우 값 반환
        } catch (error) {
          throw new Error(`Request failed: ${error}`);
        }
      },
    })
      .then((result) => {
        if (result.isConfirmed) {
          if (result.value && result.value.inviteCode) {
            const {
              problemTitle,
              limitTime,
              difficulty,
              roomName,
              inviteCode,
              isSoloPlay,
              roomId,
            } = result.value;
            navigate(
              `/waiting/${roomId}?problemTitle=${problemTitle}&limitTime=${limitTime}&difficulty=${difficulty}&roomName=${roomName}&inviteCode=${inviteCode}&isSoloPlay=${isSoloPlay}`
            );
          } else {
            // 값이 없거나 잘못된 값이 반환된 경우에 대한 처리
            CustomAlert.fire({
              icon: "error",
              title: "코드를 찾을 수 없음",
              text: "입력한 코드가 유효하지 않습니다. 다시 시도하세요.",
            });
          }
        }
      })
      .catch((error) => {
        CustomAlert.fire({
          icon: "error",
          title: "요청 실패",
          text: error.message,
        });
      });
  };
  const logoutHandler = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    setLogout();
    navigate("/");
  };
  const removeAccountHandler = () => {
    CustomAlert.fire({
      icon: "warning",
      title: "정말로 탈퇴 하시겠습니까?",
      text: "결정을 되돌릴 수 없습니다.",
      showCancelButton: true,
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "돌아가기",
    }).then((result) => {
      if (result.isConfirmed) {
        CustomAlert.fire({
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
        <button
          className={`
          ${styles.action_button}
          ${location.pathname === "/problemlist" && styles.selected}
          `}
          onClick={() => navigate("/problemlist")}
        >
          알고리즘 연습하기
        </button>
        <button
          className={`
          ${styles.action_button}
          ${location.pathname === "/createroom" && styles.selected}
          `}
          onClick={() => navigate("/createroom")}
        >
          코디톤 방 만들기
        </button>
        <button className={styles.action_button} onClick={submitCode}>
          초대 코드 입력하기
        </button>
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
