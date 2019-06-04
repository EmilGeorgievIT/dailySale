import React from 'react';

const Comment = ({id, image, date, time, name, location, comment}) => (
    <div className='card comment'>
        <div className="card-body comment__body">
            <div className="comment__aside">
                <div className="comment__image">
                    <img src={image} alt="avatar"/>
                </div>
            </div>

            <div className="comment__content">
                <div className="comment__meta">
                    <h5 className='comment__title'>
                        {name}
                    </h5>
                    
                    <ul className="list-meta">
                        <li>
                            <i className="material-icons">calendar_today</i>
                            
                            {
                                <span> 
                                    { (new Date(date)).toLocaleDateString('en-US', 'short') }
                                </span> 
                            }
                        </li>

                        <li>
                            <i className="material-icons">access_time</i>
                            
                            <span>
                                {time}
                            </span>
                        </li>

                        <li>
                            <i className="material-icons">location_on</i>
                            
                            <span>
                                {location}
                            </span>
                        </li>
                    </ul>
                </div>
                
                <div className="comment__description">
                    {comment}
                </div>
            </div>
        </div>
    </div>
);
export default Comment;