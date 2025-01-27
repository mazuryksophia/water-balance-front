import clsx from 'clsx';
import { useSelector } from 'react-redux';
import SelectDate from '../SelectDate/SelectDate';
import { selectWaterDailyRecord } from '../../redux/water/selectors';

import css from './WaterProgressBar.module.css';

const WaterProgressBar = () => {
  const data = useSelector(selectWaterDailyRecord);

  const calculateTotalPercentage = (data) => {
    if (!data || data.length === 0) return 0;
    return data.reduce((total, entry) => {
      const percentage = entry.percentage || 0;
      return total + percentage;
    }, 0);
  };

  const totalPercentage = calculateTotalPercentage(data);
  const isBelowAim = totalPercentage < 100;
  const clampedPercentage = Math.min(Math.max(totalPercentage, 0), 100);

  return (
    <div className={css.progressBarContainer}>
      <h3 className={css.progressBarTitle}>
        <SelectDate />
      </h3>
      <div className={css.progressBar}>
        <div
          className={clsx(css.progressBarFill, {
            [css.belowAim]: isBelowAim,
            [css.aboveAim]: !isBelowAim,
          })}
          style={{
            width: `${clampedPercentage}%`,
          }}
        >
          <p
            className={clsx(css.percentNumber, {
              [css.belowAimRate]: isBelowAim,
              [css.aboveAimRate]: !isBelowAim,
            })}
          >
            {totalPercentage >= 100
              ? 'Норма'
              : `${totalPercentage.toFixed(0)}%`}
          </p>
          <div
            className={clsx(css.ball, {
              [css.belowAim]: totalPercentage < 100,
              [css.aboveAim]: totalPercentage >= 100,
            })}
          ></div>
        </div>
      </div>
      <div className={css.percentContainer}>
        <p className={css.percent}>0%</p>
        <p className={css.percent}>50%</p>
        <p className={css.percent}>100%</p>
      </div>
    </div>
  );
};

export default WaterProgressBar;
