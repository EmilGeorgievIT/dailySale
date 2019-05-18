import React , { Component } from 'react';
import { withRouter } from  'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import '../../styles/Account.scss';

class RegisterForm extends Component {
       
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            isRegister: '',
            error: {}
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
        console.log(this.state);

        this.props.registerUser(userData, this.props.history);
    }
    
    static getDerivedStateFromProps(props, state){
        if (props.error !== state.error) {
            console.log(props.error);
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
        
        return(
            <div className="section-auth">
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
                        
                        {/* <p className={error ? 'alert alert-danger' : ''}>
                            { error ? error : '' }
                        </p>
                        */}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}


const mapToState = state => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapToState, { registerUser })(withRouter(RegisterForm));