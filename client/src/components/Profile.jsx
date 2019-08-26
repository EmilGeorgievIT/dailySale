import React, { Component, Fragment } from 'react';
import ProfileService from '../services/profile-service';
import PostService from '../services/posts-service';
import ProfileDetails from '../components/ProfileDetails';
import { Redirect } from 'react-router-dom';
import Posts from '../components/Posts';
import { Intro } from '../components/shared/Intro';
import '../styles/Profile.scss';
import '../styles/Navigation.scss';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import banner from '../images/banner.jpg';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import FavoriteService from '../services/favorite-service';
<<<<<<< HEAD
import PostsEdit from '../components/PostsEdit'
=======
import Chat from '../components/chat/Chat';
>>>>>>> 730c5f33aa2891daaa53378591d67a591217ff2a

class Profile extends Component {
    static service = new ProfileService();
    static getPost = new PostService();
    static favoritePosts = new FavoriteService();
    _isMounted = false;
    
    constructor(props) {
        super(props);
        
        this.state = {
            user: '',
            image: '',
            posts: [],
            favorites: []
        }
    }

    handleImage = (e) => {
        let files = e.target.files;

        for (var i = 0; i < files.length; i++) {
          let file = files[i];
          let reader = new FileReader();

          reader.readAsDataURL(file);
          reader.onload = () => {
            this.setState({
                user: {
                    image: reader.result
                } 
            })
            Profile.service.updateProfileImage(localStorage.getItem('ds_chk_temp'), {
                image: reader.result
            })
            .then(data => {
                NotificationManager.success('Success', 'Successfully uploaded image', 3000);
            }, error => {
                NotificationManager.error('Something went wrong !', 'Image not uploaded', 3000);
            })
          }
        }
    }

   async componentDidMount() {
       this._isMounted = true;
        
       if(this._isMounted) {
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
                               if (postData !== null) {
                                   postsRes.push(postData);
                                   this.setState({ posts: [...postsRes] })
                               }
                           }).catch((error) => {
                               console.log(error);
                           })                    
                       return postsRes;
                   })
   
               })
   
               const favoritePosts = await Profile.favoritePosts.getFavorites(userId)
               .then(async (favorite) => {
                   let postsFavoriteRes = [];
                   
                   favorite.map(async (item)  => {
                       const post = await Profile.getPost.getPostById(item.postId)
                           .then((res) => {
                               const postData = res;
                               if (postData !== null) {
                                   postsFavoriteRes.push(postData);
                                   this.setState({ favorites: [...postsFavoriteRes] })
                               }
                           }).catch((error) => {
                               console.log(error);
                           })
                       return postsFavoriteRes;
                   });                    
               })                
           } catch(error) {
               console.log(error);
           };
       }
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { email, image, location, website, phoneNumber, name, receivedMessages, sentMessages } = this.state.user;

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
                            <div className="col-12 col-sm-3">
                                <div className="profile__aside">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">
                                                My Dashboard
                                            </h3>
                                        </div>
                                        
                                        <div className='profile__image'>
                                            <img src={image} alt=""/>

                                            <input type="file" onChange={this.handleImage} className="change-image" id="image"/>
                                             
                                            <div className="profile__image-hover">
                                                <i className="material-icons">camera_alt</i>
                                            </div>
                                        </div>

                                        <h5 className='mb-3 text-center font-weight-semibold'>
                                            { name }
                                        </h5>
                                        
                                        <div className="nav flex-column nav-pills nav-profile" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                            <a className="nav-link active" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                                <i className="material-icons">person</i> Edit Profile
                                            </a>
                                        
                                            <a className="nav-link" id="v-pills-ads-tab" data-toggle="pill" href="#v-pills-ads" role="tab" aria-controls="v-pills-ads" aria-selected="false">
                                                <i className="material-icons">business</i>
                                                My Ads
                                            </a>

                                            <a className="nav-link" id="v-pills-ads-tab" data-toggle="pill" href="#v-pills-favorite" role="tab" aria-controls="v-pills-favorite" aria-selected="false">
                                                <i className="material-icons">favorite</i>
                                                
                                                My Favorite
                                            </a>
                                            
                                            <a className="nav-link" id="v-pills-edit-tab" data-toggle="pill" href="#v-pills-edit" role="tab" aria-controls="v-pills-edit" aria-selected="false">
                                                <i className="material-icons">edit</i>
                                                
                                                Edit My Ads
                                            </a>

                                            <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                                                <i className="material-icons">message</i>
                                                
                                                My Messages
                                            </a>
                                            
                                            <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                                                <i className="material-icons">settings</i>
                                                
                                                Settings
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-sm-9">
                                <div className="profile__content ">
                                    <div className="tab-content card" id="v-pills-tabContent">
                                        <div className="card-header">
                                            <h3 className="card-title">
                                                My Profile
                                            </h3>
                                        </div>

                                        <div className="card-body">
                                            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                                <ProfileDetails 
                                                email={email || ''}
                                                website= {website || ''}
                                                location={location || ''}
                                                phoneNumber={phoneNumber || ''}
                                                name= {name || ''}
                                                />
                                            </div>

                                            <div className="tab-pane tab-pane-ads fade justify-content-flex-start d-flex flex-wrap" id="v-pills-ads" role="tabpanel" aria-labelledby="v-pills-ads-tab">
                                                {   
                                                    this.state.posts !== null && this.state.posts !== undefined  ? 
                                                        this.state.posts.map((post) => (
                                                            <Posts className='ads' key={post._id} {...post} />
                                                            )
                                                        ) : 'No ads'
                                                }
                                            </div>

                                            <div className="tab-pane tab-pane-ads fade justify-content-flex-start d-flex flex-wrap" id="v-pills-favorite" role="tabpanel" aria-labelledby="v-pills-favorite-tab">
                                                {   
                                                    this.state.favorites !== null && this.state.favorites !== undefined ? 
                                                        this.state.favorites.map((favorite) => (
                                                            <Posts className='ads' key={favorite._id} {...favorite} />
                                                            )
                                                        ) : 'No ads'
                                                }
                                            </div>
                                            
                                            <div className="tab-pane tab-pane-edit fade justify-content-flex-start d-flex flex-wrap" id="v-pills-edit" role="tabpanel" aria-labelledby="v-pills-edit-tab">
                                                {   
                                                    this.state.posts !== null && this.state.posts !== undefined  ? 
                                                        this.state.posts.map((post) => (
                                                            <PostsEdit className='ads' key={post._id} {...post} />
                                                            )
                                                        ) : 'No ads'
                                                }
                                            </div>

                                            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                                <Chat 
                                                    received = { receivedMessages }
                                                    sent  = { sentMessages }
                                                />
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
                </div>
                
                <NotificationContainer/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Profile);
