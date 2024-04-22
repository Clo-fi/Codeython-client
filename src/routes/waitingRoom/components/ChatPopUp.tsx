import { useState, useEffect } from "react";
import styles from "./ChatPopUp.module.scss";
import ChatBalloon from "./ChatBalloon";
import SendIcon from "../../../assets/icons/send.svg?react";

function ChatPopup() {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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

  return (
    <div
      className={styles.popup}
      // style={{ left: `${position.x}px`, top: `${position.y}px` }} // TODO 팝업 움직이게 바꾸기, 채팅 마지막 공백 추가
    >
      <div className={styles.section_wrapper}>
        <div className={styles.topbar} onMouseDown={onMouseDown}>
          topbar
        </div>
        <div className={styles.chatting_section}>
          {[
            { nickname: "user1", message: "hello", isMine: false },
            { nickname: "user1", message: "hello", isMine: false },
            { nickname: "user2", message: "hello", isMine: true },
            { nickname: "user1", message: "hello", isMine: false },
            { nickname: "user1", message: "hello", isMine: false },
            { nickname: "user1", message: "hello", isMine: false },
            { nickname: "user2", message: "hello", isMine: true },
            { nickname: "user1", message: "hello", isMine: false },
            { nickname: "user1", message: "hello", isMine: false },
            { nickname: "user1", message: "hello", isMine: false },
            { nickname: "user2", message: "hello", isMine: true },
            { nickname: "user1", message: "hello", isMine: false },
          ].map((chat) => (
            <ChatBalloon
              nickname={chat.nickname}
              message={chat.message}
              isMine={chat.isMine}
            />
          ))}
        </div>
      </div>
      <div className={styles.input_section}>
        <input type="text" className={styles.input} />
        <SendIcon width={20} height={20} />
      </div>
    </div>
  );
}

export default ChatPopup;
