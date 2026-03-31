import * as Yup from 'yup';

export const registerSchema = Yup.object({
  username: Yup.string()
    .min(4, 'Name must be at least 4 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please write valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(15, 'Password must be at most 15 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      "Passwords don't match, please try again."
    )
    .min(6, 'Password must be at least 6 characters')
    .required('Confirm password is required'),
}).required();

export const loginSchema = Yup.object({
  email: Yup.string()
    .required('E-mail is required')
    .email('Please enter a valid e-mail'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(15, 'Password must be at most 15 characters'),
});
