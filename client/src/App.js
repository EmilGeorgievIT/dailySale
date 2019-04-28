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
import UserAds from './components/shared/UserAds';
import CreateAd from './components/CreateAd';

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
              <main className='main'>
                <Switch>
                  <Route exact path='/' component = { Main }/>
                  <Route exact path='/register' component = { RegisterForm }/>
                  <Route exact path='/post/:id' component = { PostDetails }/>
                  <Route exact path='/login' component = { LoginForm }/>
                  <Route exact path='/messages' component = { Messages }/>
                  <Route exact path='/create/ad' component = { CreateAd }/>
                  <Route exact path='/profile' component = { Profile }/>
                  <Route exact path='/user/ads/:userId' component = { UserAds }/>
                  <Route component = { NotFound } />
                </Switch>
              </main>
            <Footer />
          </UserProvider>
        </Fragment>
      </Router>
      </div>
    );
  }
}

export default App;
