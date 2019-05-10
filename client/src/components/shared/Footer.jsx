import React, { Component } from 'react';
import '../../styles/Footer.scss';
import '../../styles/List.scss';
import { Link } from 'react-router-dom';
import Subscribe from './Subscribe';

class Footer extends Component {
    render() { 
        return (
            <footer className='footer'>
                <div className="container">
                    <div className="footer__content">
                        <div className="row align-items-center">
                            <div className="col col-md-3 col-sm-12 col-12">
                                <h5 className="footer__title">
                                    About
                                </h5>
                                
                                <div className="footer__entry">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit amet numquam iure provident voluptate essequasi, veritatis totam voluptas nostrum.Lorem ipsum dolor sit amet, consectetur 
                                    </p>
                                    
                                    <p>
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum .
                                    </p>
                                </div>
                            </div>

                            <div className="col col-md-3 col-sm-12 col-12">
                                <h5 className="footer__title">
                                    Our Service
                                </h5>
                                
                                <ul className="list list-links">
                                    <li>
                                        <Link to='team'>
                                            Our Team
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to='team'>
                                            Contact Us
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to='team'>
                                            About
                                        </Link>
                                    </li>


                                    <li>
                                        <Link to='team'>
                                            Services
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to='team'>
                                            Terms and Condition
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="col col-md-3 col-sm-12 col-12">
                                <h5 className="footer__title">
                                    Contact
                                </h5>

                                <ul className="list list-contacts">
                                    <li>
                                        <Link to='team'>
                                            Our Team
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to='team'>
                                            Contact Us
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to='team'>
                                            About
                                        </Link>
                                    </li>


                                    <li>
                                        <Link to='team'>
                                            Services
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to='team'>
                                            Terms and Condition
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="col col-md-3 col-sm-12 col-12">
                                <h5 className="footer__title">
                                    Subscribe
                                </h5>

                                <Subscribe />
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