import React, { Component } from 'react';
import PostService from '../services/posts-service';

export default class PostDetails extends Component {
    static service = new PostService();

    constructor(props) {
        super(props)
        
        this.state = {
            name: '',
            image: '',
            location: '',
            date: '',
            price: '',
            description: ''
        }
    }
    async componentDidMount() {
        try {
            let postId = this.props.match.params.id;
            const post = await PostDetails.service.getPostById(postId);
            
            this.setState({ ...post })
        } catch(error) {
            console.log(error);
        }
    }
    
    render() {
        const { name, image, price, description, location } = this.state;

        return (
            <div className="container">
                <div className='post'>
                    <div className="post__head">
                        <div className="post__image">
                            <img src={`data:image/jpeg;base64,${image}`} alt=""/>
                        </div>
                    </div>

                    <div className="post__body">
                        <div className="post__meta">
                            <h5 className='post__title'>
                                { name }
                            </h5>
                            
                            <p>
                                { price ? `${price}$` : '' }
                            </p>

                            {/* <span>
                                { (new Date(date)).toLocaleDateString('en-US', 'short') }
                            </span> */}

                        </div>
                    </div>
                    
                    <p>
                        { location }
                    </p>
                    
                    <p>
                        { description }    
                    </p>
                </div>
            </div>
        );
    }
}
