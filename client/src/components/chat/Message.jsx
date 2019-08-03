import React from 'react';
import '../../styles/Message.scss';
import profileImage from  '../../images/avatar.png';

 const Message = ({id, date, image}) => (
    <div className='message'>
        <div className="message__content">
            <div className="message__time">
                10:04
            </div>

            <div className="message__entry">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, voluptates.
                </p>
            </div>
            
            <div className="message__image">
                <img src={profileImage} alt=""/>
            </div>
        </div>
    </div>
);

export default Message;