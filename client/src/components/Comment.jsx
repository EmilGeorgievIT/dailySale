import React from 'react';
import '../styles/Comment.scss';

const Comment = ({phone}) => (
    <div className='comment'>
        <div className="comment__head">
            <h4 className="comment__title">
                Send message to seller
            </h4>
            
            <div className="comment__meta">
                <a href={ `tel: ${phone}`}>
                    <div className="circle">
                        <i className="material-icons ico-phone">
                            phone
                        </i>
                    </div>

                    <strong className='phone'>
                        { phone }
                    </strong>
                </a>
            </div>

        </div>
        
        <div className="comment__body">
            <form action="">
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">
                        Content of the message
                    </label>
                    
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
        </div> 
    </div>
)
export default Comment;