import Button from "../../components/common/Button";
import ListBallon from "../../components/common/ListBallon";
import ProfileSection from "../../components/common/ProfileSection";
import styles from "./ProfilePage.module.scss";
import RecordBlock from "./components/RecordBlock";
import { getRecentRecords, modifyProfile } from "../../api/user/user";
import { useState } from "react";
import useFetching from "../../hooks/useFetching";
import useUserStore from "../../store/UserStore";
import axios from "axios";
import { CustomAlert } from "../../libs/sweetAlert/alert";

const ProfilePage = () => {
  const { data: records } = useFetching(getRecentRecords);
  const { setUserInfo, nickname: userNickname } = useUserStore();
  const [nickname, setNickname] = useState<string>(userNickname);

  const clickModifyBtnHandler = async () => {
    if (nickname === userNickname) {
      CustomAlert.fire({
        icon: "error",
        title: "변경 사항이 없습니다.",
      });
      return;
    }

    try {
      await modifyProfile({ nickname });
      setUserInfo();

      CustomAlert.fire({
        icon: "success",
        title: "닉네임이 변경되었습니다.",
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        CustomAlert.fire({
          icon: "warning",
          title: "이미 존재하는 닉네임 입니다.",
        });
        return;
      }

      CustomAlert.fire({
        icon: "error",
        title: "닉네임이 변경에 실패했습니다.",
      });
    }
  };

  return (
    <div className={styles.main}>
      <section className={styles.profile}>
        <ProfileSection />
      </section>
      <section className={styles.container}>
        <ListBallon title="닉네임 수정하기" width={"100%"}>
          <div className={styles.content}>
            <input
              type="text"
              value={nickname}
              className={styles.input}
              onChange={(e) => setNickname(e.target.value)}
            />
            <Button
              value="닉네임 변경"
              className={styles.btn}
              onClick={clickModifyBtnHandler}
            />
          </div>
        </ListBallon>
        <ListBallon title="내 기록" width={"100%"}>
          {records?.recentRecords.map((record) => (
            <RecordBlock key={record.accuracy} record={record} />
          ))}
        </ListBallon>
      </section>
    </div>
  );
};

export default ProfilePage;
