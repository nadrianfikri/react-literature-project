import { Landing, Home, SearchPage, Profile, Collection, AddLiterature, Detail, Admin } from './pages';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/literature" component={SearchPage} />
      <Route path="/profile" component={Profile} />
      <Route path="/collection" component={Collection} />
      <Route path="/add-literature" component={AddLiterature} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/admin" component={Admin} />
    </Switch>
  );
}

export default App;
