import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import { setLoggedIn, setToken, setUser } from '../../redux/auth/slice';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  let token, user;
  const tokenParam = searchParams.get('token');
  const userParam = searchParams.get('user');

  if (tokenParam && userParam) {
    try {
      token = JSON.parse(tokenParam);
      user = JSON.parse(userParam);

      dispatch(setToken(token));
      dispatch(setLoggedIn(true));
      dispatch(setUser(user));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <WelcomeSection />
      <AdvantagesSection />
    </>
  );
};

export default HomePage;
