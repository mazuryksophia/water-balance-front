import WaterForm from '../WaterForm/WaterForm';
import { ANIMATION } from '../../constants/animations.js';
import sprite from '../../assets/sprite.svg';

import css from './WaterModal.module.css';

const WaterModal = ({
  operationType,
  onClose,
  water = {},
  timestampFromUrl = '',
}) => {
  const handleClose = () => {
    const id = setTimeout(() => {
      onClose();
      clearTimeout(id);
    }, ANIMATION.DURATION);
  };

  const modalHeader = (operationType) => {
    switch (operationType) {
      case 'add':
        return 'Додавання води';
      case 'edit':
        return 'Редагувати кількість води';
      default:
        return 'Додавання води';
    }
  };

  const curentTimestamp = Number(timestampFromUrl);
  const recordTimestamp = Number(water.date);

  const editTime = (operationType) => {
    switch (operationType) {
      case 'add':
        return curentTimestamp;
      case 'edit':
        return recordTimestamp;
    }
  };

  const waterPortion = (operationType) => {
    switch (operationType) {
      case 'add':
        return 50;
      case 'edit':
        return water.amount;
      default:
        return 50;
    }
  };

  const waterID = (operationType) => {
    switch (operationType) {
      case 'add':
        return null;
      case 'edit':
        return water.id;
      default:
        return null;
    }
  };

  return (
    <div className={css.WaterModal}>
      <h1>{modalHeader(operationType)}</h1>
      <WaterForm
        operationType={operationType}
        editTime={editTime(operationType)} // Передаємо мілісекунди
        waterPortion={waterPortion(operationType)} // Передаємо порцію води
        waterID={waterID(operationType)} // Передаємо ID води
        handleClose={handleClose}
      />
      <button
        type="button"
        onClick={handleClose}
        aria-label={'closeWaterModal'}
        className={css.WaterModalCloseBtn}
      >
        <svg>
          <use xlinkHref={`${sprite}#icon-x`}></use>
        </svg>
      </button>
    </div>
  );
};

export default WaterModal;
