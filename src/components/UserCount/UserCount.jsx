import { useState, useEffect } from 'react';
import { photoOne, photoTwo, photoTree } from '../../assets/images';
import { requestUserCount } from '../../api/auth';
const users = [
  { id: 1, photo: photoOne, alt: 'user 1' },
  { id: 2, photo: photoTwo, alt: 'user 2' },
  { id: 3, photo: photoTree, alt: 'user 3' },
];

import css from './UserCount.module.css';

const UserCount = () => {
  const [userCount, setUserCount] = useState();

  useEffect(() => {
    async function getCount() {
      try {
        const data = await requestUserCount();
        setUserCount(data.data.count);
      } catch (err) {
        console.log(err.message);
      }
    }

    getCount();
  }, []);

  return (
    <div className={css.userCountComponent}>
      <ul className={css.userCountList}>
        {users.map((user) => (
          <li key={user.id} className={css.userCountItem}>
            <img src={user.photo} alt={user.alt} />
          </li>
        ))}
      </ul>
      <p className={css.userCountText}>
        Наші
        <span className={css.userCountTextColor}>{userCount} щасливі</span>{' '}
        клієнти
      </p>
    </div>
  );
};

export default UserCount;
