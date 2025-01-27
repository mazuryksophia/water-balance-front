import UserPanel from '../UserPanel/UserPanel';
import DailyInfo from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo.jsx';

import css from './WaterDetailedInfo.module.css';

const WaterDetailedInfo = () => {
  return (
    <section className={css.waterDetailedInfo}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </section>
  );
};

export default WaterDetailedInfo;
