import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './components/commons/Header';
import { GeneroView } from './components/genero/GeneroView';
import { DirectorView } from './components/directores/DirectorView';
import { ProductoraView } from './components/productoras/ProductoraView';
import { TipoView } from './components/tipos/TipoView';
import { MediaView } from './components/media/MediaView';

export const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mt-3">
        <Switch>
          <Route exact path="/generos" component={GeneroView} />
          <Route exact path="/directores" component={DirectorView} />
          <Route exact path="/productoras" component={ProductoraView} />
          <Route exact path="/tipos" component={TipoView} />
          <Route exact path="/media" component={MediaView} />
          <Redirect to="/generos" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;