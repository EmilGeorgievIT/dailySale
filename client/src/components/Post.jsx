import React, { Component } from 'react';
import Loading from './shared/Loading';
import PostService from '../services/posts-service';
import PostDetails from './PostDetails';

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
    
    // if(!posts.length && !isLoading) {
    //     return (
    //         <div>
    //             <p> 
    //                 No posts !
    //             </p>
    //         </div>
    //     )
    //  }
    
        return (
                <div>
                    {
                        posts.map(post => (
                        <PostDetails key={post._id} {...post} />
                        ))
                    }
                </div>
            );
    }

    async componentDidMount() {
        try {
            const posts = await Post.service.getPosts();
            this.setState({ posts });
            console.log(posts);
        } catch (error) {
            console.log(error);
        }
    }
}

export default Post;