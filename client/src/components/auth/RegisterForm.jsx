import React , { Component, Fragment } from 'react';
import { withRouter } from  'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import '../../styles/Account.scss';
import '../../styles/Forms.scss';
import '../../styles/Buttons.scss';
import { Link } from 'react-router-dom';
import { Intro } from '../shared/Intro';
import bannerImage from '../../images/banner2.jpg'
import facebookIcon from '../../images/facebook.svg';
import twitterIcon from '../../images/twitter.svg';
import linkedInIcon from '../../images/linkedin.svg';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import dotenv from 'dotenv';
dotenv.config();

class RegisterForm extends Component {
       
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
    
    responseFacebook = (response) => {
        console.log(response);
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
                                                autoLoad={true}
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


const mapToState = state => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapToState, { registerUser })(withRouter(RegisterForm));