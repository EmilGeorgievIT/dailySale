import React, { Component } from 'react';

class PostsEdit extends Component {
    constructor(props) {
        super(props);
        this.state = ({
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
    }
    
    // removePost = (index) => {
    //     console.log(index);
    // }
    
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
            <div className='post post--edit'>
                <div className="post__head">
                    <div style={postImage}>
                    </div>
                </div>

                <div className="post__body">
                    <h4 className='post__title'>
                    {  title && title.length > 15 ? title.slice(0, 15) + '...' : title }
                    </h4>
                    
                    <div className="post__content">
                        <div className="post__meta">    
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
                                {  description && description.length > 20 ? description.slice(0, 20) + ' ...' : description }
                            </div>
                        </div>
                    </div>
                </div>          
                
                <div className="post__actions">
                    <button data-toggle="tooltip" data-placement="top" title="Remove Post" className="btn btn-sm">
                        Edit <i className="material-icons">edit</i>
                    </button>
                    
                    <button data-toggle="tooltip" data-placement="top" title="Remove Post" className="btn btn-sm">
                        Remove <i className="material-icons">remove_circle</i>
                    </button>
                </div>
            </div>
        )
    }
}

export default PostsEdit;