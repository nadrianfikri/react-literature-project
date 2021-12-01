import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

export function PrivateRoute({ component: Component, ...rest }) {
  const [state] = useContext(AuthContext);
  return <Route {...rest} render={(props) => (state.isLogin ? <Component {...props} /> : <Redirect to="/notfound" />)} />;
}

export function ProtectedRoute({ component: Component, ...rest }) {
  const [state] = useContext(AuthContext);
  return <Route {...rest} render={(props) => (state.isLogin && state.user.role === 'admin' ? <Component {...props} /> : <Redirect to="/notfound" />)} />;
}
