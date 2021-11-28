import { Landing, Home, SearchPage, Profile, Collection, AddLiterature, Detail, Admin, Notfound } from './pages';
import { Switch, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/authContext';
import { API, setAuthToken } from './config/api';

//init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  // const history = useHistory();
  const [state, dispatch] = useContext(AuthContext);

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
  }, []);

  return (
    <>
      {state.loading ? (
        <div>Loading</div>
      ) : (
        <Switch>
          <Route exact path="/" component={state.isLogin ? Home : Landing} />
          <Route path="/home" component={Home} />
          <Route path="/literature" component={SearchPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/collection" component={Collection} />
          <Route path="/add-literature" component={AddLiterature} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/admin" component={Admin} />
          <Route path="*" component={Notfound} />
        </Switch>
      )}
    </>
  );
}

export default App;
