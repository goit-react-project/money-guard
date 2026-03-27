import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { registerSchema } from '../../utils/validationSchema';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/authOperations';
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
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.formContainer}>
          {/* icon */}
          <p className={styles.regTitle}>Money Guard</p>
          <div className={styles.label}>
            {/* icon */}
            <Field
              className={styles.input}
              type="text"
              name="username"
              placeholder="Name"
              autoComplete="username"
            />
            <ErrorMessage name="username" component="div" />
          </div>
          <div className={styles.label}>
            {/* icon */}
            <Field
              className={styles.input}
              type="email"
              name="email"
              placeholder="E-mail"
              autoComplete="email"
            />
            <ErrorMessage name="email" component="div" />
          </div>
          <div className={styles.label}>
            {/* icon */}
            <Field
              className={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
            />
            <ErrorMessage name="password" component="div" />
          </div>
          <div className={styles.label}>
            {/* icon */}
            <Field
              className={styles.input}
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              autoComplete="new-password"
            />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>

          <button className={styles.regButton} type="submit">
            REGISTER
          </button>
          <Link to="/login">
            <button className={styles.loginButton}>Login</button>
          </Link>
        </Form>
      </Formik>
    </div>
  );
};
export default RegistrationForm;
