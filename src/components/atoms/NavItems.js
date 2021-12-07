import { Link, NavLink } from 'react-router-dom';

function NavLogo(props) {
  return (
    <Link to={props.to}>
      <img src="/assets/images/logo-literature.png" alt="logo" />
    </Link>
  );
}
function NavItem(props) {
  return (
    <NavLink activeClassName="text-red-600" to={props.to} className={`group flex flex-col items-center text-gray-200 text-lg hover:text-red-600 ${props.className}`}>
      {props.text}
      <NavLink to={props.to} activeClassName="md:w-1/2 bg-danger" style={{ height: 2 }} className="w-0  group-hover:bg-danger md:group-hover:w-1/2 transition-all duration-500 "></NavLink>
    </NavLink>
  );
}

export { NavLogo, NavItem };
