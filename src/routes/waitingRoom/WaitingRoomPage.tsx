import SideBar from "./components/Sidebar";
import useUserStore from "../../store/UserStore";
import { useCallback, useEffect, useState } from "react";
import UserContainer from "./components/UserContainer";
import ChatPopup from "./components/ChatPopUp";
import { useWebSocket } from "../../libs/stomp/useWebSocket";
import { MESSAGE_TYPE, decode } from "../../libs/stomp/decoder";
import { UserInfo } from "../../types/user";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Chat } from "../../types/chat";
import { CustomAlert } from "../../libs/sweetAlert/alert";
import { StompSubscription } from "@stomp/stompjs";
import styles from "./WaitingRoomPage.module.scss";
import Spinner from "../../assets/spinner.svg?react";
import RoomIcon from "../../assets/icons/room.svg?react";

const WaitingRoomPage = () => {
  const { nickname, exp, level, setUserInfo } = useUserStore();
  const socketClient = useWebSocket();
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [tmpChatList, setTmpChatList] = useState<Chat[]>([]);
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const [owner, setOwner] = useState<string | null>(null);
  const navigate = useNavigate();
  const [onPopUp, setonPopUp] = useState(false);

  useEffect(() => {
    setUserInfo();
  }, [setUserInfo]);

  const sendExitEvent = useCallback(() => {
    socketClient?.publish({
      destination: `/pub/room/${roomId}/leave`,
      headers: { nickname },
    });
  }, [nickname, roomId, socketClient]);

  const exitRoom = useCallback(() => {
    CustomAlert.fire({
      icon: "question",
      title: "퇴장하시겠습니까?",
      showConfirmButton: true,
      confirmButtonText: "퇴장하기",
      showCancelButton: true,
      cancelButtonText: "돌아가기",
    }).then((result) => {
      if (result.isConfirmed) {
        sendExitEvent();
        navigate("/roomList");
      }
    });
  }, [navigate, sendExitEvent]);

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
              let userInRoom = false;
              for (const user of data) {
                if (user.nickname === nickname) {
                  userInRoom = true;
                }
                if (user.isOwner) {
                  setOwner(user.nickname);
                }
              }
              if (!userInRoom) navigate("/home");
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
      if (socketClient.connected && subscription) {
        subscription.unsubscribe();
      }
    };
  }, [setUserInfo, socketClient, roomId, nickname, navigate, searchParams]);

  useEffect(() => {
    history.pushState(null, "", "");
    window.addEventListener("popstate", exitRoom);

    return () => {
      window.removeEventListener("popstate", exitRoom);
    };
  }, [exitRoom]);

  useEffect(() => {
    window.addEventListener("beforeunload", sendExitEvent);

    return () => {
      window.removeEventListener("beforeunload", sendExitEvent);
    };
  }, [nickname, roomId, sendExitEvent, socketClient]);

  return (
    <>
      <SideBar nickname={nickname} exp={exp} level={level} onOut={exitRoom} />
      <main className={styles.main}>
        {users.length <= 0 && (
          <div className={styles.spinner}>
            <Spinner width={150} height={150} />
          </div>
        )}
        {users.length > 0 && (
          <>
            <section className={styles.header}>
              <img className={styles.logo} src="/Imgs/CodeythonLogo_star.png" />
              <div className={styles.room_info}>
                <div className={styles.room_name}>
                  <RoomIcon />
                  {searchParams.get("roomName")}
                </div>
                <div>초대 코드 : {searchParams.get("inviteCode")}</div>
              </div>
            </section>
            <UserContainer
              users={users}
              roomId={roomId}
              chatList={tmpChatList}
              owner={owner}
            />
            <ChatPopup
              chatList={chatList}
              onPopup={onPopUp}
              setOnPopup={setonPopUp}
            />
          </>
        )}
      </main>
    </>
  );
};

export default WaitingRoomPage;
