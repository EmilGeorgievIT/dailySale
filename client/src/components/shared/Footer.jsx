import React, { Component } from 'react';
import '../../styles/Footer.scss';
import '../../styles/List.scss';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-white.png';
import appleStore from '../../images/apple-store.svg';
import googleStore from '../../images/google-store.png';
import facebook from '../../images/ico-facebook.svg';
import twitter from '../../images/ico-twitter.svg'; 

class Footer extends Component {
    render() { 
        return (
            <footer className='footer'>
                <div className="container">
                    <div className="footer__content">
                        <div className="row align-items-center">
                            <div className="col col-md-4 col-sm-12 col-12">
                                <Link className='logo-footer' to="/">
                                    <img src={logo} width='100' height='100' alt="logo"/>
                                </Link>

                                <h5>
                                    Social Network
                                </h5>
                                
                                <ul className="list socials d-flex justify-content-center">
                                    <li>
                                        <a href="https://www.facebook.com/">
                                            <img src={facebook} alt="facebook" width='25' height='25'/>
                                        </a>
                                    </li>

                                    <li>    
                                        <a href="https://www.twitter.com/">
                                            <img src={twitter} alt="twitter" width='25' height='25'/>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col col-md-4 col-sm-12 col-12">
                                <h4>
                                    About Us
                                </h4>
                                
                                <ul className="list footer__nav">
                                    <li>
                                        <Link className="navbar-brand" to="/help">
                                            Help
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="navbar-brand" to="/contacts">
                                            Contact Us
                                        </Link>
                                    </li>
                                    
                                    <li>
                                        <Link className="navbar-brand" to="/contacts">
                                            How it works
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="col col-md-4 col-sm-12 col-12">
                                <h4>
                                    Mobile apps
                                </h4>

                                <ul className="list list-mobile-apps d-flex align-items-center justify-content-center">
                                    <li>
                                        <a href="https://www.apple.com/ie/ios/app-store/">
                                            <img src={appleStore} alt="apple-store"/>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="https://store.google.com/">
                                            <img src={googleStore} alt="google-store"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <p className='copyright'>
                            &copy; This is footer all rights are reserved { new Date().getFullYear() }
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}
export default Footer;