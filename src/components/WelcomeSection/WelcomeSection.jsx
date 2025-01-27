import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../Logo/Logo';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

import css from './WelcomeSection.module.css';

const WelcomeSection = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.welcomeSection}>
      <div className={css.header}>
        <Logo />
      </div>
      <div className={css.welcomeSectionContainer}>
        <p className={css.welcomeSectionDescribe}>
          Записуйте та відстежуйте щоденне споживання води
        </p>
        <h1 className={css.welcomeSectionTitle}>Контролер спожитої води</h1>
        <div className={css.welcomeSectionLinks}>
          {isLoggedIn ? (
            <Link
              to={`/water/${Date.now()}`}
              className={`${css.welcomeSectionLink} ${css.welcomeSectionLinkSignup}`}
            >
              Спробувати
            </Link>
          ) : (
            <>
              <Link
                to={`/register`}
                className={`${css.welcomeSectionLink} ${css.welcomeSectionLinkSignup}`}
              >
                Спробувати
              </Link>
              <Link
                to={`/login`}
                className={`${css.welcomeSectionLink} ${css.welcomeSectionLinkSignin}`}
              >
                Увійти
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
