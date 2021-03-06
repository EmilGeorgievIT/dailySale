import './styles/variables.scss'
import './App.scss';

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Footer from './components/shared/Footer';
import Navigation from './components/shared/Navigation';
import Main from './components/Main';
import NotFound from './components/NotFound';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Profile from './components/Profile';
import PostDetailsMain from './components/PostDetailsMain';
import Chat from './components/chat/Chat';
import UserAds from './components/shared/UserAds';
import CreateAd from './components/CreateAd';
import CategoryPosts from './components/CategoryPosts';
import ContactUs from './components/ConcatUs';
import About from './components/About';


import { Provider } from 'react-redux'
import store from './store';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logOutUser } from './actions/authActions';
import RealTimeChat from './components/chat/RealTimeChat';
import PrivacyPolicy from './components/shared/PrivacyPolicy';

if(localStorage.token !== undefined) {
  const decode = jwt_decode(localStorage.token);
  
  store.dispatch(setCurrentUser(decode));

  const currentTime = Date.now() / 1000;

  if(decode.exp < currentTime) {
    store.dispatch(logOutUser());

    window.location.href = '/login';
  }
}

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      user: ''
    }
  }


  render() {    
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Fragment>
                <Navigation />
                  <main className='main'>
                    <Switch>
                      <Route exact path='/' component = { Main }/>
                      <Route exact path='/register' component = { RegisterForm }/>
                      <Route exact path='/post/:id' component = { PostDetailsMain }/>
                      <Route exact path='/privacy-policy' component={ PrivacyPolicy } />
                      <Route exact path='/login' component = { LoginForm }/>
                      <Route exact path='/messages' component = { Chat }/>
                      <Route exact path='/about' component = { About }/>
                      <Route exact path='/contacts' component = { ContactUs }/>
                      <Route exact path='/create/ad' component = { CreateAd }/>
                      <Route exact path='/profile' component = { Profile }/>
                      <Route exact path='/chat/:id' component = { RealTimeChat }/>
                      <Route exact path='/category/:categoryName' component = { CategoryPosts }/>
                      <Route exact path='/user/ads/:userId' component = { UserAds }/>
                      <Route component = { NotFound } />
                    </Switch>
                  </main>
                <Footer />
            </Fragment>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
