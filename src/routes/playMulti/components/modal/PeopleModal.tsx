
import styles from './PeopleModal.module.scss'

interface UserData {
  username: string;
}
const PeopleModal = ({ isPeopleToggleActive }: { isPeopleToggleActive: boolean }) => {
  const dummydata: UserData[] = [
    { username: '한우혁' },
    { username: '김예린' },
    { username: '김민지' },
    { username: '김예린2' },
    { username: '김민지2' }
  ];
  const me: string = '한우혁';

  return (
    <div className={`${styles.modal__people_container} ${isPeopleToggleActive ? '' : styles.modal__people_container_none}`}>
      {dummydata.map((user, index) => (
        <p key={index}>
          {user.username}
          {user.username === me && <span>me</span>}
        </p>
      ))}

    </div>
  )
}

export default PeopleModal
