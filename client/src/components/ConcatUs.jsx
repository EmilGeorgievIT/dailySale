import React, { Component, Fragment } from 'react';
import contactImage from '../images/Contact-us-image.jpg';
import { Intro } from '../components/shared/Intro'; 
import '../styles/Boxes.scss';
import '../styles/Forms.scss';
import '../styles/List.scss';
import '../styles/Sections.scss';


class ContactUs extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            email: '',
            message: ''
        }
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name] : target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();

        console.log(this.state);
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
                                                        <i class="material-icons">phone</i>
                                                        
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
                                                        <i class="material-icons">access_time</i>
                                                        
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
                                                        <i class="material-icons">email</i>
                                                        
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
                                        <form className='form-auth form-contacts' onSubmit={this.handleSubmit}>
                                            <div className="form__head">
                                                <h4 className='form__title text-center'>
                                                    Contact Form
                                                </h4>
                                            </div>
                                            
                                            <div className="form__body">
                                                <div className="form-group">
                                                    <input type="text" name='name' className="form-control" id="exampleInputName" aria-describedby="emailHelp" onChange={this.handleChange} value={name} placeholder="Your name"/>                    
                                                </div>
                                                
                                                <div className="form-group">        
                                                    <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.handleChange} value={email} placeholder="Email Address"/>
                                                    
                                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                </div>

                                                <div className="form-group">
                                                
                                                    <textarea name='message' className="form-control" 
                                                    placeholder="Message" 
                                                    onChange={this.handleChange} value={message}id="message" rows="3">
                                                    </textarea>
                                                </div>

                                                <div className="form__actions">
                                                    <button type="submit" className="btn btn-block btn-primary">Send message</button>
                                                </div>
                                            </div>
                                        </form>
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