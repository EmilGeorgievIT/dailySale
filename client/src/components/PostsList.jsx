import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/List.scss';

class PostsList extends Component {

    render() {
        const { _id, image, price, title, location, date } = this.props;
        
        const postImage = {
            width: "100%",
            backgroundPosition: 'center center',
            backgroundRepaet: 'no-repeat',
            position: 'absolute',
            left: 0,
            top: 0,
            backgroundSize: 'cover',
            height: "100%",
            backgroundImage: "url(" + `data:image/jpeg;base64,${image}` + ")"
        };

        return(
            <div className='post-list'>
                <Link to={`/post/${_id}`}>
                    <div className="post__inner">
                        <div className="post__head">
                            <div style={postImage}>
                            </div>
                        </div>
                    
                        <div className="post__body">
                            <div className="post__meta">
                                <h3 className='post__title'>
                                    { title }
                                </h3>
                                
                                <p className='post__price'>
                                    { price ? `${price}$` : '' }
                                </p>

                            </div>
                            
                            <div className="post__entry">
                                <div className="post__loaction">
                                    <strong>
                                        Location: 
                                    </strong>

                                    <span>
                                        { location }
                                    </span>
                                </div>
                                
                                <div className="post__date">
                                    <strong>
                                        Date: 
                                    </strong>
                                    
                                    <span>
                                        { (new Date(date)).toLocaleDateString('en-US', 'short') }
                                    </span>
                                </div>
                            </div>
                        </div>          
                    </div>
                </Link>
            </div>
        )
    }
}

export default PostsList;