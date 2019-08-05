import React from 'react';
import '../../styles/Chat.scss';
import profileImage from  '../../images/avatar.png';
import '../../styles/List.scss';

const UserMessage = ({_id, creatorName, description, date}) => (
    <div className="user-chat">
        <div className="user__body">
            <div className="user__aside">
                <div className="user__image">
                    <img src={profileImage} alt="avatar"/>
                </div>
            </div>
        
            <div className="user__content">
                <div className="user__meta">
                    <h3 className='user__title'>
                        {creatorName}
                    </h3>
                    
                    <div className="user__date">
                        <span>
                        { (new Date(date)).toLocaleDateString('en-US', 'short') }
                        </span>
                    </div>
                </div>
                
                <div className="user__entry">
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default UserMessage;