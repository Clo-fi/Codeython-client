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
import withCheckingNavigationType from "../../hoc/withCheckingNavigationType";
import { StompSubscription } from "@stomp/stompjs";

const WaitingRoomPage = withCheckingNavigationType(() => {
  const { nickname, exp, level, setUserInfo } = useUserStore();
  const socketClient = useWebSocket();
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [tmpChatList, setTmpChatList] = useState<Chat[]>([]);
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const [owner, setOwner] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUserInfo();
  }, [setUserInfo]);

  useEffect(() => {
    if (!socketClient) return;

    let subscription: StompSubscription;

    socketClient.onConnect = () => {
      console.log("소켓 연결");
      subscription = socketClient.subscribe(
        `/sub/room/${roomId}`,
        (message) => {
          const { type, data } = decode(message);

          if (type === MESSAGE_TYPE.USER) {
            if (data instanceof Array) {
              setUsers(data);
            }

            for (const user of data) {
              if (user.isOwner) {
                setOwner(user.nickname);
              }
            }
          } else if (type === MESSAGE_TYPE.CHAT) {
            setChatList((prev) => [...prev, data]);
            setTmpChatList((prev) => [...prev, data]);
            setTimeout(() => {
              setTmpChatList((prev) =>
                prev.filter(
                  (item) =>
                    !(item.from === data.from && item.message == data.message)
                )
              );
            }, 3000);
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
        }
      );

      socketClient.publish({
        destination: `/pub/room/${roomId}/join`,
        headers: {
          nickname,
        },
      });
    };

    return () => {
      subscription.unsubscribe();
    };
  }, [setUserInfo, socketClient, roomId, nickname, navigate, searchParams]);

  return (
    <>
      <SideBar
        nickname={nickname}
        exp={exp}
        level={level}
        onOut={() => {
          socketClient?.publish({
            destination: `/pub/room/${roomId}/leave`,
            headers: { nickname },
          });

          navigate("/roomList");
        }}
      />
      <main style={{ position: "relative", paddingLeft: "250px" }}>
        <UserContainer
          users={users}
          roomId={roomId}
          chatList={tmpChatList}
          owner={owner}
        />
      </main>
      <ChatPopup chatList={chatList} />
    </>
  );
});

export default WaitingRoomPage;
