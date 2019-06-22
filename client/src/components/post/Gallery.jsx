import React, { Fragment } from 'react';
import '../../styles/Gallery.scss';

const Gallery = ({title, postDate, location, category, imageBackground, viewCount, price, favorite}) => (
    <Fragment>
        <div className="card gallery">
            <div className="gallery__head">
                <h3 className='gallery-title'>
                    { title }
                </h3>
                
                <div className="gallery__meta">
                    <ul className="d-flex list-meta">
                        <li>
                            <i className="material-icons">category</i> 
                            
                            <span>
                                { category }
                            </span>    
                        </li>

                        <li>
                            <i className="material-icons">location_on</i> 
                            
                            <span>
                                { location }
                            </span>    
                        </li>

                        <li>
                            <i className="material-icons">calendar_today</i> 
                            
                            {
                                <span> 
                                    { (new Date(postDate)).toLocaleDateString('en-US', 'short') }
                                </span> 
                            }           
                        </li>

                        <li>
                            <i className="material-icons">visibility</i> 
                            
                            <span>
                                { viewCount }
                            </span>    
                        </li>

                        <li>
                            <i className="material-icons">favorite</i> 
                            
                            <span>
                                { favorite }
                            </span>    
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="gallery__body">
                <div style={imageBackground} className="gallery__image">
                    <span className='gallery__price'>
                        <i className="material-icons">euro_symbol</i>
                        
                        { price }
                    </span>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Gallery;
