import { useSelector } from 'react-redux';
import {
  selectWaterMonthlyRecord,
  selectMonthlyIsLoading,
  selectMonthlyIsError,
} from '../../redux/water/selectors.js';
import LoaderText from '../LoaderText/LoaderText.jsx';
import ControlCalendarItem from '../ControlCalendarItem/ControlCalendarItem.jsx';

import css from './ControlCalendar.module.css';

const ControlCalendar = () => {
  const dateArray = useSelector(selectWaterMonthlyRecord);
  const isLoading = useSelector(selectMonthlyIsLoading);
  const isError = useSelector(selectMonthlyIsError);

  if (isLoading) return <LoaderText />;

  if (isError)
    return (
      <div className={css.container}>
        <h2 className={css.errorMessage}>
          Сталася помилка отримання даних води за місяць. Спробуйте пізніше.
        </h2>
      </div>
    );
  return (
    <div className={css.container}>
      <ul className={css.calendarList}>
        {dateArray.map((eachDate, index) => (
          <li key={index}>
            <ControlCalendarItem
              index={index}
              calendarDate={eachDate.date}
              amount={eachDate.amount}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ControlCalendar;
