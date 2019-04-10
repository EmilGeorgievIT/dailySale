import React from 'react';
import { Link } from 'react-router-dom';

const PostDetails = ({ title, content, _id}) => (
    <div>
        <h1>
            { title }
        </h1>
        
        <p>
            { content }    
        </p>
        
        <Link to={`feed/post/${_id}`} type='button' className='btn btn-primary'>
            Show Post
        </Link>
    </div>
)
export default PostDetails;