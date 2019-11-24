import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/List.scss';

class PostsList extends Component {
    render() {
        const { _id, image, price, title, description, location, date, view } = this.props;
        
        const postImage = {
            width: "100%",
            backgroundPosition: 'center center',
            backgroundRepaet: 'no-repeat',
            position: 'absolute',
            left: 0,
            top: 0,
            backgroundSize: 'cover',
            height: "100%",
            backgroundImage: "url(" + image + ")"
        };

        return(
            <div className={view === 'grid'? 'post-list post-list--grid': 'post-list'}>
                <Link to={`/post/${_id}`}>
                    <div className="post__inner">
                        <div className="post__head">
                            <div style={postImage}>
                            </div>
                        </div>
                    
                        <div className="post__body">
                            <div className="post__content">
                                <h5 className='post__title'>
                                    { title }
                                </h5>

                                <p>
                                    { location }
                                </p>

                                <div className="post__description">
                                    <p>
                                        { description? `${description.slice(0, 100)}...` : '' }
                                    </p>
                                </div>
                                
                                <div className="post__meta">
                                    <p className='post__location'>
                                        <span>
                                            <i className="material-icons">
                                                room
                                            </i>
                                        </span>

                                        { location }
                                    </p>

                                    <p className='post__date'>
                                        <span>
                                            <i className="material-icons">
                                                calendar_today
                                            </i>
                                        </span>

                                        { (new Date(date)).toLocaleDateString('en-US', 'short') }
                                    </p>
                                </div>
                            </div>
                            
                            <div className="post__foot">
                                <p className='post__price'>
                                    { price ? `$${price}` : '' }
                                </p>
                            </div>
                        </div>          
                    </div>
                </Link>
            </div>
        )
    }
}

export default PostsList;