import React, { Component } from 'react';
import '../styles/List.scss';

export default class CategoriesList extends Component {
    constructor() {
        super();

        this.state = {
            activeItem: -1,
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
        }
    }
    
    addActiveItem(index) {
        this.setState({
            activeItem: index
        });
    }

    render() {
        return (
            <div>
                <ul className="list-group list-categories">
                    {
                        this.state.items.map((item,index) => 
                            <li key={index} className={this.state.activeItem === index ? 'list-group-item active': 'list-group-item'}
                            onClick={this.addActiveItem.bind(this, index)}
                            >
                                <i className="material-icons">
                                    { item.icon }
                                </i>

                                <span className='item-name'>
                                { item.name }
                                </span>
                            </li>
                        )   
                    }
                </ul>
            </div>
        );
    }
}