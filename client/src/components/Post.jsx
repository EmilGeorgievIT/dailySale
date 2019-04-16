import React, { Component } from 'react';
import Loading from './shared/Loading';
import PostService from '../services/posts-service';
import PostDetails from './PostDetails';
import '../styles/Posts.scss';

class Post extends Component {
    state = {
        posts: [],
        isLoading: false
    }
    static service = new PostService();

    render() {
     const { posts, isLoading } = this.state;
    
    if (isLoading) { 
        return <Loading />
    }
    
    return (
        <section className='section-posts'>
            <div className='container'>
                <div className="section__head">
                    <h4 className="section__title">
                        Promo Ad
                    </h4>    
                </div>
                
                <div className="section__bod d-flex">
                    {
                        posts.map(post => (
                        <PostDetails key={post._id} {...post} />
                        ))
                    }
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