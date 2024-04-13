import Button from "../../components/common/Button";
import ListBallon from "../../components/common/ListBallon";
import ProfileSection from "../../components/common/ProfileSection";
import styles from "./ProfilePage.module.scss";
import RecordBlock from "./components/RecordBlock";

const ProfilePage = () => {
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
              defaultValue="기존닉네임"
              className={styles.input}
            />
            <Button
              value="닉네임 변경"
              className={styles.btn}
              onClick={() => {}}
            />
          </div>
        </ListBallon>
        <ListBallon title="내 기록" width={"100%"}>
          <RecordBlock />
          {[1, 2, 3, 4, 5].map((num) => (
            <RecordBlock key={num} />
          ))}
        </ListBallon>
      </section>
    </div>
  );
};

export default ProfilePage;
