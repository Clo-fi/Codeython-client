import SideBar from "./components/Sidebar";
import useUserStore from "../../store/UserStore";
import { useEffect } from "react";
import UserContainer from "./components/UserContainer";
import ChatPopup from "./components/ChatPopUp";

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
      <ChatPopup />
    </>
  );
};

export default WaitingRoomPage;
