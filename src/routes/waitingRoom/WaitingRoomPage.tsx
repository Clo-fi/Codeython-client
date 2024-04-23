import SideBar from "./components/Sidebar";
import useUserStore from "../../store/UserStore";
import { useEffect, useState } from "react";
import UserContainer from "./components/UserContainer";
import ChatPopup from "./components/ChatPopUp";
import { useWebSocket } from "../../libs/stomp/useWebSocket";
import { MESSAGE_TYPE, decode } from "../../libs/stomp/decoder";
import { UserInfo } from "../../types/user";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Chat } from "../../types/chat";
import { CustomAlert } from "../../libs/sweetAlert/alert";

const WaitingRoomPage = () => {
  const { nickname, exp, level, setUserInfo } = useUserStore();
  const socketClient = useWebSocket();
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setUserInfo();
  }, [setUserInfo]);

  useEffect(() => {
    if (!socketClient) return;

    socketClient.onConnect = () => {
      console.log("소켓 연결");
      socketClient.subscribe(`/sub/room/${roomId}`, (message) => {
        const { type, data } = decode(message);

        if (type === MESSAGE_TYPE.USER) {
          setUsers(data);
        } else if (type === MESSAGE_TYPE.CHAT) {
          setChatList((prev) => [...prev, data]);
        } else if (type === MESSAGE_TYPE.GAME_START) {
          CustomAlert.fire({
            icon: "info",
            title: "게임이 곧 시작됩니다!!",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            navigate(`/playmulti/${searchParams.get("problemId")}/${roomId}`);
          });
        }
      });

      socketClient.publish({
        destination: `/pub/room/${roomId}/join`,
        headers: {
          nickname,
        },
      });
    };

    return () => {
      // TODO: unsubscribe
    };
  }, [setUserInfo, socketClient, roomId, nickname, navigate, searchParams]);

  return (
    <>
      <SideBar nickname={nickname} exp={exp} level={level} />
      <main style={{ position: "relative", paddingLeft: "250px" }}>
        <UserContainer users={users} roomId={roomId} />
      </main>
      <ChatPopup chatList={chatList} />
    </>
  );
};

export default WaitingRoomPage;
