import { Link } from 'react-router-dom';

function NavLogo(props) {
  return (
    <Link to={props.to}>
      <img src="/assets/images/logo-literature.png" alt="logo" />
    </Link>
  );
}
function NavItem(props) {
  return (
    <Link to={props.to}>
      <p className={`text-white ${props.className}`}>{props.text}</p>
    </Link>
  );
}

export { NavLogo, NavItem };
