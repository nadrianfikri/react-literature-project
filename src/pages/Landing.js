import { useState, useContext, useEffect } from 'react';
import { API, setAuthToken } from '../config/api';
import { AuthContext } from '../context/authContext';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import { signupSchema } from '../service/validationSchema';

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
  // -------------------------------------------//

  // const doregister = (values) => {
  //   console.log('form values', values);
  // };

  // HANDLE FORM INPUT WITH FORMIK customHooks

  const formik = useFormik({
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
  });

  // console.log(formik);

  useEffect(() => {
    const ac = new AbortController();
    return () => ac.abort();
  }, []);
  return (
    <div className="relative bg-primary">
      {message && message}
      <Header />
      <Hero onSignUp={() => setOpenRgs(true)} onSignIn={() => setOpenLgn(true)} />

      <Register show={openRgs} onClose={() => setOpenRgs(false)} onSubmit={formik.handleSubmit} onDirect={openAnotherModal}>
        <Input
          //
          type="email"
          placeholder="Email"
          name="email"
          onInput={() => formik.setTouched({ ...formik.touched, email: true })}
          {...formik.getFieldProps('email')}
          // value={formik.values.email}
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
        >
          {formik.touched.email && formik.errors.email && <ErrorMsg>{formik.errors.email}</ErrorMsg>}
        </Input>
        <Input
          //
          type="password"
          placeholder="Password"
          name="password"
          onInput={() => formik.setTouched({ ...formik.touched, password: true })}
          {...formik.getFieldProps('password')}
        >
          {formik.touched.password && formik.errors.password && <ErrorMsg>{formik.errors.password}</ErrorMsg>}
        </Input>

        <Input
          //
          type="text"
          placeholder="Full name"
          name="fullname"
          onInput={() => formik.setTouched({ ...formik.touched, fullname: true })}
          {...formik.getFieldProps('fullname')}
        >
          {formik.touched.fullname && formik.errors.fullname && <ErrorMsg>{formik.errors.fullname}</ErrorMsg>}
        </Input>
        <div className="relative">
          <Select name="gender" {...formik.getFieldProps('gender')}>
            <option value="DEFAULT" disabled className="bg-primary">
              Gender
            </option>
            <Option value="Male" field="Male" />
            <Option value="Female" field="Female" />
          </Select>
          {formik.touched.gender && formik.errors.gender && <ErrorMsg>{formik.errors.gender}</ErrorMsg>}
        </div>

        <Input
          //
          type="number"
          placeholder="Phone"
          name="phone"
          onInput={() => formik.setTouched({ ...formik.touched, phone: true })}
          {...formik.getFieldProps('phone')}
        >
          {formik.touched.phone && formik.errors.phone && <ErrorMsg>{formik.errors.phone}</ErrorMsg>}
        </Input>

        <Input
          //
          type="text"
          placeholder="Address"
          name="address"
          onInput={() => formik.setTouched({ ...formik.touched, address: true })}
          {...formik.getFieldProps('address')}
        >
          {formik.touched.address && formik.errors.address && <ErrorMsg>{formik.errors.address}</ErrorMsg>}
        </Input>
      </Register>

      <Login show={openLgn} onClose={() => setOpenLgn(false)} onSubmit={handleLogin} onDirect={openAnotherModal}>
        <Input
          //
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <Input
          //
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </Login>
    </div>
  );
}

// error validation
const ErrorMsg = ({ children }) => {
  return <div className="absolute left-1 text-red-400 text-xs">{children}</div>;
};
