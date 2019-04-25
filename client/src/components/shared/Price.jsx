import React from 'react';
import '../../styles/Price.scss';

const Price = ({price}) => (
    <div className='price'>
        <div className='price__content'>
            <span>
                Price: 
            </span>
            
            <strong>
                { price ? `${price}$` : '' }
            </strong>
        </div>   
    </div>
)

export default Price;