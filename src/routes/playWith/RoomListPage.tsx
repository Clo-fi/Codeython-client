import React from "react";
import styles from "./RoomListPage.module.scss";
import Button from "../../components/common/Button";
import RoomListForm from "./components/RoomListForm";

const RoomListPage: React.FC = () => {

  const handleRefresh = () => {
    location.reload();
  }

  return (
    <div className={styles.RoomList_page__container}>
      <div className={styles.RoomList_page__header}>
        <img className={styles.RoomList_page__logo} src="/Imgs/CodeythonLogo_star.png" alt="codeythonLogo" />
        <Button value="새로고침" className={styles.RoomList_refresh__btn} onClick={handleRefresh}></Button>
      </div>
      <RoomListForm />
    </div>
  )

}

export default RoomListPage;