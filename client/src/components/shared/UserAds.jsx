import '../../styles/Sections.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import User from './User';
import Posts from './../Posts';
import ProfileService from '../../services/profile-service';
import PostService from '../../services/posts-service';


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

    handleScroll = (event) => {
        const el = document.getElementsByClassName('footer');
        const elOffsetTop = el[0].offsetTop;

        const isTop = window.scrollY >= 165 && window.scrollY <= elOffsetTop - window.innerHeight;
        
        if (isTop !== this.state.isTop) {
            this.setState({ isTop })
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
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
                                    <Posts className='ads' key={post._id} {...post} />
                                    )
                                ) : 'No ads'
                        }
                        </div>

                        <div className={this.state.isTop ? 'section__aside fixed' : 'section__aside'}>
                            <Link to='/message' className='btn-wide bg-blue mb-2'>
                                <i className="material-icons">send</i>
                                
                                <span className='btn-text'>
                                    Send message
                                </span>    
                            </Link>
                                        
                            <Link to='/message' className='btn-wide bg-blue'>
                                <i className="material-icons">phone</i>
                                
                                <span className='btn-text'>
                                    { phone? phone: '089xxxxxxx' }
                                </span>    
                            </Link>
                            
                            <User creator={_id}/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
} 