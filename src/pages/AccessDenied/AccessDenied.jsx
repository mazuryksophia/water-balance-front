import { NavLink } from 'react-router-dom';
import css from './AccessDenied.module.css';

const AccessDenied = () => {
  return (
    <div className={css.errorWrapper}>
      <h1 className={css.errorTitle}>Доступ заборонено</h1>
      <p className={css.errorText}>У вас недостатньо коштів на балансі</p>
      <p className={css.errorText}>
        Будь ласка, поповніть рахунок на суму від 199 грн
      </p>
      <NavLink className={css.backLink} to="/">
        На головну
      </NavLink>
    </div>
  );
};

export default AccessDenied;
