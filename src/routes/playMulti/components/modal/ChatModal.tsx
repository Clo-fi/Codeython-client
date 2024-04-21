
import styles from './ChatModal.module.scss';

const ChatModal = ({ isChatToggleActive }: { isChatToggleActive: boolean }) => {
  return (
    <div className={`${styles.modal__chat_container} ${isChatToggleActive ? '' : styles.modal__chat_container_none}`}>
      dsa
    </div>
  );
}

export default ChatModal;
