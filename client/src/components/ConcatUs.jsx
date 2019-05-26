import React, { Component, Fragment } from 'react';
import contactImage from '../images/Contact-us-image.jpg';
import { Intro } from '../components/shared/Intro'; 

class ContactUs extends Component {
    render() {
        const backgroundImage = {
            backgroundImage: `url(${contactImage})`
        }
        return (
            <Fragment>
                <Intro 
                title='Contact Us'
                image={backgroundImage}
                />

                <section className="section-contacts">
                    <div className="container">
                        <div className="section__body">
                            <div className="row">
                                <div className="col-lg-7 col-xl-8 col-md-12 d-block">
                                    <div className="section__content">

                                    </div>
                                </div>

                                <div className="col-lg-5 col-xl-4 col-md-12 d-block mb-7">
                                    <div className="section__aside">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default ContactUs;