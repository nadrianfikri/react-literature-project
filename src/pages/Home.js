import { useState } from 'react';
import { useHistory } from 'react-router';
import Main from '../components/molecules/Main';
import Header from '../components/organism/Header';
import Search from '../components/organism/Search';

export default function Home() {
  const history = useHistory();
  const [form, setForm] = useState({
    title: '',
  });
  const { title } = form;

  const handleChange = (e) => {
    setForm({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/literature?title=${title}`);
  };
  return (
    <div>
      <Header />
      <Main className="flex flex-col justify-center items-center gap-8 w-96 md:w-560 ">
        <img className="w-96 md:w-auto " src="/assets/images/big-literature.png" alt="big-logo" />

        <form onSubmit={handleSubmit} action="/literature" className="flex items-center justify-center gap-2 w-full">
          <Search name="title" value={title} onChange={handleChange} />
        </form>
      </Main>
    </div>
  );
}
