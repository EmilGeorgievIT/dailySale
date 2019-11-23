import React, { Component }  from 'react'
import '../../styles/FilterBar.scss';

class SearchBar extends Component {
    render () {
        return (
            <div className='filter-bar bg-white'>
                <div className="filter__content">
                    <p>
                        Showing 1 to 9 of {this.props.results} entries
                    </p>
                </div>

                <div className="filter__aside">
                    <div className="filter__actions">
                        <button className='btn-toggle'>
                            <i className="material-icons">list</i>
                        </button>

                        <button className='btn-toggle'>
                            <i className="material-icons">view_module</i>
                        </button>
                    </div>

                    <div className="filter__sort">
                        <span className='filter__sort-text'>
                            Sort By: 
                        </span>

                        <select className="custom-select filter-select" id="inputGroupSelect01">
                            <option value="Latest">
                                Latest
                            </option>
                            
                            <option value="Oldest">
                                Oldest
                            </option>
                            
                            <option value="Low-to-High">
                                Price: Low-to-High
                            </option>

                            <option value="High-to-Low">
                                Price: High-to-Low
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar;