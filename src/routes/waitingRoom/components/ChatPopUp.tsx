import { useState, useEffect, useRef } from "react";
import styles from "./ChatPopUp.module.scss";
import ChatBalloon from "./ChatBalloon";
import SendIcon from "../../../assets/icons/send.svg?react";
import { Chat } from "../../../types/chat";
import { useWebSocket } from "../../../libs/stomp/useWebSocket";
import { useParams } from "react-router-dom";
import useUserStore from "../../../store/UserStore";

interface Props {
  chatList: Chat[];
}

function ChatPopup({ chatList }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: window.innerHeight - 300,
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const socketClient = useWebSocket();
  const { roomId } = useParams();
  const nickname = useUserStore((state) => state.nickname);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const iconRef = useRef<null | HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  const sendChat = () => {
    if (!inputRef.current) return;
    if (inputRef.current?.value === "") return;
    socketClient?.publish({
      destination: `/pub/room/${roomId}/chat`,
      body: JSON.stringify({
        message: inputRef.current?.value,
        from: nickname,
      }),
    });
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatList]);

  return (
    <div
      className={styles.popup}
      style={{ left: `${position.x}px`, top: `${position.y}px` }} // TODO 채팅 마지막 공백 추가
    >
      <div className={styles.section_wrapper}>
        <div className={styles.topbar} onMouseDown={onMouseDown}>
          topbar
        </div>
        <div className={styles.chatting_section} ref={scrollRef}>
          {chatList.map((chat) => (
            <ChatBalloon
              nickname={chat.from}
              message={chat.message}
              isMine={chat.from === nickname}
            />
          ))}
        </div>
      </div>
      <div className={styles.input_section}>
        <input
          type="text"
          className={styles.input}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendChat();
            }
          }}
        />
        <div ref={iconRef}>
          <SendIcon width={20} height={20} onClick={sendChat} />
        </div>
      </div>
    </div>
  );
}

export default ChatPopup;
