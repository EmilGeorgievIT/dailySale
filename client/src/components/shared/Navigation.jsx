import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import '../../styles/Navigation.scss';
import { UserConsumer } from '../contexts/user-context';

class Navigation extends Component {
    logOut = () => {
        
        const { updateUser } = this.props;
        
        updateUser({
            isLogged: false
        })
        sessionStorage.clear();
    }

    render() {
        const { isLogged } = this.props; 
        
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
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <div className="dropdown">
                                    <button className="nav-link dropdown-btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <div className='circle'>
                                            <i className="material-icons">person</i>
                                        </div>
                                        
                                        <span>
                                            My profile
                                        </span>
                                    </button>
                                
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Link className={isLogged ? 'dropdown-item sr-only' : 'dropdown-item'} to="/login">
                                            Login
                                        </Link>
                                        
                                        <Link className={isLogged ? 'dropdown-item sr-only' : 'dropdown-item'} to='/register'>
                                            Register
                                        </Link>

                                        <Link className={!isLogged ? 'dropdown-item sr-only' : 'dropdown-item'} to='/' onClick={this.logOut}>
                                            Logout
                                        </Link>

                                        <Link className={!isLogged ? 'dropdown-item sr-only' : 'dropdown-item'} to='/profile'>
                                            My Profile
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        
                            <li className="nav-item">

                                <Link type="button" to="/create/ad" className="btn btn-primary d-flex">
                                    <i className="material-icons">add</i>
                                    
                                    <span>
                                        Place Ad
                                    </span>
                                </Link>

                                {/* <Link className="nav-link" to="/sign-up">Sign Up</Link> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

const NavigationWithConsumer = (props) => {
  return (
      <UserConsumer>
          {
              ({isLogged, updateUser}) => (
                <Navigation 
                  isLogged={isLogged}
                  updateUser={updateUser}
                />
              )
          }
      </UserConsumer>
  )
};

export default NavigationWithConsumer;