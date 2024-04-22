import { useState } from "react";
import Button from "../../../components/common/Button";
import UserBox from "./UserBox";
import styles from "./UserContainer.module.scss";
import ProblemListModal from "./modal/ProblemListModal";

const UserContainer = () => {
  const [problemListModal, setProblemListModal] = useState(false);
  return (
    <>
      <section className={styles.header}>
        <img className={styles.user_img} src="/Imgs/CodeythonLogo_star.png" />
        <div className={styles.invite_code}>초대 코드 : abcdef</div>
      </section>
      <section className={styles.container}>
        <div className={styles.container_group}>
          <div className={styles.user_container}>
            <UserBox nickname="닉네임" level={1}></UserBox>
            <UserBox nickname="닉네임" level={2}></UserBox>
            <UserBox></UserBox>
            <UserBox></UserBox>
            <UserBox></UserBox>
            <UserBox></UserBox>
          </div>
          <div className={styles.info_wrapper}>
            <div className={styles.info_badge}>
              <div>설정된 문제 이름</div>
              <div
                className={styles.change_btn}
                onClick={() => setProblemListModal(true)}
              >
                <div>문제</div>
                <div>변경</div>
              </div>
            </div>
            <Button
              onClick={() => {}}
              value={"게임 시작"}
              className={styles.start_btn}
            />
          </div>
        </div>
      </section>
      {problemListModal && <ProblemListModal setModal={setProblemListModal} />}
    </>
  );
};

export default UserContainer;
