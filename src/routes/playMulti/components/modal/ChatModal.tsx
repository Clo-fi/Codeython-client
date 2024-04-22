
import { useState } from 'react';
import styles from './ChatModal.module.scss';

interface Chat {
  username: string;
  message: string;
}
const ChatModal = ({ isChatToggleActive }: { isChatToggleActive: boolean }) => {
  const dummydata: Chat[] = [
    { username: '한우혁', message: 'ㅎㅇ' },
    { username: '김에린', message: '하나둘셋qw  qw  sadsadassddasdsadsadsaasdasdqw  qw  2321312321' },
    { username: '김에린', message: '하나둘셋qw  qw  sadsadassddasdsadsadsaasdasdqw  qw  2321312321' },
    { username: '김민지', message: '셋둘하나' },
    { username: '김민지', message: '셋둘하나' },
    { username: '김에린', message: '하나둘셋qw  qw  sadsadassddasdsadsadsaasdasdqw  qw  2321312321' },
    { username: '김민지', message: '셋둘하나' },
    { username: '한우혁', message: '121ㅎㅇ하나둘셋qw  qw  sadsadassddasdsadsadsaasdasdqw  qw  2321312321' },
    { username: '한우혁', message: '121ㅎ21ㅇ' },
  ];
  const user: string = '한우혁';

  const [message, setMessage] = useState<string>('');
  const sendMessageHandle = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(message)
  }
  return (
    <div className={`${styles.modal__chat_container} ${isChatToggleActive ? '' : styles.modal__chat_container_none}`}>
      <div className={styles.modal__chat_box}>
        {dummydata.map((state, index) => (
          <div key={index} className={state.username === user ? styles.modal__chat_my_box : ''}>
            {index > 0 && dummydata[index - 1].username === state.username ? null : (
              <p className={state.username === user ? styles.modal__chat_my_name : styles.modal__chat_username}> {state.username !== user ? state.username : 'me'}</p>
            )}
            <p className={state.username === user ? styles.modal__chat_my_message : styles.modal__chat_message}><span>{state.message}</span></p>
          </div>
        ))}

      </div>

      <form className={styles.modal__chat_form} action="submit" onSubmit={sendMessageHandle}>
        <input className={styles.modal__chat_input} type="text" onChange={(e) => setMessage(e.target.value)} />
        <button className={styles.modal__chat_submit} type='submit'>
          <img src="/Imgs/sendMessage.png" alt="sendBtn" />
        </button>
      </form>



    </div>
  );
}

export default ChatModal;
