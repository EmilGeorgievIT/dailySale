import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-white.png';
import logoSticky from '../../images/logo.png';
import '../../styles/Navigation.scss';
import { connect } from 'react-redux';
import { loginUser, logOutUser } from '../../actions/authActions';

class Navigation extends Component {
    state = {
        isTop: false
    }

    logOut = () => {
        this.props.logOutUser();
    }

    handleScroll = (event) => {
        const el = document.getElementsByClassName('navigation');
        const isTop = window.scrollY >= 78;
        
        if (isTop !== this.state.isTop) {
            this.setState({ isTop })
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);        
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        const { isAuthenticated, user } = this.props.auth; 
        
        return(
            <nav className={this.state.isTop ? 'navigation navbar navbar-expand-lg fixed' : 'navigation navbar navbar-expand-lg'}>
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={this.state.isTop ? logoSticky : logo} className='logo' alt="logo"/>
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="material-icons">menu</i>
                    </button>

                    <div className="collapse navbar-collapse navigation-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="btn btn-outline-primary">
                                    <span>
                                        Home
                                    </span>
                                </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link to="/about" className="btn btn-outline-primary">
                                    <span>
                                        About Us
                                    </span>
                                </Link>
                            </li>
                        
                            <li className="nav-item">

                                <Link to="/create/ad" className="btn btn-outline-primary d-flex">
                                    {/* <i className="material-icons">add</i> */}
                                    
                                    <span>
                                        Place Ad
                                    </span>
                                </Link>

                                {/* <Link className="nav-link" to="/sign-up">Sign Up</Link> */}
                            </li>

                            <li className="nav-item">
                                <div className="dropdown">
                                    <button className="nav-link dropdown-btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {
                                            user.image? <img src={user.image} className='image-profile' alt=""/> : <i className="material-icons">face</i> 
                                        }
                                        
                                        <span>
                                            My profile
                                        </span>

                                    </button>
                                
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Link className={isAuthenticated ? 'dropdown-item sr-only' : 'dropdown-item'} to="/login">
                                            Login
                                        </Link>
                                        
                                        <Link className={isAuthenticated ? 'dropdown-item sr-only' : 'dropdown-item'} to='/register'>
                                            Register
                                        </Link>

                                        <Link className={!isAuthenticated ? 'dropdown-item sr-only' : 'dropdown-item'} to='/' onClick={this.logOut}>
                                            Logout
                                        </Link>

                                        <Link className={!isAuthenticated ? 'dropdown-item sr-only' : 'dropdown-item'} to='/profile'>
                                            My Profile
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
const mapStateToPops = (state) => ({
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToPops, { loginUser, logOutUser })(Navigation);