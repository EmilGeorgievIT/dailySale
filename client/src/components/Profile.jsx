import React, { Component } from 'react';
import ProfileService from '../services/profile-service';
import ProfileDetails from '../components/ProfileDetails';
import '../styles/Profile.scss';

export default class Profile extends Component {
    static service = new ProfileService();
    
    constructor(props) {
        super(props);
        
        this.state = {
            user: ''
        }
    }

    
    render() {
        const { email, image, location, phoneNumber, posts, name } = this.state.user;
        
        return (
            <div className="profile">
                <div className='container'>
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <div className='profile__image'>
                                <img src={`data:image/jpeg;base64,${image}`} alt=""/>
                            </div>

                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a className="nav-link active" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                    My Profile
                                </a>
                            
                                <a className="nav-link" id="v-pills-ads-tab" data-toggle="pill" href="#v-pills-ads" role="tab" aria-controls="v-pills-ads" aria-selected="false">
                                    My Ads
                                </a>
                            
                                <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                                    My Messages
                                </a>
                                
                                <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                                    Settings
                                </a>
                            </div>
                        </div>

                        <div className="col-12 col-sm-8">
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                    <ProfileDetails 
                                    email={email}
                                    location={location}
                                    phoneNumber={phoneNumber}
                                    name= {name}
                                    />
                                </div>

                                <div className="tab-pane fade" id="v-pills-ads" role="tabpanel" aria-labelledby="v-pills-ads-tab">
                                    ...
                                </div>

                                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                    ...
                                </div>
                                
                                <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                    ...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    async componentDidMount() {
        try {
            const userId = sessionStorage.getItem('ds_chk_temp');
            const user = await Profile.service.getUserDetails(userId);
            
            this.setState({user});
            
            console.log(this.state);

        } catch(error) {
            console.log(error);
        };
    }
}