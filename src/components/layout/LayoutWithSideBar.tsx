import { Outlet } from "react-router-dom";
import SideBar from "../common/SideBar";
import useUserStore from "../../store/UserStore";

const LayoutWithSideBar = () => {
  const { nickname, exp } = useUserStore();

  return (
    <>
      <SideBar nickname={nickname} exp={exp ?? 0} />
      <Outlet />
    </>
  );
};

export default LayoutWithSideBar;
