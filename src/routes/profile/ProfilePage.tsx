import Swal from "sweetalert2";
import Button from "../../components/common/Button";
import ListBallon from "../../components/common/ListBallon";
import ProfileSection from "../../components/common/ProfileSection";
import styles from "./ProfilePage.module.scss";
import RecordBlock from "./components/RecordBlock";
import { getRecentRecords, modifyProfile } from "../../api/user/user";
import { useState } from "react";
import useFetching from "../../hooks/useFetching";
import useUserStore from "../../store/UserStore";

const ProfilePage = () => {
  const { data: records } = useFetching(getRecentRecords);
  const [nickname, setNickname] = useState<string>("");
  const setUserInfo = useUserStore((set) => set.setUserInfo);

  const clickModifyBtnHandler = async () => {
    try {
      await modifyProfile({ nickname });
      setUserInfo();

      Swal.fire({
        icon: "success",
        title: "닉네임이 변경되었습니다.",
      });
    } catch (error) {
      Swal.fire({
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
