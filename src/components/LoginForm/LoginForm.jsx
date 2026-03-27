import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import css from './LoginForm.module.css';
import { loginUser } from '../../redux/auth/authOperations';

const schema = yup.object({
  email: yup
    .string()
    .required('E-mail is required')
    .email('Please enter a valid e-mail'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password must be at most 12 characters'),
});

function MailIcon() {
  return (
    <svg
      className={css.icon}
      viewBox="0 0 20 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PasswordIcon() {
  return (
    <svg
      className={css.icon}
      viewBox="0 0 16 21"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM8 16C6.9 16 6 15.1 6 14C6 12.9 6.9 12 8 12C9.1 12 10 12.9 10 14C10 15.1 9.1 16 8 16ZM11.1 7H4.9V5C4.9 3.29 6.29 1.9 8 1.9C9.71 1.9 11.1 3.29 11.1 5V7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleFormSubmit = async (values, actions) => {
    const resultAction = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(resultAction)) {
      actions.setSubmitting(false);
      navigate('/dashboard');
      return;
    }

    if (loginUser.rejected.match(resultAction)) {
      const backendMessage =
        resultAction.payload ||
        resultAction.error?.message ||
        'Email or password is wrong';

      toast.error(backendMessage);
      actions.setSubmitting(false);
      return;
    }

    actions.setSubmitting(false);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.logoBox}>
        <img
          src="/src/assets/images/img-login/svgs/money-guard-favicon.svg"
          alt="Money Guard logo"
          className={css.logo}
        />
        <p className={css.logoText}>Money Guard</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.fieldGroup}>
              <div className={css.inputWrapper}>
                <MailIcon />
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
                <PasswordIcon />
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
}