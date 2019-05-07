import React, { Component } from 'react';
import '../styles/List.scss';
import { Link } from 'react-router-dom';

export default class CategoriesList extends Component {
    constructor() {
        super();

        this.state = {
            activeItem: -1
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
                        this.props.items.map((item,index) => 
                            <li key={index} className={this.state.activeItem === index ? 'list-group-item active': 'list-group-item'}
                            onClick={this.addActiveItem.bind(this, index)}>
                                <Link to={ `/category/${item.name.replace(' & ', 'and').toLowerCase()}` }>
                                    <i className="material-icons">
                                        { item.icon }
                                    </i>

                                    <span className='item-name'>
                                    { item.name }
                                    </span>                            
                                </Link>
                            </li>
                        )   
                    }
                </ul>
            </div>
        );
    }
}