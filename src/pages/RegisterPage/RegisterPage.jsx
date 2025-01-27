import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import FormRegister from '../../components/FormRegister/FormRegister';
import FormFooter from '../../components/FormFooter/FormFooter';

import css from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div className={css.registerPage}>
      <FormWrapper>
        <FormRegister />
        <FormFooter
          link="/login"
          text="Вже маєте обліковий запис?"
          linkName="Увійти"
        />
      </FormWrapper>

      <div className={css.registerPageRight}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default RegisterPage;
