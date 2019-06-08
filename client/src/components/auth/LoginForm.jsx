import React, { Component, Fragment } from 'react';
import AuthenticationService from '../../services/authentication-service';
import { Redirect } from 'react-router-dom';
import '../../styles/Account.scss';
import '../../styles/Sections.scss';
import '../../styles/List.scss';
import '../../styles/Forms.scss';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { Intro } from '../shared/Intro';
import bannerImage from '../../images/banner2.jpg'
import { Link } from 'react-router-dom';
import facebookIcon from '../../images/facebook.svg';
import twitterIcon from '../../images/twitter.svg';
import linkedInIcon from '../../images/linkedin.svg';

class LoginForm extends Component {
    static service = new AuthenticationService();

    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }
    
    handleChange = ({target}) => {
        this.setState({
            [target.name] : target.value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const { user } = this.props;
        
        const userData = {
            email,
            password
        };

        this.props.loginUser(userData);
    }

    render() {
        const { email, password, error } = this.state;
        
        const imageBackground = {
            backgroundImage: `url(${bannerImage})`
        };

        if(this.props.auth.isAuthenticated) {
            return (
                <Redirect to='/' />
            )
        }
        return(
            <Fragment>
                <Intro 
                    title='Login'
                    image={imageBackground}
                 />
                
                <div className="section-auth">
                    <div className='container'>
                        <form className='form-auth form-login' onSubmit={this.handleSubmit}>
                            <div className="form__head">
                                <h4 className='form__title text-center'>
                                    Login
                                </h4>
                            </div>
                            
                            <div className="form__body">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    
                                    <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.handleChange} value={email} placeholder="Enter email"/>
                                    
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    
                                    <input type="password" name='password' value={password} onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                </div>
                                
                                <p className={error ? 'alert alert-danger' : ''}>
                                    { error ? error : '' }
                                </p>
                                
                                <div className="form__actions">
                                    <button type="submit" className="btn btn-block btn-primary">Login</button>
                                    
                                    <ul className="list-login-links">
                                        <li>
                                            <Link to='reset-password'>
                                                Forgot Password
                                            </Link>
                                        </li>

                                        <li>
                                            Don't have account ?
                                            <Link className='space' to='register'>
                                                Sign Up
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="form__socials">
                                    <div className='divider text-center'>
                                    </div>

                                    <ul className="list-socials d-flex justify-content-center">
                                        <li>
                                            <a href="www.facebook.com">
                                                <img src={ facebookIcon } width='30' height='30' alt="facebook-login"/>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="www.twitter.com">
                                                <img src={ twitterIcon } width='30' height='30' alt="twitter-login"/>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="www.linkedin.com">
                                                <img src={ linkedInIcon } width='30' height='30' alt="linkedin-login"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToPops = (state) => ({
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToPops, { loginUser })(LoginForm);