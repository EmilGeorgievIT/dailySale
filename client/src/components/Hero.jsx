import React from 'react';

const Hero = ({wellcomeMessage, children}) => (
    <div>
        <h1>
            { wellcomeMessage }
        </h1>
        { children }
    </div>
);
export default Hero;