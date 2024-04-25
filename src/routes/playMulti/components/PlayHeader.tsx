/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import styles from './PlayHeader.module.scss';
import ProgressBar from './ProgressBar';
import useToggleStore from '../../../store/ToggleStore';
import { ProblemInfo } from '../../../types/problem';
interface Props {
  problemInfo: ProblemInfo;
  isLoading: boolean;
  exitRoom: any;
  blockSubmit: boolean
  setBlockSubmit: (newValue: boolean) => void
}

const PlayHeader = ({ blockSubmit, setBlockSubmit, exitRoom, problemInfo, isLoading }: Props) => {
  const { isPeopleToggleActive, isChatToggleActive, handlePeopleToggle, handleChatToggle } = useToggleStore();

  const exitHandle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    exitRoom();
  }

  return (
    <>
      {isLoading ? (
        <>
          <div className={styles.playmulti_page__header}>
            <div className={styles.header__logo_box}>
              <img className={styles.header__logo} src='/Imgs/CodeythonLogo_star.png' alt="codeythonLogo" />
              <button className={styles.header__button} onClick={exitHandle}>나가기</button>
            </div>
            <div className={styles.header__progressbar}>
              {/* <ProgressBar limitTime={20} /> */}
            </div>
            <div className={styles.header__toggle_box}>
              <img
                className={styles.header__toggle}
                src={isPeopleToggleActive ? '/Imgs/peopleToggle_full.png' : '/Imgs/peopleToggle.png'}
                alt="peopleToggle"
                onClick={handlePeopleToggle}
              />
              <img
                className={styles.header__toggle}
                src={isChatToggleActive ? '/Imgs/chatToggle_full.png' : '/Imgs/chatToggle.png'}
                alt="chatToggle"
                onClick={handleChatToggle}
              />
            </div>
          </div>
        </>
      ) : (
        <div className={styles.playmulti_page__header}>
          <div className={styles.header__logo_box}>
            <img className={styles.header__logo} src='/Imgs/CodeythonLogo_star.png' alt="codeythonLogo" />
            <button className={styles.header__button} onClick={exitHandle}>나가기</button>
          </div>
          <div className={styles.header__progressbar}>
            <ProgressBar blockSubmit={blockSubmit} setBlockSubmit={setBlockSubmit} limitTime={problemInfo.limitTime} />
          </div>
          <div className={styles.header__toggle_box}>
            <img
              className={styles.header__toggle}
              src={isPeopleToggleActive ? '/Imgs/peopleToggle_full.png' : '/Imgs/peopleToggle.png'}
              alt="peopleToggle"
              onClick={handlePeopleToggle}
            />
            <img
              className={styles.header__toggle}
              src={isChatToggleActive ? '/Imgs/chatToggle_full.png' : '/Imgs/chatToggle.png'}
              alt="chatToggle"
              onClick={handleChatToggle}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default PlayHeader
