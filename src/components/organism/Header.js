import Navbar from '../molecules/Navbar';

export default function Header(props) {
  return (
    <header className="w-full fixed top-0 bg-primary flex justify-center items-center">
      <Navbar />
    </header>
  );
}
