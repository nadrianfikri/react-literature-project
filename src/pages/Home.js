import { Input } from '../components/atoms/Form';
import Main from '../components/molecules/Main';
import Header from '../components/organism/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <Main className="flex flex-col justify-center items-center gap-8 w-96 md:w-560 ">
        <img className="w-96 md:w-auto " src="/assets/images/big-literature.png" alt="big-logo" />
        <div className="flex items-center justify-center gap-2 w-full">
          <Input placeholder="Search for literature" />
          <button className="bg-danger hover:bg-red-800 p-2 rounded-md border border-red-700 transition-all duration-100">
            <img src="/assets/icons/search.svg" alt="search" />
          </button>
        </div>
      </Main>
    </div>
  );
}
