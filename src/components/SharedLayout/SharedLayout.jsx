import { Suspense } from 'react';
import LoaderText from '../LoaderText/LoaderText';

import css from './SharedLayout.module.css';

const SharedLayout = ({ children }) => {
  return (
    <div className={css.container}>
      <Suspense fallback={<LoaderText />}>{children}</Suspense>
    </div>
  );
};

export default SharedLayout;
