import React, { Component } from 'react';
import PostService from '../services/posts-service';
import PostsFeatured from './PostsFeatured';
import '../styles/Sections.scss';
import '../styles/Posts.scss';
import Slider from "react-slick";
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    text-align: center;
    margin: 0 auto;
`;

class PostFeature extends Component {
    static service = new PostService();
    _isMounted = false;

    state = {
        posts: [],
        isLoading: true
    }
    
    async componentDidMount() {
        this._isMounted = true;
        
        try {
            if (this._isMounted) {
                const posts = await PostFeature.service.getPosts();
                
                this.setState({ 
                    posts,
                    isLoading: false
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { posts, isLoading } = this.state;
        
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            initialSlide: this.state.posts.length,
            slidesToScroll: 4,
            responsive: [
                {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
                },
                {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '20px',
                    centerMode: false,
                    slidesToScroll: 2
                }
                },
                {
                breakpoint: 620,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '10px',
                    centerMode: true,
                    slidesToScroll: 1
                }
                }
            ]
        };
        if(isLoading) {
            return(
                <div className="loader">
                    <ClipLoader
                        css={override}
                        sizeUnit={"px"}
                        size={150}
                        color={'#123abc'}
                        loading={this.state.loading}
                    />
                </div>
                )
        };
        return (
            <section className='section-posts section-featured-posts'>
                <div className='container'>
                    <div className="section__head">
                        <h1 className="section__title text-center">
                            Featured Ads
                        </h1>
                    </div>
                    
                    <div className="section__bod d-flex">
                        <Slider {...settings}>
                            {   
                                posts
                                .map(post => (
                                <PostsFeatured key={post._id} {...post} />
                                ))
                            }
                        </Slider>
                    </div>
                </div>
            </section>
            );
    }
}

export default PostFeature;