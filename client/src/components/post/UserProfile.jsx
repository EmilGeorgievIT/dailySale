import React, { Fragment } from 'react';

import '../../styles/List.scss';

import facebook from '../../images/facebook.svg';
import twitter from '../../images/twitter.svg'; 
import linkedin from '../../images/linkedin.svg';

const UserProfile = ({image, name, joined, email, phone, website}) => (
    <Fragment>
        <div className="card user-profile">
            <div className="card-header user__header">
                <h3 className='card-title'>
                    Post By
                </h3>
            </div>
            
            <div className="card-body">
                <img src={image} alt="profile-avatar"/>
                
                <h5 className='user-name'>
                    { name }
                </h5>
                
                <p className='user-join'>
                    { joined }
                </p>
                
                <button className='btn btn-primary'>
                    See All ads
                </button>
            </div>

            <div className="card-body">
                <h4 className='contact-title'>
                    Contact Info
                </h4>
                
                <ul className="list-contact">
                    <li>
                        <i className="material-icons">
                            alternate_email
                        </i>
                        
                        <span>
                            { email }
                        </span>
                    </li>

                    <li>
                        <i className="material-icons">
                            phone
                        </i>
                        
                        <span>
                            { phone }
                        </span>
                    </li>

                    <li>
                        <i className="material-icons">
                            link
                        </i>
                        
                        <span>
                            { website }
                        </span>
                    </li>
                </ul>

                <ul className="list d-flex list-socials">
                    <li>
                        <a href="https://www.facebook.com/emil.georgiev.it">
                            <img src={facebook} alt="facebook" width='35' height='35'/>
                        </a>
                    </li>

                    <li>    
                        <a href="https://www.twitter.com/">
                            <img src={twitter} alt="twitter" width='35' height='35'/>
                        </a>
                    </li>

                    <li>    
                        <a href="https://www.linkedin.com/in/emil-georgiev-b5464bb9/">
                            <img src={linkedin} alt="linkedin" width='35' height='35'/>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="card-footer">
                <div className="user-actions">
                    <button className='btn btn-primary'>
                        <i className="material-icons">
                            send    
                        </i>

                        Chat
                    </button>

                    <button className='btn btn-success'>
                        <i className="material-icons">
                            send    
                        </i>

                        Contact Me
                    </button>
                </div>
            </div>
        </div>
    </Fragment>
);

export default UserProfile;