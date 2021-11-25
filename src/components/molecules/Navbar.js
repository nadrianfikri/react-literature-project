import { NavItem, NavLogo } from '../atoms/NavItems';

export default function Navbar(props) {
  return (
    <nav className="container flex justify-between items-center">
      <NavLogo to="/" />
    </nav>
  );
}
