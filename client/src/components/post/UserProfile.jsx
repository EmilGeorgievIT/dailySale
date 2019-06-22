import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'; 
import '../../styles/List.scss';
import '../../styles/Profile.scss';

// import { Link } from 'react-router-dom';
import ProfileService from '../../services/profile-service';

import facebook from '../../images/facebook.svg';
import twitter from '../../images/twitter.svg'; 
import linkedin from '../../images/linkedin.svg';


class UserProfile extends Component {
    static service = new ProfileService();
    
    constructor(props) {
        super(props);
        
        this.state = {
            user: '',
            creator: props.creator
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.creator !== this.state.creator) {
          this.setState({
              creator: prevProps.creator
          });
        }
    }

    componentDidMount() {
        try {
            setTimeout(async() => {
                const user = await UserProfile.service.getUserDetails(this.state.creator)
                .then((user) => {
                    this.setState({user});
                })
            }, 1000);
        } catch(error) {
                console.log(error);
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.creator!==prevState.creator){
          return {creator : nextProps.creator};
        }
        else return null;
    }

    render() {
        const { name, image, email, website, phoneNumber } = this.state.user;
        
        return (
            <Fragment>
                <div className="card user-profile">
                    <div className="card-header user__header">
                        <h3 className='card-title'>
                            Post By
                        </h3>
                    </div>
                
                    <div className="card-body user__body">
                        <div className="user__image text-center">
                            <img src={image} alt="profile-avatar"/>
                        </div>
                            
                        <h5 className='user__title text-dark mb-1'>
                            { name }
                        </h5>
                        
                        { 
                            <p className='user-join text-center text-muted'>
                                Member since { (new Date(Date.now())).toLocaleDateString('en-US', 'short') }
                            </p>
                        }   
                        <div className="user__actions text-center">
                            <Link to={`/user/ads/${this.state.creator}`} className='btn btn-success btn-user-ads'>
                                See All ads
                            </Link>
                        </div>
                    </div>
    
                    <div className="card-body user__body">
                        <h5 className='card-title contact-title mb-2'>
                            Contact Info
                        </h5>
                        
                        <ul className="list-contact">
                            <li>
                                <i className="material-icons">
                                    alternate_email
                                </i>
                                
                                <span>
                                    { email }
                                </span>
                            </li>

                            {
                                phoneNumber ? 
                                <li>
                                    <i className="material-icons">
                                        phone
                                    </i>
                                    
                                    <span>
                                        { phoneNumber }
                                    </span>
                                </li>

                                : '' 
                                
                            }

                            {
                                website? 
                                    <li>
                                        <i className="material-icons">
                                            link
                                        </i>
                                        
                                        <span>
                                            { website }
                                        </span>
                                    </li>
                                : ''
                                
                            }
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
                        <div className="user-actions d-flex">
                            <button className='btn btn-primary btn-sm'>
                                <i className="material-icons">
                                    send    
                                </i>
        
                                Chat
                            </button>
        
                            <button className='btn btn-success btn-sm'>
                                <i className="material-icons">
                                    face
                                </i>
        
                                Contact Me
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default UserProfile;