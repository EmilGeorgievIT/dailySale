import '../../styles/Sections.scss';

import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import User from '../post/User';
import PostsList from './../PostsList';
import ProfileService from '../../services/profile-service';
import PostService from '../../services/posts-service';
import UserProfile from '../post/UserProfile';
import { Intro } from '../shared/Intro';
import { css } from '@emotion/core';
import { DotLoader } from 'react-spinners';


const override = css`
    display: block !important;
    margin: 0 auto;
`;

export default class UserAds extends Component {
    static service = new ProfileService();
    static getPost = new PostService();

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            posts: [],
            isLoading: true,
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
                    this.setState({ 
                        posts: postsRes,
                        isLoading: false
                    })
                }, 500)
            })
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        const { phone, _id } = this.state.user;
        
        if (this.state.isLoading) {
            return(
                <DotLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            )
        }
        return (
            <Fragment>
                <Intro 
                    title='All posts'
                />
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
            </Fragment>
        );
    }
} 