import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <section className={css.page}>
      <LoginForm />
    </section>
  );
};

export default LoginPage;