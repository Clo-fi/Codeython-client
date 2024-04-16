import React from 'react';
import styles from './PlayHeader.module.scss';
import ProgressBar from './ProgressBar';
import Button from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// props로 받아온 limitTime 타입 정의
interface PlayHeaderProps {
  limitTime: number; 
}

const PlayHeader: React.FC<PlayHeaderProps> = ({ limitTime }) => { 

  const navigate = useNavigate();

  // 나가기 버튼 함수
  const handleOut = () => {

    Swal.fire({
      title: "정말 나가시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "나가기",
      customClass: {
        popup: styles['custom-modal-style'],
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/home');
      }
    });
  };

  return (
    <div className={styles.Play_header}>
      <img className={styles.logo} src='/Imgs/CodeythonLogo_star.png' alt="codeythonLogo" />
      <div className={styles.progress_bar}>
        {/* progress bar에 limit time 전달 */}
        <ProgressBar limitTime={limitTime} />
      </div>

      <Button value="나가기" className={styles.out_btn} onClick={handleOut}></Button>
    </div>
  );
};

export default PlayHeader;
