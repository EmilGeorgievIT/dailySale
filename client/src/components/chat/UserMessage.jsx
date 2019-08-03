import React from 'react';
import '../../styles/Chat.scss';
import '../../styles/List.scss';

const UserMessage = ({_id, image, name, message, time}) => (
    <div className="user-chat">
        <div className="user__body">
            <div className="user__aside">
                <div className="user__image">
                    <img src={image} alt="avatar"/>
                </div>
            </div>
        
            <div className="user__content">
                <div className="user__meta">
                    <h3 className='user__title'>
                        {name}
                    </h3>
                    
                    <div className="user__time">
                        <span>
                            {time}
                        </span>
                    </div>
                </div>
                
                <div className="user__entry">
                    <p>
                        {message}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default UserMessage;