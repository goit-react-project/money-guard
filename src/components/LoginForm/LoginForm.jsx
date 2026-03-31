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
    const resultAction = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/dashboard');
      return;
    }

    if (loginUser.rejected.match(resultAction)) {
      const error = resultAction.error;

      console.log('LOGIN ERROR FULL:', resultAction);

      const status = error?.code || error?.response?.status;

      let message = 'An error occurred';

      if (status === 401) {
        message = 'Email or password is wrong';
      } else if (status === 404) {
        message = '404 - Resource not found';
      } else if (status === 400) {
        message = '400 - Bad request';
      } else if (status === 500) {
        message = '500 - Internal server error';
      } else {
        message =
          resultAction.payload ||
          error?.message ||
          'An error occurred';
      }

      toast.error(message, { toastId: 'login-error' });
    }
  } finally {
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

            <Link to="/register" className={`${css.registerLink} ${css.registerBtn}`}>
  REGISTER
</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;