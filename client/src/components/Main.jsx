import React, { Component, Fragment } from 'react';
import Post from './Post';
import PostsList from './PostsList';
import '../styles/Hero.scss';
import '../styles/Sections.scss';
import SearchForm from './SearchForm';
import CategoriesList from './CategoriesList';

class Main extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            posts: []
        }
    }
    showResults = (data) => {
        if(data.length > 0 ) {
            this.setState({
                posts: [...data]
            })
        }
    }
    render() {
        const posts = this.state.posts;

        return (
            <Fragment>
                <div className='section-hero'>
                    <div className="container">
                        <div className="section__head">
                            <SearchForm results={this.showResults} location='Ireland'/>
                        </div>
                        
                        <div className="section__body">
                            <CategoriesList />
                        </div>
                    </div>
                </div>
                
                <main className='main'>
                    <Post />
                    
                    <div className='section-results'>
                        <div className="container">
                            <h3 className='mb-4 h3'>
                                {
                                    posts.length ? `Found ${posts.length} ads` : ''
                                }
                            </h3>
                            
                            {
                                posts ? posts.map((item) => 
                                    <PostsList key= {item._id}  {...item}/>
                                ) : ''
                            }
                        </div>
                    </div>
                </main>
            </Fragment>
        )
    }
}
export default Main;