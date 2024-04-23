
import useUserStore from '../../../../store/UserStore';
import { UserInfo } from '../../../../types/user';
import styles from './PeopleModal.module.scss'
interface Props {
  isPeopleToggleActive: boolean;
  users: UserInfo[];
}

const PeopleModal = ({ users, isPeopleToggleActive }: Props) => {
  const { nickname } = useUserStore();
  return (
    <div className={`${styles.modal__people_container} ${isPeopleToggleActive ? '' : styles.modal__people_container_none}`}>
      {
        users && users.length > 0 && users.map((user, index) => (
          <p key={index}>
            {user.nickname}
            {user.nickname === nickname && <span>me</span>}
          </p>
        ))
      }
    </div>
  )
}

export default PeopleModal
