import '../styles/Sections.scss';
import React, { Component } from 'react'
import SearchForm from './SearchForm';
import PostsList from './PostsList';
import CategoryService from '../services/category-service';
import { Link } from 'react-router-dom';

export default class CategoryPosts extends Component {
    static service = new CategoryService();

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
        }
    }
    async componentDidMount() {

        try {
            let categoryName = this.props.match.params.categoryName;
            
            const posts = await CategoryPosts.service.getCategories(categoryName)
            .then((data) => {
                this.setState({
                    posts: [...data]
                })
                
                console.log(this.state);
            }).catch((error) => {
                console.log(error);   
            })
            
        } catch(error) {
            console.log(error);
        }
    }

  render() {
    const { posts } = this.state;
    
    if (!posts.length) {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center mb-4">There is no posts in this category</h1>
                    
                    <div className='jumbotron-actions text-center'>
                        <Link className='btn btn-danger text-center' to='/'>
                            back to home
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <section className="section-category">
            <div className='container'>
                <div className="section__head">
                    <SearchForm />
                </div>
                
                <div className="section__body">
                    {
                        posts.map((post) => 
                            <PostsList className='ads' key={post._id} {...post} />
                        )
                    }
                </div>
            </div>
        </section>
    )
  }
}
