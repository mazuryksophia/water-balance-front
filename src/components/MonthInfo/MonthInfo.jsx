import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import CalendarPagination from '../CalendarPagination/CalendarPagination.jsx';
import Loader from '../Loader/Loader.jsx';

const MonthInfo = () => {
  return (
    <div>
      <CalendarPagination />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MonthInfo;
