// import yup
import * as Yup from 'yup';

// validation schema with yup
export const signupSchema = Yup.object({
  fullname: Yup.string()
    //
    .required('Fullname cannot be empty')
    .min(2, 'Fullname must be at least 2 characters')
    .max(20, 'Too Long!'),
  email: Yup.string()
    //
    .email('Invalid email format')
    .required('Email cannot be empty'),
  gender: Yup.string()
    //
    .required('Gender cannot be empty'),
  password: Yup.string()
    .required('Password cannot be empty')
    .min(6, 'Should more than 6 characters')
    .matches(/[a-z]/g, 'Should contain at least 1 lowercase')
    .matches(/[A-Z]/g, 'Should contain at least 1 uppercase')
    .matches(/[0-9]/g, 'Should contain at least 1 number')
    .matches(/^\S*$/, 'Should not contain spaces'),
  phone: Yup.string()
    //
    .required('Phone number cannot be empty')
    .min(8, 'Phone number must be at least 8 digits'),
  address: Yup.string()
    //
    .required('Address cannot be empty')
    .min(5, 'Should more than 5 characters'),
});
