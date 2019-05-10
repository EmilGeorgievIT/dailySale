import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostsFeatured extends Component {
    state = ({
        items: [
            { name: 'housediy' , icon: 'home' },
            { name: 'animals', icon: 'pets' },
            { name: 'electronics', icon: 'phonelink' } ,
            { name: 'sportsHobbies', icon: 'accessibility_new' },
            { name: 'clothesLifestyle', icon: 'face'},
            { name: 'farming', icon: 'spa'},
            { name: 'babyKinds', icon: 'child_care'},
            { name: 'carsMotor', icon: 'drive_eta'},
            { name: 'business', icon: 'business'},
            { name: 'holidaysTickets', icon: 'beach_access'},
            { name: 'lostFound', icon: 'sentiment_dissatisfied'},
            { name: 'musiceducation', icon: 'music_note'},
            { name: 'other', icon: 'more'},
            { name: 'property', icon: 'store'},
            { name: 'work', icon: 'work'},
        ],
        views: 1,
    });

    render() {
        const { _id, image, price, date, title, location, description, category, phoneNumber } = this.props;
        
        const postImage = {
            width: "100%",
            backgroundPosition: 'center center',
            backgroundRepaet: 'no-repeat',
            position: 'absolute',
            left: 0,
            top: 0,
            backgroundSize: 'cover',
            height: "100%",
            backgroundImage: "url(" + image + ")"
        };

        return(
            <div className='post post--featured'>
                <Link to={`/post/${_id}`}>
                    <div className="post__head">
                        <div style={postImage}>
                            <div className="post__overlay">
                                <p className="post__category">
                                    {category}
                                </p>
                                
                                <p className="post__price">
                                    ${price}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="post__body">
                        <h4 className='post__title'>
                        {  title && title.length > 20 ? title.slice(0, 20) + '...' : title }
                        </h4>
                        
                        <div className="post__content">
                            <div className="post__meta">
                                <div className="post__meta-inner">
                                    <p className='post__meta-views'>
                                        <i className="icon material-icons">visibility</i>
                                        
                                        {this.state.views} Views
                                    </p>

                                    <p className='post__meta-location'>
                                        <i className="icon material-icons">
                                            location_on
                                        </i>

                                        { location }
                                    </p>
                                    
                                </div>

                                <div className="post__meta-inner">
                                    <p className='post__meta-date'>
                                        <i className="icon material-icons">date_range</i>
                                        
                                        { (new Date(date)).toLocaleDateString('en-US', 'short') }
                                    </p>

                                    <p className='post__meta-phone'>
                                        <i className="icon material-icons">
                                            phone
                                        </i>

                                        { phoneNumber }
                                    </p>
                                    
                                </div>
                                
                                <div className="post__description">
                                    {  description && description.length > 50 ? description.slice(0, 50) + '...' : description }
                                </div>
                            </div>
                        </div>
                    </div>          
                </Link>
            </div>
        )
    }
}

export default PostsFeatured;