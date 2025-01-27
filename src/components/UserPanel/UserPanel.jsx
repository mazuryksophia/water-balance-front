import UserBar from '../UserBar/UserBar.jsx';
import styles from './UserPanel.module.css';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../redux/auth/selectors.js';
import { selectUserEmail } from '../../redux/auth/selectors.js';

const UserPanel = () => {
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);

  const emailUsername = userEmail ? userEmail.split('@')[0] : null;

  const displayName = userName === 'User' ? emailUsername : userName;

  return (
    <div className={styles.userPanel}>
      <h1 className={styles.userPanelTitle}>
        Привіт,
        <span className={styles.userPanelTitleName}>{displayName}</span>
      </h1>
      <UserBar name={userName} />
    </div>
  );
};

export default UserPanel;
