import FormSettings from '../FormSettings/FormSettings';
import sprite from '../../assets/sprite.svg';
import css from './ModalSettings.module.css';

const ModalSettings = ({ onClose }) => {
  return (
    <div className={css.modalSettingContainer}>
      <div className={css.modalHeader}>
        <h2>Налаштування</h2>
        <button
          type="button"
          aria-label={'closeSettingModal'}
          className={css.closeBtn}
          onClick={onClose}
        >
          <svg className={css.icon}>
            <use xlinkHref={sprite + '#icon-x'}></use>
          </svg>
        </button>
      </div>
      <FormSettings handleClose={onClose} />
    </div>
  );
};

export default ModalSettings;
