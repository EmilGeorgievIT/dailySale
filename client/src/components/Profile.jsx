import React, { Component, Fragment } from 'react';
import ProfileService from '../services/profile-service';
import PostService from '../services/posts-service';
import ProfileDetails from '../components/ProfileDetails';
import { Redirect } from 'react-router-dom';
import Posts from '../components/Posts';
import { Intro } from '../components/shared/Intro';
import '../styles/Profile.scss';
import '../styles/Navigation.scss';
import banner from '../images/banner.jpg';
import Messages from './Messages';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';

class Profile extends Component {
    static service = new ProfileService();
    static getPost = new PostService();
    
    constructor(props) {
        super(props);
        
        this.state = {
            user: '',
            posts: ''
        }
    }
    
   async componentDidMount() {
        try {
            const userId = localStorage.getItem('ds_chk_temp');
            const user = await Profile.service.getUserDetails(userId)
            .then((user) => {
                this.setState({user});
                let postsRes = [];
                
                const { posts } = user;
                
                 posts.map(async (item)  => {
                    const post = await Profile.getPost.getPostById(item)
                        .then((res) => {
                            const postData = res;
                            postsRes.push(postData);
                        }).catch((error) => {
                            console.log(error)
                        })                    
                    return postsRes;
                })
                    
                setTimeout(()=> {
                    this.setState({ posts: postsRes })
                }, 500)
            })                
        } catch(error) {
                console.log(error);
        };
    }

    render() {
        const { email, image, location, phoneNumber, name } = this.state.user;
        const imageBackground = {
            backgroundImage: `url(${banner})`
        }

        if(!this.props.auth.isAuthenticated) {
            return (
                <Redirect to='/'/>
            )
        }
        return (
            <Fragment>
                <Intro
                    title="My dashboard"
                    image={imageBackground}
                />
                <div className="profile">
                    <div className='container'>
                        <div className="row">
                            <div className="col-12 col-sm-4">
                                <div className="profile__aside">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">
                                                My Dashboard
                                            </h3>
                                        </div>
                                        
                                        <div className='profile__image'>
                                            <img src={image} alt=""/>
                                        </div>

                                        <h5 className='mb-3 text-center font-weight-semibold'>
                                            { name }
                                        </h5>
                                        
                                        <div className="nav flex-column nav-pills nav-profile" id="v-pills-tab" role="tablist" aria-orientation="vertical">
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
                                </div>
                            </div>

                            <div className="col-12 col-sm-8">
                                <div className="profile__content ">
                                    <div className="tab-content card" id="v-pills-tabContent">
                                        <div className="card-header">
                                            <h3 className="card-title">
                                                Edit Profile
                                            </h3>
                                        </div>

                                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                            <ProfileDetails 
                                            email={email}
                                            location={location}
                                            phoneNumber={phoneNumber}
                                            name= {name}
                                            />
                                        </div>

                                        <div className="tab-pane tab-pane-ads fade d-flex flex-wrap" id="v-pills-ads" role="tabpanel" aria-labelledby="v-pills-ads-tab">
                                            {   
                                                this.state.posts ? 
                                                    this.state.posts.map((post) => (
                                                        <Posts className='ads' key={post._id} {...post} />
                                                        )
                                                    ) : 'No ads'
                                            }
                                        </div>

                                        <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                            <Messages />
                                        </div>
                                        
                                        <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                            ...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Profile);
