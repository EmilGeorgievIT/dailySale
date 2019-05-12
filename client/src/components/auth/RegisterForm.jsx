import React , { Component } from 'react';
// import AuthenticationService from '../../services/authentication-service';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import '../../styles/Account.scss';

class RegisterForm extends Component {
    // static service = new AuthenticationService();

    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
            isRegister: ''
        };
    }
    
    handleChange = ({target}) => {
        this.setState({
            [target.name] : target.value
        });
    }


    handleSubmit = async (event) => {
        event.preventDefault();

        const { name, email, password } = this.state;
        
        const userData = {
            name,
            email,
            password
        };
        
        this.props.registerUser(userData);

        // try {
        //     const credentials = await RegisterForm.service.register(userData)
        //     if(credentials.message !== 'User created!') {
        //         this.setState({
        //             error: credentials.errors[0].msg
        //         })
        //         return;
        //     }
        //     console.log(credentials);
            
        //     this.setState({
        //         isRegister: true
        //     });
        // } catch(error) {
        //     console.log(error);
        //     this.setState({
        //         error: error.message
        //     })
        // }
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.error !== prevState.error){
          this.setState({ error: nextProps.error});
        }
        else return null;
    }

    render() {
        const { name, email, password, error } = this.state;
        
        // if(isRegister) {
        //     return (
        //         <Redirect to='/login' />
        //     )
        // }
        return(
            <div className="container">
                <form className='form-auth form-login' onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputName">Name</label>
                        
                        <input type="text" name='name' className="form-control" id="exampleInputName" aria-describedby="emailHelp" onChange={this.handleChange} value={name} placeholder="Enter your name"/>                    
                    </div>

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


const mapToState = (state) => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapToState, { registerUser })(RegisterForm);