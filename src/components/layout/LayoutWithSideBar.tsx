import { Outlet } from "react-router-dom";
import SideBar from "../common/SideBar";
import useUserStore from "../../store/UserStore";
import { useEffect } from "react";
import { getUserInfo } from "../../api/user/user";

const LayoutWithSideBar = () => {
  const { nickname, exp, level, setUserInfo } = useUserStore();

  useEffect(() => {
    getUserInfo().then(({ nickname, level, exp }) => {
      setUserInfo({
        nickname,
        level,
        exp,
      });
    });
  }, [setUserInfo]);

  return (
    <>
      <SideBar nickname={nickname} exp={exp} level={level} />
      <main style={{ position: "relative", paddingLeft: "250px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutWithSideBar;
