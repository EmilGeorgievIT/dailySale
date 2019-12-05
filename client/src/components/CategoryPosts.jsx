import '../styles/Sections.scss';
import React, { Component, Fragment } from 'react'
import SearchForm from './SearchForm';
import PostsList from './PostsList';
import { Intro } from './shared/Intro';
import CategoryService from '../services/category-service';
import { Link } from 'react-router-dom';
import SearchBar from './post/SearchBar';
import { throws } from 'assert';

export default class CategoryPosts extends Component {
    static service = new CategoryService();
    _isMounted = false

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            sort: '',
            listView: 'list',
            currentTitle: '',
            counterPosts: 0,
            items: [
                { name: 'House & DIY' , categoryName: 'houseanddiy', icon: 'home' },
                { name: 'Animals', categoryName: 'animals', icon: 'pets' },
                { name: 'Electronics', categoryName: 'electronics',  icon: 'phonelink' } ,
                { name: 'Sports & Hobbies', categoryName: 'sportsandhobbies', icon: 'accessibility_new' },
                { name: 'Clothes & Lifestyle', categoryName: 'clothesandlifestyle', icon: 'face'},
                { name: 'Farming', categoryName: 'farming', icon: 'spa'},
                { name: 'Baby & Kinds', categoryName: 'babyandkinds', icon: 'child_care'},
                { name: 'Cars & Motor', categoryName: 'carsandmotor', icon: 'drive_eta'},
                { name: 'Business', categoryName: 'business', icon: 'business'},
                { name: 'Holidays & Tickets', categoryName: 'holidaysandtickets', icon: 'beach_access'},
                { name: 'Lost & Found', categoryName: 'lostandfound',  icon: 'sentiment_dissatisfied'},
                { name: 'Music & Education', categoryName: 'musicandeducation', icon: 'music_note'},
                { name: 'Other', categoryName: 'other', icon: 'more'},
                { name: 'Property', categoryName: 'property', icon: 'store'},
                { name: 'Work', categoryName: 'work', icon: 'work'},
            ]
        }
    }
    
    getPosts(page) {
        let categoryName = this.props.match.params.categoryName;

        CategoryPosts.service.getCategoriesByPage(categoryName, page + 1)
        .then((data) => {
            this.setState({
                posts: [...data.posts],
                counterPosts: data.counter
            })                
        }).catch((error) => {
            console.log(error);   
        })
    }

    async componentDidMount() {
        this._isMounted = true;
        let page = this.props.location.search? parseInt(this.props.location.search.replace('?page=', '')) : 1;

        if(this._isMounted) {
            try {
                let categoryName = this.props.match.params.categoryName;
                const currentTitle = this.state.items.find(item => item.categoryName === categoryName);
                
                this.setState({
                    currentTitle
                });
                
                const posts = await CategoryPosts.service.getCategoriesByPage(categoryName, page)
                .then((data) => {
                    this.setState({
                        posts: [...data.posts],
                        counterPosts: data.counter
                    })                
                }).catch((error) => {
                    console.log(error);   
                })
                
            } catch(error) {
                console.log(error);
            }
        }
    }
    
    showResults = (data) => {
        if(data.length > 0 ) {
            this.setState({
                posts: [...data],
                noResults: false,
            })
        } else {
            this.setState({
                noResults: true,
                posts: []
            })
        }
    }
    
    sortBy = (sort) => {
        if(sort === 'Latest') {
            const latest = this.state.posts.sort((a,b) => (b.date - a.date));
            this.setState({
                posts: latest
            });
        } else if(sort === 'Oldest') {
            const oldest = this.state.posts.sort((a,b) => (a.date - b.date))
            
            this.setState({
                posts: oldest
            });
        } else if(sort === 'Low-to-High') {
            const lowPrice = this.state.posts.sort((a,b) => (parseInt(a.price) - parseInt(b.price)))
            
            this.setState({
                posts: lowPrice
            });
        } else if(sort === 'High-to-Low') {
            const highPrice = this.state.posts.sort((a,b) => (parseInt(b.price) - parseInt(a.price)))
            
            this.setState({
                posts: highPrice
            });
        } 
    }

    postView = (view) => {

        this.setState({
            listView: view
        })
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
                title={this.state.currentTitle.name}>
                <SearchForm items={this.state.items} results={this.getResults}/>
            </Intro>

            <section className="section-category">
                <div className='container'>
                    <div className="section__head">
                    </div>
                    
                    <div className="section__body">
                        <div className="section__bar">
                            <SearchBar 
                                toggleList={this.postView} 
                                toggleGrid={this.postView}
                                changeSort={this.sortBy}
                                results= {this.state.counterPosts}
                            />
                        </div>

                        <div className="section__posts">
                            {
                                posts
                                    .map((post) => 
                                    <PostsList className='ads' key={post._id} {...post} view={this.state.listView} />
                                )
                            }
                        </div>
                    </div>
                    
                    <div className="section__foot">
                        {
                            this.state.counterPosts > 9? 
                                <nav aria-label="navigation">
                                    <ul className="pagination">
                                        {
                                            this.state.posts.slice(0, Math.ceil(this.state.counterPosts / 9)).map((post, index) =>  (
                                                <li key={index} className="page-item">
                                                    <Link to={`/category/${this.props.match.params.categoryName}?page=${index + 1}`} onClick={this.getPosts.bind(this, index)} className="page-link" href="#">
                                                        { index + 1 }
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </nav> : ''
                        }
                    </div>
                </div>
            </section>
        </Fragment>
        )

  }
}
