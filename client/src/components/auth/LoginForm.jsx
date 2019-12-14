import React, { Component, Fragment } from 'react';
import AuthenticationService from '../../services/authentication-service';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Redirect } from 'react-router-dom';
import '../../styles/Account.scss';
import '../../styles/Sections.scss';
import '../../styles/List.scss';
import '../../styles/Forms.scss';
import { connect } from 'react-redux';
import { loginUser, loginUserFacebook, loginUserTwitter, loginUserGoogle } from '../../actions/authActions';
import { Intro } from '../shared/Intro';
import { Link } from 'react-router-dom';
import dotenv from 'dotenv';
import bannerImage from '../../images/banner2.jpg'
import googleIcon from '../../images/google.svg';
import facebookIcon from '../../images/facebook.svg';
import TwitterLogin from 'react-twitter-auth/lib/react-twitter-auth-component.js';
const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;
dotenv.config();

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

    static getDerivedStateFromProps(props, state){
        if (props.error !== state.error) {
            return props.error;
        }

        else return null;
    }
    
    onFailGoogle = (error) => {}
    
    responseGoogle = (response) => {
        this.props.loginUserGoogle({
            "access_token": response.accessToken
        }, this.props.history);
    }

    onFailedTwitter = (error) => {
        console.log(error);
    }

    onSuccessTwitter = (response) => {
        response.json().then(user => {
            this.props.loginUserTwitter(user, this.props.history);
        })

    }

    responseFacebook = (response) => {
        this.props.loginUserFacebook({
            "access_token": response.accessToken
        }, this.props.history);
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name] : target.value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        
        const userData = {
            email,
            password
        };

        this.props.loginUser(userData);
    }

    render() {
        const { email, password } = this.state;
        
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
                                
                                <p className={this.props.error['message'] ? 'alert alert-danger' : ''}>
                                    { this.props.error['message'] ? this.props.error['message'] : '' }
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
                                            <FacebookLogin
                                                appId={process.env.REACT_APP_FACEBOOK_CLIENT}
                                                autoLoad={false}
                                                fields="name,email,picture"
                                                callback={this.responseFacebook} 
                                                render={renderProps => (
                                                    <button type='button' className='btn-no-border' onClick={renderProps.onClick}>
                                                        <img src={ facebookIcon } width='30' height='30' alt="facebook-login"/>
                                                    </button>
                                                )}
                                            />
                                        </li>

                                        <li>
                                            <TwitterLogin className='button-twitter' 
                                                loginUrl={`${API_SERVER}/auth/twitter`}
                                                onFailure={this.onFailedTwitter}
                                                onSuccess={this.onSuccessTwitter}                                                
                                                requestTokenUrl={`${API_SERVER}/auth/twitter/reverse`}
                                                showIcon={true}
                                                forceLogin={false}/>
                                        </li>

                                        <li>
                                            <GoogleLogin
                                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                                autoLoad={false}
                                                render={renderProps => (
                                                    <button className='button-google' onClick={renderProps.onClick}>
                                                       <img src={ googleIcon } width='26' height='26' alt="google-login"/>
                                                    </button>
                                                )}
                                                onSuccess={this.responseGoogle}
                                                onFailure={this.onFailGoogle}
                                            />
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

export default connect(mapStateToPops, { loginUser, loginUserFacebook, loginUserTwitter, loginUserGoogle })(LoginForm);