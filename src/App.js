import { Landing, Home, SearchPage, Profile, Collection, AddLiterature, Detail, Admin, Notfound } from './pages';
import { Switch, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/authContext';
import { API, setAuthToken } from './config/api';
import { PrivateRoute, ProtectedRoute } from './components/organism/PrivateRoute';

//init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  // const history = useHistory();
  const [state, dispatch] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // create function for check user token
  const checkUser = async () => {
    try {
      const res = await API.get('/check-auth');

      if (res.status !== 200) {
        dispatch({
          type: 'AUTH_ERROR',
        });
      }

      let payload = res.data.data.user;
      payload.token = localStorage.token;
      dispatch({
        type: 'AUTH_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };

  useEffect(() => {
    checkUser();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen w-full">
          <img src="/assets/icons/Book.gif" alt="loading" />
        </div>
      ) : (
        <Switch>
          <Route exact path="/" component={state.isLogin ? Home : Landing} />
          <PrivateRoute path="/literature" component={SearchPage} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/collection" component={Collection} />
          <PrivateRoute path="/add-literature" component={AddLiterature} />
          <PrivateRoute path="/detail/:id" component={Detail} />
          <ProtectedRoute path="/admin" component={Admin} />
          <Route path="*" component={Notfound} />
        </Switch>
      )}
    </>
  );
}

export default App;
