import React from 'react';
import '../../styles/Sections.scss';
import '../../styles/Hero.scss';

export const Intro = ({title, subTitle, children}) => (
    <div className='section-hero'>
        <div className="container">
            <div className="section__head">
                <h1 className='section__title'>
                    {title}
                </h1>

                <p>
                    { subTitle  }
                </p>
                
                {
                    children
                }
            </div>
        </div>
    </div>
) 