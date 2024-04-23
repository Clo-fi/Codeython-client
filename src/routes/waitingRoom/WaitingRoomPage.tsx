import SideBar from "./components/Sidebar";
import useUserStore from "../../store/UserStore";
import { useEffect, useState } from "react";
import UserContainer from "./components/UserContainer";
import ChatPopup from "./components/ChatPopUp";
import { useWebSocket } from "../../libs/stomp/useWebSocket";
import { decode } from "../../libs/stomp/decoder";
import { UserInfo } from "../../types/user";
import { useParams } from "react-router-dom";
// import instance from "../../api/axios";

const WaitingRoomPage = () => {
  const { nickname, exp, level, setUserInfo } = useUserStore();
  const socketClient = useWebSocket();
  const [users, setUsers] = useState<UserInfo[]>([]);
  const { roomId } = useParams();

  useEffect(() => {
    setUserInfo();
  }, [setUserInfo]);

  // useEffect(() => {
  //   instance.post("rooms/1", {
  //     password: "1020",
  //   });
  // }, []);

  useEffect(() => {
    if (!socketClient) return;

    socketClient.onConnect = () => {
      console.log("소켓 연결 완료!!");
      socketClient.subscribe(`/sub/room/${roomId}`, (message) => {
        const data = decode(message);
        setUsers(data);
        console.log(data);
      });

      socketClient.publish({
        destination: `/pub/room/${roomId}/join`,
      });
    };

    return () => {
      console.log("cleanup");
    };
  }, [setUserInfo, socketClient, roomId, nickname]);

  return (
    <>
      <SideBar nickname={nickname} exp={exp} level={level} />
      <main style={{ position: "relative", paddingLeft: "250px" }}>
        <UserContainer users={users} />
      </main>
      <ChatPopup />
    </>
  );
};

export default WaitingRoomPage;
