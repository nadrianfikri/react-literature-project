import { useState } from 'react';

import Header from '../components/organism/Header';
import Hero from '../components/organism/Hero';
import Login from './auth/Login';
import { Input } from '../components/atoms/Form';

export default function Home() {
  const [show, setShow] = useState(false);

  // store data with useState
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form);

  return (
    <div>
      <Header />
      <Hero onSignUp={'registmodal'} onSignIn={() => setShow(true)} />

      <Login show={show} onClose={() => setShow(false)} onSubmit={'submit'} onDirect={'open modal regist'}>
        <Input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
        <Input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
      </Login>
    </div>
  );
}
