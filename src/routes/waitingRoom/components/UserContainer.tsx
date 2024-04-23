import { useCallback, useState } from "react";
import Button from "../../../components/common/Button";
import UserBox from "./UserBox";
import styles from "./UserContainer.module.scss";
import ProblemListModal from "./modal/ProblemListModal";
import { UserInfo } from "../../../types/user";
import { withEnterRoom } from "../WithEnterRoom";
import useFetching from "../../../hooks/useFetching";
import { postEnterRoom } from "../../../api/game/game";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Props {
  users: UserInfo[];
  roomId: string | undefined;
}

const UserContainer = withEnterRoom(({ users, roomId }: Props) => {
  const [problemListModal, setProblemListModal] = useState(false);

  const fetchFunc = useCallback(() => postEnterRoom(roomId!), [roomId]);
  const { data: roomData } = useFetching(fetchFunc);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  return (
    <>
      <section className={styles.header}>
        <img className={styles.user_img} src="/Imgs/CodeythonLogo_star.png" />
        <div className={styles.invite_code}>
          초대 코드 : {roomData?.inviteCode}
        </div>
      </section>
      <section className={styles.container}>
        <div className={styles.container_group}>
          <div className={styles.user_container}>
            {users?.map((user) => (
              <UserBox nickname={user.nickname} level={1} key={user.nickname} />
            ))}
            {new Array(6 - users.length).fill(0).map((_, idx) => (
              <UserBox key={idx} />
            ))}
          </div>
          <div className={styles.info_wrapper}>
            <div className={styles.info_badge}>
              <div>{roomData?.problemTitle}</div>
              <div
                className={styles.change_btn}
                onClick={() => setProblemListModal(true)}
              >
                <div>문제</div>
                <div>변경</div>
              </div>
            </div>
            <Button
              onClick={() =>
                navigate(
                  `/playmulti/${searchParams.get("problemId")}/${roomId}`
                )
              }
              value={"게임 시작"}
              className={styles.start_btn}
            />
          </div>
        </div>
      </section>
      {problemListModal && <ProblemListModal setModal={setProblemListModal} />}
    </>
  );
});

export default UserContainer;
