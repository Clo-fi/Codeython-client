import React, { useEffect, useState } from 'react';
import { create } from 'zustand';
import styles from './ProgressBar.module.scss';
import { CustomAlert } from '../../../libs/sweetAlert/alert';

// Zustand 상태 타입 정의
interface ProgressState {
  progress: number;
  setProgress: (value: number) => void;
}

const initialState: ProgressState = {
  progress: 0,
  setProgress: () => { },
};

const useProgressStore = create<ProgressState>((set) => ({
  ...initialState,
  setProgress: (value: number) => set({ progress: value }),
}));


interface TimeDisplayState {
  showElapsedTime: boolean;
  toggleTimeDisplay: () => void;
}

const useTimeDisplayStore = create<TimeDisplayState>((set) => ({
  showElapsedTime: true,
  toggleTimeDisplay: () => set((state) => ({ showElapsedTime: !state.showElapsedTime })),
}));

const TimeDisplay: React.FC<{ timeInSeconds: number }> = ({ timeInSeconds }) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return <p className={styles.progressbar__time}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</p>;
};

const ProgressBar: React.FC<{ limitTime: number }> = ({ limitTime }) => {
  const { progress, setProgress } = useProgressStore();
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [remainingTime, setRemainingTime] = React.useState(limitTime * 60);
  const { showElapsedTime, toggleTimeDisplay } = useTimeDisplayStore();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const limitTimeMilliseconds = limitTime * 60 * 1000;
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedMilliseconds = currentTime - startTime;
      const remainingMilliseconds = Math.max(limitTimeMilliseconds - elapsedMilliseconds, 0);
      setElapsedTime(elapsedMilliseconds);
      setRemainingTime(remainingMilliseconds / 1000); // 초 단위로 설정
      const progressPercentage = (elapsedMilliseconds / limitTimeMilliseconds) * 100;
      setProgress(progressPercentage);
      if (elapsedMilliseconds >= limitTimeMilliseconds) {
        clearInterval(interval);
      }
      if (elapsedMilliseconds >= limitTimeMilliseconds) {
        clearInterval(interval);
        CustomAlert.fire({
          title: '시간 종료',
          text: '풀이 권장 시간이 종료되었습니다.',
          showCancelButton: true,
          confirmButtonText: '확인',
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [limitTime, setProgress]);

  const handleTimeDisplayClick = () => {
    toggleTimeDisplay();
  };

  return (
    <>
      {windowWidth > 930 ? (
        <div className={styles.progress_container}>
          <div className={styles.progress_bar__container}>
            <div
              className={styles.progressed_bar}
              style={{ width: `${progress}%`, height: '100%' }}
            />
          </div>
          <img
            src='/Imgs/running_person.png'
            alt="running_person"
            className={styles.running_icon}
            style={{ left: `${progress}%` }}
          />
          <div className={styles.elapsed_time} onClick={handleTimeDisplayClick}>
            <TimeDisplay timeInSeconds={showElapsedTime ? elapsedTime / 1000 : remainingTime} />
          </div>
        </div>

      ) : (

        <div className={styles.progressbar__reponsive}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            진행 시간 :
            <TimeDisplay timeInSeconds={elapsedTime / 1000} />
          </span>
          <p>남은 시간 : {(Math.floor(remainingTime))}</p>
        </div>
      )}
    </>
  );
};

export default ProgressBar;
