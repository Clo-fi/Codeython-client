import SideBar from "./components/Sidebar";
import useUserStore from "../../store/UserStore";
import { useEffect } from "react";
import UserContainer from "./components/UserContainer";

const WaitingRoomPage = () => {
  const { nickname, exp, level, setUserInfo } = useUserStore();

  useEffect(() => {
    setUserInfo();
  }, [setUserInfo]);

  return (
    <>
      <SideBar nickname={nickname} exp={exp} level={level} />
      <main style={{ position: "relative", paddingLeft: "250px" }}>
        <UserContainer />
      </main>
    </>
  );
};

export default WaitingRoomPage;
