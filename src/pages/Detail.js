import { BookmarkIcon } from '@heroicons/react/outline';
import { BookmarkIcon as Bookmarked } from '@heroicons/react/solid';

import Header from '../components/organism/Header';
import InfoLiterature from '../components/atoms/InfoLiterature';
import InfoHeader from '../components/atoms/InfoHeader';
import Download from '../components/atoms/Download';
import PdfPreview from '../components/atoms/PdfPreview';

export default function Detail() {
  return (
    <div>
      <Header />
      <main className="pt-24 bg-primary flex justify-center min-h-screen ">
        <div className="container flex flex-col-reverse md:flex-row justify-center md:justify-between gap-8 px-6 md:px-4 flex-wrap">
          <section className=" self-center md:self-auto ">
            <PdfPreview file="/assets/Pengantar Arsitektur.pdf" />
          </section>
          <section className=" flex-1 space-y-8">
            <InfoHeader title="Judul Yang sangat Panjang" author="Nama Author" />
            <InfoLiterature data="April 2020" desc="Publication Date" />
            <InfoLiterature data="April 2020" desc="Publication Date" />
            <InfoLiterature textColor="text-red-700" data="12345787654" desc="ISBN" />
            <Download link="https://s3.amazonaws.com/dq-blog-files/pandas-cheat-sheet.pdf" />
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
