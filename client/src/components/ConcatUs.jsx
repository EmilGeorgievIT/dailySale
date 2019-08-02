import React, { Component, Fragment } from 'react';
import contactImage from '../images/Contact-us-image.jpg';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Intro } from '../components/shared/Intro'; 
import '../styles/Boxes.scss';
import '../styles/Forms.scss';
import '../styles/List.scss';
import '../styles/Sections.scss';
import MessageService from '../services/message-service';

const messageSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    message: Yup.string()
      .min(10, 'Too Short!')
      .max(1000, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required')
});

class ContactUs extends Component {
    static service = new MessageService();
    constructor(props) {
        super(props);
        
        this.state = {
            submitted: '',
        }
    }

    render() {
        const backgroundImage = {
            backgroundImage: `url(${contactImage})`
        }
        const { email, name, message } = this.state;

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
                                <div className="col-lg-5 col-xl-4 col-md-12 d-block mb-7">
                                    <div className="section__aside">
                                        <ul className="list-contact-boxes">
                                            <li>
                                                <div className="box-contacts">
                                                    <div className="box__content">
                                                        <i className="material-icons">phone</i>
                                                        
                                                        <div className="box__entry">
                                                            <h5>
                                                                +353833617736
                                                            </h5>
                                                            
                                                            <p>
                                                                Free support
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="box-contacts box-contacts--blue">
                                                    <div className="box__content">
                                                        <i className="material-icons">access_time</i>
                                                        
                                                        <div className="box__entry">
                                                            <h5>
                                                                Mon-Sat(10:00 - 19:00)
                                                            </h5>
                                                            
                                                            <p>
                                                                Working hours
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="box-contacts box-contacts--orange">
                                                    <div className="box__content">
                                                        <i className="material-icons">email</i>
                                                        
                                                        <div className="box__entry">
                                                            <h5>
                                                                emil_georgiev_it@abv.bg
                                                            </h5>
                                                            
                                                            <p>
                                                                Support Us
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-lg-7 col-xl-8 col-md-12 d-block">
                                    <div className="section__content">
                                        <Formik
                                            initialValues={{
                                                name: '',
                                                message: '',
                                                email: '',
                                            }}
                                            validationSchema={messageSchema}

                                            onSubmit={(values, { resetForm}) => {
                                                const { 
                                                    name,
                                                    message,
                                                    email,
                                                } = values;
                                                
                                                
                                                try {
                                                    let res = ContactUs.service.sendMail(
                                                        {
                                                            name,
                                                            message,
                                                            email
                                                        }
                                                    )
                                                    res
                                                        .then(data => {
                                                            this.setState({
                                                                submitted: true
                                                            })
                                                            resetForm();
                                                            console.log(data);
                                                        })
                                                        .catch(error => {
                                                            console.log(error);
                                                        })
                                                        
                                                } catch(error) {
                                                    console.log(error);
                                                }
                                            }}
                                        >
                                        {({ errors, touched }) => (
                                            <Form className='form-auth form-contacts'>
                                                <div className="form__head">
                                                    <h4 className='form__title text-center'>
                                                        Contact Form
                                                    </h4>
                                                </div>

                                                <div className="from-group">
                                                    <Field className="form-control" id="name" placeholder="Your Name" name="name" required/>

                                                    {errors.name && touched.name ? (
                                                        <div className="invalid-feedback">{errors.name}</div>
                                                    ) : null}
                                                </div>

                                                <div className="from-group">
                                                    <Field type="email" name="email" placeholder='Email address' id="email" className='form-control' />
                                                        {errors.email && touched.email ? (
                                                            <div className='invalid-feedback'>{errors.email}</div>
                                                        ) : null}
                                                </div>

                                                <div className="form-group">
                                                    <Field component='textarea' className="form-control" id="message" name='message' placeholder='message' rows="3" required />
                                                        {errors.message && touched.message ? (
                                                            <div className='invalid-feedback'>{errors.message}</div>
                                                        ) : null}
                                                </div>
                                                {
                                                    this.state.submitted? (
                                                        <div className='alert alert-primary'>
                                                            Message sent successfully !
                                                        </div>
                                                    ) : ''
                                                    }
                                                <button type="submit" disabled={Object.keys(errors).length} className="btn btn-block btn-primary">Send Message</button>
                                            </Form>                             
                                        )}
                                        </Formik>
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