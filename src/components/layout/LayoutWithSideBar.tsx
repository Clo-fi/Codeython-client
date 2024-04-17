import { Outlet } from "react-router-dom";
import SideBar from "../common/SideBar";
import useUserStore from "../../store/UserStore";
import { useEffect } from "react";

const LayoutWithSideBar = () => {
  const { nickname, exp, level, setUserInfo } = useUserStore();

  useEffect(() => {
    setUserInfo();
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
