import React, { Component } from 'react';
import Loading from './shared/Loading';
import PostService from '../services/posts-service';
import Posts from './Posts';
import '../styles/Sections.scss';
import '../styles/Posts.scss';
import Slider from "react-slick";


class Post extends Component {
    static service = new PostService();
    state = {
        posts: [],
        isLoading: false
    }
    
    render() {
     const { posts, isLoading } = this.state;
    
    if (isLoading) { 
        return <Loading />
    }
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
                centerMode: true,
                slidesToScroll: 1
              }
            }
          ]
      };
    
    return (
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
        );
    }

    async componentDidMount() {
        try {
            const posts = await Post.service.getPosts();
            this.setState({ posts });
        } catch (error) {
            console.log(error);
        }
    }
}

export default Post;