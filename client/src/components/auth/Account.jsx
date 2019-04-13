import React , { Component } from 'react';
import '../../styles/Account.scss';
import LoginForm from '../LoginForm';

class Account extends Component {
    render() {
        return (
            <section className='section-account'>
                <div className="container">
                    <div className="section__body">
                        <div className="tabs-account">
                            <ul className="nav justify-content-center nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                                        Home
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
                                        Profile
                                    </a>
                                </li>
                            </ul>
                            
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <LoginForm />
                                </div>
                                
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <p> 
                                        
                                    </p>
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