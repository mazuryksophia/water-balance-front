import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/auth/operations';

import css from './BtnLogout.module.css';

const BtnLogout = ({ handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut()).then(({ error }) => {
      if (!error) {
        navigate('/');
        handleClose();
      }
    });
  };

  return (
    <button type="button" onClick={handleLogout} className={css.btnLogout}>
      Вийти
    </button>
  );
};

export default BtnLogout;
