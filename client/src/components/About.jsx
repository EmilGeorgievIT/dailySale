import React, { Component, Fragment } from 'react';
import { Intro } from '../components/shared/Intro';
import backgroundImage from '../images/banner2.jpg';
import '../styles/Sections.scss';
import HowItWorks from './HowItWorks';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }
    render() {
        const imageBanner = {
            backgroundImage: `url(${backgroundImage})`
        }
        return(
            <Fragment>
                <Intro
                title='About Us'
                image={imageBanner}
                />
                
                <section className="section-about">
                    <div className="container">
                        <div className="section__body">
                            <div className="section__entry">
                                <h3>
                                    Why DailySale ?
                                </h3>

                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis ducimus dolore similique inventore. Quam quidem cumque nulla mollitia corporis voluptate, voluptatem accusantium ipsum alias quibusdam omnis commodi fuga dolorem non.
                                </p>

                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis ducimus dolore similique inventore. Quam quidem cumque nulla mollitia corporis voluptate, voluptatem accusantium ipsum alias quibusdam omnis commodi fuga dolorem non.
                                </p>

                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis ducimus dolore similique inventore. Quam quidem cumque nulla mollitia corporis voluptate, voluptatem accusantium ipsum alias quibusdam omnis commodi fuga dolorem non.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <HowItWorks/>
            </Fragment>
        );
    }
}

export default About;