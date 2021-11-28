import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Option, Select } from '../components/atoms/Form';
import Literature from '../components/molecules/Literature';
import Header from '../components/organism/Header';
import Search from '../components/organism/Search';
import { API } from '../config/api';

export default function SearchPage() {
  const history = useHistory();

  const url = new URLSearchParams(document.location.search.substring(1));
  const [books, setBooks] = useState(null);
  const [dataYear, setDataYear] = useState(null);
  const [form, setForm] = useState({
    title: '',
    year: '',
  });
  const { title, year } = form;

  const getDataBooks = async () => {
    try {
      const titleSearch = url.get('title');
      console.log(titleSearch);

      const res = await API.get('/literature/status/Approve');
      let datas = res.data.data;

      const dataBooks = datas.map((data) => {
        data.year = new Date(data.publication_date).getFullYear().toString();
        return data;
      });

      // search fitur
      const filteredBook = dataBooks.filter((book) => {
        if (titleSearch) {
          return book.title.toLowerCase().includes(titleSearch);
        } else {
          return book.title.toLowerCase().includes(title) && book.year.toLowerCase().includes(year);
        }
      });

      setDataYear(Array.from(new Set(dataBooks.map((data) => data.year).sort((a, b) => b - a))));
      setBooks(filteredBook);
      setForm({ ...form, title: '' });

      history.push(`/literature`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataBooks();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getDataBooks();
    history.push(`/literature`);
  };

  return (
    <div>
      <Header />
      <main className="pt-24 bg-primary flex justify-center min-h-screen pb-20">
        <div className="container flex flex-col gap-4 px-6  md:px-0">
          <form onSubmit={handleSubmit} method="get" action="/literature" className="space-y-8">
            <section className="flex items-center justify-center gap-2 w-full md:w-1/2">
              <Search name="title" value={title} onChange={handleChange} />
            </section>
            <section className="flex flex-col md:flex-row gap-10 lg:gap-20 ">
              <div className="space-y-2 min-w-max">
                <p className="text-lg text-red-800  ml-2">Anytime</p>
                <Select onChange={handleChange} name="year">
                  <option value="" className="bg-primary">
                    Select Year
                  </option>
                  {dataYear?.map((year) => (
                    <Option value={year} field={year} />
                  ))}
                </Select>
              </div>
              <div className="flex flex-wrap gap-5 md:gap-20 ">
                {books?.map((book) => (
                  <Literature to={`/detail/${book.id}`} title={book.title} author={book.author} year={book.year} thumbnail="/assets/images/pdf.png" />
                ))}
              </div>
            </section>
          </form>
        </div>
      </main>
    </div>
  );
}
