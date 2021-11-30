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
    <NavLink activeClassName="text-red-600" to={props.to} className={`text-gray-200 text-lg hover:text-red-600 ${props.className}`}>
      {props.text}
    </NavLink>
  );
}

export { NavLogo, NavItem };
