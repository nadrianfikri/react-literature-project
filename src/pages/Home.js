import { useState } from 'react';

import Header from '../components/organism/Header';
import Hero from '../components/organism/Hero';
import Login from './auth/Login';
import Register from './auth/Register';
import { Input, Option, Select } from '../components/atoms/Form';

export default function Home() {
  const [openLgn, setOpenLgn] = useState(false);
  const [openRgs, setOpenRgs] = useState(false);

  // store data with useState
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullname: '',
    gender: '',
    phone: '',
    address: '',
  });

  const { email, password, fullname, gender, phone, address } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = () => {
    console.log('login');
  };
  const handleRegister = () => {
    console.log('register');
  };

  const openAnotherModal = () => {
    setOpenRgs(!openRgs);
    setOpenLgn(!openLgn);
  };

  return (
    <div>
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
