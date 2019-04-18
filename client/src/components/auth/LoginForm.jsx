import React, { Component } from 'react';
import AuthenticationService from '../../services/authentication-service';
import { Redirect } from 'react-router-dom';
import '../../styles/Account.scss';
import { UserConsumer } from '../contexts/user-context';

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


    handleSumbit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const { updateUser } = this.props;
        
        const userData = {
            email,
            password
        };
        
        try {
            const credentials = await LoginForm.service.login(userData)
            if(credentials.message !== 'logged') {
                this.setState({
                    error: credentials.message
                })
                return;
            }
            console.log(credentials);
            sessionStorage.setItem('ds_chk_temp', credentials.userId);
            sessionStorage.setItem('token', credentials.token);
        
            updateUser({
                isLogged: true
            });
        } catch(error) {
            console.log(error);
            this.setState({
                error: error.message
            })
        }
    }

    render() {
        const { email, password, error } = this.state;
        const { isLogged } = this.props;

        if(isLogged) {
            return (
                <Redirect to='/' />
            )
        }
        return(
            <div className='container'>
                <form className='form-auth form-login' onSubmit={this.handleSumbit}>
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
        );
    }
}

const LoginWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({isLogged, updateUser}) => (
                    <LoginForm
                    {...props}
                     isLogged={isLogged}
                     updateUser={updateUser}
                    />
                )
            }
        </UserConsumer>
    );
}

export default LoginWithContext;