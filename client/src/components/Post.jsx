import React, { Component, Fragment } from 'react';
import PostService from '../services/posts-service';
import Posts from './Posts';
import '../styles/Sections.scss';
import '../styles/Posts.scss';
import Slider from "react-slick";
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';


const override = css`
    display: block !important;
    margin: 0 auto;
`;

class Post extends Component {
    static service = new PostService();
    state = {
        posts: [],
        isLoading: true
    }
    
    render() {
     const { posts, isLoading } = this.state;
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
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
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                dots: false,
                centerMode: false,
                slidesToScroll: 1
              }
            }
          ]
      };
    
    if(isLoading) {
        return(
            <ClipLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={this.state.loading}
            />
        )
    };
    return (
        <Fragment>
            <section className='section-posts'>
                <div className='container'>
                    <div className="section__head">
                        <h1 className="section__title text-center">
                            Latest Ads
                        </h1>    
                    </div>
                    
                    <div className="section__bod d-flex">
                        <Slider {...settings}>
                            {   
                                posts.map(post => (
                                <Posts key={post._id} {...post} />
                                ))
                            }
                        </Slider>
                    </div>
                </div>
            </section>
        </Fragment>
        );
    }

    async componentDidMount() {
        try {
            const posts = await Post.service.getPosts();
            
            this.setState({ 
                posts,
                isLoading: false
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default Post;