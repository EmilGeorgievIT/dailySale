import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Posts extends Component {

    render() {
        const { _id, image, price, title } = this.props;
        
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
            <div className='post'>
                <Link to={`/post/${_id}`}>
                    <div className="post__head">
                        <div style={postImage}>
                        </div>
                    </div>

                    <div className="post__body">
                        <div className="post__meta">
                            <h5 className='post__title'>
                                { title }
                            </h5>
                            
                            <p>
                                { price ? `${price}$` : '' }
                            </p>

                            {/* <span>
                                { (new Date(date)).toLocaleDateString('en-US', 'short') }
                            </span> */}
                        </div>
                    </div>          
                </Link>
            </div>
        )
    }
}

export default Posts;