import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ANIMATION } from '../../constants/constants.js';

import LoaderComponent from '../LoaderComponent/LoaderComponent.jsx';
import { requestUserCount } from '../../api/auth';
import { updateUserAccess } from '../../redux/auth/operations.js';

import sprite from '../../assets/sprite.svg';
import css from './ModalAdmin.module.css';

const ModalAdmin = ({ onClose, currentAccess }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState({});
  const [userList, setUserList] = useState([]);
  const [access, setAccess] = useState(currentAccess);
  const adminEmail = import.meta.env.VITE_API_ADMIN_EMAIL;

  useEffect(() => {
    async function getUserList() {
      try {
        const data = await requestUserCount();
        setUserList(data.data.users);
        setAccess(!access);
      } catch (err) {
        console.log(err.message);
      }
    }

    getUserList();
  }, []);

  const handleClose = () => {
    const id = setTimeout(() => {
      onClose();
      clearTimeout(id);
    }, ANIMATION.DURATION);
  };

  const handleUpdateAccess = async (userId, access) => {
    try {
      setIsLoading((prevState) => ({ ...prevState, [userId]: true }));

      const response = await dispatch(
        updateUserAccess({ id: userId, access: !access })
      );
      if (response.error) {
        console.error('Помилка оновлення доступу:', response.error);
      } else {
        setUserList((prevList) =>
          prevList.map((user) =>
            user.id === userId ? { ...user, access: !access } : user
          )
        );
      }
    } catch (error) {
      console.error('Щось пішло не так:', error);
    } finally {
      setIsLoading((prevState) => ({ ...prevState, [userId]: false }));
    }
  };

  return (
    <div className={css.modal}>
      <button
        type="button"
        aria-label={'closeDeleteEntryModal'}
        onClick={handleClose}
        className={css.closeBtn}
      >
        <svg className={css.svg}>
          <use xlinkHref={sprite + '#icon-x'}></use>
        </svg>
      </button>
      <div className={css.modalTextBox}>
        <h2 className={css.modalTitle}>Список усіх користувачів</h2>
        {userList.length > 0 ? (
          <ul className={css.userCountList}>
            {userList
              .filter((user) => user.email !== adminEmail) // Фільтруємо список
              .map((user) => (
                <li key={user.id} className={css.userCountItem}>
                  <p>{user.email}</p>

                  <div className={css.loaderWrapper}>
                    {isLoading[user.id] ? (
                      <LoaderComponent height={30} width={30} />
                    ) : (
                      <button>
                        <svg
                          onClick={() =>
                            handleUpdateAccess(user.id, user.access)
                          }
                          className={`${css.like} ${
                            user.access ? css.likeActive : ''
                          }`}
                        >
                          <use href={`${sprite}#icon-heart`}></use>
                        </svg>
                      </button>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p>Користувачі не знайдені.</p>
        )}
      </div>
    </div>
  );
};

export default ModalAdmin;
