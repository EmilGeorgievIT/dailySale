import React from 'react';
import '../styles/Sections.scss';
import { Link } from 'react-router-dom';
import banner from '../images/banner.jpg';
const backgroundImage = {
    backgroundImage: `url(${banner})`
}
const Promo = () => (
    <section className="section-promo" style={backgroundImage}>
        <div className="container">
            <div className="section__content">
                <h1>
                    Are you ready for the posting you ads on this Site?
                </h1>
                
                <p>
                   It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </p>
            
                <div className="section__actions">
                    <Link to='/create/ad' className='btn btn-primary'>
                        Free Post Ad
                    </Link>   
                </div>
            </div>
           
        </div>
    </section>
);
export default Promo; 