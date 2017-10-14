import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import About from './About';
import PageNotFound from './PageNotFound';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/about' component={About}/>
      <Route path='/' component={PageNotFound}/>
    </Switch>
  </main>
)

export default Main
