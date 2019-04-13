import React from 'react';
import { Link } from 'react-router-dom';

const PostDetails = ({ title, content, _id}) => (
    <div className='post'>
        <h3>
            { title }
        </h3>
        
        <p>
            { content }    
        </p>
        
        <Link to={`feed/post/${_id}`} type='button' className='btn btn-primary'>
            Show Post
        </Link>
    </div>
)
export default PostDetails;