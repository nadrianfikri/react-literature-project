import { useParams } from 'react-router';
import Main from '../components/molecules/Main';
import Header from '../components/organism/Header';
import Search from '../components/organism/Search';

export default function Home() {
  return (
    <div>
      <Header />
      <Main className="flex flex-col justify-center items-center gap-8 w-96 md:w-560 ">
        <img className="w-96 md:w-auto " src="/assets/images/big-literature.png" alt="big-logo" />

        <form action="/literature" className="flex items-center justify-center gap-2 w-full">
          <Search name="search" value="" onChange={'onchange'} />
        </form>
      </Main>
    </div>
  );
}
