import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { registerSchema } from '../../utils/validationSchema';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/authOperations';

// İkonlar
import LogoIcon from '../../assets/icons/LogoIcon';
import UserIcon from '../../assets/icons/UserIcon';
import EmailIcon from '../../assets/icons/EmailIcon';
import LockIcon from '../../assets/icons/LockIcon';
import styles from './RegistrationForm.module.css';

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(registerUser(values));
    actions.resetForm();
  };

  return (
    <div className={styles.regContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
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
            <LockIcon className={styles.icon} />
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
            {/* Password Strengh Bar */}
          </div>

          <div className={styles.label}>
            <LockIcon className={styles.icon} />
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
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.registerButton} type="submit">
              REGISTER
            </button>
            <Link to="/login">
              <button className={styles.loginButton}>Login</button>
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default RegistrationForm;
