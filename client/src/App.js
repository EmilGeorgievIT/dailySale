import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Footer from './components/shared/Footer';
import Navigation from './components/shared/Navigation';
import Main from './components/Main';
import NotFound from './components/NotFound';
import './styles/variables.scss'
import './App.scss';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { UserProvider, defaultUserState } from './components/contexts/user-context';

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      user: {
        ...defaultUserState,
        updateUser: this.updateUser
      }
    }
  }
  updateUser = (user) => {
    this.setState({ user });
  };

  render() {
    const { user } = this.state
    
    return (
      <div className="App">
      <Router>
        <Fragment>
          <UserProvider value={user} >
            <Navigation />
              <Switch>
                <Route exact path='/' component = { Main }/>
                <Route exact path='/register' component = { RegisterForm }/>
                <Route exact path='/login' component = { LoginForm }/>
                <Route component = { NotFound } />
              </Switch>
            <Footer />
          </UserProvider>
        </Fragment>
      </Router>
      </div>
    );
  }
}

export default App;
