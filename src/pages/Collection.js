import { useState, useEffect, useContext } from 'react';
import Literature from '../components/molecules/Literature';
import Header from '../components/organism/Header';
import { API } from '../config/api';
import { AuthContext } from '../context/authContext';

export default function Collection() {
  const [collections, seCollections] = useState([]);
  const [state] = useContext(AuthContext);

  // create function to get data collection by logged in user
  const getDataCollections = async () => {
    try {
      const id = state?.user.id;
      const res = await API.get(`/collection/profile/${id}`);

      let datas = res.data.data;

      const dataBooks = datas.map((data) => {
        data.literature.year = new Date(data.literature.publication_date).getFullYear().toString();
        return data;
      });
      seCollections(dataBooks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  console.log(collections);

  return (
    <div>
      <Header />
      <main className="pt-24 bg-primary flex justify-center min-h-screen ">
        <div className="container flex flex-col gap-10 px-6 md:px-0 pb-20">
          <section className="space-y-6">
            <header className="text-3xl text-white font-bold">My Collection</header>
            <div className="flex flex-wrap gap-5 md:gap-20">
              {collections?.map((item) => (
                <Literature to={`/detail/${item.literature.id}`} thumbnail={item.literature.thumbnail} title={item.literature.title} author={item.literature.author} year={item.literature.year} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
