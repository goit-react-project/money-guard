import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import css from './LoginForm.module.css';
import { loginUser } from '../../redux/auth/authOperations';
import { loginSchema } from '../../utils/validationSchema';

import MailIcon from '../../assets/icons/email-icon.svg?react';
import PasswordIcon from '../../assets/icons/password-icon.svg?react';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleFormSubmit = async (values, actions) => {
  try {
    await dispatch(loginUser(values)).unwrap();

    actions.setSubmitting(false);
    navigate('/dashboard');
  } catch (error) {
    console.log('LOGIN ERROR:', error);

    let userMessage = 'Email or password is wrong';
    let statusMessage = '';

    if (typeof error === 'string') {
      if (error.includes('404')) {
        statusMessage = '404 - Resource not found';
      } else if (error.includes('401')) {
        statusMessage = '401 - Unauthorized';
      } else if (error.includes('400')) {
        statusMessage = '400 - Bad request';
      } else if (error.includes('500')) {
        statusMessage = '500 - Internal server error';
      } else {
        userMessage = error;
      }
    } else if (error?.message) {
      if (error.message.includes('404')) {
        statusMessage = '404 - Resource not found';
      } else if (error.message.includes('401')) {
        statusMessage = '401 - Unauthorized';
      } else if (error.message.includes('400')) {
        statusMessage = '400 - Bad request';
      } else if (error.message.includes('500')) {
        statusMessage = '500 - Internal server error';
      } else {
        userMessage = error.message;
      }
    }

    toast.error(userMessage, { toastId: 'login-user-error' });

    if (statusMessage) {
      setTimeout(() => {
        toast.error(statusMessage, { toastId: 'login-status-error' });
      }, 100);
    }

    actions.setSubmitting(false);
  }
};
  return (
    <div className={css.wrapper}>
      <div className={css.logoBox}>
        <img
          src="/money-guard-favicon.svg"
          alt="Money Guard logo"
          className={css.logo}
        />
        <p className={css.logoText}>Money Guard</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.fieldGroup}>
              <div className={css.inputWrapper}>
                <MailIcon className={css.icon} />
                <Field
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className={css.input}
                  autoComplete="email"
                />
              </div>
              <div className={css.line}></div>
              <ErrorMessage name="email">
                {msg => <p className={css.error}>{msg}</p>}
              </ErrorMessage>
            </div>

            <div className={css.fieldGroup}>
              <div className={css.inputWrapper}>
                <PasswordIcon className={css.icon} />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={css.input}
                  autoComplete="current-password"
                />
              </div>
              <div className={css.line}></div>
              <ErrorMessage name="password">
                {msg => <p className={css.error}>{msg}</p>}
              </ErrorMessage>
            </div>

            <button
              type="submit"
              className={css.loginBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'LOADING...' : 'LOG IN'}
            </button>

            <Link to="/register" className={css.registerLink}>
              <button type="button" className={css.registerBtn}>
                REGISTER
              </button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;