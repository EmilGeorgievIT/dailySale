import React from 'react';
import '../../styles/Comment.scss';

const Comment = ({phoneNumber}) => (
    <div className='comment-create card'>
        <div className="comment__head card-header">
            <h3 className="comment__title card-title">
                Leave a reply 
            </h3>
        </div>
        
        <div className="comment__body card-body">
            <form>
                <div className="from-group">
                    <input type="text" name='name' className="form-control" placeholder='Your name' />
                </div>

                <div className="from-group">
                    <input type="email" name='email' className="form-control" placeholder='Email address' />
                </div>

                <div className="form-group">
                    <textarea className="form-control"
                    placeholder='Comment' name='comment' id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-sm">Send Reply</button>
            </form>
        </div> 
    </div>
)
export default Comment;