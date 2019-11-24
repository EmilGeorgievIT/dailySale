import React, { Component }  from 'react'
import '../../styles/FilterBar.scss';

class SearchBar extends Component {
    state = {
        activeView: 'list',
        sort: ''
    }

    toggleList = () => {
        this.setState({
            activeView: 'list'
        });

        this.props.toggleList('list');
    }

    changeSort =({target}) => {
        const selectedSort = target.value;
        
        this.props.changeSort(selectedSort);
    }

    toggleGrid = () => {
        this.setState({
            activeView: 'grid'
        })

        this.props.toggleGrid('grid');
    }

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
                        <button onClick={this.toggleList} className={this.state.activeView === 'list'? 'btn-toggle btn-toggle--active': 'btn-toggle'}>
                            <i className="material-icons">list</i>
                        </button>

                        <button onClick={this.toggleGrid} className={this.state.activeView === 'grid'? 'btn-toggle btn-toggle--active': 'btn-toggle'}>
                            <i className="material-icons">view_module</i>
                        </button>
                    </div>

                    <div className="filter__sort">
                        <span className='filter__sort-text'>
                            Sort By: 
                        </span>

                        <select onChange={this.changeSort} className="custom-select filter-select" name='sort' id="inputGroupSelect01">
                            <option value="Oldest">
                                Oldest
                            </option>

                            <option value="Latest">
                                Latest
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