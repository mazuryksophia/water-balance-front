import { NavLink } from 'react-router-dom';
import notFoundImg from '../../assets/notFound.png';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.errorWrapper}>
      <div className={css.imgThumb}>
        <img src={notFoundImg} alt="error bad request" />
      </div>
      <h2 className={css.errorTitle}>Нічого не було знайдено</h2>

      <NavLink className={css.backLink} to="/">
        На головну
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
