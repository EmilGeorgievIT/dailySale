import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Footer from './components/shared/Footer';
import Navigation from './components/shared/Navigation';
import Main from './components/Main';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import NotFound from './components/NotFound';
import './App.scss';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Fragment>
          <Navigation />
            <Switch>
              <Route exact path='/' component = { Main }/>
              <Route exact path='/sign-up' component = { SignUp }/>
              <Route exact path='/sign-in' component = { SignIn }/>
              <Route component = { NotFound } />
            </Switch>
          <Footer />
        </Fragment>
      </Router>
      </div>
    );
  }
}

export default App;
