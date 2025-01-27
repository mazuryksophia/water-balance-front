import { Link } from 'react-router-dom';

import css from './FormFooter.module.css';

const FormFooter = ({ text, link, linkName }) => {
  return (
    <>
      <p className={css.formFooter}>
        {text}
        <Link className={css.formFooterLink} to={link}>
          {linkName}
        </Link>
      </p>
    </>
  );
};

export default FormFooter;
