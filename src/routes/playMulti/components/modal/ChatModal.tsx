
import { useEffect, useRef, useState } from 'react';
import styles from './ChatModal.module.scss';
import useUserStore from '../../../../store/UserStore';
import { ChatInfo } from '../../PlayMultiPage';
import { useWebSocket } from '../../../../libs/stomp/useWebSocket';
import { useParams } from 'react-router-dom';

interface ChatModalProps {
  isChatToggleActive: boolean;
  chatList: ChatInfo[];
}

const ChatModal = ({ chatList, isChatToggleActive }: ChatModalProps) => {
  const { nickname } = useUserStore();
  const { roomId } = useParams<{ roomId: string }>();
  const socketClient = useWebSocket();
  const [message, setMessage] = useState<string>('');
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatList]);


  const sendMessageHandle = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!socketClient) return;

    socketClient.publish({
      destination: `/pub/room/${roomId}/chat`,
      body: JSON.stringify({ from: nickname, message })
    });
    setMessage('');
  }
  return (
    <div className={`${styles.modal__chat_container} ${isChatToggleActive ? '' : styles.modal__chat_container_none}`}>
      <div className={styles.modal__chat_box} ref={chatBoxRef}>
        {chatList && chatList.length > 0 && chatList.map((item, index) => (
          <div key={index} className={item.from === nickname ? styles.modal__chat_my_box : ''}>
            {index > 0 && chatList[index - 1].from === item.from ? null : (
              <p className={item.from === nickname ? styles.modal__chat_my_name : styles.modal__chat_username}>
                {item.from !== nickname ? item.from : 'me'}
              </p>
            )}
            <p className={item.from === nickname ? styles.modal__chat_my_message : styles.modal__chat_message}>
              <span>{item.message}</span>
            </p>
          </div>
        ))}
      </div>
      <form className={styles.modal__chat_form} action="submit" onSubmit={sendMessageHandle}>
        <input className={styles.modal__chat_input} value={message} type="text" onChange={(e) => setMessage(e.target.value)} />
        <button className={styles.modal__chat_submit} type='submit'>
          <img src="/Imgs/sendMessage.png" alt="sendBtn" />
        </button>
      </form>
    </div>
  );
}

export default ChatModal;
