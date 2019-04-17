import React from 'react';
import { Link } from 'react-router-dom';

const PostDetails = ({ title, image, description, _id, price}) => (
    <div className='post'>
        <div className="post__head">
            <div className="post__image">
                <img src={`data:image/jpeg;base64,${image}`} alt=""/>
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

        <p>
            { description }    
        </p>
        
        <Link to={`feed/post/${_id}`} type='button' className='btn btn-primary'>
            Show Post
        </Link>
    </div>
)
export default PostDetails;