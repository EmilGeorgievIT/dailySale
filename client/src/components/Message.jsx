import React from 'react';

 const Message = ({id, name, image, message}) => (
    <div>
        <p>
            { image }
        </p>

        <p>
            { name }
        </p>
        <p>
            { message }
        </p>
    </div>
);

export default Message;