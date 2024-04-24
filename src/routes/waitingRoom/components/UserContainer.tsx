import { useState } from "react";
import Button from "../../../components/common/Button";
import UserBox from "./UserBox";
import styles from "./UserContainer.module.scss";
import ProblemListModal from "./modal/ProblemListModal";
import { UserInfo } from "../../../types/user";
import { withEnterRoom } from "../WithEnterRoom";
import { useWebSocket } from "../../../libs/stomp/useWebSocket";
import { Chat } from "../../../types/chat";
import { useSearchParams } from "react-router-dom";
import useUserStore from "../../../store/UserStore";
import { CustomAlert } from "../../../libs/sweetAlert/alert";

interface Props {
  users: UserInfo[];
  roomId: string | undefined;
  chatList: Chat[];
  owner: string | null;
}

const UserContainer = withEnterRoom(
  ({ users, roomId, chatList, owner }: Props) => {
    const clientSocket = useWebSocket();
    const [problemListModal, setProblemListModal] = useState(false);
    const [searchParams] = useSearchParams();
    const nickname = useUserStore((state) => state.nickname);

    return (
      <>
        <section className={styles.header}>
          <img className={styles.user_img} src="/Imgs/CodeythonLogo_star.png" />
          <div className={styles.invite_code}>
            초대 코드 : {searchParams.get("inviteCode")}
          </div>
        </section>
        <section className={styles.container}>
          <div className={styles.container_group}>
            <div className={styles.user_container}>
              {users?.map((user) => (
                <UserBox
                  key={user.nickname}
                  nickname={user.nickname}
                  level={1}
                  message={
                    chatList
                      .reverse()
                      .find((item) => item.from === user.nickname)?.message
                  }
                  isOwner={owner === user.nickname}
                />
              ))}
              {new Array(
                Number(searchParams.get("limitMemberCnt") ?? 6) - users.length
              )
                .fill(0)
                .map((_, idx) => (
                  <UserBox key={idx} />
                ))}
              {new Array(6 - Number(searchParams.get("limitMemberCnt") ?? 6))
                .fill(0)
                .map((_, idx) => (
                  <UserBox key={idx + 10} isClosed={true} />
                ))}
            </div>
            <div className={styles.info_wrapper}>
              <div className={styles.info_badge}>
                <div>{searchParams.get("problemTitle")}</div>
                {owner === nickname && (
                  <div
                    className={styles.change_btn}
                    onClick={() => setProblemListModal(true)}
                  >
                    <div>문제</div>
                    <div>변경</div>
                  </div>
                )}
              </div>
              {owner === nickname && (
                <Button
                  onClick={() => {
                    if (users.length <= 1) {
                      CustomAlert.fire({
                        icon: "error",
                        title: "다른 플레이어를 기다려 주세요.",
                      });
                      return;
                    }
                    clientSocket?.publish({
                      destination: `/pub/room/${roomId}/gameStart`,
                    });
                  }}
                  value={"게임 시작"}
                  className={styles.start_btn}
                />
              )}
            </div>
          </div>
        </section>
        {problemListModal && (
          <ProblemListModal setModal={setProblemListModal} />
        )}
      </>
    );
  }
);

export default UserContainer;
