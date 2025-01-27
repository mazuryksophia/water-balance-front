import UserCount from '../UserCount/UserCount';

import css from './AdvantagesSection.module.css';

const AdvantagesSection = () => {
  return (
    <div className={css.advantagesSection}>
      <div className={css.userCount}>
        <UserCount />
      </div>

      <ul className={css.advantagesList}>
        <li className={css.advantagesHabit}>Вироблення звички</li>
        <li className={css.advantagesStatistics}>Статистики</li>
        <li className={css.advantagesSetting}>Налаштування особистої норми</li>
      </ul>
    </div>
  );
};

export default AdvantagesSection;
