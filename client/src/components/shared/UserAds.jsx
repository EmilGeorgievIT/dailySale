import '../../styles/Sections.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import User from '../post/User';
import PostsList from './../PostsList';
import ProfileService from '../../services/profile-service';
import PostService from '../../services/posts-service';
import UserProfile from '../post/UserProfile';


export default class UserAds extends Component {
    static service = new ProfileService();
    static getPost = new PostService();

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            posts: [],
            isTop: false
        }
    }
    async componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

        try {
            let userId = this.props.match.params.userId;
            const user = await UserAds.service.getUserDetails(userId)
            .then((user) => {
                this.setState({user});
                let postsRes = [];
                
                const { posts } = user;
                
                 posts.map(async (item)  => {
                    const post = await UserAds.getPost.getPostById(item)
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
        }
    }

    render() {
        const { phone, _id } = this.state.user;
        
        return (
            <section className="section-post-details">
                <div className="container">
                    <div className="section__inner">
                        <div className="section__content">
                        {   
                            this.state.posts ? 
                                this.state.posts.map((post) => (
                                    <PostsList className='ads' key={post._id} {...post} />
                                    )
                                ) : 'No ads'
                        }
                        </div>

                        <div className='section__aside'>
                            <UserProfile
                                creator={_id} 
                                joined='1555536805497'
                                phone={phone ? phone: '23235'} 
                                website='www.test.com'
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
} 