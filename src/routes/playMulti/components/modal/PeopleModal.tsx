
import styles from './PeopleModal.module.scss'
const PeopleModal = ({ isPeopleToggleActive }: { isPeopleToggleActive: boolean }) => {
  return (
    <div className={`${styles.modal__people_container} ${isPeopleToggleActive ? '' : styles.modal__people_container_none}`}>
      dsa
    </div>
  )
}

export default PeopleModal
