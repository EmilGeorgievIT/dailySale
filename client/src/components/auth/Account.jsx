import React , { Component } from 'react';
import '../../styles/Account.scss';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';

class Account extends Component {
    render() {
        return (
            <section className='section-account'>
                <div className="container">
                    <div className="section__body">
                        <div className="tabs-account">
                            <ul className="nav justify-content-center nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true">
                                        Login
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false">
                                        Register
                                    </a>
                                </li>
                            </ul>
                            
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                                    <LoginForm />
                                </div>
                                
                                <div className="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                                    <RegisterForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Account;