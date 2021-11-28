import { useState, useContext } from 'react';
import { API, setAuthToken } from '../config/api';
import { AuthContext } from '../context/authContext';
import { useHistory } from 'react-router';

import Header from '../components/organism/Header';
import Hero from '../components/organism/Hero';
import Login from './auth/Login';
import Register from './auth/Register';
import Alert from '../components/atoms/Alert';
import { Input, Option, Select } from '../components/atoms/Form';
import { LoginMsg } from '../components/atoms/Message';

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
      }, 2000);

      setMessage(LoginMsg);
    } catch (error) {
      console.log(error);
    }
  };

  const openAnotherModal = () => {
    setOpenRgs(!openRgs);
    setOpenLgn(!openLgn);
  };

  return (
    <div className="relative">
      {message && message}
      <Header />
      <Hero onSignUp={() => setOpenRgs(true)} onSignIn={() => setOpenLgn(true)} />

      <Register show={openRgs} onClose={() => setOpenRgs(false)} onSubmit={handleRegister} onDirect={openAnotherModal}>
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
      </Register>

      <Login show={openLgn} onClose={() => setOpenLgn(false)} onSubmit={handleLogin} onDirect={openAnotherModal}>
        <Input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
        <Input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
      </Login>
    </div>
  );
}
