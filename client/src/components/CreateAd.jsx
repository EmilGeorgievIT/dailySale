import React, { Component } from 'react'
import '../styles/Sections.scss';
import '../styles/Forms.scss';
import PostService from '../services/posts-service';
import { Redirect } from 'react-router-dom';

export default class CreateAd extends Component {
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
        submited: false,
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
    hadleSumbit = (event) => {
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
                        submited: true
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
  render() {
    const { items, submited } = this.state; 

    if(submited) {
        return(
            <Redirect to='/' />
        )
    }
    return (
      <div className='section-create-ad'>
          <div className="container">
            <div className="section__head">
                <h3>
                    Add new ad
                </h3>
            </div>
            
            <div className="section__body">
                <form className='form-add' onSubmit={this.hadleSumbit}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="title">Title</label>
                            
                            <input onChange={this.handleChange} type="text" className="form-control" id="title" name='title' placeholder="Title" required/>
                            
                            <div className="invalid-tooltip">
                                Please provide title.
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-row ">
                        <div className="form-group col">
                            <label htmlFor="category-select">Category</label>
                            
                            <select id='category-select' name='category' onChange={this.handleChange} className="custom-select">
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
                            <label htmlFor="price">Price</label>

                            <input onChange={this.handleChange} type="text" className='form-control' name="price" id="price"/>   
                        </div>

                        <div className="form-group col-md-6 col-sm-12">
                            <label htmlFor="condition">Condition</label>
                            
                            <select onChange={this.handleChange} name='condition' id='condition-select'  className="custom-select">
                                <option name='condition'>New</option>
                                <option name='condition'>Used</option>
                            </select>   
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="description">Description</label>

                            <textarea onChange={this.handleChange} className="form-control" id="description" name='description' rows="3" required>
                            
                            </textarea>   
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-6 col-sm-12">
                            <label htmlFor="location">Location</label>
                            
                            <input onChange={this.handleChange} type="text" name="location" id="location" className='form-control' />
                        </div>

                        <div className="form-group col-md-6 col-sm-12">
                            <label htmlFor="phone">Phone Number</label>
                            
                            <input onChange={this.handleChange} type="text" name="phoneNumber" id="phone" className='form-control' />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="email">Email</label>
                            
                            <input onChange={this.handleChange} type="email" name="email" id="email" className='form-control' />
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
                    
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            Add
                        </button>
                    </div>
                </form>
            </div>
          </div>
      </div>
    )
  }
}
