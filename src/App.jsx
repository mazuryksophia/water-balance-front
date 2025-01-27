import { lazy, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import SharedLayout from './components/SharedLayout/SharedLayout';
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';
import { current } from './redux/auth/operations';
import { setLoggedIn } from './redux/auth/slice.js';
import { ToasterBar } from './components/ToasterBar.jsx';

import {
  selectToken,
  selectUserAccess,
  selectAuthErrorMessage,
  selectAuthSuccessMessage,
} from './redux/auth/selectors.js';

import {
  selectDailyErrorMessage,
  selectDailySuccessMessage,
} from './redux/water/selectors.js';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage/NotFoundPage.jsx')
);
const WaterControlPage = lazy(() =>
  import('./pages/WaterControlPage/WaterControlPage.jsx')
);
const ControlCalendar = lazy(() =>
  import('./components/ControlCalendar/ControlCalendar.jsx')
);

const ControlSchedule = lazy(() =>
  import('./components/ControlSchedule/ControlSchedule.jsx')
);

const AccessDenied = lazy(() =>
  import('./pages/AccessDenied/AccessDenied.jsx')
);
import { logOut } from './redux/auth/operations';

function App() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const userAccess = useSelector(selectUserAccess);
  const navigate = useNavigate();
  const authErrorMessage = useSelector(selectAuthErrorMessage);
  const authSuccessMessage = useSelector(selectAuthSuccessMessage);
  const waterErrorMessage = useSelector(selectDailyErrorMessage);
  const waterSuccessMessage = useSelector(selectDailySuccessMessage);

  useEffect(() => {
    if (userAccess === false) {
      dispatch(logOut()).then(() => {
        navigate('/access-denied');
      });
    } else if (token) {
      dispatch(current());
      dispatch(setLoggedIn(true));
    }
  }, [token, dispatch, userAccess, navigate]);

  useEffect(() => {
    if (authErrorMessage) {
      toast.error(authErrorMessage);
    }
    if (authSuccessMessage) {
      toast.success(authSuccessMessage);
    }
  }, [authSuccessMessage, authErrorMessage]);

  useEffect(() => {
    if (waterErrorMessage) {
      toast.error(waterErrorMessage);
    }
    if (waterSuccessMessage) {
      toast.success(waterSuccessMessage);
    }
  }, [waterErrorMessage, waterSuccessMessage]);

  return (
    <SharedLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo={`/water/${Date.now()}`}
              component={<RegisterPage />}
            />
          }
        />

        <Route
          path="/login"
          element={
            <RestrictedRoute
              redirectTo={`/water/${Date.now()}`}
              component={<LoginPage />}
            />
          }
        />

        <Route
          path="/water/:date"
          element={
            <PrivateRoute
              redirectTo="/login"
              component={<WaterControlPage />}
            />
          }
        >
          <Route path="calendar" element={<ControlCalendar />} />
          <Route path="schedule" element={<ControlSchedule />} />
          <Route index element={<Navigate to="calendar" replace />} />
        </Route>

        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToasterBar />
    </SharedLayout>
  );
}
export default App;
