import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';

import TitleCalendar from '../TitleCalendar/TitleCalendar.jsx';
import { parseDateTime } from '../../helpers/parseDate.js';
import { listMonths } from '../../constants/listMonths.js';
import { fetchMonthlyWater } from '../../redux/water/operations.js';
import { selectMonthlyIsLoading } from '../../redux/water/selectors.js';

import sprite from '../../assets/sprite.svg';
import clsx from 'clsx';

import css from './CalendarPagination.module.css';

const CalendarPagination = () => {
  const dispatch = useDispatch();
  const { date: dateUrl } = useParams();
  const dateMs = parseDateTime(dateUrl);
  const [year, setYear] = useState(new Date(dateMs).getFullYear());
  const [month, setMonth] = useState(new Date(dateMs).getMonth());
  const isLoading = useSelector(selectMonthlyIsLoading);

  const location = useLocation();
  const pathname = location.pathname.split('/').pop();

  const increment = () => {
    if (month === 11) {
      dispatch(fetchMonthlyWater(new Date(year + 1, 0, 4).getTime()));
      setMonth(0);
      setYear(year + 1);
      return;
    }
    dispatch(fetchMonthlyWater(new Date(year, month + 1, 4).getTime()));
    setMonth(month + 1);
  };

  const decrement = () => {
    if (month === 0) {
      dispatch(fetchMonthlyWater(new Date(year - 1, 11, 4).getTime()));
      setMonth(11);
      setYear(year - 1);
      return;
    }
    dispatch(fetchMonthlyWater(new Date(year, month - 1, 4).getTime()));
    setMonth(month - 1);
  };

  const selectedMonth = listMonths[month];
  const title = pathname === 'schedule' ? 'Статистика' : 'Місяць';
  const yearNow = new Date(Date.now()).getFullYear();
  const monthNow = new Date(Date.now()).getMonth();
  const incrementDisabled =
    new Date(yearNow, monthNow) <= new Date(year, month);

  return (
    <div className={css.calendarTitle}>
      <TitleCalendar title={title} styles={css.month} />

      <div className={css.monthInd}>
        <button onClick={decrement} className={css.btn} disabled={isLoading}>
          <svg className={css.svgArrowLeft}>
            <use xlinkHref={`${sprite}#icon-arrow`}></use>
          </svg>
        </button>
        <span className={css.monthYear}>{`${selectedMonth}, ${year}`}</span>
        <button
          onClick={increment}
          className={`${css.btn} ${incrementDisabled ? css.btnDisabled : ''} `}
          disabled={isLoading || incrementDisabled}
        >
          <svg className={css.svgArrowRight}>
            <use xlinkHref={`${sprite}#icon-arrow`}></use>
          </svg>
        </button>

        <NavLink
          to="calendar"
          className={({ isActive }) => {
            return clsx(css.statisticBtn, {
              [css.isHidden]: isActive,
            });
          }}
        >
          <svg className={css.svgSchedule}>
            <use xlinkHref={`${sprite}#icon-pie-chart`}></use>
          </svg>
        </NavLink>
        <NavLink
          to="schedule"
          className={({ isActive }) => {
            return clsx(css.statisticBtn, {
              [css.isHidden]: isActive,
            });
          }}
        >
          <svg className={css.svgPie}>
            <use xlinkHref={`${sprite}#icon-pie-chart`}></use>
          </svg>
        </NavLink>
      </div>
    </div>
  );
};

export default CalendarPagination;
