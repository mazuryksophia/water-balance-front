import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyWater } from '../../redux/water/operations';
import { parseDateTime } from '../../helpers/parseDate.js';
import { selectWaterRate } from '../../redux/auth/selectors.js';

import css from './ControlCalendarItem.module.css';

const isFuture = (date) => {
  const dateNow = new Date();
  const currentDate = new Date(Number(date));
  dateNow.setHours(23);
  dateNow.setMinutes(59);
  dateNow.setSeconds(59);
  dateNow.setMilliseconds(999);
  return dateNow.getTime() < currentDate.getTime();
};

const isDaySame = (firstDay, secondDay) => {
  const first = new Date(Number(firstDay));
  const second = new Date(Number(secondDay));

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

const ControlCalendarItem = ({ calendarDate, amount }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goal = useSelector(selectWaterRate);
  const { date: paramsDate } = useParams();
  const currentDate = parseDateTime(paramsDate);

  const handleClick = (calendarDate) => {
    navigate(`/water/${calendarDate}`);
    dispatch(fetchDailyWater(calendarDate));
  };

  const date = new Date(Number(calendarDate)).getDate();

  const percent =
    goal > 0 ? Math.round((amount / (goal * 1000)) * 100) : amount;
  const isDisabled = isFuture(calendarDate);

  const isDane = Math.round(percent) < 100;
  const isActive = isDaySame(currentDate, calendarDate);
  const percentString = Math.round(percent) >= 100 ? '100%' : `${percent}%`;

  return (
    <button
      className={clsx(css.day, {
        [css.disabled]: isDisabled,
      })}
      disabled={isDisabled}
      onClick={() => handleClick(calendarDate)}
    >
      <div
        className={clsx(css.date, {
          [css.percFilled]: isDane,
          [css.active]: isActive,
        })}
      >
        {date}
      </div>
      <div className={css.perc}>{percentString}</div>
    </button>
  );
};

export default ControlCalendarItem;
