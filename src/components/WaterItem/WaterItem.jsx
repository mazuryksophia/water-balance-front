import { useCallback } from 'react';
import { formatTime } from '../../helpers/formatTime.js';
import { convertToLiters } from '../../helpers/convertToLiters.js';
import { useModal } from '../../hooks/useModal.js';
import WaterModal from '../../components/WaterModal/WaterModal';
import ModalDelete from '../ModalDelete/ModalDelete.jsx';

import sprite from '../../assets/sprite.svg';

import css from '../WaterItem/WaterItem.module.css';

const WaterItem = ({ water }) => {
  const setModal = useModal();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModalDelete = useCallback(() => {
    setModal(<ModalDelete id={water.id} onClose={closeModal} />);
  }, [setModal, closeModal, water]);

  const openModalEdit = useCallback(() => {
    setModal(
      <WaterModal water={water} onClose={closeModal} operationType={'edit'} />
    );
  }, [setModal, closeModal, water]);

  const volume = convertToLiters(water.amount);
  return (
    <div className={css.waterItemContent}>
      <svg className={css.iconWaterGlass} width="44" height="45">
        <use xlinkHref={sprite + '#icon-glass'}></use>
      </svg>
      <div className={css.waterInfo}>
        <p className={css.waterAmount}>{`${volume.value} ${volume.text}`}</p>
        <p className={css.waterDate}>{formatTime(water.date)}</p>
      </div>
      <div className={css.containerButtons}>
        <button
          className={css.editButton}
          onClick={openModalEdit}
          aria-label="Edit the entered amount of water"
        >
          <svg className={css.iconAction} width="14" height="14">
            <use xlinkHref={sprite + '#icon-edit'}></use>
          </svg>
        </button>
        <button
          className={css.deleteButton}
          onClick={openModalDelete}
          aria-label="Delete the entered amount of water"
        >
          <svg className={css.iconAction} width="14" height="14">
            <use xlinkHref={sprite + '#icon-trash'}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WaterItem;
