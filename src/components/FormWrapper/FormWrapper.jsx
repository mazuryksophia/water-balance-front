import Logo from '../Logo/Logo';

import css from './FormWrapper.module.css';

const FormWrapper = ({ children }) => {
  return (
    <div className={css.formWrapper}>
      <div className={css.formLogoWrapper}>
        <Logo />
      </div>
      <div style={{ width: '100%' }}>{children}</div>
    </div>
  );
};

export default FormWrapper;
