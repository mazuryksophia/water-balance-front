import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/auth/selectors.js';
import { ANIMATION } from '../../constants/constants.js';
import BtnLogout from '../BtnLogout/BtnLogout.jsx';
import LoaderComponent from '../LoaderComponent/LoaderComponent.jsx';
import sprite from '../../assets/sprite.svg';

import css from './ModalLogout.module.css';

const ModalLogout = ({ onClose }) => {
  const isLoading = useSelector(selectIsLoading);

  const handleClose = () => {
    const id = setTimeout(() => {
      onClose();
      clearTimeout(id);
    }, ANIMATION.DURATION);
  };

  return (
    <div className={css.modal}>
      <button
        type="button"
        aria-label={'closeLogOutModal'}
        onClick={handleClose}
        className={css.closeBtn}
      >
        <svg className={css.svg}>
          <use xlinkHref={`${sprite}#icon-x`}></use>
        </svg>
      </button>
      <div className={css.modalTextBox}>
        <h2 className={css.modalTitle}>Вийти</h2>
        <p className={css.modalText}>Ви дійсно хочете вийти?</p>
      </div>
      <div className={css.modalBtnBox}>
        {isLoading ? (
          <LoaderComponent height={80} width={80} />
        ) : (
          <>
            <button
              type="button"
              onClick={handleClose}
              className={css.btnCancel}
            >
              Скасувати
            </button>
            <BtnLogout handleClose={handleClose} />
          </>
        )}
      </div>
    </div>
  );
};

export default ModalLogout;
