import React from 'react';
import { Home } from './pages';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default App;
