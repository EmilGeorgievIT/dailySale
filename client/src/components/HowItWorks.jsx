import React from 'react';
import '../styles/Sections.scss';
import '../styles/Services.scss';

import registerIcon from '../images/icons/register.png';
import accountIcon from '../images/icons/account.png';
import pencilIcon from '../images/icons/pencil.png'; 
import coinsIcon from '../images/icons/coins.png';

const HowItWorks = () => (
    <section className="section-how-works bg-white">
        <div className="container">
            <div className="section__head">
                <h3 className='section__title'>
                    How it Works ?
                </h3>
                
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, accusantium.
                </p>
            </div>
            
            <div className="section__body">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="service-card">
                            <div className="service__image">
                                <img src={registerIcon} alt="register"/>
                            </div>
                            
                            <div className="service__content text-center">
                                <h5>
                                    Register
                                </h5>
                                
                                <p>
                                    Nam libero tempore, cum soluta nobis est eligendi cumque facere possimus
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="service-card">
                            <div className="service__image">
                                <img src={accountIcon} alt="account"/>
                            </div>

                            <div className="service__content text-center">
                                <h5>
                                    Create Account
                                </h5>
                                
                                <p>
                                    Nam libero tempore, cum soluta nobis est eligendi cumque facere possimus
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="service-card">
                            <div className="service__image">
                                <img src={pencilIcon} alt="pencil"/>
                            </div>
                            
                            <div className="service__content text-center">
                                <h5>
                                    Add Posts
                                </h5>
                                
                                <p>
                                    Nam libero tempore, cum soluta nobis est eligendi cumque facere possimus
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="service-card">
                            <div className="service__image">
                                <img src={coinsIcon} alt="register"/>
                            </div>

                            <div className="service__content text-center">
                                <h5>
                                    Get Earning
                                </h5>
                                
                                <p>
                                    Nam libero tempore, cum soluta nobis est eligendi cumque facere possimus
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
export default HowItWorks;