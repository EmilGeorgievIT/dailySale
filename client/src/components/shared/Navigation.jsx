import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import '../../styles/Navigation.scss';

class Navigation extends Component {
    render() { 
        return(
            <nav className="navigation navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} className='logo' alt="logo"/>
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="material-icons">menu</i>
                    </button>

                    <div className="collapse navbar-collapse navigation-collapse" id="navbarNav">
                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <Link className="nav-link" to="/sign-in">
                                    <div className='circle'>
                                        <i className="material-icons">person</i>
                                    </div>
                                    
                                    <span>
                                        My profile
                                    </span>
                                </Link>
                            </li>
                        
                            <li className="nav-item">

                                <button type="button" to="/sign-up" className="btn btn-primary d-flex">
                                    <i class="material-icons">add</i>
                                    
                                    <span>
                                        Place Ad
                                    </span>
                                </button>

                                {/* <Link className="nav-link" to="/sign-up">Sign Up</Link> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;