import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <section className={css.page}>
      <div className={css.container}>
        <div className={css.card}>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}