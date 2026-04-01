import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema } from '../../utils/validationSchema';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/authOperations';

import PasswordStrengthBarPkg from 'react-password-strength-bar';

// İkonlar
import LogoIcon from '../../assets/icons/logo-icon.svg?react';
import UserIcon from '../../assets/icons/name-icon.svg?react';
import EmailIcon from '../../assets/icons/email-icon.svg?react';
import PasswordIcon from '../../assets/icons/password-icon.svg?react';
import styles from './RegistrationForm.module.css';

const PasswordStrengthBar =
  PasswordStrengthBarPkg.default ?? PasswordStrengthBarPkg;

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    const { confirmPassword: _confirmPassword, ...payload } = values;

    const resultAction = await dispatch(registerUser(payload));

    if (registerUser.fulfilled.match(resultAction)) {
      actions.resetForm();
      navigate('/login');
      return;
    }

    actions.setSubmitting(false);
  };

  return (
    <div className={styles.regContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className={styles.formContainer}>
            <div className={styles.regContent}>
              <LogoIcon className={styles.logoIcon} />
              <p className={styles.regTitle}>Money Guard</p>
            </div>

            <div className={styles.label}>
              <UserIcon className={styles.icon} />
              <Field
                className={styles.input}
                type="text"
                name="username"
                placeholder="Name"
                autoComplete="username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className={styles.errorText}
              />
            </div>

            <div className={styles.label}>
              <EmailIcon className={styles.icon} />
              <Field
                className={styles.input}
                type="email"
                name="email"
                placeholder="E-mail"
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorText}
              />
            </div>

            <div className={styles.label}>
              <PasswordIcon className={styles.icon} />
              <Field
                className={styles.input}
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.errorText}
              />
            </div>

            <div className={styles.label}>
              <PasswordIcon className={styles.icon} />
              <Field
                className={styles.input}
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                autoComplete="new-password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={styles.errorText}
              />
              {/* Password Strengh Bar */}
              <PasswordStrengthBar password={values.password} />
            </div>

            <div className={styles.buttonContainer}>
              <button
                className={styles.registerButton}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'REGISTERING...' : 'REGISTER'}
              </button>
              <Link to="/login">
                <button className={styles.loginButton}>Login</button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default RegistrationForm;
