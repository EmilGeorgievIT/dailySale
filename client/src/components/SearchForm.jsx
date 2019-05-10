import React, { Component, Fragment} from 'react';
import SearchService from '../services/search-service';

export default class SearchForm extends Component {
    static service = new SearchService();
    
    constructor(props) {
        super(props);

        this.state = {
            title: '',
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

        try {
            const posts = await SearchForm.service.findPosts(this.state);
            this.props.results(posts);
        } catch(error) {
            console.log(error);        
        }
    }
    render() {
        const { search, location } = this.state;
    
        return(
            <Fragment>
                    <form className='search-deal'>
                        <div className="form-group form__line">
                            <i className="material-icons">search</i>
                            
                            <input type="text" className="form-control" onChange={this.getValue} name='title' value={search} id="title" placeholder="Search DailyDeal" />
                        </div>

                        <div className="form-group form__line">
                            <i className="material-icons">location_on</i>
                            
                            <input type="text" className="form-control" onChange={this.getValue} value={location} name='location' id="location" placeholder='Ireland' />
                        </div>
                        
                        <select className="custom-select category-select form__line">
                            <option defaultValue>Category</option>
                            {
                                this.props.items.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>
                                ))
                            }
                        </select>
                        
                        <div className="form-action">
                            <button onClick={this.onSubmit} type="submit" className="btn btn-primary btn-submit">
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