import { useState, useContext, useEffect } from 'react';
import { API, setAuthToken } from '../config/api';
import { AuthContext } from '../context/authContext';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import { signupSchema, loginSchema } from '../service/validationSchema';

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

  // create function handle login, check data user
  const handleLogin = async (values) => {
    try {
      // create config content-type
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // convert form data to string
      const body = JSON.stringify(values);

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
  const handleRegister = async (values) => {
    try {
      // create config content-type
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // convert formdata to string
      const body = JSON.stringify(values);
      console.log(body);

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
      console.log(values);
    }
  };

  const openAnotherModal = () => {
    setOpenRgs(!openRgs);
    setOpenLgn(!openLgn);
  };

  // -------------------------------------------//
  // HANDLE FORM INPUT WITH FORMIK customHooks
  const formik = {
    rgs: useFormik({
      // init value
      initialValues: {
        email: '',
        password: '',
        fullname: '',
        gender: '',
        phone: '',
        address: '',
      },
      // validation schema with yup
      validationSchema: signupSchema,
      // handle submit
      onSubmit: handleRegister,
    }),
    lgn: useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: loginSchema,
      onSubmit: handleLogin,
    }),
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

      <Register show={openRgs} onClose={() => setOpenRgs(false)} onSubmit={formik.rgs.handleSubmit} onDirect={openAnotherModal}>
        <Input
          //
          type="email"
          placeholder="Email"
          name="email"
          onInput={() => formik.rgs.setTouched({ ...formik.rgs.touched, email: true })}
          {...formik.rgs.getFieldProps('email')}
        >
          {formik.rgs.touched.email && formik.rgs.errors.email && <ErrorMsg>{formik.rgs.errors.email}</ErrorMsg>}
        </Input>
        <Input
          //
          type="password"
          placeholder="Password"
          name="password"
          onInput={() => formik.rgs.setTouched({ ...formik.rgs.touched, password: true })}
          {...formik.rgs.getFieldProps('password')}
        >
          {formik.rgs.touched.password && formik.rgs.errors.password && <ErrorMsg>{formik.rgs.errors.password}</ErrorMsg>}
        </Input>

        <Input
          //
          type="text"
          placeholder="Full name"
          name="fullname"
          onInput={() => formik.rgs.setTouched({ ...formik.rgs.touched, fullname: true })}
          {...formik.rgs.getFieldProps('fullname')}
        >
          {formik.rgs.touched.fullname && formik.rgs.errors.fullname && <ErrorMsg>{formik.rgs.errors.fullname}</ErrorMsg>}
        </Input>
        <div className="relative">
          <Select name="gender" {...formik.rgs.getFieldProps('gender')}>
            <option value="DEFAULT" disabled className="bg-primary">
              Gender
            </option>
            <Option value="Male" field="Male" />
            <Option value="Female" field="Female" />
          </Select>
          {formik.rgs.touched.gender && formik.rgs.errors.gender && <ErrorMsg>{formik.rgs.errors.gender}</ErrorMsg>}
        </div>

        <Input
          //
          type="number"
          placeholder="Phone"
          name="phone"
          onInput={() => formik.rgs.setTouched({ ...formik.rgs.touched, phone: true })}
          {...formik.rgs.getFieldProps('phone')}
        >
          {formik.rgs.touched.phone && formik.rgs.errors.phone && <ErrorMsg>{formik.rgs.errors.phone}</ErrorMsg>}
        </Input>

        <Input
          //
          type="text"
          placeholder="Address"
          name="address"
          onInput={() => formik.rgs.setTouched({ ...formik.rgs.touched, address: true })}
          {...formik.rgs.getFieldProps('address')}
        >
          {formik.rgs.touched.address && formik.rgs.errors.address && <ErrorMsg>{formik.rgs.errors.address}</ErrorMsg>}
        </Input>
      </Register>

      <Login show={openLgn} onClose={() => setOpenLgn(false)} onSubmit={formik.lgn.handleSubmit} onDirect={openAnotherModal}>
        <Input
          //
          type="email"
          placeholder="Email"
          name="email"
          onInput={() => formik.lgn.setTouched({ ...formik.lgn.touched, email: true })}
          {...formik.lgn.getFieldProps('email')}
        >
          {formik.lgn.touched.email && formik.lgn.errors.email && <ErrorMsg>{formik.lgn.errors.email}</ErrorMsg>}
        </Input>
        <Input
          //
          type="password"
          placeholder="Password"
          name="password"
          onInput={() => formik.lgn.setTouched({ ...formik.lgn.touched, password: true })}
          {...formik.lgn.getFieldProps('password')}
        >
          {formik.lgn.touched.password && formik.lgn.errors.password && <ErrorMsg>{formik.lgn.errors.password}</ErrorMsg>}
        </Input>
      </Login>
    </div>
  );
}

// error validation
const ErrorMsg = ({ children }) => {
  return <div className="absolute left-1 text-red-400 text-xs">{children}</div>;
};
