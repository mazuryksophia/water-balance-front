import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { parseDateTime } from '../../helpers/parseDate';
import WaterModal from '../../components/WaterModal/WaterModal';
import sprite from '../../assets/sprite.svg';

import css from './BtnAddWaterSecond.module.css';

const BtnAddWaterSecond = () => {
  const setModal = useModal();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const { date: dateUrl } = useParams();
  const timestampFromUrl = parseDateTime(dateUrl).getTime();

  const openModal = useCallback(() => {
    setModal(
      <WaterModal
        onClose={closeModal}
        operationType={'add'}
        timestampFromUrl={timestampFromUrl}
      />
    );
  }, [setModal, closeModal, timestampFromUrl]);

  return (
    <button className={css.btnStyle} type="button" onClick={openModal}>
      <svg className={css.iconStyle}>
        <use xlinkHref={sprite + '#icon-plus'}></use>
      </svg>

      <span className={css.btnStyleText}>Додати воду</span>
    </button>
  );
};

export default BtnAddWaterSecond;
