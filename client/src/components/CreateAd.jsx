import React, { Component, Fragment } from 'react'
import '../styles/Sections.scss';
import '../styles/Forms.scss';
import '../styles/List.scss';
import '../styles/Card.scss';
import PostService from '../services/posts-service';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { Intro } from './shared/Intro';
import bannerImage from  '../images/banner2.jpg';



class CreateAd extends Component {
    static service = new PostService();

    state = {
        items: [
            { name: 'House & DIY' , icon: 'home' },
            { name: 'Animals', icon: 'pets' },
            { name: 'Electronics', icon: 'phonelink' } ,
            { name: 'Sports & Hobbies', icon: 'accessibility_new' },
            { name: 'Clothes & Lifestyle', icon: 'face'},
            { name: 'Farming', icon: 'spa'},
            { name: 'Baby & Kinds', icon: 'child_care'},
            { name: 'Cars & Motor', icon: 'drive_eta'},
            { name: 'Business', icon: 'business'},
            { name: 'Holidays & Tickets', icon: 'beach_access'},
            { name: 'Lost & Found', icon: 'sentiment_dissatisfied'},
            { name: 'Music & Education', icon: 'music_note'},
            { name: 'Other', icon: 'more'},
            { name: 'Property', icon: 'store'},
            { name: 'Work', icon: 'work'},
        ],
        submitted: false,
        title: '',
        category: '',
        price: '',
        condition: '',
        description: '',
        location: '',
        phoneNumber: '',
        email: '',
        image: ''
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const { 
            title,
            category,
            image,
            price,
            phoneNumber,
            description,
            location,
            email,
            condition 
        } = this.state;
        

        try {
            let res =CreateAd.service.createPost(
                {
                    title,
                    category,
                    image,
                    price,
                    phoneNumber,
                    description,
                    location,
                    email,
                    condition
                }
            )
            res
                .then(data => {
                    this.setState({
                        submitted: true
                    })
                    console.log(data);
                })
                .catch(error => {
                    console.log(error);
                })
        } catch(error) {
            console.log(error);
        }
        console.log(this.state);
    }

    handleImage = (e) => {
        let files = e.target.files;

        for (var i = 0; i < files.length; i++) {
          let file = files[i];
          let reader = new FileReader();

          reader.readAsDataURL(file);
          reader.onload = () => {
            this.setState({
                image: reader.result
            })
          }
        }
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name] : target.value
        });
    }
    changeCategory =({target}) => {
        this.setState({
            [target.name] : target.value.replace(' & ', 'and').toLowerCase()
        });
    }
  render() {
    const { items, submitted } = this.state; 

    if(!this.props.auth.isAuthenticated) {
        return(
            <Redirect to='/login' />
        )
    }

    if(submitted) {
        return(
            <Redirect to='/' />
        )
    }
    const imageBackground = {
        backgroundImage: `url(${bannerImage})`
    };

    return (
        <Fragment>
            <Intro
            title='Ad Post'
            image={imageBackground} />

            <div className='section-create-ad'>
                <div className="container">
                    <div className="section__body">
                        <div className="row">
                            <div className="col-lg-8 col-md-12">
                                <div className="section__content">
                                    <form className='form-add card' onSubmit={this.handleSubmit}>
                                        <div className="form__head card-header">
                                            <h4 className='card-title'>
                                                Add post
                                            </h4>
                                        </div>
                                        
                                        <div className="from__body card-body">
                                            <div className="form-row">
                                                <div className="form-group col">
                                                    <label htmlFor="title">Ad Title *</label>
                                                    
                                                    <input onChange={this.handleChange} type="text" className="form-control" id="title" name='title' placeholder="Title" required/>
                                                    
                                                    <div className="invalid-tooltip">
                                                        Please provide title.
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="form-row ">
                                                <div className="form-group col">
                                                    <label htmlFor="category-select">Category *</label>
                                                    
                                                    <select id='category-select' name='category' onChange={this.changeCategory} className="custom-select">
                                                        {
                                                            items.map((item, index) =>
                                                                <option key={index}>
                                                                    {item.name}
                                                                </option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        
                                            <div className="form-row">
                                                <div className="form-group col-md-6 col-sm-12">
                                                    <label htmlFor="price">Price *</label>

                                                    <input onChange={this.handleChange} type="text" className='form-control' placeholder='0$' name="price" id="price"/>   
                                                </div>

                                                <div className="form-group col-md-6 col-sm-12">
                                                    <label htmlFor="condition">Condition *</label>
                                                    
                                                    <select onChange={this.handleChange} name='condition' id='condition-select'  className="custom-select">
                                                        <option name='condition'>New</option>
                                                        <option name='condition'>Used</option>
                                                    </select>   
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col">
                                                    <label htmlFor="description">Description *</label>

                                                    <textarea onChange={this.handleChange} className="form-control" id="description" name='description' placeholder='text here..' rows="3" required>
                                                    </textarea>   
                                                </div>
                                            </div>
                                            
                                            <div className="form-row">
                                                <div className="form-group col-md-6 col-sm-12">
                                                    <label htmlFor="location">Location *</label>
                                                    
                                                    <input onChange={this.handleChange} type="text" name="location" id="location" placeholder='Ireland' className='form-control' />
                                                </div>

                                                <div className="form-group col-md-6 col-sm-12">
                                                    <label htmlFor="phone">Phone Number *</label>
                                                    
                                                    <input onChange={this.handleChange} type="text" name="phoneNumber" id="phone" placeholder='083XXXXXXX' className='form-control' />
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col">
                                                    <label htmlFor="email">Email *</label>
                                                    
                                                    <input onChange={this.handleChange} type="email" name="email" placeholder='example@gmail.com' id="email" className='form-control' />
                                                </div>
                                            </div>
                                            
                                            <div className="form-row">
                                                <div className="custom-file">
                                                    <input onChange={this.handleImage} type="file" className="custom-file-input" name='image' id="validatedCustomFile" required />

                                                    <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                                                    
                                                    <div className="invalid-feedback">
                                                        Image format is invalid
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                        <div className="form-actions card-footer">
                                            <button type="submit" className="btn btn-primary">
                                                Submit now
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12">    
                                <div className="section__aside">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className='card-title'>
                                                Terms and Conditions
                                            </h4>
                                        </div>

                                        <div className="card-body">
                                            <ul className="list-terms list-unstyled widget-spec  mb-0"> 
                                                <li> 
                                                    <i className="material-icons">check</i>
                                                    Money Not Refundable 
                                                </li>

                                                <li> 
                                                    <i className="material-icons">check</i>
                                                    
                                                    You can renew your Premium ad after experted. 
                                                </li>

                                                <li> 
                                                    <i className="material-icons">check</i>

                                                    Premium ads are active for depend on package. 
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className='card-title'>
                                                Benefits of Premium Ad
                                            </h4>
                                        </div>

                                        <div className="card-body">
                                            <ul className="list-terms list-unstyled widget-spec  mb-0"> 
                                                <li> 
                                                    <i className="material-icons">check</i>
                                                    Premium Ads Active
                                                </li>

                                                <li> 
                                                    <i className="material-icons">check</i>
                                                    
                                                    Premium ads are displayed on top 
                                                </li>

                                                <li> 
                                                    <i className="material-icons">check</i>

                                                    Premium ads will be show in Google results 
                                                </li>

                                                <li> 
                                                    <i className="material-icons">check</i>

                                                    Premium ads Active 
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className='card-title'>
                                                Safety Tips For Buyers 
                                            </h4>
                                        </div>

                                        <div className="card-body">
                                            <ul className="list-terms list-unstyled widget-spec  mb-0"> 
                                                <li> 
                                                    <i className="material-icons">check</i>
                                                    Meet Seller at public Place
                                                </li>

                                                <li> 
                                                    <i className="material-icons">check</i>
                                                    
                                                    Check item before you buy 
                                                </li>

                                                <li> 
                                                    <i className="material-icons">check</i>

                                                    Pay only after collecting item 
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>      
    )
  }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(CreateAd);
