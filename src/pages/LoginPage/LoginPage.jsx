import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import FormLogin from '../../components/FormLogin/FormLogin';
import FormFooter from '../../components/FormFooter/FormFooter';

import css from '../RegisterPage/RegisterPage.module.css';

const LoginPage = () => {
  return (
    <div className={css.registerPage}>
      <FormWrapper>
        <FormLogin />
        <FormFooter
          link="/register"
          text="Немає облікового запису?"
          linkName="Зареєструватися"
        />
      </FormWrapper>

      <div className={css.registerPageRight}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default LoginPage;
