import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Posts extends Component {
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
        ]
    });

    render() {
        const { _id, image, price, title, location, description, category } = this.props;
        
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
            <div className='post'>
                <Link to={`/post/${_id}`}>
                    <div className="post__head">
                        <div style={postImage}>
                            <div className="post__actions">
                                <div className="icon  icon-red post__category">
                                    {/* <i className="material-icons">
                                        {
                                            JSON.stringify(this.state.items.find((el => el.name.replace(' & ', '') === category.toLowerCase())))
                                        }
                                    </i> */}
                                    <i className="material-icons">home</i>
                                </div>
                                
                                <div className="icon post__favorite">
                                    <i className="material-icons">favorite</i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="post__body">
                        <div className="post__meta">
                            <h4 className='post__title'>
                            {  title && title.length > 20 ? title.slice(0, 20) + '...' : title }
                            </h4>
                            
                            <div className="post__meta-inner">
                                <p className='post__meta-location'>
                                    <i className="material-icons">
                                        location_on
                                    </i>

                                    { location }
                                </p>

                                <p className='post__meta-price'>
                                    { price ? `${price}$` : '' }
                                </p>
                            </div>
                            
                            <div className="post__description">
                                {  description && description.length > 30 ? description.slice(0, 30) + '...' : description }
                            </div>
                        </div>
                    </div>          
                </Link>
            </div>
        )
    }
}

export default Posts;