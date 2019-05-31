import React from 'react';
import '../../styles/Sections.scss';
import '../../styles/Hero.scss';

export const Intro = ({title, subTitle, image, children}) => (
    <div className='section-hero' style={image}>
        <div className="container container--small">
            <div className="section__head">
                <h1 className='section__title'>
                    {title}
                </h1>

                <p className='section__subtitle'>
                    { subTitle  }
                </p>
                
                {
                    children
                }
            </div>
        </div>
    </div>
) 