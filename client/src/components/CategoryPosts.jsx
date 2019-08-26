import '../styles/Sections.scss';
import React, { Component, Fragment } from 'react'
import SearchForm from './SearchForm';
import PostsList from './PostsList';
import { Intro } from './shared/Intro';
import CategoryService from '../services/category-service';
import { Link } from 'react-router-dom';

export default class CategoryPosts extends Component {
    static service = new CategoryService();
    _isMounted = false

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
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
            ]
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        
        if(this._isMounted) {
            try {
                let categoryName = this.props.match.params.categoryName;
                
                const posts = await CategoryPosts.service.getCategories(categoryName)
                .then((data) => {
                    this.setState({
                        posts: [...data]
                    })                
                }).catch((error) => {
                    console.log(error);   
                })
                
            } catch(error) {
                console.log(error);
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getResults = (data) => {
        if(data.length > 0) {
            this.setState({
                posts: [...data]
            })
        }
    }

  render() {
    const { posts } = this.state;
    
    if (!posts.length) {
        return (
            <div className="jumbotron jumbotron-fluid warning-message">
                <div className="container">
                    <h1 className="display-4 text-center mb-4">There are no posts in this category</h1>
                    
                    <div className='jumbotron-actions text-center'>
                        <Link className='btn btn-danger btn-sm text-center' to='/'>
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Fragment>
            <Intro 
                title={this.props.match.params.categoryName}>
                <SearchForm items={this.state.items} results={this.getResults}/>
            </Intro>

            <section className="section-category">
                <div className='container'>
                    <div className="section__head">
                    </div>
                    
                    <div className="section__body">
                        <h3 className='mb-4 h3'>
                            {
                                `Found ${posts.length} ads`
                            }
                        </h3>
                        
                        {
                            posts.map((post) => 
                                <PostsList className='ads' key={post._id} {...post} />
                            )
                        }
                    </div>
                </div>
            </section>
        </Fragment>
        )

  }
}
