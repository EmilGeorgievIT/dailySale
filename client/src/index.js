import 'bootstrap/scss/bootstrap.scss';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/js/bootstrap.js';
// eslint-disable-next-line
import $ from 'jquery';
// eslint-disable-next-line
import Popper from 'popper.js';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// eslint-disable-next-line no-unused-vars
import * as serviceWorker from './serviceWorker';

const startApp = () => {
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
}
    
if(!window.cordova) {
    startApp()
} else {
    document.addEventListener('deviceready', startApp, false)
}