import React, { Component } from 'react';
import AuthenticationService from '../../services/authentication-service';
import { Redirect } from 'react-router-dom';
import '../../styles/Account.scss';
import '../../styles/Sections.scss';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

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

        if(this.props.auth.isAuthenticated) {
            return (
                <Redirect to='/' />
            )
        }
        return(
            <div className="section-auth">
                <div className='container'>
                    <form className='form-auth form-login' onSubmit={this.handleSubmit}>
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
                        
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToPops = (state) => ({
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToPops, { loginUser })(LoginForm);