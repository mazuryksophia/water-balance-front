import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ANIMATION } from '../../constants/constants.js';
import { deleteWaterIntakeRecord } from '../../redux/water/operations.js';
import BtnDelete from '../BtnDelete/BtnDelete.jsx';
import LoaderComponent from '../LoaderComponent/LoaderComponent.jsx';
import sprite from '../../assets/sprite.svg';

import css from './ModalDelete.module.css';

const ModalDelete = ({ id, onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    const id = setTimeout(() => {
      onClose();
      clearTimeout(id);
    }, ANIMATION.DURATION);
  };

  const handleDelete = () => {
    setIsLoading(() => true);
    dispatch(deleteWaterIntakeRecord(id)).then(({ error }) => {
      if (!error) {
        handleClose();
      } else {
        console.error('Помилка видалення запису:', error);
      }
      setIsLoading(false);
    });
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
        <h2 className={css.modalTitle}>Видалити запис</h2>
        <p className={css.modalText}>Ви дійсно хочете видалити запис ?</p>
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
              Відміна
            </button>
            <BtnDelete handleDelete={handleDelete} id={id} />
          </>
        )}
      </div>
    </div>
  );
};

export default ModalDelete;
