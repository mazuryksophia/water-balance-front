import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { parseDateTime } from '../../helpers/parseDate.js';
// import { useNavigate } from 'react-router-dom';
import {
  fetchTodayWater,
  fetchDailyWater,
  fetchMonthlyWater,
  fetchWeeklyWater,
} from '../../redux/water/operations.js';

// import { selectUserAccess } from '../../redux/auth/selectors.js';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo.jsx';

import css from './WaterControlPage.module.css';
// import { logOut } from '../../redux/auth/operations.js';

const WaterControlPage = () => {
  const { date } = useParams();
  const dispatch = useDispatch();
  // const userAccess = useSelector(selectUserAccess);
  // const navigate = useNavigate();

  const parsedDate = parseDateTime(date).getTime();
  const [isRefreshingPage, setIsRefreshingPage] = useState(true);

  // useEffect(() => {
  //   if (!userAccess) {
  //     dispatch(logOut());
  //     navigate('/access-denied');
  //   }
  // }, [userAccess, navigate, dispatch]);

  useEffect(() => {
    if (isRefreshingPage) {
      const formattedDate = Date.now();
      dispatch(fetchTodayWater());
      dispatch(fetchDailyWater(parsedDate));
      dispatch(fetchMonthlyWater(parsedDate));
      dispatch(fetchWeeklyWater(formattedDate));
      setIsRefreshingPage(false);
    }
  }, [isRefreshingPage, parsedDate, dispatch]);

  return (
    <div className={css.waterPage}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
};

export default WaterControlPage;
