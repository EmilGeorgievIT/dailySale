import React , { Component, Fragment } from 'react';
import { withRouter } from  'react-router-dom';
import { connect } from 'react-redux';
import { loginUserFacebook, loginUserTwitter, registerUser, loginUserGoogle } from '../../actions/authActions';
import '../../styles/Account.scss';
import '../../styles/Forms.scss';
import '../../styles/Buttons.scss';
import { Link } from 'react-router-dom';
import { Intro } from '../shared/Intro';
import bannerImage from '../../images/banner2.jpg'
import facebookIcon from '../../images/facebook.svg';
import googleIcon from '../../images/google.svg';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import AuthenticationService from '../../services/authentication-service';
import TwitterLogin from 'react-twitter-auth/lib/react-twitter-auth-component.js';
import dotenv from 'dotenv';
import { GoogleLogin } from 'react-google-login';
const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;

dotenv.config();

class RegisterForm extends Component {
       
    static registerFacebook = new AuthenticationService();
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            isRegister: '',
            error: ''
        };
    } 
    
    handleChange = ({target}) => {
        this.setState({
            [target.name] : target.value
        });
    }
    
    onFailedTwitter = (error) => {
        console.log(error);
    }

    onSuccessTwitter = (response) => {
        response.json().then(user => {
            this.props.loginUserTwitter(user, this.props.history);
        })

    }
    onFailGoogle = (error) => {
        console.log(error);
    }

    responseFacebook = (response) => {
        this.props.loginUserFacebook({
            "access_token": response.accessToken
        }, this.props.history);
    }

    responseGoogle = (response) => {
        this.props.loginUserGoogle({
            "access_token": response.accessToken
        }, this.props.history);
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { name, email, password } = this.state;
        
        const userData = {
            name,
            email,
            password
        };
        this.props.registerUser(userData, this.props.history);
    }
    
    static getDerivedStateFromProps(props, state){
        if (props.error !== state.error) {
            return {
                error: props.error
            };
        }

        else return null;
    }

    render() {
        const { name, email, password } = this.state;
        
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        
        const imageBackground = {
            backgroundImage: `url(${bannerImage})`
        };

        return(
            <Fragment>
                <Intro 
                    title='Register'
                    image={imageBackground}
                />
                
                <div className="section-auth">
                    <div className="container">
                        <form className='form-auth form-login' onSubmit={this.handleSubmit}>
                            <div className="form__head">
                                <h4 className='form__title text-center'>
                                    Register
                                </h4>
                            </div>
                            
                            <div className="form__body">
                                <div className="form-group">
                                    <label htmlFor="exampleInputName">Name</label>
                                    
                                    <input type="text" name='name' className="form-control" id="exampleInputName" aria-describedby="emailHelp" onChange={this.handleChange} value={name} placeholder="Enter your name"/>
                                </div>

                                <p className={this.props.error[2] ? 'alert alert-danger' : ''}>
                                    { this.props.error[2] ? this.props.error[2].msg : '' }
                                </p>
                                
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    
                                    <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.handleChange} value={email} placeholder="Enter email"/>
                                    
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>

                                <p className={this.props.error[0] ? 'alert alert-danger' : ''}>
                                    { this.props.error[0] ? this.props.error[0].msg : '' }
                                </p>

                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    
                                    <input type="password" name='password' value={password} onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                </div>
                                
                                <p className={this.props.error[1] ? 'alert alert-danger' : ''}>
                                    { this.props.error[1] ? this.props.error[1].msg : '' }
                                </p>
                               

                                <div className="form__actions">
                                    <button type="submit" className="btn btn-block btn-primary">Submit</button>
                                    
                                    <ul className="list-login-links">
                                        <li>
                                            Already have an account ? 
                                            <Link className='space' to='login'>
                                                Sign In
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="form__socials">
                                    <div className='divider text-center'></div>

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


const mapStateToPops = state => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapStateToPops, { loginUserFacebook, registerUser, loginUserTwitter, loginUserGoogle })(withRouter(RegisterForm));