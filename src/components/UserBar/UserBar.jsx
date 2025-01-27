import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import UserBarPopup from '../UserBarPopup/UserBarPopup.jsx';
import { selectUserPhoto } from '../../redux/auth/selectors.js';
import avatarDefault from '../../assets/avatarDefault.png';
import sprite from '../../assets/sprite.svg';

import css from './UserBar.module.css';

const UserBar = ({ name }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const userAvatar = useSelector(selectUserPhoto);
  const userBarPopupRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (
      userBarPopupRef.current &&
      !userBarPopupRef.current.contains(e.target) &&
      e.target.name !== 'openPopover'
    ) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isPopupOpen]);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  return (
    <div className={css.userBarWrapper}>
      <button
        className={css.userBar}
        type="button"
        name="openPopover"
        onClick={togglePopup}
        aria-label={'openCloseUserPanel'}
      >
        <div className={css.userBarText}>{name}</div>
        <div
          className={css.userBarAvatar}
          style={{ backgroundImage: `url(${userAvatar || avatarDefault})` }}
        ></div>
        <svg className={`${css.userBarIcon} ${isPopupOpen ? css.rotate : ''}`}>
          <use xlinkHref={`${sprite}#icon-chevron-down`}></use>
        </svg>
      </button>
      {isPopupOpen && (
        <div ref={userBarPopupRef}>
          <UserBarPopup />
        </div>
      )}
    </div>
  );
};

export default UserBar;
