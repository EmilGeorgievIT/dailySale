import './styles/variables.scss'
import './App.scss';

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider, defaultUserState } from './components/contexts/user-context';

import Footer from './components/shared/Footer';
import Navigation from './components/shared/Navigation';
import Main from './components/Main';
import NotFound from './components/NotFound';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Profile from './components/Profile';
import PostDetails from './components/PostDetails';
import Messages from './components/Messages';

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
                <Route exact path='/post/:id' component = { PostDetails }/>
                <Route exact path='/login' component = { LoginForm }/>
                <Route exact path='/messages' component = { Messages }/>
                <Route exact path='/profile' component = { Profile }/>
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
