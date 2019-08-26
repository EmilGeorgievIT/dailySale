import React from 'react';
import '../../styles/Message.scss';
import profileImage from  '../../images/avatar.png';

 const Message = ({id, date, description, image}) => (
    <div className='message'>
        <div className="message__content">
            <div className="message__time">
                { (new Date(date)).toLocaleDateString('en-US', 'short') }
            </div>

            <div className="message__entry">
                <p>
                    {description}
                </p>
            </div>
            
            <div className="message__image">
                <img src={profileImage} alt=""/>
            </div>
        </div>
    </div>
);

export default Message;