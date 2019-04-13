import React, { Component, Fragment} from 'react';
// import SearchService from '../services/search-service';

export default class SearchForm extends Component {
    // static service = new SearchService();
    
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            location: ''
        }
    }
    getValue = ({target}) => {
        this.setState({
            [target.name] : target.value
        });
    }
    
    onSubmit = async (event) => {
        event.preventDefault();
        // try {
        //     const posts = await this.service.getPosts();
        //     console.log(posts);
        // } catch(error) {
        //     console.log(error);        
        // }

        console.log(this.state);
    }
    render() {
        const { search, location } = this.state;
    
        return(
            <Fragment>
                    <form className='search-deal'>
                        <div className="form-group">
                            <i className="material-icons">search</i>
                            
                            <input type="text" className="form-control" onChange={this.getValue} name='search' value={search} id="search" placeholder="Search DailyDeal" />
                        </div>

                        <div className="form-group">
                            <i className="material-icons">location_on</i>
                            
                            <input type="text" className="form-control" onChange={this.getValue} value={location} name='location' id="location" placeholder={this.props.location} />
                        </div>
                        
                        <div className="form-action">
                        
                            <button onClick={this.onSubmit} type="submit" className="btn btn-success btn-submit">
                                <i className="material-icons">send</i>
                                
                                <span>
                                    Search
                                </span>
                            </button>
                        </div>
                 </form>
            </Fragment>
        )
    }
}