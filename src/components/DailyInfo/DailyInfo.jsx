import SelectDate from '../SelectDate/SelectDate';
import BtnAddWaterSecond from '../BtnAddWaterSecond/BtnAddWaterSecond';
import WaterList from '../WaterList/WaterList';
import css from './DailyInfo.module.css';

const DailyInfo = () => {
  return (
    <div className={css.info}>
      <div className={css.header}>
        <SelectDate className={css.dailyFont} />
        <BtnAddWaterSecond />
      </div>

      <WaterList />
    </div>
  );
};

export default DailyInfo;
