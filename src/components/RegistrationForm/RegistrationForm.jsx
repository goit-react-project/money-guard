import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import styles from './RegistrationForm.module.css'

const registerSchema = Yup.object({
  username: Yup.string()
    .min(4, 'Name must be at least 4 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please write valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(15)
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      "Passwords don't match, please try again."
    )
    .min(6, 'Password must be at least 6 characters')
    .required('Confirm password is required'),
}).required()

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const RegistrationForm = () => {
  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={registerSchema}>
        <Form className={styles.formContainer}>
          {/* icon */}
          <p className={styles.regTitle}>Money Guard</p>
          <div className={styles.label}>
            {/* icon */}
            <Field
              className={styles.input}
              type="text"
              name="name"
              placeholder="Name"
            />
            <ErrorMessage name="name" component="div" />
          </div>
          <div className={styles.label}>
            {/* icon */}
            <Field
              className={styles.input}
              type="email"
              name="email"
              placeholder="E-mail"
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
  )
}
export default RegistrationForm
