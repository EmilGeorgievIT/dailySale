import React from 'react';

const SearchForm = ({location}) => (
    <form className='search-deal'>
        <div className="form-group">
            <i className="material-icons">search</i>
            
            <input type="text" className="form-control" id="search" placeholder="Search DailyDeal" />
        </div>

        <div className="form-group">
            <i className="material-icons">location_on</i>
            
            <input type="text" className="form-control" id="location" placeholder={location} />
        </div>
        
        <div className="form-action">
        
            <button type="submit" className="btn btn-success btn-submit">
                <i className="material-icons">send</i>
                
                <span>
                    Search
                </span>
            </button>
        </div>
    </form>
);
export default SearchForm;