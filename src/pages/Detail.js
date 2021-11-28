import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { API } from '../config/api';

import { BookmarkIcon } from '@heroicons/react/outline';
import { BookmarkIcon as Bookmarked } from '@heroicons/react/solid';

import Header from '../components/organism/Header';
import InfoLiterature from '../components/atoms/InfoLiterature';
import InfoHeader from '../components/atoms/InfoHeader';
import Download from '../components/atoms/Download';
import PdfPreview from '../components/atoms/PdfPreview';

export default function Detail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  // create data book from api
  const getDataBook = async () => {
    try {
      const res = await API.get(`/literature/${id}`);
      const data = res.data.data;
      data.publication_date = new Date(data.publication_date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' });

      setBook(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataBook();
  }, []);
  return (
    <div>
      <Header />
      <main className="pt-24 bg-primary flex justify-center min-h-screen ">
        <div className="container flex flex-col-reverse md:flex-row justify-center md:justify-between gap-8 px-6 md:px-4 flex-wrap">
          <section className=" self-center md:self-auto ">
            <PdfPreview file={book?.attach} />
          </section>
          <section className=" flex-1 space-y-8">
            <InfoHeader title={book?.title} author={book?.author} />
            <InfoLiterature data={book?.publication_date} desc="Publication Date" />
            <InfoLiterature data={book?.pages} desc="Pages" />
            <InfoLiterature textColor="text-red-700" data={book?.ISBN} desc="ISBN" />
            <Download link={book?.attach} />
          </section>
          <section className="w-max">
            <button className=" flex justify-center items-center gap-4 bg-danger rounded p-2 text-white">
              Add My Collection <BookmarkIcon className="h-5 text-white" />
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
