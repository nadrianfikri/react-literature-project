import { useState, useContext, useEffect } from 'react';
import { API, setAuthToken } from '../config/api';
import { AuthContext } from '../context/authContext';
import { useHistory } from 'react-router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Input, Option, Select } from '../components/atoms/Form';
import { LoginMsg } from '../components/atoms/Message';
import Alert from '../components/atoms/Alert';
import Header from '../components/organism/Header';
import Hero from '../components/organism/Hero';

import Login from './auth/Login';
import Register from './auth/Register';

export default function Home() {
  const history = useHistory();

  const [, dispatch] = useContext(AuthContext);
  const [openLgn, setOpenLgn] = useState(false);
  const [openRgs, setOpenRgs] = useState(false);
  const [message, setMessage] = useState(null);
  // store data with useState
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullname: '',
    gender: '',
    phone: '',
    address: '',
  });

  const { email, password, fullname, phone, address } = form;

  // HANDLE FORM INPUT WITH FORMIK
  const SignupSchema = Yup.object().shape({
    fullname: Yup.string().min(2, 'Fullname must be 2 characters or more!').max(20, 'Too Long!').required('Fullname cannot be empty'),
    password: Yup.string().min(6, 'Password must be 6 characters or more!').max(20, 'Too Long!').required('Password cannot be empty'),
    email: Yup.string().email('Invalid email').required('Email cannot be empty'),
  });

  // function to monitor every changes char in form input to form state
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // create function handle login, check data user
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      // create config content-type
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // convert form data to string
      const body = JSON.stringify({
        email,
        password,
      });

      // insert data user for login process
      const res = await API.post('/login', body, config);
      setAuthToken(res.data.data.token);

      //checking process
      setTimeout(() => {
        if (res?.status === 200) {
          // send data to context
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data.data,
          });

          setMessage(null);
          history.push('/');
        }
      }, 2000);

      // role user check
      setTimeout(() => {
        if (res.data.data.role === 'admin') {
          history.push('/admin');
        }
      }, 2000);

      setMessage(LoginMsg);
      setForm({
        email: '',
        password: '',
      });
    } catch (error) {
      console.log(error);
      const alert = (
        <Alert
          variant="red"
          message="Email or Password is wrong"
          onClick={() => {
            setMessage(null);
          }}
        />
      );
      setMessage(alert);
      setTimeout(() => {
        setMessage(null);
      }, 1500);
    }
  };

  // create function to handle register post data user
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      // create config content-type
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // convert formdata to string
      const body = JSON.stringify(form);

      // send data to database
      const res = await API.post('/register', body, config);
      setAuthToken(res.data.data.token);

      //checking process
      setTimeout(() => {
        if (res?.status === 200) {
          // send data to context
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data.data,
          });

          setMessage(null);
          history.push('/');
        }
      }, 2400);

      setOpenRgs(false);
      setTimeout(() => {
        setMessage(LoginMsg);
      }, 400);
    } catch (error) {
      console.log(error);
      const alert = (
        <Alert
          variant="red"
          message="Register Failed Please Recheck Your Data"
          onClick={() => {
            setMessage(null);
          }}
        />
      );
      setMessage(alert);
      setTimeout(() => {
        setMessage(null);
      }, 1500);
    }
  };

  const openAnotherModal = () => {
    setOpenRgs(!openRgs);
    setOpenLgn(!openLgn);
  };

  useEffect(() => {
    const ac = new AbortController();
    return () => ac.abort();
  }, []);
  return (
    <div className="relative bg-primary">
      {message && message}
      <Header />
      <Hero onSignUp={() => setOpenRgs(true)} onSignIn={() => setOpenLgn(true)} />

      {/* with formik register */}
      <div className="pb-10 text-white">
        <Formik
          validateOnChange
          initialValues={{
            fullname: '',
            password: '',
            email: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-full flex-col justify-center items-center p-6 border-2 space-y-5 border-gray-300">
              <div className="relative">
                <Field className="bg-primary border border-gray-400 w-full" name="fullname" placeholder="Full name" />
                {errors.fullname && touched.password ? <div className="absolute top-6 text-red-400 text-xs mt-1">{errors.fullname}</div> : null}
              </div>
              <div className="relative">
                <Field className="bg-primary border border-gray-400 w-full" name="password" type="password" placeholder="Password" />
                {touched.password && errors.password ? <div className="absolute top-6 text-red-400 text-xs mt-1">{errors.password}</div> : null}
              </div>
              <div className="relative">
                <Field className="bg-primary border border-gray-400 w-full" name="email" type="email" placeholder="Email" />
                {errors.email && touched.email ? <div className="absolute top-6 text-red-400 text-xs mt-1">{errors.email}</div> : null}
              </div>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>

      {/* <Register show={openRgs} onClose={() => setOpenRgs(false)} onSubmit={handleRegister} onDirect={openAnotherModal}>
        <Input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
        <Input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
        <Input type="text" placeholder="Full name" name="fullname" value={fullname} onChange={handleChange} />
        <Select onChange={handleChange} name="gender">
          <option value="DEFAULT" disabled className="bg-primary">
            Gender
          </option>
          <Option value="Male" field="Male" />
          <Option value="Female" field="Female" />
        </Select>
        <Input type="number" placeholder="Phone" name="phone" value={phone} onChange={handleChange} />
        <Input type="text" placeholder="Address" name="address" value={address} onChange={handleChange} />
      </Register> */}

      <Login show={openLgn} onClose={() => setOpenLgn(false)} onSubmit={handleLogin} onDirect={openAnotherModal}>
        <Input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
        <Input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
      </Login>
    </div>
  );
}
