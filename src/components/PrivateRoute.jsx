import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken, selectIsAuthenticated } from '../redux/auth/selectors';

const PrivateRoute = ({
  component: Component,
  redirectTo = '/',
  userAccess,
}) => {
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!token || !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (userAccess === false) {
    return <Navigate to="/access-denied" replace />;
  }

  return Component;
};

export default PrivateRoute;
